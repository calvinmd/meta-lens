const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    // postId, userID, post text content(contains another object), submarine link to image ?? TODO
})

module.exports = mongoose.model('Post', PostSchema)