const express = require("express");
const {
  createModifiers,
  editModifier,
  deleteOneModifier,
  getAllModifiers,
  getOneModifier,
  createAddons,
  editAddons,
  deleteOneAddon,
  getOneAddon,
  getAllAddons,
} = require("../../controllers/productController/modifierAddons");
const router = express.Router();

/**
 * @swagger
 * tags:
 * - name: Modifiers
 *   description: Handles all the modifier and addon related operations
 * /modifiers/create-modifier:
 *  post:
 *    summary: Create a new modifier
 *    tags:
 *      - Modifiers
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: Name of the modifier (required)
 *              createdBy:
 *                type: string
 *                description: ID of the user who created the modifier
 *              addons:
 *                type: array
 *                description: Array of IDs of the addons associated with the modifier
 *    responses:
 *      201:
 *        description: Modifier created successfully
 *      400:
 *        description: Bad request
 */
router.post("/create-modifier", createModifiers);

// Edit/update a modifier
/**
 * @swagger
 * /modifiers/update-modifier/{modifierId}:
 *  put:
 *    summary: Update a modifier
 *    tags:
 *      - Modifiers
 *    parameters:
 *      - in: path
 *        name: modifierId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the modifier to be updated
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: Name of the modifier
 *              createdBy:
 *                type: string
 *                description: ID of the user who created the modifier
 *              addons:
 *                type: array
 *                description: Array of IDs of the addons associated with the modifier
 *    responses:
 *      200:
 *        description: Modifier updated successfully
 *      400:
 *        description: Bad request
 *      404:
 *        description: Modifier not found
 */
router.put("/update-modifier/:id", editModifier);

// Delete a modifier
/**
 * @swagger
 * /modifiers/delete-modifier/{modifierId}:
 *  delete:
 *    summary: Delete a modifier
 *    tags:
 *      - Modifiers
 *    parameters:
 *      - in: path
 *        name: modifierId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the modifier to be deleted
 *    responses:
 *      200:
 *        description: Modifier deleted successfully
 *      400:
 *        description: Bad request
 *      404:
 *        description: Modifier not found
 */
router.delete("/delete-modifier/:id", deleteOneModifier);

// Fetch all modifiers
/**
 * @swagger
 * /modifiers/fetch-modifiers:
 *  get:
 *    summary: Fetch all modifiers
 *    tags:
 *      - Modifiers 
 *    parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: Name of the modifier to be searched
 *    responses:
 *      200:
 *        description: Modifiers fetched successfully
 *      400:
 *        description: Bad request
 */
router.get("/fetch-modifiers", getAllModifiers);

// Fetch a single modifier by ID
/**
 * @swagger
 * /modifiers/fetch-modifiers/{modifierId}:
 *  get:
 *    summary: Fetch a single modifier by ID
 *    tags:
 *      - Modifiers
 *    parameters:
 *      - in: path
 *        name: modifierId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the modifier to be fetched
 *    responses:
 *      200:
 *        description: Modifier fetched successfully
 *      400:
 *        description: Bad request
 *      404:
 *        description: Modifier not found
 */
router.get("/fetch-modifiers/:id", getOneModifier);

// Addons routes
// Create a new addon
/**
 * @swagger
 * /modifiers/create-addons:
 *  post:
 *    summary: Create a new addon
 *    tags:
 *      - Modifiers
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: Name of the addon
 *              modifier:
 *                type: string
 *                description: ID of the modifier associated with the addon
 *    responses:
 *      201:
 *        description: Addon created successfully
 *      400:
 *        description: Bad request
 */
router.post("/create-addons", createAddons);

// Edit/update an addon
/**
 * @swagger
 * /modifiers/update-addon/{addonId}:
 *  put:
 *    summary: Update an addon
 *    tags:
 *      - Modifiers
 *    parameters:
 *      - in: path
 *        name: addonId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the addon to be updated
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: Name of the addon
 *              modifier:
 *                type: string
 *                description: ID of the modifier associated with the addon
 *    responses:
 *      200:
 *        description: Addon updated successfully
 *      400:
 *        description: Bad request
 *      404:
 *        description: Addon not found
 */
router.put("/update-addon/:id", editAddons);

// Delete an addon
/**
 * @swagger
 * /modifiers/delete-addon/{addonId}:
 *  delete:
 *    summary: Delete an addon
 *    tags:
 *      - Modifiers
 *    parameters:
 *      - in: path
 *        name: addonId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the addon to be deleted
 *    responses:
 *      200:
 *        description: Addon deleted successfully
 *      400:
 *        description: Bad request
 *      404:
 *        description: Addon not found
 */
router.delete("/delete-addon/:id", deleteOneAddon);

// Fetch a single addon by ID
/**
 * @swagger
 * /modifiers/fetch-addons/{addonId}:
 *  get:
 *    summary: Fetch a single addon by ID
 *    tags:
 *      - Modifiers
 *    parameters:
 *      - in: path
 *        name: addonId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the addon to be fetched
 *    responses:
 *      200:
 *        description: Addon fetched successfully
 *      400:
 *        description: Bad request
 *      404:
 *        description: Addon not found
 */
router.get("/fetch-addons/:id", getOneAddon);
/**   
 * @swagger
 * /modifiers/fetch-addons:
 *  get:
 *    summary: Fetch all addons
 *    tags:
 *      - Modifiers
 *    responses:
 *      200:
 *        description: Addons fetched successfully
 *      400:
 *        description: Bad request
 */
router.get("/fetch-addons", getAllAddons);

module.exports = router;
