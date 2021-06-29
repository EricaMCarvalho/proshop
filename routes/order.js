const express = require('express');
const { addOrderItems } = require('../controllers/order');
const protect = require('../middleware/auth/protect');

const router = express.Router();

router.route('/').post(protect, addOrderItems);

module.exports = router;
