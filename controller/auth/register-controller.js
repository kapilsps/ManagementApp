const { validationResult }  = require('express-validator');
const { User, Role_User }              = require('../../models');
const bcrypt                = require('bcryptjs');

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
    try {
        const errors = validationResult(req).array();
        let usrErrVal, usrErrMsg, emailErrMsg, emailErrVal, pwdErrMsg, cnfPwdErrMsg;
        if(errors.length > 0){
            errors.find((el) => {
                if(el.param === 'username'){
                    usrErrMsg = el.msg;
                    usrErrVal = el.value;
                }
    
                if(el.param === 'email'){
                    emailErrMsg = el.msg;
                    emailErrVal = el.value;
                }
    
                if(el.param === 'password'){
                    pwdErrMsg = el.msg;
                }
    
                if(el.param === 'confirm_password'){
                    cnfPwdErrMsg = el.msg;
                }
            });
    
            return res.status(422).render('auth/register',{
                title:'Register',
                layout:'layouts/auth_layout',
                usrErrMsg:usrErrMsg,
                usrErrVal: (usrErrVal) ? usrErrVal : req.body.username,
                emailErrMsg:emailErrMsg,
                emailErrVal: (emailErrVal) ? emailErrVal : req.body.email,
                pwdErrMsg:pwdErrMsg,
                cnfPwdErrMsg:cnfPwdErrMsg,
            });
        }else{
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    User.create({
                            name:req.body.username,
                            email:req.body.email,
                            password:hash
                        })
                        .then(result => {
                            if(result !== null){
                                Role_User.create({
                                    'role_id':2,
                                    'user_id':result.id
                                })
                                .then(res => {
                                    req.flash('success', 'Registered successfully.')
                                    return res.redirect('/login');
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                            }
                            req.flash('fail', 'Something went wrong please try again')
                            return res.redirect('/register');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                });
            });
        }
    } catch (error) {
        req.flash('fail', 'Internal server error.');
        res.redirect('/register');
    }
};