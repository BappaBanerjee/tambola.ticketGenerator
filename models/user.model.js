const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"]
        },
        email: {
            type: String,
            required: [true, "please add the user address"],
            unique: [true, "Email address already register"]
        },
        password: {
            type: String,
            required: [true, "Please add the user password"]
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("user", userSchema);