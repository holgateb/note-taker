const express = require('express');
const router = express.router();

const noteRoutes = require('./notes')

router.use('/notes', noteRoutes)

module.exports = router;