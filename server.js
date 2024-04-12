const colors = require('colors')
const express = require('express');
const morgan = require('morgan');
const core = require('cors');
const connectDB = require('./config/db');
const Userrouter = require('./routes/user.router');
const cloudinary = require('cloudinary')
require('dotenv').config()
const app = express()
    //middlewire use
app.use(morgan('dev'))
app.use(core())
app.use(express.json());
//database connect
connectDB()
    //cloudinary configoration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
app.get('/api', (req, res) => {

    res.status(200).send({
        success: true,
        message: "wellcome to blod bank api"
    })
})

//user route
app.use('/api/v1/user', Userrouter)

app.listen(4000, () => {
    console.log(`server is starting on port http://localhost:${process.env.PORT}`.bgGreen)
})