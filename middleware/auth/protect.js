const jwt = require('jsonwebtoken');
const ErrorResponse = require('../../utils/ErrorResponse');
const User = require('../../models/User');
const asyncHandler = require('../../utils/asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ErrorResponse('Not authorized, no token', 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id).select('-password');

  next();
});

module.exports = protect;
