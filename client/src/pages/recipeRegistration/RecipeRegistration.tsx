import "./recipeRegistration.css";
import {
  recipeCategories,
  cuisineOptions,
  difficultyOptions,
  recipeTypeOptions,
  flavorProfileOptions,
  unitOptions,
} from "../../constants/formOptionOfRecipe";
import { Ingredient } from "../../types/recipeFileds";
import { Instruction } from "../../types/recipeFileds";
import { ImageUploader } from "../../components/imageUploader/ImageUploader";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

export const RecipeRegistration: React.FC = () => {
  const [ingredientDetails, setIngredientDetail] = useState({
    name: "",
    quantity: "",
    unit: "",
  });
  const [instructionOfRecipe, setInstructionOfRecipe] = useState({
    stepNumber: 0,
    instruction: "",
  });

  const [recipeFields, setRecipeFields] = useState({
    title: "",
    description: "",
    category: "",
    cuisine: "",
    difficulty: "",
    preparationTime: "",
    cookingTime: "",
    serving: "",
    tags: "",
    tasteTag: ""
  });
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
  const [instructionList, setInstructionList] = useState<Instruction[]>([]);

  const handleIngredientChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setIngredientDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddIngredient = () => {
    const { name, quantity, unit } = ingredientDetails;

    let newObject = {
      name,
      quantity: Number(quantity),
      unit,
    };
    let newArray = [...ingredientList, newObject];
    setIngredientList(newArray);
  };

  const handleInstructionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInstructionOfRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(recipeFields);

  const handleAddInstruction = () => {
    const newStepNumber = instructionList.length + 1;

    const newInstruction = {
      stepNumber: newStepNumber,
      instruction: instructionOfRecipe.instruction.trim(),
    };

    setInstructionList((prev) => [...prev, newInstruction]);

    setInstructionOfRecipe({ stepNumber: newStepNumber + 1, instruction: "" });
  };

  const handelRecipeFieldsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    setRecipeFields((prev)=>({
      ...prev,
      [name] : value
    }))
  }

  return (
    <>
      <div className="recipe-registration-container">
        <div className="registration-inner-wrapper">
          <h1>Create Your Own Recipe</h1>
          <div className="registration-fields-wrapper">
            <Box
              component="form"
              noValidate
              autoComplete="on"
              className="recipe-form-box"
            >
              <div className="form-group">
                <TextField
                  id="recipe-title"
                  name="title"
                  label="Title"
                  type="text"
                  autoComplete="recipe-title"
                  variant="standard"
                  className="full-width-field"
                  value={recipeFields.title}
                  onChange={handelRecipeFieldsChange}
                />
              </div>

              <div className="form-group">
                <TextField
                  id="recipe-description"
                  name="description"
                  label="Description"
                  multiline
                  maxRows={4}
                  autoComplete="recipe-description"
                  variant="standard"
                  className="full-width-field"
                  value={recipeFields.description}
                  onChange={handelRecipeFieldsChange}
                />
              </div>

              <div className="form-group">
                <TextField
                  id="category"
                  name="category"
                  select
                  label="Select Category"
                  defaultValue=""
                  helperText="Please select a category"
                  variant="standard"
                  className="full-width-field"
                  value={recipeFields.category}
                  onChange={handelRecipeFieldsChange}
                >
                  {recipeCategories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="form-group">
                <TextField
                  id="cuisine"
                  name="cuisine"
                  select
                  label="Select Cuisine"
                  defaultValue=""
                  helperText="Please select a cuisine"
                  variant="standard"
                  className="full-width-field"
                  value={recipeFields.cuisine}
                  onChange={handelRecipeFieldsChange}
                >
                  {cuisineOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="form-group">
                <TextField
                  id="difficulty"
                  name="difficulty"
                  select
                  label="Select Difficulty"
                  defaultValue=""
                  helperText="Please select a difficulty level"
                  variant="standard"
                  className="full-width-field"
                  value={recipeFields.difficulty}
                  onChange={handelRecipeFieldsChange}
                >
                  {difficultyOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="number-fields-row">
                <div className="form-group">
                  <TextField
                    id="prep-time"
                    name="preparationTime"
                    label="Preparation Time (mins)"
                    type="number"
                    variant="standard"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    value={recipeFields.preparationTime}
                    onChange={handelRecipeFieldsChange}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="cook-time"
                    name="cookingTime"
                    label="Cooking Time (mins)"
                    type="number"
                    variant="standard"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    value={recipeFields.cookingTime}
                    onChange={handelRecipeFieldsChange}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="servings"
                    name="serving"
                    label="Servings"
                    type="number"
                    variant="standard"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    value={recipeFields.serving}
                    onChange={handelRecipeFieldsChange}
                  />
                </div>
              </div>

              <div className="header-of-ingredient">
                <p>Enter the Ingredient Details</p>
              </div>

              <div className="ingredient-fields-row">
                <TextField
                  id="ingredient-name"
                  name="name"
                  label="Name"
                  type="text"
                  variant="standard"
                  className="full-width-name"
                  value={ingredientDetails.name}
                  onChange={handleIngredientChange}
                />
                <TextField
                  id="ingredient-quantity"
                  name="quantity"
                  label="Quantity"
                  type="number"
                  variant="standard"
                  value={ingredientDetails.quantity}
                  onChange={handleIngredientChange}
                />
                <TextField
                  id="ingredient-unit"
                  name="unit"
                  select
                  label="Unit"
                  defaultValue=""
                  variant="standard"
                  className="full-width-unit"
                  value={ingredientDetails.unit}
                  onChange={handleIngredientChange}
                >
                  {unitOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <button
                  type="button"
                  className="btn-for-ingredient"
                  onClick={handleAddIngredient}
                >
                  ADD
                </button>
              </div>
              <div className="list-display-wrapper">
                {ingredientList.map((element, index) => (
                  <div key={index} className="item-card">
                    {element.name} - {element.quantity} {element.unit}
                  </div>
                ))}
              </div>

              <div className="header-of-ingredient">
                <p>Enter Instruction step by step</p>
              </div>
              <div className="instruction-container">
                <div className="form-group">
                  <TextField
                    id="recipe-instruction"
                    name="instruction"
                    label="Enter instruction"
                    type="text"
                    autoComplete="instruction-title"
                    variant="standard"
                    className="full-width-instruction"
                    value={instructionOfRecipe.instruction}
                    onChange={handleInstructionChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn-to-add-instruction"
                  onClick={handleAddInstruction}
                >
                  ADD
                </button>
              </div>

              <div className="list-display-wrapper">
                {instructionList.map((element) => (
                  <div key={element.stepNumber} className="item-card">
                    Step {element.stepNumber}: {element.instruction}
                  </div>
                ))}
              </div>

              <div className="form-group">
                <p>Please Upload an Image</p>
                <div className="image-container-of-recipe">
                  <ImageUploader />
                </div>
              </div>

              <div className="form-group">
                <TextField
                  id="recipe-type"
                  name="tags"
                  select
                  label="Select Recipe Type"
                  defaultValue=""
                  helperText="Please select a recipe type"
                  variant="standard"
                  className="full-width-field"
                  value={recipeFields.tags}
                  onChange={handelRecipeFieldsChange}
                >
                  {recipeTypeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="form-group">
                <TextField
                  id="flavor-profile"
                  name="tasteTag"
                  select
                  label="Select Flavor Profile"
                  defaultValue=""
                  helperText="Please select a flavor profile"
                  variant="standard"
                  className="full-width-field"
                  value={recipeFields.tasteTag}
                  onChange={handelRecipeFieldsChange}
                >
                  {flavorProfileOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Box>
          </div>
        </div>
      </div>

      <div className="button-container">
        <button className="btn-for-submit">Submit</button>
      </div>

      <div className="footer-container"></div>
    </>
  );
};
