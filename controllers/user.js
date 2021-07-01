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
  const user = await User.findById(req.user._id);
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

/**
 * Desc:    Update user profile
 * Route:   PUT /api/users/profile
 * Access:  Private
 */
exports.updatetUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ErrorResponse('Usuario nao encontrado', 404);
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.json({
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(updatedUser.id),
  });
});

/**
 * Desc:    Register a new user
 * Route:   POST /api/users/register
 * Access:  Public
 */
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new ErrorResponse('O usuário já existe.', 400);
  }

  const user = await User.create({ name, email, password });

  if (!user) {
    throw new ErrorResponse('Dados de usuário inválidos.', 400);
  }

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user.id),
  });
});

/**
 * Desc:    Get add users
 * Route:   GET /api/users
 * Access:  Private/Admin
 */
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
});

/**
 * Desc:    Delete user
 * Route:   DELETE /api/users/:id
 * Access:  Private/Admin
 */
exports.deleteUser = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ErrorResponse('User does not exist', 404);
  }

  await user.remove();

  res.status(200).json({ message: 'User removed' });
});

/**
 * Desc:    Get user by id
 * Route:   GET /api/users/:id
 * Access:  Private/Admin
 */
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    throw new ErrorResponse('User does not exist', 404);
  }

  res.status(200).json(user);
});

/**
 * Desc:    Update user profile
 * Route:   PUT /api/users/:id
 * Access:  Private/Admin
 */
exports.updatetUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ErrorResponse('Usuario nao encontrado', 404);
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin;

  const updatedUser = await user.save();

  res.json({
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});
