const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../../models/user/userModel");
const RoleType = require("../../models/user/role-types")
const jwt = require("jsonwebtoken");

module.exports = {
  registerUsers: async (req, res) => {
    try {
      const { fullname, username, email, pin, phone, idNumber, isAdmin, roleId } =
        req.body;
      // console.log(pin);
      // Validation
      if (!username || !email || !pin) {
        res.status(400);
        throw new Error("Please include all the required fields");
      }

      // Check if the user with the same email already exists
      const userExist = await User.findOne({ email });

      if (userExist) {
        res.status(400);
        throw new Error("Email is already in use");
      }

      // Hash the PIN
      const hashedPin = await bcrypt.hash(pin, 10);

      // Create user with hashed PIN
      const user = await User.create({
        fullname,
        username,
        email,
        roleId,
        pin,
        hashedPin, // Store the hashed PIN in the database
        phone,
        idNumber,
        isAdmin,
      });

      if (user) {
        res.status(201).json({
          message: "Registered successfully",
        });
      } else {
        res.status(400).json({
          message: "Invalid data",
        });
      }
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  },

  //@route /api/users/login
  loginUsers: async (req, res) => {
    try {
      const { pin } = req.body; // Get the PIN from the request body

      // Find a user with the given PIN
      const user = await User.findOne({ pin: pin });

      if (user) {
        // Generate a JWT token
        const token = jwt.sign(
          {
            _id: user._id,
            name: user.username,
          },
          process.env.SECRET,
          {
            expiresIn: "10hrs",
          }
        );

        let role = await RoleType.findById(user.roleId);

        res.status(200).json({
          id: user._id,
          name: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          role: role.role_type,
          Token: token,
          message: "Login user successfully",
        });
      } else {
        res.status(400).json({
          message: "Invalid credentials",
        });
      }
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const { fullname, email, isAdmin } = req.query;

      let queryCriteria = {};

      // Add criteria for name
      if (fullname) {
        queryCriteria.fullname = { $regex: new RegExp(fullname, 'i') };
      }

      // Add criteria for email
      if (email) {
        queryCriteria.email = { $regex: new RegExp(email, 'i') };
      }

      // Add criteria for isAdmin
      if (isAdmin !== undefined) {
        queryCriteria.isAdmin = isAdmin;
      }

      const users = await User.find(queryCriteria).lean();

      for (let user of users) {
        const roleTypeValue = await RoleType.findById(user.roleId).lean();
        user.role = roleTypeValue;
      }

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving users",
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);

      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }

      await User.findByIdAndDelete(userId);

      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting user",
      });
    }
  },
  getUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).lean();

      const roleTypeValue = await RoleType.findById(user.roleId).lean();
      user.role = roleTypeValue;
      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving user",
      });
    }
  },
  editUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const {
        fullname,
        username,
        email,
        pin,
        phone,
        roleId,
        idNumber,
        isAdmin
      } = req.body;

      // Update the user data using the findByIdAndUpdate method
      const updatedUser = await User.findByIdAndUpdate(userId, {
        fullname,
        username,
        email,
        pin,
        roleId,
        phone,
        idNumber,
        isAdmin
      }, { new: true });

      if (!updatedUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        message: "User updated successfully",
        updatedUser
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating user",
        error: error.message
      });
    }
  }
};