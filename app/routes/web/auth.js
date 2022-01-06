const express = require('express');
const router = express.Router();
const passport = require('passport');
//controller
const loginController = require('app/http/controllers/auth/loginController');
const registerController = require('app/http/controllers/auth/registerController');

//validators
const loginValidator = require('app/http/validators/loginValidator');
const registerValidator = require('app/http/validators/registerValidator');
//home routes
router.get('/login', loginController.showLoginForm);
router.post('/login', loginValidator.handle(), loginController.loginProcess);
router.get('/register', registerController.showregistrationForm);
router.post('/register', registerValidator.handle(), registerController.registerProcess);

//google
router.get('/login/google', passport.authenticate('google',{ scope : ['profile', 'email']}))
router.get('/google/callback', passport.authenticate('google',{ successRedirect : '/',failureRedirect : '/register'}))

module.exports = router;