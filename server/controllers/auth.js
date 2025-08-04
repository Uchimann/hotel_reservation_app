const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = async(req, res, next) => {

    const {username,password,email} = req.body;
    try {
        const User = await User.findOne(email)
        if(User){
            return res.status(500).json({message: "The user already existing"})
        }

        if(password.length < 6)
            res.status(500).json({message: "Password length is very short"})
        const passwordHash = await bcrypt.hash(password, 12)

        if(!validateEmail(email))
            res.status(500).json({message: "The e-mail adress is not correct"})

        const newUser = await User.create({...req.body, password: passwordHash})
        const token = await jwt.sign({id: newUser._id, isadmin: newUser._isAdmin}, "SECRET_KEY", {expiresIn: "1h"})

        res.cookie("token",token, {httpOnly: true}).status(201).json({
            token,
            newUser
        })

    } catch (error) {
        res.status(500).json({message: error})
    }

}

const login = async(req, res, next) => {

    try {
        const User = await User.findOne(email)
        if(!User){
            return res.status(500).json({message: "User not found"})
        }

        const passwordCompare = await bcrypt.compare(password, User.password)

        if(!passwordCompare){
            return res.status(500).json({message: "Password is not correct"})
        }

        const token = await jwt.sign({id: User._id, isadmin: User._isAdmin}, "SECRET_KEY", {expiresIn: "1h"})

        res.cookie("token",token, {httpOnly: true}).status(200).json({
            token,
            User
        })
        
    } catch (error) {
        res.status(500).json({message: error})
    }

}


function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.export = {register, login}