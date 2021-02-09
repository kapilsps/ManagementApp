const { validationResult }          = require('express-validator');
const bcrypt                        = require('bcryptjs');
const { Op }                        = require('sequelize');
const { User, Role_User }           = require('../../models');

/**
 * Dashboard
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.index = (req, res, next) => {
    try {
        User.findAll()
            .then(result => {
                return res.render('admin/users/index',{
                    title: 'Users List',
                    data:result
                });
            })
            .catch(error => {
                console.log(error);
                req.flash('fail', 'Something went wrong please try again.');
                return res.redirect('/user/list');
            });
    } catch (error) {
        console.log(error);
        req.flash('fail', 'Internal server error');
        res.redirect('/user/list');
    }
};

/**
 * Display User create form
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.create = (req, res, next) => {
    return res.render('admin/users/create',{
        title: 'Create User Form'
    });
}

/**
 * Store the resource to database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.store = (req, res, next) => {
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
    
            return res.status(422).render('admin/users/create',{
                title:'Create User Form',
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
                                return Role_User.create({
                                    'role_id':2,
                                    'user_id':result.id
                                });
                            }
                            req.flash('fail', 'Something went wrong please try again')
                            return res.redirect('/user/create');
                        })
                        .then(result => {
                            req.flash('success', 'Registered successfully.')
                            return res.redirect('/user/list');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                });
            });
        }
    } catch (error) {
        req.flash('fail', 'Internal server error.');
        return res.redirect('/user/create');
    }
}

/**
 * Show the resource from db
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.show = (req, res, next) => {
    try {
        let userId = req.params.id;

        User.findByPk(userId)
            .then(result => {
                if(result != null){
                    return res.render('admin/users/show',{
                        title:'User Details',
                        data:result
                    });
                }
                req.flash('fail', 'User not found.');
                return res.redirect('/user/list');
            })
            .catch(error => {
                console.log(error);
                req.flash('fail', 'Something went wrong please try again.');
                return res.redirect('/user/list');
            });
    } catch (error) {
        req.flash('Internal server error');
        return res.redirect('/user/list');
    }
}

/**
 * deisplay edit form
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.edit = (req, res, next) => {
    try {
        let userId = req.params.id;
        User.findByPk(userId)
            .then(result => {
                if(result != null){
                    return res.render('admin/users/edit',{
                        title:'Edit User Details',
                        data:result
                    });
                }

                req.flash('fail', 'User not found.');
                return res.redirect('/user/list');
            })
            .catch(err => {
                console.log(err);
                req.flash('fail', 'Something went wrong. Please try again');
                return res.redirect('/user/list');
            });
    } catch (error) {
        console.log(error);
        req.flash('fail', 'Internal server error');
        return res.redirect('/user/list');
    }
}

/**
 * Update the resource in db
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.update = (req, res, next) => {
    try {
        const errors = validationResult(req).array();
        const userId = req.params.id;
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
            
            User.findByPk(userId)
                .then(result => {
                    return res.status(422).render('admin/users/edit',{
                        title:'Edit User Form',
                        usrErrMsg:usrErrMsg,
                        usrErrVal: (usrErrVal) ? usrErrVal : req.body.username,
                        emailErrMsg:emailErrMsg,
                        emailErrVal: (emailErrVal) ? emailErrVal : req.body.email,
                        pwdErrMsg:pwdErrMsg,
                        cnfPwdErrMsg:cnfPwdErrMsg,
                        data:result
                    });
                })
                .catch(err => {
                    req.flash('Something went wrong. Please try again.');
                    return res.redirect('/user/list');
                });
        }else{
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    User.update({
                            name:req.body.username,
                            email:req.body.email,
                            password:hash
                        },{
                            where:{
                                id:{
                                    [Op.eq]:userId
                                }
                            }
                        })
                        .then(result => {
                            if(result !== null){
                                req.flash('success', 'User updated successfully.')
                                return res.redirect('/user/list');
                            }
                            req.flash('fail', 'Something went wrong please try again')
                            return res.redirect('/user/list');
                        })
                        .catch(err => {
                            console.log(err);
                            req.flash('fail', 'Something went wrong please try again')
                            return res.redirect('/user/list');
                        });
                });
            });
        }
    } catch (error) {
        console.log(error);
        req.flash('fail', 'Internal server error.');
        return  res.redirect('/user/list');
    }
}

/**
 * destroy the resource on db
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.delete = (req, res, next) => {
    try {
        let userId = req.params.id; 
        
        User.destroy({
            where:{
                id:{
                    [Op.eq]:userId
                }
            }
        })
        .then(result => {
            req.flash('success', 'User deleted successfully.');
            return res.redirect('/user/list');
        })
        .catch(err => {
            console.log(err);
            req.flash('fail', 'Something went wrong please try again.');
            return res.redirect('/user/list');
        });

    } catch (error) {
        req.flash('fail', 'Internal server error');
        return res.redirect('/user/list');
    }
}