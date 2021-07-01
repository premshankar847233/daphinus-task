const express = require('express');
const router =express.Router();

const {registerUser,
loginuser,
loginadmin} = require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').get(loginuser);
router.route('/adminlogin').get(loginadmin);


module.exports = router;