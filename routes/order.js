const express = require('express');
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} = require('../controllers/order');
const protect = require('../middleware/auth/protect');

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').get(protect, updateOrderToPaid);

module.exports = router;
