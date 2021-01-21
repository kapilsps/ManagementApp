/**
 * Render the login page
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.index = (req, res, next) => {
    res.render('auth/login',{
        title: 'Login',
        layout: 'layouts/auth_layout'
    });
};


/**
 * Handle post request for login
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.postLogin = (req, res, next) => {
    res.render('auth/login',{
        title: 'Login',
        layout: 'layouts/auth_layout'
    });
};