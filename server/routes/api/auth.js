/*
This route handles all HTTP methods relating to authenticating users
using external authentication services (i.e. Google, for now)
*/

// Core Modules
const express = require("express");
const router = express.Router();