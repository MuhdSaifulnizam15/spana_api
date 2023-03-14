const express = require("express");

const authRoutes = require('./auth.route');
const cityRoutes = require('./city.route');
const stateRoutes = require('./state.route');
const userRoutes = require('./user.route');
const vehicleRoutes = require('./vehicle.route');
const workshopRoutes = require('./workshop.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/city',
    route: cityRoutes,
  },
  {
    path: '/states',
    route: stateRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/vehicles',
    route: vehicleRoutes,
  },
  {
    path: '/workshops',
    route: workshopRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;