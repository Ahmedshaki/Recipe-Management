const express = require("express");
const recipeAuth = express.Router();
const Recipe = require("../model/recipe");
const {userAuth} = require("../middlewares/userAuth");
const {recipeValidation} = require("../utils/recipeValidation");
const uploadImageToCloudinary = require("../utils/uploadImage");
const mongoose = require("mongoose");

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

    try{
        const recipes = await Recipe.find();

        const transformedRecipes = recipes.map((recipe) => ({
        id: recipe._id,
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        cuisine: recipe.cuisine,
        difficulty: recipe.difficulty,
        preparationTime: recipe.preparationTime,
        cookingTime: recipe.cookingTime,
        serving: recipe.serving,
        coverImage: recipe.coverImage,
        tags: recipe.tags,
        tasteTag: recipe.tasteTag,
        }));

        res.status(200).json({
            message : `Successfully fetched ${recipes.length} recipes`,
            data : transformedRecipes
        })
    }
    catch(err){
        res.status(404).json({
            message : `Fetching recipe failed server error`
        })
    }
})


recipeAuth.get('/getRecipes/:id', userAuth, async(req,res)=>{

    try {
      const { id } = req.params;

      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ message: 'Invalid recipe ID format' });
      }

      const dataFromDb = await Recipe.findById(id);
      
      if(!dataFromDb){
        return res.status(404).json({ message: 'Recipe not found, enter valid ID' });
      }
      
      const formattedRecipe  = {
        id: dataFromDb._id,
        title: dataFromDb.title,
        description: dataFromDb.description,
        category: dataFromDb.category,
        cuisine: dataFromDb.cuisine,
        difficulty: dataFromDb.difficulty,
        preparationTime: dataFromDb.preparationTime,
        cookingTime: dataFromDb.cookingTime,
        serving: dataFromDb.serving,
        ingredients: dataFromDb.ingredients,
        instructions: dataFromDb.instructions,
        coverImage: dataFromDb.coverImage,
        tags: dataFromDb.tags,
        tasteTag: dataFromDb.tasteTag,
        createdAt: dataFromDb.createdAt,
        updatedAt: dataFromDb.updatedAt,
      };
      res.status(200).json({
        message : `Successfully fetched`,
        data : formattedRecipe 
      })
    }
    catch (err) {
      res.status(500).json({
        message: `Error : ${err.message}`,
      });
    }

})


module.exports = recipeAuth;