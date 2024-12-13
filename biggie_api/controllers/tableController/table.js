const Table = require("../../models/Table/table");
const Cart = require("../../models/Cart/cart");
const userModel = require("../../models/user/userModel");
const CartItem = require("../../models/Cart/cart-item");
const Location = require("../../models/Table/locatedAt");

module.exports = {
  // Get all tables
  getAllTables: async (req, res) => {
    try {
      const { name, locatedAt } = req.query;
      // console.log(locatedAt);
      // If a name is provided, query by name, otherwise get all tables
      const query = {};
      
      if (name) query.name = new RegExp(name, "i");
     
      if (locatedAt) query.locatedAt = new RegExp(locatedAt, "i");

      const tables = await Table.find(query);
      let updatedTablesArray = [];

      for (let table of tables) {
        let activeCart = await Cart.findOne({
          table_id: table._id,
          status: "Open",
          void: false,
        });

        let cartValue = 0;
        let servedBy = null;

        if (activeCart) {
          let servedByUser = await userModel.findById(activeCart.created_by);
          servedBy = servedByUser.username;

          let cartItems = await CartItem.find({
            cart_id: activeCart._id,
          });

          for (let cart of cartItems) {
            cartValue += cart.price * cart.quantity;
          }
        }

        let locatedAt = await Location.findById(table.locatedAt); // Assuming locatedAt is the ID of the location

        let payload = {
          _id: table._id,
          name: table.name,
          locatedAt: locatedAt ? locatedAt.name : null, // Use the name of the location if it exists
          isOccupied: table.isOccupied,
          served_by: servedBy,
          cart_amount: cartValue,
        };

        updatedTablesArray.push(payload);
      }

      res.status(200).json(updatedTablesArray);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  // getAllTables: async (req, res) => {
  //   try {
  //     const enumValues = await Location.distinct("name");

  //     const tables = await Table.aggregate([
  //       {
  //         $lookup: {
  //           from: "carts",
  //           let: { tableId: "$_id" },
  //           pipeline: [
  //             {
  //               $match: {
  //                 $expr: {
  //                   $and: [
  //                     { $eq: ["$table_id", "$$tableId"] },
  //                     { $eq: ["$status", "Open"] },
  //                     { $eq: ["$void", false] },
  //                   ],
  //                 },
  //               },
  //             },
  //             {
  //               $lookup: {
  //                 from: "cartitems",
  //                 let: { cartId: "$_id" },
  //                 pipeline: [
  //                   {
  //                     $match: {
  //                       $expr: {
  //                         $and: [
  //                           { $eq: ["$cart_id", "$$cartId"] },
  //                           { $eq: ["$sent", false] },
  //                         ],
  //                       },
  //                     },
  //                   },
  //                 ],
  //                 as: "cartItems",
  //               },
  //             },
  //             {
  //               $lookup: {
  //                 from: "users",
  //                 localField: "created_by",
  //                 foreignField: "_id",
  //                 as: "user",
  //               },
  //             },
  //             { $unwind: "$user" },
  //             { $unwind: "$cartItems" },
  //             {
  //               $group: {
  //                 _id: "$_id",
  //                 servedBy: { $first: "$user.username" },
  //                 cartValue: {
  //                   $sum: {
  //                     $multiply: ["$cartItems.price", "$cartItems.quantity"],
  //                   },
  //                 },
  //               },
  //             },
  //           ],
  //           as: "activeCart",
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "Location",
  //           localField: "locatedAt",
  //           foreignField: "_id",
  //           as: "location",
  //         },
  //       },
  //       {
  //         $set: {
  //           locationName: {
  //             $cond: {
  //               if: { $in: ["$location", enumValues] },
  //               then: "$location.name",
  //               else: "Unknown Location",
  //             },
  //           },
  //         },
  //       },
  //       {
  //         $project: {
  //           _id: 1,
  //           name: 1,
  //           locatedAt: 1,
  //           isOccupied: 1,
  //           served_by: { $arrayElemAt: ["$activeCart.servedBy", 0] },
  //           cart_amount: { $arrayElemAt: ["$activeCart.cartValue", 0] },
  //           locationName: 1,
  //         },
  //       },
  //     ]);

  //     res.status(200).json(tables);

  //     res.status(200).json(tables);
  //   } catch (error) {
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // },

  // table and cart details
  getAllTableInfo: async (req, res) => {
    try {
      const tableId = req.params.id;
      const table = await Table.findById(tableId).populate("cart");
      if (!table) {
        return res.status(404).json({ error: "Table not found" });
      }
      res.status(200).json(table);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  // Create a new table
  createTable: async (req, res) => {
    try {
      const { name, locatedAt } = req.body;

      // Check if the specified location exists
      const existingLocation = await Location.findById(locatedAt);
      if (!existingLocation) {
        return res.status(400).json({ error: "Location not found" });
      }

      // Create a new table with the reference to the location
      const newTable = new Table({
        name: name,
        locatedAt: existingLocation._id,
      });
      await newTable.save();

      res.status(201).json(newTable);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get a specific table by ID
  getTableById: async (req, res) => {
    try {
      const table = await Table.findById(req.params.id);
      if (!table) {
        return res.status(404).json({ error: "Table not found" });
      }
      res.status(200).json(table);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update a specific table by ID
  updateTableById: async (req, res) => {
    try {
      const { name, isOccupied, locatedAt } = req.body;
      const table = await Table.findByIdAndUpdate(
        req.params.id,
        { name, isOccupied, locatedAt },
        { new: true }
      );
      if (!table) {
        return res.status(404).json({ error: "Table not found" });
      }
      res.status(200).json(table);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get tables by "locatedAt" property
  getTablesByLocatedAt: async (req, res) => {
    try {
      const { location } = req.params;

      // Find the location by name
      const foundLocation = await Location.findOne({ name: location });

      if (!foundLocation) {
        return res.status(404).json({ error: "Location not found" });
      }

      // Find tables at the specified location
      const tables = await Table.find({ locatedAt: foundLocation._id });

      let updatedTablesArray = [];

      for (let table of tables) {
        let activeCart = await Cart.findOne({
          table_id: table._id,
          status: "Open",
          void: false,
        });

        let cartValue = 0;
        let servedBy = null;

        if (activeCart) {
          let servedByUser = await userModel.findById(activeCart.created_by);
          servedBy = servedByUser.username;

          let cartItems = await CartItem.find({
            cart_id: activeCart._id,
          });

          for (let cart of cartItems) {
            cartValue += cart.price * cart.quantity;
          }
        }

        let payload = {
          _id: table._id,
          name: table.name,
          locatedAt: foundLocation.name,
          isOccupied: table.isOccupied,
          served_by: servedBy,
          cart_amount: cartValue,
        };

        updatedTablesArray.push(payload);
      }

      res.status(200).json(updatedTablesArray);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Delete a specific table by ID
  deleteTableById: async (req, res) => {
    try {
      const table = await Table.findByIdAndDelete(req.params.id);
      if (!table) {
        return res.status(404).json({ error: "Table not found" });
      }
      res.status(200).json({ message: "Table deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Create a new location
  createLocation: async (req, res) => {
    try {
      const { locationName } = req.body;

      // Check if the location already exists
      const existingLocation = await Location.findOne({
        name: { $regex: new RegExp(`^${locationName}$`, "i") },
      });

      if (existingLocation) {
        return res.status(400).json({ error: "Location already exists" });
      }

      // Create a new location
      const newLocation = new Location({ name: locationName });
      await newLocation.save();

      res.status(201).json(newLocation);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  },
  // Get unique "locatedAt" enum values
   getUniqueLocatedAtValues :  async (req, res) => {
    try {
      const locations = await Location.find();
      const response = [];
  
      for (const value of locations) {
        const tables = await Table.find({ locatedAt: value._id.toString() });
  
        const tableResp = [];
        for (const table of tables) {
          const activeCart = await Cart.findOne({
            table_id: table._id,
            status: "Open",
            void: false,
          });
  
          let cartValue = 0;
          let servedBy = '';
  
          if (activeCart) {
            const cartItems = await CartItem.find({ cart_id: activeCart._id });
            cartValue = cartItems.reduce((sum, cart) => sum + cart.price, 0);
            servedBy = (await userModel.findById(activeCart.created_by))?.username || '';
          }
  
          tableResp.push({
            _id: table._id,
            name: table.name,
            cart_amount: cartValue,
            served_by: servedBy,
            isOccupied: table.isOccupied,
          });
        }
  
        response.push({
          _id: value._id,
          name: value.name,
          tables: tableResp,
        });
      }
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  // Update an existing location by ID
  updateLocationById: async (req, res) => {
    try {
      const { locationName } = req.body;
      const locationId = req.params.id;

      // Check if the location exists
      const existingLocation = await Location.findById(locationId);
      if (!existingLocation) {
        return res.status(404).json({ error: "Location not found" });
      }

      // Check if the new location name is unique
      const isUnique = await Location.findOne({
        name: { $regex: new RegExp(`^${locationName}$`, "i") },
        _id: { $ne: locationId },
      });

      if (isUnique) {
        return res.status(400).json({ error: "Location name must be unique" });
      }

      // Update the location name
      existingLocation.name = locationName;
      await existingLocation.save();

      res.status(200).json(existingLocation);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  // Delete a specific location by ID
  deleteLocationById: async (req, res) => {
    try {
      const locationId = req.params.id;

      // Check if the location exists
      const existingLocation = await Location.findById(locationId);
      if (!existingLocation) {
        return res.status(404).json({ error: "Location not found" });
      }

      // Check if the location is associated with any tables
      const associatedTables = await Table.find({ locatedAt: locationId });
      if (associatedTables.length > 0) {
        return res
          .status(400)
          .json({ error: "Cannot delete location associated with tables" });
      }

      // Delete the location
      await Location.findByIdAndDelete(locationId);

      res.status(200).json({ message: "Location deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get all locations
  getAllLocations: async (req, res) => {
    try {
      const { name } = req.query;

      // If a name is provided, query by name, otherwise get all locations
      const query = name ? { name: { $regex: new RegExp(name, "i") } } : {};

      const locations = await Location.find(query);

      res.status(200).json(locations);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
