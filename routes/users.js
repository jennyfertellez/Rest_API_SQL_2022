'use strict'

const express = require('express');
const router = express.Router();

//Importing Middleware
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser} = require('../middleware/auth-user');

//Importing User Model
const User = require('../models').User

//Importing Middleware for Handler & Authentication


//User Routes
//An Authenticated Route for All Properties and Values for the Authenticated User
router.get('/users', authenticateUser, asyncHandler(async(req, res) => {
    //Get the user from the request body.
    const user = req.currentUser;
    res.json({
        id: user.id,
        emailAddress: user.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
    });
}));

//Route that Creates A New User
router.post('/users', async(req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201)
        .location('/')
        .end();

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
});

module.exports = router;