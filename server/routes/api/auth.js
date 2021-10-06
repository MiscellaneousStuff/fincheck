/*
This route handles all HTTP methods relating to authenticating users
using external authentication services (i.e. Google, for now)
*/

// Core Modules
const express = require("express");
const router = express.Router();

// DOTENV Configuration
const dotenv = require('dotenv').config();

// Google Authentication Modules
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

// Check authenticated
const checkAuthenticated = (req, res, next) => {
    const token = req.cookies['session-token'];
    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
        //const userId = payload["sub"];
        //console.log(payload);
    }
    verify()
        .then(() => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.error('User not authenticated:', err);

            // NOTE: This will be our login route in the future
            // res.redirect('/login');
            res.redirect('/');
        });
};

// @route POST api/auth/login
// @desc Logs a user into their current session by verifying their session token
// @access Public
router.post("/login", (req, res) => {
    const token = req.body.token;
    console.log('User token:', token);

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });
        const payload = ticket.getPayload();
        const userId = payload["sub"];
        console.log(payload);
    }

    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send(JSON.stringify('success'));
        })
        .catch(console.error);
});

// @route POST api/auth/logout
// @desc Logs a user out of their current session
// @access Public
router.get("/logout", (req, res) => {
    res.clearCookie('session-token');

    // NOTE: This will be our login route in the future
    // res.redirect('/login');
    res.redirect('/');
});

// process.env.process.env.CLIENT_ID <= GCP Client ID (Auth Service)

// Export Route
module.exports = router;