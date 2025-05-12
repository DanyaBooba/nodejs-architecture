const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

router.get('/', auth, UserController.getProfile);

module.exports = router;
