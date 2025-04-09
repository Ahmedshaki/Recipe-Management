const express = require("express");
const recipeAuth = express.Router();
const {userAuth} = require("../middlewares/userAuth");

recipeAuth.post('/registerRecipe', userAuth , (req,res)=>{
    res.send("Hello to recipe");
})

module.exports = recipeAuth;