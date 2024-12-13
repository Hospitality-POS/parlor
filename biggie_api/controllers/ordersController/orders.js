const Order = require("../../models/Order/order");
const Cart = require("../../models/Cart/cart");
const Categories = require("../../models/Category/category");
const Table = require("../../models/Table/table");
const OrderPayments = require("../../models/Payment/order-payments");
const OrderItems = require("../../models/Order/order-items");
const VoidItems = require("../../models/Cart/void-item");
const Product = require("../../models/Products/product");
const PaymentMethod = require("../../models/Payment/payment-method");
const OrderPaymentMethod = require("../../models/Payment/order-payments");
const Discount = require("../../models/Cart/discount");


module.exports = {

  createOrder: async (req, res) => {


    try {
      const {
        cart_id,
        order_amount,
        table_id,
        updated_by,
        order_no,
        method_id,
      } = req.body;




      const existingOrder = await Order.findOne({ order_no });

      if (existingOrder) {
        return res.status(409).json({
          message: "Order already exists",
        });
      }

      const updatedCart = await Cart.findByIdAndUpdate(
        cart_id,
        { status: "Closed" },
        { new: true }
      );



      let convertedOrderAmount = order_amount.length ? order_amount.reduce((total, currentValue) => total + currentValue, 0) : order_amount;




      const order = new Order({
        cart_id,
        order_amount: convertedOrderAmount,
        table_id,
        updated_by,
        served_by: updatedCart.created_by,
        discount: updatedCart.discount,
        discount_type: updatedCart.discount_type,
        order_no,
        method_ids: method_id,
      });

      await order.save();
      //save order items data
      let totalAmt = 0;
      req.body.cart_items.map(async (value) => {
        totalAmt += (value.price * value.quantity);
        const OrderItem = new OrderItems({
          order_id: order._id,
          product_id: value.product_id._id,
          category_id: value.product_id.category,
          served_by: updatedCart.created_by,
          quantity: value.quantity,
        });
        await OrderItem.save();
      });




      if (updatedCart.discount) {
        //save disc amount 
        let value = updatedCart.discount;
        if (updatedCart.discount_type === 'percentage') {

          value = (updatedCart.discount / 100) * totalAmt;
        }
        const discountModel = new Discount({
          cart_id,
          order_no,
          amount: value,
          created_by: updatedCart.created_by
        });

        await discountModel.save();

      }




      await Table.findOneAndUpdate(
        { _id: table_id },
        { $set: { isOccupied: false } }
      ).exec();




      if (updatedCart && updatedCart.status === "Closed") {
        await Cart.findByIdAndDelete(cart_id);
      }

      if (
        Array.isArray(method_id) &&
        Array.isArray(order_amount) &&
        method_id.length === order_amount.length
      ) {
        for (let i = 0; i < method_id.length; i++) {
          const orderPayment = new OrderPayments({
            order_id: order._id,
            method_id: method_id[i],
            amount: order_amount[i],
          });
          await orderPayment.save();
        }
      } else {
        const orderPayment = new OrderPayments({
          order_id: order._id,
          method_id: Array.isArray(method_id) ? method_id[0] : method_id,
          amount: Array.isArray(order_amount) ? order_amount[0] : order_amount,
        });
        await orderPayment.save();
      }

      res.status(201).json({
        message: "Order placed successfully",
        order: order,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating the order",
        error: error.message,
      });
    }
  },



  getOrderById: async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching the order",
        error: error.message,
      });
    }
  },
  getPurchaseSummaryByDateRange: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      // console.log("Thiku mbeca", req.query);

      const paymentMethods = await PaymentMethod.find();
      let summaryOrderPayments = [];
      let totalCost = 0;
      for (let paymentMethod of paymentMethods) {
        let orderPaymentMethods = await OrderPaymentMethod.find({
          createdAt: {
            $gte: new Date(startDate).toISOString(),
            $lte: new Date(endDate).toISOString(),
          },
          method_id: paymentMethod._id,
        });
        let totalMethodAmt = 0;
        for (let orderPaymentMethod of orderPaymentMethods) {
          totalMethodAmt += orderPaymentMethod.amount;
        }
        totalCost += totalMethodAmt;
        let payload = {
          id: paymentMethod._id,
          name: paymentMethod.name,
          amount: totalMethodAmt.toFixed(0),
        };
        summaryOrderPayments.push(payload);
      }

      //calculate total discount 
      let discounts = await Discount.find({
        createdAt: {
          $gte: new Date(startDate).toISOString(),
          $lte: new Date(endDate).toISOString(),
        },
      });

      let totalDiscountAmount = 0;
      for (let disc of discounts) {
        totalDiscountAmount += disc.amount;
      }

      let totalInclusiveDiscount = totalCost + totalDiscountAmount;

      const payload = {
        totalCost: totalCost.toFixed(0),
        payment_methods: summaryOrderPayments,
        totalInclusiveDiscount: totalInclusiveDiscount.toFixed(0),
        totalDiscountAmount: totalDiscountAmount.toFixed(0)
      };
      // console.log('methods', summaryOrderPayments);
      res.status(200).json(payload);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching order payments  by date range",
        error: error.message,
      });
    }
  },
  getVoidItemSalesByDateRange: async (req, res) => {
    try {
      const { startDate, endDate, createdBy = null } = req.query;
      // console.log("Thiku",startDate,endDate);

      const categories = await Categories.find();
      const voidSalesItems = [];
      for (let category of categories) {


        let filter = {
          createdAt: {
            $gte: new Date(startDate).toISOString(),
            $lte: new Date(endDate).toISOString(),
          },
          category: category._id,
        };

        if (createdBy) {
          filter.created_by = createdBy;
        }

        let voidItems = await VoidItems.find(filter);

        let filteredOrderItems = [];
        let totalCost = 0;
        for (let respValue of voidItems) {
          const product = await Product.findById(respValue.product_id);
          totalCost += respValue.quantity * product.price;
          let value = {
            name: product.name,
            amount: product.price,
            product_id: respValue.product_id,
            id: respValue._id,
            quantity: respValue.quantity,
            total_amount: respValue.quantity * product.price,
          };

          let valueExists = filteredOrderItems.some((obj) => {
            if (obj.product_id.equals(value.product_id)) {
              return obj;
            }
          });
          if (!valueExists) {
            filteredOrderItems.push(value);
          } else {
            filteredOrderItems.map((item) => {
              if (item.product_id.equals(value.product_id)) {
                item.quantity += value.quantity;
                item.total_amount += value.total_amount;
              }
            });
          }
        }
        let payload = {
          id: category._id,
          name: category.name,
          totalCost: totalCost,
          orderItems: filteredOrderItems,
        };
        voidSalesItems.push(payload);
      }

      res.status(200).json(voidSalesItems);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching void items by date range",
        error: error.message,
      });
    }
  },
  getItemSalesByDateRange: async (req, res) => {
    try {
      const { startDate, endDate, servedBy = null, commission = 0, locationId = null } = req.query;

      const tables = await Table.find({ locatedAt: locationId }).lean();
      let orderIds = [];
      for (let val of tables) {
        let filter = {
          createdAt: {
            $gte: new Date(startDate).toISOString(),
            $lte: new Date(endDate).toISOString(),
          },
          table_id: val._id,
        };
        const orders = await Order.find(filter).lean();
        orders.map(value => {
          orderIds.push(value._id);
        })

      }

      const categories = await Categories.find();
      const salesItems = [];
      for (let category of categories) {
        let filter = {
          createdAt: {
            $gte: new Date(startDate).toISOString(),
            $lte: new Date(endDate).toISOString(),
          },
          category_id: category._id,
        };

        if (servedBy) {
          filter.served_by = servedBy;
        }

        if (locationId) {
          filter.order_id = { $in: orderIds }
        }

        let ordersItems = await OrderItems.find(filter).lean();

        let filteredOrderItems = [];
        let totalCost = 0;
        for (let respValue of ordersItems) {
          const product = await Product.findById(respValue.product_id);
          totalCost += respValue.quantity * product.price;
          let value = {
            name: product.name,
            amount: product.price,
            product_id: respValue.product_id,
            id: respValue._id,
            quantity: respValue.quantity,
            total_amount: respValue.quantity * product.price,
          };

          let valueExists = filteredOrderItems.some((obj) => {
            if (obj.product_id.equals(value.product_id)) {
              return obj;
            }
          });
          if (!valueExists) {
            filteredOrderItems.push(value);
          } else {
            filteredOrderItems.map((item) => {
              if (item.product_id.equals(value.product_id)) {
                item.quantity += value.quantity;
                item.total_amount += value.total_amount;
              }
            });
          }
        }

        //calculate total discount 
        let discounts = await Discount.find({
          createdAt: {
            $gte: new Date(startDate).toISOString(),
            $lte: new Date(endDate).toISOString(),
          },
        });

        let totalDiscountAmount = 0;
        for (let disc of discounts) {
          totalDiscountAmount += disc.amount;
        }

        let totalExclusiveDiscount = totalCost - totalDiscountAmount;
   

        let commissionAmt = (commission / 100) * totalCost;
    
        let payload = {
          id: category._id,
          name: category.name,
          totalCost: totalCost,
          orderItems: filteredOrderItems,
          totalDiscountAmount,
          totalExclusiveDiscount,
          commissionAmt
        };
        salesItems.push(payload);
      }

      res.status(200).json(salesItems);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching order items by date range",
        error: error.message,
      });
    }
  },
  getOrdersByDateRange: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const orders = await Order.find({
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching orders by date range",
        error: error.message,
      });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const query = {};
      if (req.query.order_no) {
        query.order_no = { $regex: new RegExp(req.query.order_no, "i") };
      }

      if (req.query.table_name) {
        const table = await Table.findOne({
          name: { $regex: new RegExp(req.query.table_name, "i") },
        });
        if (table) {
          query.table_id = table._id;
        } else {
          res.status(200).json([]);
          return;
        }
      }

      const orders = await Order.find(query)
        .populate("updated_by", "username")
        .populate("served_by", "username")
        .populate("table_id", "name")
        .lean();
      for (let order of orders) {
        order.order_payments = await OrderPayments.find({ order_id: order._id }).lean();
        for (let payment of order.order_payments) {
          let resp = await PaymentMethod.findById(payment.method_id).lean();
          payment.name = resp.name;
        }
      }
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching orders",
        error: error.message,
      });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const orderId = req.params.id;
      const { cart_id, order_amount, table_id, updated_by, order_no } =
        req.body;

      const existingOrder = await Order.findById(orderId);
      if (!existingOrder) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      existingOrder.cart_id = cart_id;
      existingOrder.order_amount = order_amount;
      existingOrder.table_id = table_id;
      existingOrder.updated_by = updated_by;
      existingOrder.order_no = order_no;

      const updatedOrder = await existingOrder.save();

      res.status(200).json({
        message: "Order updated successfully",
        order: updatedOrder,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating the order",
        error: error.message,
      });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const orderId = req.params.id;

      await OrderItems.deleteMany({ order_idp: orderId });


      await OrderPayments.deleteMany({ order_id: orderId });


      const order = await Order.findByIdAndDelete(orderId);
      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }
      res.status(200).json({
        message: "Order deleted successfully",
        order,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting the order",
        error: error.message,
      });
    }
  },
};
