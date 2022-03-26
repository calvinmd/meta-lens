const User = require('../models/User')

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.addUser = async (req, res, next) => {
    try {
        const { userID, userWallet, userNftContractAddress, username, userHandle } = req.body;
        const newUser = await User.create(req.body);
        return res.status(201).json({
            success: true,
            data: newUser
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

exports.getUserByID = async (req, res, next) => {
    try {
        const { userWallet } = req.body;
        const userData = await User.find(req.body).exec();
        return res.status(201).json({
            success: true,
            data: userData
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
  
      if(!user) {
        return res.status(404).json({
          success: false,
          error: 'No transaction found'
        });
      }
  
      await user.remove();
  
      return res.status(200).json({
        success: true,
        data: {}
      });
  
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }