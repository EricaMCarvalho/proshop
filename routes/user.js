const express = require('express');
const { authUser, getUserProfile } = require('../controllers/user');
const protect = require('../middleware/auth/protect');

const router = express.Router();

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;
