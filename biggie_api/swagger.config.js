const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "FSS API",
      version: "2.0.0",
      description:
        "An application designed to efficiently manage Food Service System (FSS) operations via RESTful API, including user management, system settings, and role types administration. etc.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Michael kinuthi or Michael kamau",
        // url: "https://github.com/mik284",
        // email: "mikeykamau222@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routers/**/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;