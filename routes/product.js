const express = require('express');
const protect = require('../middleware/auth/protect');
const isAdmin = require('../middleware/auth/isAdmin');

const {
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
} = require('../controllers/product');

const router = express.Router();

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router
  .route('/:id')
  .get(getProduct)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

module.exports = router;
