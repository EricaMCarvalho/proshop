const express = require('express');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');

const router = express.Router();

/**
 * Desc:    Fetch all products
 * Route:   GET /api/produtos
 * Access:  Public
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find();

    res.status(200).json(products);
  })
);

/**
 * Desc:    Fetch one product
 * Route:   GET /api/produtos/:id
 * Access:  Public
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return new ErrorResponse('Product not found', 404);
    }
    res.json(product);
  })
);

module.exports = router;
