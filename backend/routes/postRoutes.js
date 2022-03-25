const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/postController')

postRouter  
    .route('/')
    .get(postController.getPosts)
    .post(postController.createPost)

module.exports = postRouter;