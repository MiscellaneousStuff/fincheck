// Server Settings
const host = "localhost"
const port = 3000;

// Core Modules
const express = require('express');
const app = express();

// Middleware Modules
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Middleware
app.use("/", express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
const route_auth = require("./routes/api/auth");
const route_banking = require("./routes/api/banking");

// API Routes
app.use("/api/auth", route_auth);
app.use("/api/banking", route_banking);

// Host Settings
app.listen(port, host, () => {
    console.log(`Fincheck listening at http://${host}:${port}`)
});