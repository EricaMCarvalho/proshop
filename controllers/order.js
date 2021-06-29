const Order = require('../models/Order');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');

/**
 * Desc:    Create new order
 * Route:   POST /api/orders
 * Access:  Private
 */
exports.addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    throw new ErrorResponse('Sua sacola está vazia', 400);
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    console.log(order);

    const createOrder = await order.save();

    res.status(200).json(order);
  }
});

/**
 * Desc:    Get order by id
 * Route:   GET /api/orders/:id
 * Access:  Private
 */
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    throw new ErrorResponse('No order found', 404);
  }

  res.status(200).json(order);
});
