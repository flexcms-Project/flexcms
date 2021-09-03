const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const { sequelize } = require('../models');

// initializing the dotenv config
require('dotenv').config();

// register view engine
app.set('view engine', 'ejs');

// adding express static files
app.use(express.static(path.join(__dirname, '../../views/public')));

/**
 * MIDDLEWARE
 */
// express body parser
app.use('/articlepictures', express.static(path.join(__dirname, '../uploads/pictures/articlesPictures')));
app.use('/profilepictures', express.static(path.join(__dirname, '../uploads/pictures/profilesPictures')));
app.use(express.json({limit: process.env.MAX_DATA_PARSE, extended: true}));
app.use(express.urlencoded({limit: process.env.MAX_DATA_PARSE, extended: true}));
// cookie parser
app.use(cookieParser());

// authentication verification middleware
app.use(require('../middleware/authVerif'));

// importing router from the backend
app.use(require('./routers'));

// error handler middleware
app.use(require('../middleware/errorHandler'));

// starting the app
app.listen(process.env.PORT, async()=>{
    console.log(`server on at http://localhost:${process.env.PORT}`);

    // initializing the database
    await sequelize.authenticate();
    console.log('database on');
})