const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/postController')

postRouter  
    .route('/')
    .get(postController.getPosts)
    .post(postController.createPost)

postRouter
    .route('/findPostByUser')
    .post(postController.findPostByUser)

module.exports = postRouter;