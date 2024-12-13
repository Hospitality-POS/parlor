const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    try {
      const token = req.headers.authorization;
      // console.log(token);

      if (!token) { 
        return res
          .status(402)
          .json({ message: "Not authorized, Please provide a token" });
      }
      const tokenValue = token.split(" ")[1];

      const decodedTokeData = jwt.verify(tokenValue, process.env.SECRET);

      req.info = decodedTokeData;

      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Unauthorized", error: error.message });
    }
  },
};

