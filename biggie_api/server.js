const express = require("express");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

// swagger
const swaggerUi = require("swagger-ui-express");
const specs = require("./swagger.config");

const userRoutes = require("./routers/userRoute/user");
const orderRoutes = require("./routers/ordersRoute/orders");
const productRoutes = require("./routers/productsRoutes/product");
const modifierRoutes = require("./routers/productsRoutes/modifierAddons");
const paymentMethodRoutes = require("./routers/paymentRoutes/payment-method");
const tableRoutes = require("./routers/tableRoutes/table");
const supplierRoutes = require("./routers/supplierRoute/supplier");
const categoryRoutes = require("./routers/categoryRoute/category");
const cartRoutes = require("./routers/cartRoute/cart");
const productInventoryRoutes = require('./routers/InventoryRoute/product_inventory')


const { connectDB: db } = require("./config/DB");
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load env variables
dotenv.config();

// connect to db
db();

// Routes
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/modifiers", modifierRoutes);
app.use("/product", productRoutes);
app.use("/payment-methods", paymentMethodRoutes);
app.use("/tables", tableRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/categories", categoryRoutes);
app.use("/cart", cartRoutes);
app.use("/product-inventory", productInventoryRoutes)

// swagger ui
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// start server
app.listen(process.env.PORT, () => {
  console.warn("Listening on port: " + process.env.PORT);
});
