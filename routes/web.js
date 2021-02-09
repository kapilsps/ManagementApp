const express                       = require('express');
const router                        = express.Router();
const DashboardController           = require('../controller/user/dashboard-controller');
const LoginController               = require('../controller/auth/login-controller');
const RegisterController            = require('../controller/auth/register-controller');
const ForgotPasswordController      = require('../controller/auth/forgotpassword-controller');
const RegisterValidation            = require('../validation_rules/register-validation');
const LoginValidation               = require('../validation_rules/login-validation');
const middleware                    = require('../middleware/check-authenticated');
const AdminUserController           = require('../controller/admin/user-controller');

/**
 * Login Page
 * @request GET
 */
router.get('/login', LoginController.index);

/**
 * Login Page
 * @request POST
 */
router.post('/login', LoginValidation.rules, LoginController.postLogin);

/**
 * Logout
 * @request POST
 */
router.get('/logout', LoginController.logout);

/**
 * Register Page
 * @request GET
 */
router.get('/register', RegisterController.index);

/**
 * Register Page
 * @request POST
 */
router.post('/register',RegisterValidation.createRules, RegisterController.postRegister);

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


/* 
* GET user Dashboard. 
* @request GET
*/
router.get('/user', middleware.check, DashboardController.index);


/**
 * Show user table
 * @request GET
 */
router.get('/user/list', AdminUserController.index);

/**
 * Show user create form
 * @request GET
 */
router.get('/user/create', AdminUserController.create);

/**
 * store user 
 * @request POST
 */
router.post('/user/create', RegisterValidation.createRules, AdminUserController.store);

/**
 * Show user details 
 * @request POST
 */
router.get('/user/show/:id', AdminUserController.show);

/**
 * Get form to edit user details
 * @request GET
 */
router.get('/user/edit/:id', AdminUserController.edit);

/**
 * Update the user details
 * @request POST
 */
router.post('/user/edit/:id', RegisterValidation.updateRules, AdminUserController.update);


/**
 * delete user
 * @request GET
 */
router.get('/user/delete/:id', AdminUserController.delete);

module.exports = router;