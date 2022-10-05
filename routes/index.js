const express = require('express');
const router = express.router();

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;