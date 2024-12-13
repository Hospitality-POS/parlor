const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/Auth/authMiddleware");

const isAdminMiddleware = require("../../middleware/Admin/adminMiddleware");

const {
  getAllTables,
  createTable,
  getTableById,
  updateTableById,
  deleteTableById,
  getTablesByLocatedAt,
  getUniqueLocatedAtValues,
  getAllTableInfo,
  createLocation,
  updateLocationById,
  deleteLocationById,
  getAllLocations,
} = require("../../controllers/tableController/table");

// Get all tables
/**
 * @swagger
 * tags:
 * - name: tables
 *   description: Handles all the table related operations such as create, update, delete
 * /tables:
 *   get:
 *     tags:
 *     - tables
 *     summary: Get all tables
 *     responses:
 *       200:
 *         description: All tables
 *       400:
 *         description: Bad request, unable to get all tables
 *       401:
 *         description: Unauthorized, Access denied to get all tables
 *       404:
 *         description: Not found, Tables not found
 * */
router.get("/", getAllTables);

// Create a new table
/**
 * @swagger
 * /tables:
 *   post:
 *     tags:
 *     - tables
 *     summary: Create a new table
 *     requestBody:
 *       description: Table object to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tableId:
 *                 type: integer
 *                 description: Table ID
 *               name:
 *                 type: string
 *                 description: Table name
 *               cart:
 *                 type: array
 *                 description: Array of cart items
 *                 isOccupied:
 *                   type: boolean
 *                   description: Is the table occupied
 *               locatedAt:
 *                 type: integer
 *                 description: Table location ID
 *       responses:
 *         200:
 *           description: Table created successfully
 *         400:
 *           description: Bad request, unable to create table
 *         401:
 *           description: Unauthorized, Access denied to create table
 *         404:
 *           description: Not found, Table not found
 * */
router.post("/", createTable);

// Get a specific table by ID
/**
 * @swagger
 * /tables/tables/{id}:
 *   get:
 *     tags:
 *     - tables
 *     summary: Get a specific table by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: Table ID
 *     responses:
 *       200:
 *         description: Table found
 *       400:
 *         description: Bad request, unable to get table
 *       401:
 *         description: Unauthorized, Access denied to get table
 *       404:
 *         description: Not found, Table not found
 * */
router.get("/:id", getTableById);

// GET tables by "locatedAt" property
/**
 * @swagger
 * /tables/tables/locatedAt/{location}:
 *   get:
 *     tags:
 *     - tables
 *     summary: Get tables by location
 *     parameters:
 *     - in: path
 *       name: location
 *       schema:
 *         type: integer
 *       required: true
 *       description: Table location ID
 *     responses:
 *       200:
 *         description: Tables found
 *       400:
 *         description: Bad request, unable to get tables
 *       401:
 *         description: Unauthorized, Access denied to get tables
 *       404:
 *         description: Not found, Tables not found
 * */
router.get("/locatedAt/:location", getTablesByLocatedAt);

// Update a specific table by ID
/**
 * @swagger
 * /tables/tables/{id}:
 *   put:
 *     tags:
 *     - tables
 *     summary: Update a specific table by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: Table ID
 *     requestBody:
 *       description: Table object to be updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tableId:
 *                 type: integer
 *                 description: Table ID
 *               name:
 *                 type: string
 *                 description: Table name
 *               cart:
 *                 type: array
 *                 description: Array of cart items
 *                 isOccupied:
 *                   type: boolean
 *                   description: Is the table occupied
 *               locatedAt:
 *                 type: integer
 *                 description: Table location ID
 *       responses:
 *         200:
 *           description: Table updated successfully
 *         400:
 *           description: Bad request, unable to update table
 *         401:
 *           description: Unauthorized, Access denied to update table
 *         404:
 *           description: Not found, Table not found
 * */
router.put("/:id", updateTableById);

// Delete a specific table by ID
/**
 * @swagger
 * /tables/tables/{id}:
 *   delete:
 *     tags:
 *     - tables
 *     summary: Delete a specific table by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: Table ID
 *     responses:
 *       200:
 *         description: Table deleted successfully
 *       400:
 *         description: Bad request, unable to delete table
 *       401:
 *         description: Unauthorized, Access denied to delete table
 *       404:
 *         description: Not found, Table not found
 * */
router.delete("/:id", deleteTableById);

// Route to get unique "locatedAt" enum values
/**
 * @swagger
 * /tables/tables/unique-locatedAt:
 *   get:
 *     tags:
 *     - tables
 *     summary: Get unique "locatedAt" enum values
 *     responses:
 *       200:
 *         description: Unique "locatedAt" enum values
 *       400:
 *         description: Bad request, unable to get unique "locatedAt" enum values
 *       401:
 *         description: Unauthorized, Access denied to get unique "locatedAt" enum values
 *       404:
 *         description: Not found, Unique "locatedAt" enum values not found
 * */ 
router.get("/tables/unique-locatedAt", getUniqueLocatedAtValues);

// New route to get all tables with cart details and server names
/**
 * @swagger
 * /tables/tables/table-info/{id}:
 *   get:
 *     tags:
 *     - tables
 *     summary: Get all tables with cart details and server names
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: Table ID
 *     responses:
 *       200:
 *         description: All tables with cart details and server names
 *       400:
 *         description: Bad request, unable to get all tables with cart details and server names
 *       401:
 *         description: Unauthorized, Access denied to get all tables with cart details and server names
 *       404:
 *         description: Not found, All tables with cart details and server names not found
 * */
router.get("/table-info/:id", getAllTableInfo);

// New route to create a location
/**
 * @swagger
 * tags:
 * - name: locations
 *   description: Handles all the location related operations such as create, update, delete
 * /tables/locations:
 *   post:
 *     tags:
 *     - locations
 *     summary: Create a new location
 *     requestBody:
 *       description: Location object to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               locationId:
 *                 type: integer
 *                 description: Location ID
 *               name:
 *                 type: string
 *                 description: Location name
 *               locatedAt:
 *                 type: integer
 *                 description: Table location ID
 *       responses:
 *         200:
 *           description: Location created successfully
 *         400:
 *           description: Bad request, unable to create location
 *         401:
 *           description: Unauthorized, Access denied to create location
 *         404:
 *           description: Not found, Location not found
 * */
router.post("/locations", createLocation);

// New route to update a location
/**
 * @swagger
 * /tables/locations/{id}:
 *   put:
 *     tags:
 *     - locations
 *     summary: Update a specific location by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: Location ID
 *     requestBody:
 *       description: Location object to be updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               locationId:
 *                 type: integer
 *                 description: Location ID
 *               name:
 *                 type: string
 *                 description: Location name
 *               locatedAt:
 *                 type: integer
 *                 description: Table location ID
 *       responses:
 *         200:
 *           description: Location updated successfully
 *         400:
 *           description: Bad request, unable to update location
 *         401:
 *           description: Unauthorized, Access denied to update location
 *         404:
 *           description: Not found, Location not found
 * */
router.put("/locations/:id", updateLocationById);

// New route to delete a location
/**
 * @swagger
 * /tables/locations/{id}:
 *   delete:
 *     tags:
 *     - locations
 *     summary: Delete a specific location by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: Location ID
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *       400:
 *         description: Bad request, unable to delete location
 *       401:
 *         description: Unauthorized, Access denied to delete location
 *       404:
 *         description: Not found, Location not found
 * */ 
router.delete("/locations/:id", deleteLocationById);

// New route to get all locations
/**
 * @swagger
 * /tables/locations/locations:
 *   get:
 *     tags:
 *     - locations
 *     summary: Get all locations
 *     responses:
 *       200:
 *         description: All locations
 *       400:
 *         description: Bad request, unable to get all locations
 *       401:
 *         description: Unauthorized, Access denied to get all locations
 *       404:
 *         description: Not found, Locations not found
 * */
router.get("/location/locations", getAllLocations);

module.exports = router;