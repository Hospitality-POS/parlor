const express = require("express");
const router = express.Router();
const {
  getAllSuppliers,
  createSupplier,
  getSupplierById,
  updateSupplierById,
  deleteSupplierById,
} = require("../../controllers/inventoryController/supplier");
const isAdminMiddleware = require("../../middleware/Admin/adminMiddleware");

// Route: GET /suppliers
/**
 * @swagger
* tags:
 * - name: suppliers
 *   description: Handles all operations related to suppliers like create, update, delete, get all, get by id etc.
 * /suppliers:
 *   get:
 *     tags:
 *     - suppliers
 *     summary: Get all suppliers
 *     responses:
 *       200:
 *         description: All suppliers
 *       400:
 *         description: Bad request, unable to get all suppliers
 *       401:
 *         description: Unauthorized, Access denied to get all suppliers
 *       404:
 *         description: Not found, Suppliers not found
 * */
router.get("/", getAllSuppliers);

// Route: POST /suppliers
/**
 * @swagger
 * /suppliers/suppliers:
 *   post:
 *     tags:
 *     - suppliers
 *     summary: Create a new supplier
 *     requestBody:
 *       description: Supplier object to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplierId:
 *                 type: string
 *                 description: Supplier ID (auto-generated)
 *               name:  
 *                 type: string
 *                 description: Supplier name
 *               phone:
 *                 type: number
 *                 description: Supplier phone number
 *               email:
 *                 type: string
 *                 description: Supplier email address
 *       responses:
 *         200:
 *           description: Supplier created successfully
 *         400:
 *           description: Bad request, unable to create supplier
 *         401:
 *           description: Unauthorized, Access denied to create supplier
 *         404:
 *           description: Not found, Supplier not found
 * */
router.post("/", createSupplier);

// Route: GET /suppliers/:id
/**
 * @swagger
 * /suppliers/suppliers/{id}:
 *   get:
 *     tags:
 *     - suppliers
 *     summary: Get a specific supplier by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier found
 *       400:
 *         description: Bad request, unable to get supplier
 *       401:
 *         description: Unauthorized, Access denied to get supplier
 *       404:
 *         description: Not found, Supplier not found
 * */
router.get("/:id", getSupplierById);

// Route: PUT /suppliers/:id
/**
 * @swagger
 * /suppliers/suppliers/{id}:
 *   put:
 *     tags:
 *     - suppliers
 *     summary: Update a specific supplier by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Supplier ID
 *     requestBody:
 *       description: Supplier object to be updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplierId:
 *                 type: string
 *                 description: Supplier ID (auto-generated)
 *               name:  
 *                 type: string
 *                 description: Supplier name
 *               phone:
 *                 type: number
 *                 description: Supplier phone number
 *               email:
 *                 type: string
 *                 description: Supplier email address
 *       responses:
 *         200:
 *           description: Supplier updated successfully
 *         400:
 *           description: Bad request, unable to update supplier
 *         401:
 *           description: Unauthorized, Access denied to update supplier
 *         404:
 *           description: Not found, Supplier not found
 * */ 
router.put("/:id", updateSupplierById);

// Route: DELETE /suppliers/:id
/**
 * @swagger
 * /suppliers/suppliers/{id}:
 *   delete:
 *     tags:
 *     - suppliers
 *     summary: Delete a specific supplier by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier deleted successfully
 *       400:
 *         description: Bad request, unable to delete supplier
 *       401:
 *         description: Unauthorized, Access denied to delete supplier
 *       404:
 *         description: Not found, Supplier not found
 * */
router.delete("/:id", deleteSupplierById);

module.exports = router;