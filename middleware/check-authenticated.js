module.exports.check = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }

    req.flash('error', 'Unauthenticated');
    res.redirect('/login');
};