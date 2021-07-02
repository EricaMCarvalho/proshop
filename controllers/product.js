const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');

/**
 * Desc:    Fetch all products
 * Route:   GET /api/produtos
 * Access:  Public
 */
exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
});

/**
 * Desc:    Fetch one product
 * Route:   GET /api/produtos/:id
 * Access:  Public
 */
exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ErrorResponse('Product not found', 404);
  }
  res.json(product);
});

/**
 * Desc:    Delete a product
 * Route:   DELETE /api/produtos/:id
 * Access:  Private/Admin
 */
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log('hit');

  await product.remove();
  res.json({ message: 'Product removed' });

  if (!product) {
    throw new ErrorResponse('Product not found', 404);
  }
  res.json(product);
});

/**
 * Desc:    Create a product
 * Route:   PUT /api/produtos/:id
 * Access:  Private/Admin
 */
exports.createProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log('hit');

  await product.remove();
  res.json({ message: 'Product removed' });

  if (!product) {
    throw new ErrorResponse('Product not found', 404);
  }
  res.json(product);
});
