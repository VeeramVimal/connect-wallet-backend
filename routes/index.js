const express = require('express');
const authRoute = require("./auth.route");
var router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'VR Airdrop' });
});


module.exports = router;