const mongoose = require("mongoose");
require("dotenv").config();

console.log("Mongo URI:", process.env.MONGO_URI); // Debugging line to check if MONGO_URI is loaded

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully`");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;