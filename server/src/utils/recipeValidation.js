const validator = require("validator");

const recipeValidation = (req) =>{
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


    if(!title || !validator.isLength(title,{min: 3 , max:100})){
        throw new Error("Title is required and should be 3-100 characters long.");
    }

    if(!description || !validator.isLength(description,{min:10 , max : 1000})){
        throw new Error("Description is required and should be 10-1000 characters.");
    }

    const validCategories  = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];

    if(!category || !validCategories.includes(category)){
        throw new Error("Category is required and must be one of: " + validCategories.join(", "));
    }

    const validCuisines  = [
        "Indian",
        "Chinese",
        "Italian",
        "American",
        "Mexican",
        "Japanese",
        "Mediterranean",
        "Thai",
        "French",
        "Korean",
      ];
    
    if(!cuisine || !validCuisines.includes(cuisine)){
        throw new Error("Cuisine is required and must be one of: " + validCuisines.join(", "));
    }

    const validDifficulties = ["Easy", "Medium", "Hard"];
    if (!difficulty || !validDifficulties.includes(difficulty)) {
        throw new Error("Difficulty must be one of: Easy, Medium, Hard.");
    }


    if (!validator.isInt(String(preparationTime), { min: 1, max: 240 })) {
        throw new Error("Preparation time must be between 1 and 240 minutes.");
    }

    if (!validator.isInt(String(cookingTime), { min: 1, max: 240 })) {
        throw new Error("Cooking time must be between 1 and 240 minutes.");
    }

    if (!validator.isInt(String(serving), { min: 1, max: 20 })) {
        throw new Error("Serving must be between 1 and 20.");
    }


    if (!Array.isArray(ingredients) || ingredients.length === 0) {
        throw new Error("At least one ingredient is required.");
    } 
    

    if (!Array.isArray(instructions) || instructions.length === 0) {
        throw new Error("At least one instruction step is required.");
    } 

    if (!coverImage || !validator.isURL(coverImage)) {
        throw new Error("A valid cover image URL is required.");
    }

    const validTags  = ["Veg", "Non-Veg"];

    if(!tags || !validTags.includes(tags)){
        throw new Error("Tag is required and must be one of: " + validTags.join(", "));
    }

    const validTasteTag =  ["Spicy", "Sweet", "Savory", "Tangy", "Bitter","Rich"];

    if(!tasteTag || !validTasteTag.includes(tasteTag)){
        throw new Error("Taste tag is required and must be one of: " + validTasteTag.join(", "));
    }
}

module.exports = {
    recipeValidation
}