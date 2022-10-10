const router = require('express').Router();
const apiRoutes = require('./api/');

//use /api/ for all API routes
router.use('/api', apiRoutes);

//if user tries to access an undefined route, send 404 error
router.use((req, res) => {
    res.status(404).send('<h1>404 Error, page not found</h1>');
});

module.exports = router;