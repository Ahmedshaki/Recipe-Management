const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
        type: String,
        enum: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"],
        required: true
    },
    cuisine: {
      type: String,
      enums: [
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
      ],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    preparationTime: {
      type: Number,
    },
    cookingTime: {
      type: Number,
    },
    serving: {
      type: Number,
    },
    ingredients: [{
        name : {type : String , required : true},
        quantity: { type: Number, required: true },
        unit: { type: String, required: true }
    }],
    instructions: [{
        stepNumber : {type : Number,required : true},
        instruction : {type : String,required : true}
    }],
    coverImage: {
      type: String,
    },
    tags: {
      type: String,
      enum: ["Veg", "Non-Veg"],
    },
    tasteTag: {
      type: String,
      enum: ["Spicy", "Sweet", "Savory", "Tangy", "Bitter","Rich"],
    },
    createdBy : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User',
      required : true
    }
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe",recipeSchema);