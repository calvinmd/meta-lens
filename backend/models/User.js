const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userID: {
        type: Number,
        required: [true, "User ID required"]
    },
    userWallet: {
        type: String,
        required: [true, "User wallet address missing"],
        trim: true
    },
    userNftContractAddress: { //tokenID
        type: String,
        required: [true, "NFT Contract Address missing"],
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: [true, "User name missing - KYC"],
        default: "User"
    },
    userHandle: {
        type: String,
        required: false,
        default: "@user"
    }
})

module.exports = mongoose.model('User', UserSchema)