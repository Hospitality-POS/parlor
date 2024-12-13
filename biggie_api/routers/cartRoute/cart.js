const express = require("express");
const router = express.Router();
const { createCart, getCart, addItemToCart, updateCart, getCartItems, deleteCartItem, updateCartItem, deleteAllCartItems, voidCart, sendCart, transferCartItems } = require("../../controllers/cartController/cart");

router.post("/create-cart", createCart);
router.put("/void-cart", voidCart);
router.put("/send-cart", sendCart);
router.put("/update-cart/:cart_id", updateCart)
router.get("/cart/:table_id", getCart);
router.post("/add-item-to-cart", addItemToCart);
router.get("/cart-items/:cart_id", getCartItems);
router.delete("/cart-item/:cart_item_id", deleteCartItem);
router.delete("/cart/:cart_id", deleteAllCartItems)
router.put("/cart-item/:cart_item_id", updateCartItem);
router.post("/transfer-cart-items", transferCartItems);

module.exports = router;