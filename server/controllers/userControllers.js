const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const generateToken = require("../config/generateToken")
const bcrypt = require("bcrypt")

const registerUser = asyncHandler(async (req, res) => {
    var { name, email, pic } = req.body;
    let {password} = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)

    const user = await User.create({
        name, email, password, pic
    })
    console.log("After creation")

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Failed to create the user")
    }
});

const authUser = asyncHandler(async (req, res) => {
    const {email} = req.body;
    let {password} = req.body;

    if(!email || !password) {
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const user = await User.findOne({email})

    if(!user) {
        res.status(404)
        throw new Error("User with this email does not exist")
    }

    if(user) {
        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)

        if (password = user.password) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id)
            })
        } else {
            res.status(401) 
            throw new Error("Password Incorrect")
        }
    }
})

module.exports = {registerUser, authUser}