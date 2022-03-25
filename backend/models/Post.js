const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    postID: {
        type: String,
        required: false
    },
    postCID: {
        type: String,
        trim: true,
        require: [true, 'Pinata CID missing']
    },
    postContent: {
        type: String,
        required: [true, 'No Content']
    },
    userID: { //wallet address, take from globalContext
        type: String,
        required: [true, 'Who does this post belong to?']
    },
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Post', PostSchema)