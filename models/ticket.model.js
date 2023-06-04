const mongoose = require("mongoose");
const ticketSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user"
        },
        ticket: {
            type: Array,
            "default": [],
            required: [true, "ticket is required"]
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("tickets", ticketSchema);