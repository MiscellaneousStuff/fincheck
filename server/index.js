// Server Settings
const host = "localhost"
const port = 3000;

// Core Modules
const express = require('express');
const app = express();

// Import Routes
const banking = require("./routes/api/banking");

// Routes
app.use("/api/banking", banking)

// Host Settings
app.listen(port, host, () => {
    console.log(`FinCheck listening at http://${host}:${port}`)
});