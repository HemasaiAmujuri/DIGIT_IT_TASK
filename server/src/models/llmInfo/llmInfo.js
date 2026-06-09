const mongoose = require("mongoose");

const llmInfoSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("llmInfo", llmInfoSchema);