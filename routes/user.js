const express = require('express');
const {
  authUser,
  getUserProfile,
  registerUser,
  updatetUserProfile,
} = require('../controllers/user');
const protect = require('../middleware/auth/protect');

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updatetUserProfile);

module.exports = router;
