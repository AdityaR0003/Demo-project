const express = require('express');
const router = express.Router();
const { checkConnection } = require('../config/db');

router.get('/', async (req, res) => {
    const dbStatus = await checkConnection();
    res.status(200).json({
        status: 'ok',
        service: 'Vibrant SaaS Signup API',
        timestamp: new Date().toISOString(),
        database: dbStatus
    });
});

module.exports = router;
