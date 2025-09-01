const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.register = async (req, res) => {
    try {
            const {name , password , email} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser) {
        return res.status(400).json({
            message : 'User already exists'
        })
    }

    const hashedPassword = await bcrypt.hash(password , 10)

    const user = await User.create({
        name,
        email,
        password : hashedPassword
    })

    return res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data : {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }
}

module.exports.login = async (req, res) => {
    try {
        const  {email , password} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid email or password'
            })
        }

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid password'
            })
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.json({
            status: 'success',
            message: 'Login successful',
            data: {
                token
            }
        })


    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }
}