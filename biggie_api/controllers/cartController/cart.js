const Cart = require("../../models/Cart/cart");
const Void = require("../../models/Cart/void");
const VoidItem = require("../../models/Cart/void-item");
const Cart_Item = require("../../models/Cart/cart-item");
const Table = require("../../models/Table/table");
const mongoose = require("mongoose");
module.exports = {
  createCart: async (req, res) => {
    try {
      const { table_id, created_by } = req.body;

      const existingCart = await Cart.findOne({ table_id }).exec();

      if (existingCart) {
        if (existingCart.status === "Closed") {
          const newCart = new Cart({
            table_id,
            created_by,
          });

          await newCart.save();

          await Table.findOneAndUpdate(
            { _id: table_id },
            { $set: { isOccupied: true } }
          ).exec();

          const cartItems = await Cart_Item.find({
            cart_id: newCart._id,
            table_id: newCart.table_id,
          })
            .populate("product_id", "name")
            .exec();

          newCart.items.push(...cartItems);

          return res.status(201).json(newCart);
        } else if (existingCart.status === "Open") {
          const cartItems = await Cart_Item.find({
            cart_id: existingCart._id,
            table_id: existingCart.table_id,
          })
            .populate("product_id", "name")
            .exec();

          existingCart.items.push(...cartItems);

          return res.status(200).json(existingCart);
        }
      } else {
        const cart = new Cart({
          table_id,
          created_by,
        });

        // await Cart.findById(cart_id)
        //   .populate("table_id", "name")
        //   .populate("created_by", "username")
        //   .exec();

        await cart.save();

        await Table.findOneAndUpdate(
          { _id: table_id },
          { $set: { isOccupied: true } }
        ).exec();

        return res.status(201).json(cart);
      }
    } catch (err) {
      return res.status(500).json({ error: "Failed to create cart" });
    }
  },
  transferCartItems: async (req, res) => {
    try {
      const { products, table } = req.body;
      for (let i = 0; i < products.length; i++) {
        const productId = products[i];
        let cartItem = await Cart_Item.findById(productId).lean();

        const existingCart = await Cart.findOne({ table_id: table }).exec();

        if (existingCart) {
          let similarProductExistInCart = await Cart_Item.findOne({
            product_id: cartItem.product_id,
            cart_id: existingCart._id,
          }).lean();
          if (similarProductExistInCart) {
            newItemQuantity =
              similarProductExistInCart.quantity + cartItem.quantity;
            newItemPrice = similarProductExistInCart.price + cartItem.price;
            await Cart_Item.findByIdAndUpdate(
              similarProductExistInCart._id,
              { quantity: newItemQuantity, price: newItemPrice },
              { new: true }
            ).exec();

            await Cart_Item.findByIdAndDelete(productId).exec();
          } else {
            await Cart_Item.findByIdAndUpdate(
              productId,
              { cart_id: existingCart._id, table_id: table },
              { new: true }
            ).exec();
          }
        } else {
          const cartReq = new Cart({
            table_id: table,
            created_by: cartItem.created_by,
          });

          await cartReq.save();

          if (cartReq) {
            await Cart_Item.findByIdAndUpdate(
              productId,
              { cart_id: cartReq._id, table_id: table },
              { new: true }
            ).exec();

            await Table.findByIdAndUpdate(
              { _id: table },
              { $set: { isOccupied: true } },
              { new: true }
            ).exec();
          }
        }

        let cartItems = await Cart_Item.find({
          cart_id: cartItem.cart_id,
        }).lean();
        if (!cartItems.length) {
          await Cart.findByIdAndDelete(cartItem.cart_id).exec();
          await Table.findByIdAndUpdate(
            { _id: cartItem.table_id },
            { $set: { isOccupied: false } },
            { new: true }
          ).exec();
        }
      }
      return res
        .status(200)
        .json({ message: "Order Transfer successful", products });
    } catch (error) {
      res.status(500).json({
        message: "Error creating the order",
        error: error.message,
      });
    }
  },
  voidCart: async (req, res) => {
    console.log("cart1 ");
    try {
      const { cart_id } = req.body;

      let cart = await Cart.findById(cart_id).lean();

      if (cart) {
        let VoidReq = new Void({
          table_id: cart.table_id,
          cart_id: cart._id,
          created_by: cart.created_by,
          order_no: cart.order_no,
        });

        let voidResp = await VoidReq.save();
        if (voidResp) {
          const cartItems = await Cart_Item.find({
            cart_id: cart._id,
            table_id: cart.table_id,
          })
            .populate("product_id")
            .lean();

          for (let item of cartItems) {
            let voidItemReq = new VoidItem({
              void_id: voidResp._id,
              product_id: item.product_id,
              category: item.product_id.category,
              price: item.price,
              created_by: item.created_by,
              desc: item.desc,
              quantity: item.quantity,
            });
            let voidItemResp = await voidItemReq.save();
            await Cart_Item.findByIdAndDelete(item._id).exec();
            console.log("cart", voidItemResp);
          }
        }
        await Table.findOneAndUpdate(
          { _id: cart.table_id },
          { $set: { isOccupied: false } }
        ).exec();
        await Cart.findByIdAndDelete(cart._id).exec();
      }

      return res.status(200).json({ message: "Order successfully voided" });
    } catch (err) {
      return res.status(500).json({ error: "Failed to update cart" });
    }
  },

  sendCart: async (req, res) => {
    try {
      const { cart_id } = req.body;
      const cartItems = await Cart_Item.find({
        cart_id,
        sent: false,
      })
        .populate("product_id")
        .exec();
      const cartItemsArr = [];
      for (let cartItem of cartItems) {
        const cartItemVal = await Cart_Item.findByIdAndUpdate(
          { _id: cartItem._id },
          { sent: true },
          { new: true }
        ).exec();
        cartItemsArr.push(cartItemVal);
      }

      return res.status(200).json(cartItemsArr);
    } catch (err) {
      return res.status(500).json({ error: "Failed to update cart" });
    }
  },
  getCart: async (req, res) => {
    try {
      const { table_id } = req.params;
      // console.log(table_id);
      const cartExist = await Cart.findOne({ table_id: table_id });
      if (cartExist) {
        // Find the cart by its ID
        const cart = await Cart.findOne({
          table_id: table_id,
          status: "Open",
          void: false,
        })

          .populate("table_id", "name")
          .populate("created_by", "username")
          .exec();

        // console.log("cart", cart);

        const cartItems = await Cart_Item.find({
          cart_id: cart._id,
        })
          .populate("product_id")
          .exec();
        let payload = {
          _id: cart._id,
          table_id: cart.table_id,
          //name : cart.name,
          name: "nice",
          created_by: cart.created_by,
          //username : cart.username ,
          username: "mike",
          discount: cart.discount,
          discount_type: cart.discount_type,
          client_pin: cart.client_pin,
          items: cartItems,
          order_no: cart.order_no,
        };
        // if(!cartItems){
        //     return res.status(201).json([]);
        // }
        if (!payload) {
          return res.status(404).json({ error: "Cart not found" });
        }

        return res.status(200).json(payload);
      } else {
        return res.status(201).json([]);
      }
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
  // Function to add an item to the cart
  addItemToCart: async (req, res) => {
    try {
      const {
        cart_id,
        product_id,
        price,
        quantity,
        created_by,
        desc,
        table_id,
      } = req.body;
      const existingCartItem = await Cart_Item.findOne({
        cart_id,
        product_id,
      }).exec();

      if (existingCartItem) {
        existingCartItem.quantity += 1;
        existingCartItem.price += price;
        await existingCartItem.save();
        return res.status(200).json(existingCartItem);
      }

      const cartItem = new Cart_Item({
        cart_id,
        product_id,
        price,
        quantity,
        created_by,
        desc,
        table_id,
      });
      await cartItem.save();

      return res.status(201).json(cartItem);
    } catch (err) {
      return res.status(500).json({ error: "Failed to add item to cart" });
    }
  },
  getCartItems: async (req, res) => {
    try {
      const { cart_id } = req.params;
      const cart = await Cart.findById(cart_id);
      // console.log(cart.status);

      if (!cart || cart.status !== "Open") {
        return res.status(201).json([]);
      }

      const cartItems = await Cart_Item.find({
        cart_id,
        table_id: cart.table_id,
      })
        .populate("product_id", "name")
        .exec();

      return res.status(200).json(cartItems);
    } catch (err) {
      return res.status(500).json({ error: "Failed to get cart items" });
    }
  },

  deleteCartItem: async (req, res) => {
    try {
      const { cart_item_id } = req.params;

      // Find and delete the cart item
      const deletedCartItem = await Cart_Item.findByIdAndDelete(
        cart_item_id
      ).exec();

      if (!deletedCartItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      return res.status(200).json(deletedCartItem);
    } catch (err) {
      return res.status(500).json({ error: "Failed to delete cart item" });
    }
  },
  updateCart: async (req, res) => {
    try {
      const { cart_id } = req.params;
      const { discount_type, discount, client_pin } = req.body;



      // Find and update the cart item
      const updatedCart = await Cart.findByIdAndUpdate(
        cart_id,
        { discount_type, discount, client_pin },
        { new: true }
      ).exec();



      if (!updatedCart) {
        return res.status(404).json({ error: "Cart  not found" });
      }

      return res.status(200).json(updatedCart);
    } catch (err) {
      return res.status(500).json({ error: "Failed to update cart " });
    }
  },
  updateCartItem: async (req, res) => {
    try {
      const { cart_item_id } = req.params;
      const { product_id, price, desc, quantity } = req.body;

      // Find and update the cart item
      const updatedCartItem = await Cart_Item.findByIdAndUpdate(
        cart_item_id,
        { product_id, price, desc, quantity },
        { new: true }
      ).exec();

      if (!updatedCartItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      return res.status(200).json(updatedCartItem);
    } catch (err) {
      return res.status(500).json({ error: "Failed to update cart item" });
    }
  },
  deleteAllCartItems: async (req, res) => {
    try {
      const { cart_id } = req.params;

      const deletedCartItems = await Cart_Item.deleteMany({ cart_id }).exec();

      if (!deletedCartItems) {
        return res
          .status(404)
          .json({ error: "No cart items found for the cart" });
      }

      return res.status(200).json(deletedCartItems);
    } catch (err) {
      return res.status(500).json({ error: "Failed to delete cart items" });
    }
  },
};
