const express = require("express");
const recipeAuth = express.Router();
const Recipe = require("../model/recipe");
const {userAuth} = require("../middlewares/userAuth");
const {recipeValidation} = require("../utils/recipeValidation");
const uploadImageToCloudinary = require("../utils/uploadImage");

recipeAuth.post('/registerRecipe', userAuth , async(req,res)=>{
    
    try{
        recipeValidation(req);
        const validUser = req.user;
        const {
            title,
            description,
            category,
            cuisine,
            difficulty,
            preparationTime,
            cookingTime,
            serving,
            ingredients,
            instructions,
            coverImage,
            tags,
            tasteTag
        } = req.body;

        const uploadedImageUrl = await uploadImageToCloudinary(coverImage);
        const recipeFromUser = new Recipe({
            title,
            description,
            category,
            cuisine,
            difficulty,
            preparationTime,
            cookingTime,
            serving,
            ingredients,
            instructions,
            coverImage : uploadedImageUrl,
            tags,
            tasteTag,
            createdBy : validUser._id
        })
        await recipeFromUser.save();
        res.status(200).json({
            message : `Successfully registered`
        })
    }
    catch(err){
        res.status(404).json({
            message : `Something wrong : ${err.message}`
        })
    }
})

recipeAuth.get('/getRecipes', userAuth , async(req,res)=>{

    const data = await Recipe.find();
    console.log(data);
})


module.exports = recipeAuth;