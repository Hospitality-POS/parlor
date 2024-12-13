const express = require("express");
const router = express.Router();
const { getAllInventoryItems, createInventoryItem, getInventoryItemById, updateInventoryItemById, deleteInventoryItemById } = require("../../controllers/inventoryController/productInventory");

// Route for getting all inventory items
/** 
 * @swagger
 * tags:
 * - name: Inventory
 *   description: Handles all operations related to inventory like create, update, delete, get all, get by id etc.
 * /product-inventory/product-inventory:
 *   get:
 *     tags:
 *     - Inventory
 *     summary: Get all inventory items
 *     responses:
 *       200:
 *         description: All inventory items
 *       400:
 *         description: Bad request, unable to get all inventory items
 *       401:
 *         description: Unauthorized, Access denied to get all inventory items
 *       404:
 *         description: Not found, Inventory items not found
 * */
router.get("/",  getAllInventoryItems);

// Route for creating a new inventory item
/** 
 * @swagger
 * tags:
 * - name: Inventory
 *   description: Handles all operations related to inventory like create, update, delete, get all, get by id etc.
 * /product-inventory/product-inventory:
 *   post:
 *     tags:
 *     - Inventory
 *     summary: Create a new inventory item
 *     requestBody:
 *       description: Inventory item object to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: Product ID
 *               name:
 *                 type: string
 *                 description: Name of the inventory item
 *               supplier_id:
 *                 type: string
 *                 description: Supplier ID
 *               code:
 *                 type: string
 *                 description: Code of the inventory item
 *               quantity:
 *                 type: number
 *                 description: Quantity of the inventory item
 *               price:
 *                 type: number
 *                 description: Price of the inventory item
 *               desc:
 *                 type: string
 *                 description: Description of the inventory item
 *               subcategory_id:
 *                 type: string
 *                 description: Subcategory ID
 *               min_viable_quantity:
 *                 type: number
 *                 description: Minimum viable quantity of the inventory item
 *     responses:
 *       200:
 *         description: Inventory item created successfully
 *       400:
 *         description: Bad request, unable to create inventory item
 *       401:
 *         description: Unauthorized, Access denied to create inventory item
 *       404:
 *         description: Not found, Inventory item not found 
 * */
router.post("/", createInventoryItem);

// Route for getting a specific inventory item by ID
/** 
 * @swagger
 * tags:
 * - name: Inventory
 *   description: Handles all operations related to inventory like create, update, delete, get all, get by id etc.
 * /product-inventory/product-inventory/{id}:
 *   get:
 *     tags:
 *     - Inventory
 *     summary: Get a specific inventory item by ID
 *     parameters:
 *     - name: id
 *       in: path
 *       description: ID of the inventory item to be fetched
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Inventory item fetched successfully
 *       400:
 *         description: Bad request, unable to get inventory item by ID
 *       401:
 *         description: Unauthorized, Access denied to get inventory item by ID
 *       404:
 *         description: Not found, Inventory item not found
 * */
router.get("/:id", getInventoryItemById);

// Route for updating a specific inventory item by ID
/** 
 * @swagger
 * tags:
 * - name: Inventory
 *   description: Handles all operations related to inventory like create, update, delete, get all, get by id etc.
 * /product-inventory/product-inventory/{id}:
 *   put:
 *     tags:
 *     - Inventory
 *     summary: Update a specific inventory item by ID
 *     parameters:
 *     - name: id
 *       in: path
 *       description: ID of the inventory item to be updated
 *       required: true
 *       schema:
 *         type: string
 *     requestBody:
 *       description: Inventory item object to be updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the inventory item
 *               supplier_id:
 *                 type: string
 *                 description: Supplier ID
 *               code:
 *                 type: string
 *                 description: Code of the inventory item 
 *               quantity:
 *                 type: number
 *                 description: Quantity of the inventory item
 *               price:
 *                 type: number
 *                 description: Price of the inventory item
 *               desc:
 *                 type: string
 *                 description: Description of the inventory item
 *               subcategory_id:
 *                 type: string
 *                 description: Subcategory ID
 *               min_viable_quantity:
 *                 type: number
 *                 description: Minimum viable quantity of the inventory item
 *     responses:
 *       200:
 *         description: Inventory item updated successfully
 *       400:
 *         description: Bad request, unable to update inventory item
 *       401:
 *         description: Unauthorized, Access denied to update inventory item
 *       404:
 *         description: Not found, Inventory item not found
 * */
router.put("/:id", updateInventoryItemById);

// Route for deleting a specific inventory item by ID
/** 
 * @swagger
 * tags:
 * - name: Inventory
 *   description: Handles all operations related to inventory like create, update, delete, get all, get by id etc.
 * /product-inventory/product-inventory/{id}:
 *   delete:
 *     tags:
 *     - Inventory
 *     summary: Delete a specific inventory item by ID
 *     parameters:
 *     - name: id
 *       in: path
 *       description: ID of the inventory item to be deleted
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Inventory item deleted successfully
 *       400:
 *         description: Bad request, unable to delete inventory item
 *       401:
 *         description: Unauthorized, Access denied to delete inventory item
 *       404:
 *         description: Not found, Inventory item not found
 * */
router.delete("/:id",  deleteInventoryItemById);

module.exports = router;
