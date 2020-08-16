const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/userCtrl');
const auth = require('../middlewares/auth');
const User = require('../models/userModel');

// Register User
router.post('/register', UserCtrl.register);

//Login User
router.post('/login', UserCtrl.login);

//Verify token
router.get('/verify', UserCtrl.verifiedToken);

module.exports = router;
