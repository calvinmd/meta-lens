const express = require('express');
const multer = require('multer');
const path = require('path');

const collectiveRouter = express.Router();
const collectiveController = require('../controllers/collectiveController');

let assetsPath = path.join( __dirname + '/../assets');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, assetsPath);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage
});

collectiveRouter
    .route('/upload')
    .post(upload.single('file'), collectiveController.upload)

module.exports = collectiveRouter;

