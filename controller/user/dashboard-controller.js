/**
 * Dashboard
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.index = (req, res, next) => {
    res.render('user/index',{
                title: 'Dashboard'
            });
};