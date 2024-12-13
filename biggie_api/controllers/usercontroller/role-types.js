const RoleTypes = require("../../models/user/role-types");

module.exports = {
    createRoleType: async (req, res) => {
        try {
            const roles = await RoleTypes.create(req.body);
            return res.status(201).json(roles);
        } catch (error) {
            return res.status(400).json({ error: "Invalid data" });
        }
    },

    getAllRoleTypes: async (req, res) => {
        try {
            const roles = await RoleTypes.find().lean();

            return res.status(200).json(roles);
        } catch (error) {
            console.error("Error fetching roles:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    getRoleTypeById: async (req, res) => {
        try {
            const role = await RoleTypes.findById(req.params.id);
            return res.status(200).json(role);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    updateRoleTypeById: async (req, res) => {
        try {
            const updatedRoleType = await RoleTypes.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            return res.status(200).json(updatedRoleType);
        } catch (error) {
            return res.status(400).json({ error: "Invalid data" });
        }
    },

    deleteRoleTypeById: async (req, res) => {
        try {
            const deletedRoleType = await RoleTypes.findByIdAndDelete(
                req.params.id
            );
            return res.status(200).json(deletedRoleType);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    },
};
