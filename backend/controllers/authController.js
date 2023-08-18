const authController = require('express').Router()
const bcrypt = require('bcrypt')
const jwt =  require('jsonwebtoken')
const Users = require('../models/Users.js')
// register 
authController.post('/register', async (request,response)=>{
    try {
        const isExisting = await Users.findOne({email : request.body.email})

        if(isExisting){
            throw new Error("Already such an email registered!")
        }

        const hashedPassword = await bcrypt.hash(request.body.password , 10)

        const newUser = await Users.create({...request.body,password:hashedPassword})

        const {password,...others} = newUser._doc
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn : '4h'})
        return response.status(201).json({others,token})
    } catch (error) {
        return response.status(500).json(error.message)
    }
})
module.exports = authController