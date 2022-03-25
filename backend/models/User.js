const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userCeramicId: {
        type: String,
        required: [true, "Need Ceramic ID"],
        trim: true
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
        required: [true, "User name missing - KYC"],
        trim: true,
        default: "User"
    },
    userHandle: {
        type: String,
        required: false,
        default: "@user"
    }
})

module.exports = mongoose.model('User', UserSchema)