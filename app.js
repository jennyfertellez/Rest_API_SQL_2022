'use strict';

//Load Modules
const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./models');
const users = require('./routes/users');
const courses = require('./routes/courses');

//Sequelize autheticate to test the databade connection
console.log("Testing the connection to the database...");

(async () => {
  await sequelize.sync();

  try {
    //Test the connection to the database
    await sequelize.authenticate();
    console.log("Connection to the database successful!");
  } catch(error) {
    console.log("Error connection to the database: ", error);
  }
})();

//Variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

//Create the Express app
const app = express();

//For Parsing Application/json
app.use(express.json());

//Setup morgan which gives us http request logging
app.use(morgan('dev'));

//Setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

//Routes for Users and Courses
app.use('/api', users);
app.use('/api', courses);

//Send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

//Setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

//Set our port
app.set('port', process.env.PORT || 5000);

//Start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
