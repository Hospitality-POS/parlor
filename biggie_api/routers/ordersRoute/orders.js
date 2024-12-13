const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, getAllOrders, deleteOrder, getItemSalesByDateRange, updateOrder, getPurchaseSummaryByDateRange, getVoidItemSalesByDateRange } = require('../../controllers/ordersController/orders');

// Create a new order
/** 
 * @swagger
 * tags:
 * - name: Orders
 *   description: Handles all operations related to orders like create, update, delete, get all, get by id etc.
 * /orders/orders:
 *  post:
 *    tags:
 *    - Orders
 *    summary: Create a new order
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              order:
 *                type: object
 *                properties:
 *                cart_id:
 *                  type: string
 *                order_amount:
 *                  type: number
 *                discount:
 *                  type: number
 *                discount_type:
 *                  type: string
 *                updated_by:
 *                  type: string
 *                served_by:
 *                  type: string
 *                table_id:
 *                  type: string
 *                order_no:
 *                  type: string
 *                method_ids:
 *                  type: array
 *                  items:
 *                    type: string
 *    responses:
 *      200:
 *        description: Successfully created a new order
 *      400:
 *        description: Bad request, unable to create order
 */
router.post('/create', createOrder);

// Get a specific order by ID
/** 
 * @swagger
 * tags:
 * - name: Orders
 *   description: Handles all operations related to orders like create, update, delete, get all, get by id etc.
 * /orders/orders/{id}:
 *  get:
 *    tags:
 *    - Orders
 *    summary: Get a specific order by ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of the order to be fetched
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully fetched the order
 *      400:
 *        description: Bad request, unable to fetch order
 */
router.get('/:id', getOrderById);

// Get all orders
/** 
 * @swagger
 * tags:
 * - name: Orders
 *   description: Handles all operations related to orders like create, update, delete, get all, get by id etc.
 * /orders/orders:
 *  get:
 *    tags:
 *    - Orders
 *    summary: Get all orders
 *    responses:
 *      200:
 *        description: Successfully fetched all orders
 *      400:
 *        description: Bad request, unable to fetch orders
 */
router.get('/', getAllOrders);

// Get orders within a date range
/** 
 * @swagger
 * tags:
 * - name: Orders
 *   description: Handles all operations related to orders like create, update, delete, get all, get by id etc.
 * /orders/orders/date-range-sales/items:
 *  get:
 *    tags:
 *    - Orders
 *    summary: Get orders within a date range
 *    parameters:
 *      - name: startDate
 *        in: query
 *        description: Start date of the date range
 *        required: true
 *        schema:
 *          type: string
 *      - name: endDate
 *        in: query
 *        description: End date of the date range
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully fetched orders within the date range
 *      400:
 *        description: Bad request, unable to fetch orders
 */
router.get('/date-range-sales/items', getItemSalesByDateRange);

/** 
 * @swagger
 * tags:
 * - name: Orders
 *   description: Handles all operations related to orders like create, update, delete, get all, get by id etc.
 * /orders/orders/date-range-void/items:
 *  get:
 *    tags:
 *    - Orders
 *    summary: Get orders within a date range
 *    parameters:
 *      - name: startDate
 *        in: query
 *        description: Start date of the date range
 *        required: true
 *        schema:
 *          type: string
 *      - name: endDate
 *        in: query
 *        description: End date of the date range
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully fetched orders within the date range
 *      400:
 *        description: Bad request, unable to fetch orders
 */
router.get('/date-range-void/items', getVoidItemSalesByDateRange);

/** 
 * @swagger
 * tags:
 * - name: Orders
 *   description: Handles all operations related to orders like create, update, delete, get all, get by id etc.
 * /orders/orders/order-payment-methods/summary:
 *  get:
 *    tags:
 *    - Orders
 *    summary: Get orders within a date range
 *    parameters:
 *      - name: startDate
 *        in: query
 *        description: Start date of the date range
 *        required: true
 *        schema:
 *          type: string
 *      - name: endDate
 *        in: query
 *        description: End date of the date range
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully fetched orders within the date range
 *      400:
 *        description: Bad request, unable to fetch orders
 */
router.get('/order-payment-methods/summary', getPurchaseSummaryByDateRange);



// Update an order by ID
/** 
 * @swagger
 * tags:
 * - name: Orders
 *   description: Handles all operations related to orders like create, update, delete, get all, get by id etc.
 * /orders/orders/{id}:
 *  put:
 *    tags:
 *    - Orders
 *    summary: Update an order by ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of the order to be updated
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              order:
 *                type: object
 *                properties:
 *                cart_id:
 *                  type: string
 *                order_amount:
 *                  type: number
 *                discount:
 *                  type: number
 *                discount_type:
 *                  type: string
 *                updated_by:
 *                  type: string
 *                served_by:
 *                  type: string
 *                table_id:
 *                  type: string
 *                order_no:
 *                  type: string
 *                method_ids:
 *                  type: array
 *                  items:
 *                    type: string
 *    responses:
 *      200:
 *        description: Successfully updated the order
 *      400:
 *        description: Bad request, unable to update order
 */
router.put('/:id', updateOrder);

// Delete an order by ID
/** 
 * @swagger
 * tags:
 * - name: Orders
 *   description: Handles all operations related to orders like create, update, delete, get all, get by id etc.
 * /orders/orders/{id}:
 *  delete:
 *    tags:
 *    - Orders
 *    summary: Delete an order by ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of the order to be deleted
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully deleted the order
 *      400:
 *        description: Bad request, unable to delete order
 */
router.delete('/:id', deleteOrder);

module.exports = router;
