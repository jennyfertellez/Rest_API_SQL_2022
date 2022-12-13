'use strict'

const express = require('express');
const router = express.Router();

//Importing User Model
const User = require('../models').User

//Importing Middleware for Handler & Authentication


//User Routes
//An Authenticated Route for All Properties and Values for the Authenticated User
router.get('/users', (req, res) => {
    //Get the user from the request body.
    const user = req.currentUser;
    res.json({
        id: user.id,
        emailAddress: user.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
    });
});

// Set the status to 201 Created and end the response 
res.status(201).end();

//Route that Creates A New User
router.post('/users', async(req, res) => {
    try {
        ...
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
}));