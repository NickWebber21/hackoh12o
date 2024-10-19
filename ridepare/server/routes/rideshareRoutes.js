const express = require('express');
const { comparePrices } = require('../controllers/rideshareController');

const router = express.Router();

// POST route to compare ride prices
router.post('/compare', comparePrices);

module.exports = router;
