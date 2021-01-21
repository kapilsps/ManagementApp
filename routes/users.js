const express             = require('express');
const router              = express.Router();
const DashboardController = require('../controller/user/dashboard-controller');

/* GET user Dashboard. */
router.get('/', DashboardController.index);

module.exports = router;
