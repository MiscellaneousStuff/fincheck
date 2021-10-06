/*
This route handles all HTTP methods relating to communicating with
banking providers (just Plaid API for now!)
*/

// Core Modules 
const express = require("express");
const router = express.Router();

// Banking Modules
// const plaid = require("plaid");

// @route GET api/banking/balance
// @desc Gets the balance of each of a users connected bank accounts
// @access Public
router.get("/balance", (req, res) => {
    const testAccounts = [
        {
            id: "random",
            balance: "80",
            currency: "GBP"
        }
    ];
    res.send(JSON.stringify(testAccounts));
})

// Export Route
module.exports = router;