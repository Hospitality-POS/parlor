const express = require("express");
const router = express.Router();
const {
  registerUsers,
  loginUsers,
  getAllUsers,
  deleteUser,
  editUser,
  getUserById,
} = require("../../controllers/usercontroller/user");

const {
  createSystemSettings,
  updateSystemSettingById,
  getSystemSettingsById,
  deleteSystemSettingById,
  getAllSystemSettings,

} = require("../../controllers/usercontroller/system-settings");


const {
  createRoleType,
  getAllRoleTypes,
  getRoleTypeById,
  updateRoleTypeById,
  deleteRoleTypeById,

} = require("../../controllers/usercontroller/role-types");

/**
 * @swagger
 * tags:
 * - name: Users
 *   description: Handles all the user related operations such as register, login, get all, get by id, delete, edit
 * /users/register:
 *  post:
 *    summary: Register a new user
 *    tags:
 *      - Users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              fullname:
 *                type: string
 *                description: Full name of the user
 *              username:
 *                type: string  
 *                description: Username of the user
 *              email:
 *                type: string
 *                description: Email of the user
 *              idNumber:
 *                type: number
 *                description: National ID of the user
 *              phone:
 *                type: number    
 *                description: Phone number of the user
 *              pin:
 *                type: string
 *                description: PIN of the user
 *              roleId:
 *                type: string    
 *                description: Role id of the user
 *              status:
 *                type: string
 *                description: Status of the user
 *                enum:
 *                  - Active
 *                  - Disabled
 *                  - Suspended
 *              
 *    responses:
 *      200:
 *        description: User created successfully
 *      400:
 *        description: Bad request
 */
router.post("/register", registerUsers);

// User login
/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *     - Users
 *     summary: Login a user
 *     requestBody:
 *       description: User object to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post("/login", loginUsers);

// Get all users
/**
 * @swagger
 * /users/all:
 *   get:
 *     tags:
 *     - Users
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: All users
 *       400:
 *         description: Bad request, unable to get all users
 *       401:
 *         description: Unauthorized, Access denied to get all users
 *       404:
 *         description: Not found, Users not found
 * */
router.get("/all", getAllUsers);

// Get a user by ID
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *     - Users
 *     summary: Get a specific user by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       400:
 *         description: Bad request, unable to get user
 *       401:
 *         description: Unauthorized, Access denied to get user
 *       404:
 *         description: Not found, User not found
 * */
router.get("/:id", getUserById);

// Delete a user by ID
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *     - Users
 *     summary: Delete a specific user by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request, unable to delete user
 *       401:
 *         description: Unauthorized, Access denied to delete user
 *       404:
 *         description: Not found, User not found
 * */
router.delete("/:id", deleteUser);

// Edit a user by ID
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *     - Users
 *     summary: Edit a specific user by ID
 *     parameters:
 *     - in: path
 *       name: id     
 *       schema:
 *         type: string
 *       required: true
 *       description: User ID
 *     requestBody:
 *       description: User object to be edited
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               idNumber:
 *                 type: number
 *                 description: National ID of the user
 *               phone:
 *                 type: number    
 *                 description: Phone number of the user
 *               pin:
 *                 type: string
 *                 description: PIN of the user
 *               roleId:
 *                 type: string    
 *                 description: Role id of the user
 *               status:
 *                 type: string
 *                 description: Status of the user
 *                 enum:
 *                   - Active
 *                   - Disabled
 *                   - Suspended
 *     responses:
 *       200:
 *         description: User edited successfully
 *       400:
 *         description: Bad request, unable to edit user
 *       401:
 *         description: Unauthorized, Access denied to edit user
 *       404:
 *         description: Not found, User not found
 * */
router.put("/:id", editUser);

/**
 * @swagger
 * tags:
 * - name: system settings
 *   description: Handles all the system setting related operations such as create, update, delete
 * /users/new-system-setting:
 *   post:
 *     tags:
 *     - system settings
 *     summary: Create a new system setting
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               systemSettingId:
 *                 type: string
 *                 description: System setting ID (auto-generated)
 *               business_no:
 *                 type: number
 *                 description: Business number
 *               till_no:
 *                 type: number
 *                 description: Till number
 *               phone:
 *                 type: number
 *                 description: Phone number
 *               name:
 *                 type: string
 *                 description: Name
 *               location:
 *                 type: string
 *                 description: Location
 *               social_link:
 *                 type: string
 *                 description: Social link
 *               kra_pin:
 *                 type: string
 *                 description: Kra pin
 *               paymentDetailId:
 *                 type: string
 *                 description: Payment detail ID
 *     responses:
 *       200:
 *         description: System setting created successfully
 *       400:
 *         description: Bad request, unable to create system setting
 *       401:
 *         description: Unauthorized, Access denied to create system setting
 *       404:
 *         description: Not found, System setting not found
 */
router.post("/new-system-setting", createSystemSettings);


/**
 * @swagger
 * /users/update-system-setting/{id}:
 *   put:
 *     tags:
 *     - system settings
 *     summary: Update a specific system setting by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: System setting ID
 *     requestBody:
 *       description: System setting object to be updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               systemSettingId:
 *                 type: string
 *                 description: System setting ID (auto-generated)
 *              business_no:
 *                 type: number
 *                 description: Business number
 *              till_no:
 *                 type: number
 *                 description: Till number
 *              phone:
 *                 type: number
 *                 description: Phone number
 *              name:
 *                 type: string
 *                 description: Name
 *              location:
 *                 type: string
 *                 description: Location
 *              social_link:
 *                 type: string
 *                 description: Social link
 *              kra_pin:
 *                 type: string
 *                 description: Kra pin
 *               paymentDetailId:
 *                 type: string
 *                 description: Payment detail ID
 *     responses:
 *       200:
 *         description: System setting updated successfully
 *       400:
 *         description: Bad request, unable to update system setting
 *       401:
 *         description: Unauthorized, Access denied to update system setting
 *       404:
 *         description: Not found, System setting not found
 * */
router.put("/update-system-setting/:id", updateSystemSettingById);

/**
 * @swagger
 * /users/fetch-system-setting/all:
 *   get:
 *     tags:
 *     - system settings
 *     summary: Fetch all system settings
 *     responses:
 *       200:
 *         description: All system settings
 *       400:
 *         description: Bad request, unable to fetch all system settings
 *       401:
 *         description: Unauthorized, Access denied to fetch all system settings
 *       404:
 *         description: Not found, System settings not found
 * */
router.get("/fetch-system-setting/all", getAllSystemSettings);

/**
 * @swagger
 * /users/fetch-system-setting/{id}:
 *   get:
 *     tags:
 *     - system settings
 *     summary: Fetch a specific system setting by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: System setting ID
 *     responses:
 *       200:
 *         description: System setting found
 *       400:
 *         description: Bad request, unable to fetch system setting
 *       401:
 *         description: Unauthorized, Access denied to fetch system setting
 *       404:
 *         description: Not found, System setting not found
 * */
router.get("/fetch-system-setting/:id", getSystemSettingsById);

/**
 * @swagger
 * /users/remove-system-setting/{id}:
 *   delete:
 *     tags:
 *     - system settings
 *     summary: Delete a specific system setting by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: System setting ID
 *     responses:
 *       200:
 *         description: System setting deleted successfully
 *       400:
 *         description: Bad request, unable to delete system setting
 *       401:
 *         description: Unauthorized, Access denied to delete system setting
 *       404:
 *         description: Not found, System setting not found
 * */
router.delete("/remove-system-setting/:id", deleteSystemSettingById);

/**
 * @swagger
 * tags:
 * - name: role-types
 *   description: Handles all the role type related operations such as create, update, delete
 * /users/new-role-type:
 *   post:
 *     tags:
 *     - role-types
 *     summary: Create a new role type
 *     requestBody:
 *       description: Role type object to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleTypeId:
 *                 type: string
 *                 description: Role type ID (auto-generated)
 *               name:
 *                 type: string
 *                 description: Role type name
 *     responses:
 *       200:
 *         description: Role type created successfully
 *       400:
 *         description: Bad request, unable to create role type
 *       401:
 *         description: Unauthorized, Access denied to create role type
 *       404:
 *         description: Not found, Role type not found
 * */
router.post("/new-role-type", createRoleType);

/**
 * @swagger
 * /users/update-role-type/{id}:
 *   put:
 *     tags:
 *     - role-types
 *     summary: Update a specific role type by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Role type ID
 *     requestBody:
 *       description: Role type object to be updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleTypeId:
 *                 type: string
 *                 description: Role type ID (auto-generated)
 *               name:
 *                 type: string
 *                 description: Role type name
 *     responses:
 *       200:
 *         description: Role type updated successfully
 *       400:
 *         description: Bad request, unable to update role type
 *       401:
 *         description: Unauthorized, Access denied to update role type
 *       404:
 *         description: Not found, Role type not found
 * */
router.put("/update-role-type/:id", getRoleTypeById);

/**
 * @swagger
 * /users/fetch-role-type/all:
 *   get:
 *     tags:
 *     - role-types
 *     summary: Fetch all role types
 *     responses:
 *       200:
 *         description: All role types
 *       400:
 *         description: Bad request, unable to fetch all role types
 *       401:
 *         description: Unauthorized, Access denied to fetch all role types
 *       404:
 *         description: Not found, Role types not found
 * */
router.get("/fetch-role-type/all", getAllRoleTypes);

/**
 * @swagger
 * /users/fetch-role-type/{id}:
 *   get:
 *     tags:
 *     - role-types
 *     summary: Fetch a specific role type by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Role type ID
 *     responses:
 *       200:
 *         description: Role type found
 *       400:
 *         description: Bad request, unable to fetch role type
 *       401:
 *         description: Unauthorized, Access denied to fetch role type
 *       404:
 *         description: Not found, Role type not found
 * */
router.get("/fetch-role-type/:id", updateRoleTypeById);

/**
 * @swagger
 * /users/remove-role-type/{id}:
 *   delete:
 *     tags:
 *     - role-types
 *     summary: Delete a specific role type by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Role type ID
 *     responses:
 *       200:
 *         description: Role type deleted successfully
 *       400:
 *         description: Bad request, unable to delete role type
 *       401:
 *         description: Unauthorized, Access denied to delete role type
 *       404:
 *         description: Not found, Role type not found
 * */
router.delete("/remove-role-type/:id", deleteRoleTypeById);

module.exports = router;
