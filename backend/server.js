const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const cors = require("cors");
var multer = require('multer');
var upload = multer();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const collectiveRoutes = require('./routes/collectiveRoutes');


dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());


app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/collective', collectiveRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.magenta.bold));