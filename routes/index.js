const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
                        title: 'Welcome', 
                        layout: 'layouts/guest_layout' 
                      });
});

module.exports = router;
