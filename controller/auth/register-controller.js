/**
 * Render the Register page
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.index = (req, res, next) => {
    res.render('auth/register',{
        title: 'Register',
        layout: 'layouts/auth_layout'
    });
};


/**
 * Handle post request for Register
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.postRegister = (req, res, next) => {
    res.render('auth/login',{
        title: 'Register',
        layout: 'layouts/auth_layout'
    });
};