const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');


userRouter
    .route('/')
    .get(userController.getUsers)
    .post(userController.addUser)

userRouter
    .route('/:id')
    .delete(userController.deleteUser);

userRouter  
    .route('/getUserByID')
    .post(userController.getUserByID);

module.exports = userRouter;