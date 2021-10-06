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

// DOTENV Configuration
const dotenv = require('dotenv').config();

// Google Authentication Modules
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

// Check authenticated
const checkAuthenticated = (req, res, next) => {
    const token = req.cookies['session-token'];
    console.log('TOKEN DURING AUTH:', token);
    
    // No token means the user is not logged in, re-direct to login page
    if (token === undefined) {
        console.log('User not authenticated: No token provided.');
  
        // NOTE: This will be our login route in the future
        // res.redirect('/login');
        res.redirect('/');
    } else {
        // If there is a token, authorise it using GCP Auth Client
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
                console.log('User not authenticated:', err);
    
                // NOTE: This will be our login route in the future
                // res.redirect('/login');
                res.redirect('/');
            });
    }
};

// Protected
app.get('/banking', checkAuthenticated, (req, res) => {
    // NOTE: This requires auth, uncomment when auth middleware uncommented
    const user = req.user;
    console.log(`User: ${user.name} has started an enquiry.`)
    res.redirect('banking.html');
});

// Host Settings
app.listen(port, host, () => {
    console.log(`Fincheck listening at http://${host}:${port}`)
});