const express = require('express');
const { authController } = require('../controller');
var router = express.Router();

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'VR Airdrop' });
// });

module.exports = router;