const express = require("express");
const userAuth = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const {userDetailsValidation} = require('../utils/userValidation');


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


module.exports = userAuth;