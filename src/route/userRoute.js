const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

router.post('/create', userController.createUser);
router.get('/list', userController.getUsers);
router.patch('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;