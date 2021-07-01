const express = require('express');
const {
  authUser,
  getUserProfile,
  registerUser,
  updatetUserProfile,
  getUsers,
  deleteUser,
  updatetUser,
  getUser,
} = require('../controllers/user');
const protect = require('../middleware/auth/protect');
const isAdmin = require('../middleware/auth/isAdmin');

const router = express.Router();

router.get('/', protect, isAdmin, getUsers);
router
  .route('/:id')
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUser)
  .put(protect, isAdmin, updatetUser);
router.post('/login', authUser);
router.post('/register', registerUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updatetUserProfile);

module.exports = router;
