const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authController = require('./controllers/authController')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser');
const app = express()
const PORT = 5000 ; 
// Mongo db connection

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{console.log('Database connected successfully....')})
    .catch((error) => {console.log(error)})

    // routing and middleware
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/auth',authController)

    app.get('/',(request,response)=>{
        response.send("SERVER HAS BEEN START!")
    })
    

app.listen(PORT,()=>console.log("Server has been started successfully...."))