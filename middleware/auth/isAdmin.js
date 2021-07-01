const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../utils/asyncHandler');

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw new ErrorResponse('Not authorized as an admin', 401);
  }
});

module.exports = isAdmin;
