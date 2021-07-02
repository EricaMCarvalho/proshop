const express = require('express');
const protect = require('../middleware/auth/protect');
const isAdmin = require('../middleware/auth/isAdmin');

const {
  getProducts,
  getProduct,
  deleteProduct,
} = require('../controllers/product');

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProduct).delete(protect, isAdmin, deleteProduct);

module.exports = router;
