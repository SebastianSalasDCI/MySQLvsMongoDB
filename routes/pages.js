const express = require('express');
//const UserFunctions = require('../core/user');
const UserFunctions = require('../mongo/user_mongo');
const router = express.Router();

// create an object from the class User in the file core/user.js


// Get the index page
router.get('/', (req, res, next) => {
    let user = req.session.user;
    // If there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
    if(user) {
        res.redirect('/home');
        return;
    }
    // IF not we just send the index page.
    res.render('index', {title:"My application"});
})

// Get home page
router.get('/home', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('home', {loged:req.session.loged, name:user.fullname});
        return;
    }
    res.redirect('/');
});

// Post login data
router.post('/login', async (req, res, next) => {
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).
    let result = await UserFunctions.loginUser(req.body.username, req.body.password)

        if(result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.loged = 1;
            // redirect the user to the home page.
            res.redirect('/home');
        }else {
            // if the login function returns null send this error message back to the user.
            res.send('Username/Password incorrect!');
        }
    

});


// Post register data
router.post('/register', async (req, res, next) => {
    // prepare an object containing all user inputs.
    let userInput = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    let lastId = await UserFunctions.createUser(userInput)

    // if the creation of the user goes well we should get an integer (id of the inserted user)
    if(lastId) {
        // Get the user data by it's id. and store it in a session.
        let result = await UserFunctions.findUser(lastId)
            console.log(result)
            req.session.user = result;
            req.session.loged = 0;
            res.redirect('/home');
        

    }else {
        console.log('Error creating a new user ...');
    }


});


// Get loggout page
router.get('/loggout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

module.exports = router;