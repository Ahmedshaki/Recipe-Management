const express = require("express");
const userAuth = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const {userDetailsValidation} = require('../utils/userValidation');
const jwt = require("jsonwebtoken");


userAuth.post('/signup',async (req,res)=>{
    try{
        const {name, email, phone, gender, country, state, password} = req.body;
        userDetailsValidation(req);
        const encryptPassword = await bcrypt.hash(password,10);
        const user = new User({
            name,
            email,
            phone,
            gender,
            country,
            state,
            password : encryptPassword
        })

        await user.save();
        res.json({
            message : "User added Successfully"
        })
    }
    catch(err){
        res.status(404).send("Error saving the user:" + err.message);
    }
})


userAuth.post('/login',async (req,res)=>{
   try{
        const {email,password} = req.body;

        if(!validator.isEmail(email)){
            return res.status(400).json({ error: "Invalid email format" });
        }

        const userDetailsFromDB = await User.findOne({email : email});

        if(!userDetailsFromDB){
            return res.status(401).json({ error: "Email is not registered" });
        }

        const isPasswordValid = await bcrypt.compare(password,userDetailsFromDB.password);

        if(isPasswordValid){
            const token  = await jwt.sign(
                {_id : userDetailsFromDB._id},
                process.env.JWT_SECRET,
                {expiresIn : '1h'}
            );
            
            res.cookie("token",token,{ expires : new Date(Date.now() + 24 * 60 * 60 * 1000)});
            res.json({
                message : `Welcome ${userDetailsFromDB.name}, to recipe world`
            })
        }
        else{
            return res.status(401).json({ error: "Incorrect password" });
        }
   }
   catch(err){
        res.status(400).json({ message : `Check your credientals : ${err.message}`});
   }
})

userAuth.post('/logout',async (req,res)=>{
    try{
        res.cookie("token",null,{
            expires : new Date(Date.now())
        })

        res.status(200).json({
            message : `Logout successfully`
        })
    }
    catch(err){
        res.status(400).json({message : `Something wrong: ${err.message}`})
    }
})



module.exports = userAuth;