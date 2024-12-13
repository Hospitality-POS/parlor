const mongoose = require("mongoose");

const roleTypeSchema = new mongoose.Schema(
    {
        role_type: {
            type: String,
            required: [true, "Please provide a role_type"],
        },
    },
    {
        timestamps: true,
    }
);


const roleType = mongoose.model('role-type', roleTypeSchema);

module.exports = roleType