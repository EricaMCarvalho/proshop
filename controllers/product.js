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

  await product.remove();
  res.json({ message: 'Product removed' });

  if (!product) {
    throw new ErrorResponse('Product not found', 404);
  }
  res.json(product);
});

/**
 * Desc:    Create a product
 * Route:   PUT /api/produtos
 * Access:  Private/Admin
 */
exports.createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'Sample category',
    countInStock: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/**
 * Desc:    Update a product
 * Route:   PUT /api/produtos/:id
 * Access:  Private/Admin
 */
exports.updateProduct = asyncHandler(async (req, res) => {
  const { name, price, user, image, category, countInStock, description } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ErrorResponse('Esse produto nao existe', 404);
  }

  product.name = name;
  product.price = price;
  product.image = image;
  product.category = category;
  product.countInStock = countInStock;
  product.description = description;

  const updatedProduct = await product.save();

  res.status(201).json(updatedProduct);
});
