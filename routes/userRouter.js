const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/userCtrl');

// Register User
router.post('/register', UserCtrl.register);

//Login User
router.post('/login', UserCtrl.login);

//Verify token
router.get('/verify', UserCtrl.verifiedToken);

module.exports = router;
