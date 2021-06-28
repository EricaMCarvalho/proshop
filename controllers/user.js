const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const generateToken = require('../utils/generateToken');

/**
 * Desc:    Auth user & get token
 * Route:   POST /api/users/login
 * Access:  Public
 */
exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ErrorResponse(
      'Verifique o e-mail e a senha para continuar.',
      400
    );
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    throw new ErrorResponse('E-mail ou senha inválidos.', 401);
  }

  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user.id),
  });
});

/**
 * Desc:    Get user profile
 * Route:   GET /api/users/profile
 * Access:  Private
 */
exports.getUserProfile = asyncHandler(async (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
});
