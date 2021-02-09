const { Op }    = require('sequelize');
const { body }  = require('express-validator');
const { User }  = require('../models');


module.exports.createRules = [
    body('email', 'Email is required.').trim().notEmpty().bail().isEmail().withMessage('Email is not valid.').bail().custom((value, {req, location, path}) => {
        return User.findOne({
                            attributes: ['email'],
                            where:{
                                email:{
                                    [Op.eq]:value
                                },
                            }
                        })
                        .then(user => {
                            if (user !== null) {
                                return Promise.reject('E-mail already in use');
                            }
                            return true;
                        });
    }),
    body('username', 'Username is required and length of 2 character.').trim().notEmpty().bail().isLength({min:2}),
    body('password', 'Password is required and should be 8 characters long').trim().notEmpty().bail().isLength({min:8}),
    body('confirm_password', 'Confirm Password is required and should match the password field').trim().notEmpty().bail().isLength({min:8}).bail().custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
];

module.exports.updateRules = [
    body('email', 'Email is required.').trim().notEmpty().bail().isEmail().withMessage('Email is not valid.').bail().custom((value, {req, location, path}) => {
        return User.findOne({
                        attributes: ['email'],
                        where:{
                            email:{
                                [Op.eq]:value
                            },
                            id:{
                                [Op.ne]:req.params.id
                            }
                        }
                    })
                    .then(user => {
                        if (user !== null) {
                            return Promise.reject('E-mail already in use');
                        }
                        return true;
                    });
    }),
    body('username', 'Username is required and length of 2 character.').trim().notEmpty().bail().isLength({min:2}),
    body('password', 'Password should be 8 characters long').trim().bail().isLength({min:8}),
    body('confirm_password', 'Confirm Password should match the password field').trim().bail().isLength({min:8}).bail().custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
];