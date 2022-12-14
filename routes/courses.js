'use strict'

const express = require('express');
const router = express.Router();

//Importing User and Course Model
const { User, Course } = require('../models');

//Importing Middleware
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');

//Route that returns all courses and return a 200 HTTP status code
router.get('/courses', asyncHandler(async(req, res) => {
    const courses = await Course.findAll({
        attributes: [
            'id',
            'title',
            'description',
            'estimatedTime',
            'materialsNeeded',
        ],
        include: [
            {
                model: User,
                as: 'user',
                attributes: [
                    'firstName',
                    'lastName',
                    'emailAddress'
                ],
            }
        ]
    }); 
    res.status(200).json(courses);
}));

//Route that returns the corresponding course and return a 200 HTTP status code

//Route that will create a new course and return a 201 HTTP status code

//Route that will update the corresponding course and return a 204 status code

//Route that will delete the corresponding course and a return a 204 HTTP status code