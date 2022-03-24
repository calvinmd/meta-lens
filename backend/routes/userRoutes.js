const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');


router
    .route('/')
    .get(userController.getUsers)
    .post(userController.addUser)

router
    .route('/:id')
    .delete(userController.deleteUser);

module.exports = router;