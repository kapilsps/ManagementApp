const { validationResult }  = require('express-validator');
const passport              = require('passport');
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
    try {
        const errors = validationResult(req).array();
        let emailErrMsg, emailErrVal, pwdErrMsg = null;

        if (errors.length > 0) {
            errors.find((el) => {
                if(el.param === 'email'){
                    emailErrMsg = el.msg;
                    emailErrVal = el.value;
                }

                if(el.param === 'password'){
                    pwdErrMsg = el.msg;
                }
            });

            req.flash('fail', 'Login Failed.');
            return res.status(422).render('auth/login',{
                title:'Login',
                layout:'layouts/auth_layout',
                emailErrMsg:emailErrMsg,
                emailErrVal:(emailErrVal) ? emailErrVal : req.body.email,
                pwdErrMsg:pwdErrMsg,
            });
        }else{
            passport.authenticate('local',{
                successRedirect:'/users',
                failureRedirect:'/login',
                failureFlash:true
            })(req, res, next);
        }
    } catch (error) {
        console.log(error);
        req.flash('fail', 'Internal server error.');
        res.redirect('/login');
    }
};