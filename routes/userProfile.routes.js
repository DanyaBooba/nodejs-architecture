const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/', UserController.getAllUsers);
// router.post('/', UserController.createUser);
// router.put('/:id', UserController.updateUserFull);
// router.patch('/:id', UserController.updateUser);
// router.delete('/:id', UserController.delete);

module.exports = router;
