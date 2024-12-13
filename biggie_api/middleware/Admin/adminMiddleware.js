const jwt = require("jsonwebtoken");
const User = require("../../models/user/userModel");
const RoleType = require("../../models/user/role-types");
// require('dotenv').config()
// Middleware to check if the user is an admin
const isAdminMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Authorization token not found." });
  }

  try {
    // Verify the token
    const tokenValue = token.split(" ")[1];

    const decodedToken = jwt.verify(tokenValue, process.env.SECRET);

    // console.log(decodedToken);

    const userId = decodedToken._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }
    let role = await RoleType.findById(user.roleId);
    if (!role === "admin") {
      return res
        .status(403)
        .json({ error: "Access denied. User is not an admin." });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token.", err });
  }
};

module.exports = isAdminMiddleware;
