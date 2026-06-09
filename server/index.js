const dns = require("node:dns/promises");
dns.setServers(["8.8.8.8"]); 
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require("./src/config/db");
const routes = require("./src/routers/router");
dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

app.use(cors());
// Middleware
app.use(express.json());


app.use("/api", routes);

connectDB();
// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});