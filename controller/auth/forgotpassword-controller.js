/**
 * Render the Forgot password page
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.index = (req, res, next) => {
    res.render('auth/forgot_password',{
        title: 'Forgot Password',
        layout: 'layouts/auth_layout'
    });
};


/**
 * Handle post request for forgot password
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.postForgotPwd = (req, res, next) => {
    res.render('auth/login',{
        title: 'Login',
        layout: 'layouts/auth_layout'
    });
};