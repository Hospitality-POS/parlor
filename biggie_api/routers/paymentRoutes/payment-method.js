const express = require("express");
const router = express.Router();
const isAdminMiddleware = require("../../middleware/Admin/adminMiddleware");
const {
  getAllPaymentMethods,
  getPaymentMethodById,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} = require("../../controllers/paymentController/payment-method");
const { verifyToken } = require("../../middleware/Auth/authMiddleware");


const {
  createPaymentDetail,
  getPaymentDetailById,
  getAllPaymentDetails,
  updatePaymentDetail,
  deletePaymentDetail,

} = require("../../controllers/paymentController/payment-detail");

// Route to get all payment methods
/**
 * @swagger
 * tags:
 * - name: payment-methods
 *   description: Handles all the payment method related operations 
 * /payment-methods/payment-methods:
 *   get:
 *     tags:
 *     - payment-methods
 *     summary: Get all payment methods
 *     responses:
 *       200:
 *         description: All payment methods
 *       400:
 *         description: Bad request, unable to get all payment methods
 *       401:
 *         description: Unauthorized, Access denied to get all payment methods
 *       404:
 *         description: Not found, Payment methods not found
 * */
router.get("/", getAllPaymentMethods);

// Route to get a specific payment method by ID
/**
 * @swagger
 * /payment-methods/payment-methods/{id}:
 *   get:
 *     tags:
 *     - payment-methods
 *     summary: Get a specific payment method by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Payment method ID
 *     responses:
 *       200:
 *         description: Payment method found
 *       400:
 *         description: Bad request, unable to get payment method
 *       401:
 *         description: Unauthorized, Access denied to get payment method
 *       404:
 *         description: Not found, Payment method not found
 * */
router.get("/:id", getPaymentMethodById);

// Route to create a new payment method
/**
 * @swagger
 * /payment-methods/payment-methods:
 *   post:
 *     tags:
 *     - payment-methods
 *     summary: Create a new payment method
 *     requestBody:
 *       description: Payment method object to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentMethodId:
 *                 type: string
 *                 description: Payment method ID (auto-generated)
 *               name:
 *                 type: string
 *                 description: Payment method name
 *       responses:
 *         200:
 *           description: Payment method created successfully
 *         400:
 *           description: Bad request, unable to create payment method
 *         401:
 *           description: Unauthorized, Access denied to create payment method
 *         404:
 *           description: Not found, Payment method not found
 * */
router.post("/", createPaymentMethod);

// Route to update an existing payment method by ID
/**
 * @swagger
 * /payment-methods/payment-methods/{id}:
 *   put:
 *     tags:
 *     - payment-methods
 *     summary: Update a specific payment method by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Payment method ID
 *     requestBody:
 *       description: Payment method object to be updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentMethodId:
 *                 type: string
 *                 description: Payment method ID (auto-generated)
 *               name:
 *                 type: string
 *                 description: Payment method name
 *       responses:
 *         200:
 *           description: Payment method updated successfully
 *         400:
 *           description: Bad request, unable to update payment method
 *         401:
 *           description: Unauthorized, Access denied to update payment method
 *         404:
 *           description: Not found, Payment method not found
 * */
router.put("/:id", updatePaymentMethod);

// Route to delete a payment method by ID
/**
 * @swagger
 * /payment-methods/payment-methods/{id}:
 *   delete:
 *     tags:
 *     - payment-methods
 *     summary: Delete a specific payment method by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Payment method ID
 *     responses:
 *       200:
 *         description: Payment method deleted successfully
 *       400:
 *         description: Bad request, unable to delete payment method
 *       401:
 *         description: Unauthorized, Access denied to delete payment method
 *       404:
 *         description: Not found, Payment method not found
 * */
router.delete("/:id", deletePaymentMethod);




/**
 * @swagger
 * tags:
 * - name: payment-details
 *   description: Payment Details API endpoints handles all the payment detail related operations
 * /payment-methods/new-payment-detail:
 *   post:
 *     tags:
 *     - payment-details
 *     summary: Create a new payment detail
 *     requestBody:
 *       description: Payment detail object to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentDetailId:
 *                 type: string
 *                 description: Payment detail ID (auto-generated)
 *               paymentMethodId:
 *                 type: string
 *                 description: Payment method ID
 *               name:
 *                 type: string
 *                 description: Payment detail name
 *               amount:
 *                 type: number
 *                 description: Payment detail amount
 *               status:
 *                 type: string
 *                 description: Payment detail status
 *       responses:
 *         200:
 *           description: Payment detail created successfully
 *         400:
 *           description: Bad request, unable to create payment detail
 *         401:
 *           description: Unauthorized, Access denied to create payment detail
 *         404:
 *           description: Not found, Payment detail not found
 * */
router.post("/new-payment-detail", createPaymentDetail);

/**
 * @swagger
 * /payment-methods/update-payment-detail/{id}:
 *   put:
 *     tags:
 *     - payment-details
 *     summary: Update a specific payment detail by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Payment detail ID
 *     requestBody:
 *       description: Payment detail object to be updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentDetailId:
 *                 type: string
 *                 description: Payment detail ID (auto-generated)
 *               name:
 *                 type: string
 *                 description: Payment detail name
 *       responses:
 *         200:
 *           description: Payment detail updated successfully
 *         400:
 *           description: Bad request, unable to update payment detail
 *         401:
 *           description: Unauthorized, Access denied to update payment detail
 *         404:
 *           description: Not found, Payment detail not found
 * */
router.put("/update-payment-detail/:id", getPaymentDetailById);

/**
 * @swagger
 * /payment-methods/fetch-payment-detail/all:
 *   get:
 *     tags:
 *     - payment-details
 *     summary: Fetch all payment details
 *     responses:
 *       200:
 *         description: All payment details
 *       400:
 *         description: Bad request, unable to fetch all payment details
 *       401:
 *         description: Unauthorized, Access denied to fetch all payment details
 *       404:
 *         description: Not found, Payment details not found
 * */
router.get("/fetch-payment-detail/all", getAllPaymentDetails);

/**
 * @swagger
 * /payment-methods/fetch-payment-detail/{id}:
 *   get:
 *     tags:
 *     - payment-details
 *     summary: Fetch a specific payment detail by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Payment detail ID
 *     responses:
 *       200:
 *         description: Payment detail found
 *       400:
 *         description: Bad request, unable to fetch payment detail
 *       401:
 *         description: Unauthorized, Access denied to fetch payment detail
 *       404:
 *         description: Not found, Payment detail not found
 * */
router.get("/fetch-payment-detail/:id", updatePaymentDetail);

/**
 * @swagger
 * /payment-methods/remove-payment-detail/{id}:
 *   delete:
 *     tags:
 *     - payment-details
 *     summary: Delete a specific payment detail by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Payment detail ID
 *     responses:
 *       200:
 *         description: Payment detail deleted successfully
 *       400:
 *         description: Bad request, unable to delete payment detail
 *       401:
 *         description: Unauthorized, Access denied to delete payment detail
 *       404:
 *         description: Not found, Payment detail not found
 * */
router.delete("/remove-payment-detail/:id", deletePaymentDetail);

module.exports = router;
