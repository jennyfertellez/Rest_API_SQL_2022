'use strict'

const express = require('express');
const router = express.Router();

//Importing User and Course Model
const { User, Course } = require('../models');

//Importing Middleware
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');

