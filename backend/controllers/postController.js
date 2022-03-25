const Post = require('../models/Post');

//TODO - based on frontend flow 

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        return res.status(200).json({
            success: true,
            data: posts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.createPost = async (req, res, next) => {
    try {
        console.log(req.body)
        const { postID, postCID, postContent, userID } = req.body;
        const newPost = await Post.create(req.body);
        return res.status(201).json({
            success: true,
            data: newPost
        });
    } catch (error) {
        if(error.name == "ValidationError") {
            const messages = Object.values(error.errors).map(val => val.message);
            res.status(400).json({
                success: false,
                error: messages
            })
        }
        else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            })
        }
    }
}