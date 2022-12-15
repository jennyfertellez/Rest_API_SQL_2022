'use strict'

const auth = require('basic-auth');
const { User } = require('../models');
const bcrypt = require('bcrypt');

//Middleware to authenticate teh request using Basic Authorization
exports.authenticateUser = async (req, res, next) => {
    //Store the message to display
    let message;
    //Parse the user's credentials from the Authorication header
    const credentials = auth(req);

    //If the user's credentials are available
    if (credentials) {
        const user = await User.findOne({ where: {emailAddress: credentials.name} });
    //If a user was successfully retrived from the data store
        if (user) {
            const authenticated = bcrypt.compareSync(credentials.pass, user.password);
        
    //If the password match
            if (authenticated) {
                console.log(`Authentication successful for email address: ${user.emailAddress}`)

                //Store the user email address on the Request object
                req.currentUser = user;
            
            } else  {
                message = `Authetication failure for user's email address: ${user.emailAddress}`;
            } 
        } else {
                message = `User not found for name: ${credentials.name}`;
            }
        } else {
                message = 'Auth header not found';
            }

    //If user authentication failed
    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
    }
    
    //If the user authentication succeeded
    next();
}