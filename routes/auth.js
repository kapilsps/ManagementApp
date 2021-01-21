const express           = require('express');
const router            = express.Router();
const LoginController   = require('../controller/auth/login-controller');
const RegisterController   = require('../controller/auth/register-controller');
const ForgotPasswordController   = require('../controller/auth/forgotpassword-controller');

/**
 * Login Page
 * @request GET
 */
router.get('/login', LoginController.index);

/**
 * Login Page
 * @request POST
 */
router.post('/login', LoginController.postLogin);

/**
 * Logout
 * @request POST
 */
// router.post('/logout', LoginController.postLogin);

/**
 * Register Page
 * @request GET
 */
router.get('/register', RegisterController.index);

/**
 * Register Page
 * @request POST
 */
router.post('/register', RegisterController.postRegister);

/**
 * ForgotPassword Page
 * @request GET
 */
router.get('/forgot-password', ForgotPasswordController.index);

/**
 * ForgotPassword Page
 * @request POST
 */
router.post('/forgot-password', ForgotPasswordController.postForgotPwd);

module.exports = router;