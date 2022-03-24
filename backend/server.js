const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');


dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
app.use(express.json());


app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));