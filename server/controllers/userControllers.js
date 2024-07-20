const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const generateToken = require("../config/generateToken")
const bcrypt = require("bcrypt")

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, pic } = req.body;
    var { password } = req.body

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

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic
        })
    } else {
        res.status(400)
        throw new Error("Failed to create the user")
    }
});

const authUser = asyncHandler(async (req, res) => {
    const {email} = req.body;
    var {password} = req.body;

    if(!email || !password) {
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const user = await User.findOne({email})
    console.log(user)

    if(!user) {
        res.status(404)
        throw new Error("User with this email does not exist")
    }

    if(user) {
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
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

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: {$regex: req.query.search, $options: "i" }},
            { email: {$regex: req.query.search, $options: "i" }}
        ]
    } : {}

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users)
})

module.exports = {registerUser, authUser, allUsers}