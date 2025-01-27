const express = require('express');
const userModel = require('../models/user');
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const userMiddleware = require('../middlewares/userMiddleware');

router.post('/signup',async (req,res)=>{
    const {fullname, email, password} = req.body;

    if (!fullname || !fullname.firstname || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 2);
        await userModel.create({
            fullname:{
                firstname: fullname.firstname,
                lastname: fullname.lastname
            },
            email,
            password: hashedPassword
        })
        res.status(200).json({message: 'user signup success'})
    }catch(err){
        console.log(err)
    }
})

router.post('/signin',async (req,res)=>{
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
            res.json({message: "user not found"})
        }
        console.log(user)
        const passwordVerified = bcrypt.compare(password,user.password);
        if(!user || !passwordVerified){
            res.json({message: 'invalid details'})
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET)
        res.status(200).json({token, message: 'user signin success'})
    }catch(err){
        console.log(err)
    }
})

router.get('/profile', userMiddleware, async(req,res)=>{
    const user = await userModel.findOne({_id: req.userId})
    res.json({user})
})

router.post('/logout', async(req,res)=>{
    req.headers.authorization = '';
    res.clearCookie('token')
    res.json({message: 'user logout success'})
})

module.exports = router;