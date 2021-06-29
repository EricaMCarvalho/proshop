const express = require('express');
const { addOrderItems, getOrderById } = require('../controllers/order');
const protect = require('../middleware/auth/protect');

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);

module.exports = router;
