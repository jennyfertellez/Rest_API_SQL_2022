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
router.get('/courses', authenticateUser, async(req, res) => {
    const course = await Course.findByPk(req.params.id, {
        attributes: [
            'id',
            'title',
            'description',
            'estimatedTime',
            'materialsNeeded',
        ],
        included: [
            {
                model: User,
                as: 'user',
                attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'emailAddress'
                ],
            }
        ]
    });
    res.json(course);
});

//Route that will create a new course and return a 201 HTTP status code
router.post('/courses', authenticateUser, async(req, res) => {
    try { 
        const user = req.currentUser;

        const course = await Course.create({
            title: req.body.title,
            description: req.body.description,
            estimatedTime: req.body.estimatedTime,
            materialsNeeded: req.body.materialsNeeded,
            userId: user.id,
        });
    
        res.status(201)
        .location(`courses/${course.id}`)
        .end();
    } catch (error) {
        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errorr.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }});

//Route that will update the corresponding course and return a 204 status code
router.put('/courses/:id', authenticateUser, async(req, res) => {
    try {
        const user = req.currentUser;
        const course = await Course.findByPk(req.params.id);
        if (course.userId === user.id){
            await course.update(req.body)
            res.status(204).end()
        } else {
            res.status(403)
            .json({message: `Access Denied. Only the owner of ${course.title} can update the course.`})
            .end();
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
});

//Route that will delete the corresponding course and a return a 204 HTTP status code
router.delete('courses/:id', authenticateUser, async(req, res) => {
    const user = req.currentUser;
    const course = await Course.findByPk(req.params.id);

    if (course.userId === user.id){
        await course.destroy()
        res.status(204)
        .end()
    } else {
        res.status(403)
        .json({message: `Forbidden: ${course.title} can only be deleted by the course owner.`})
        .end()
    }
});

module.exports = router;