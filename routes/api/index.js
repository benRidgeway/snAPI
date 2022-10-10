const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

//add prefix of /users/ to all user API routes
router.use('/users', userRoutes);

//add prefix of /thoughts/ to all thought API routes
router.use('/thoughts', thoughtRoutes);

module.exports = router;