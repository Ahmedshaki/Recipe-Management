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

  const handleAddInstruction = () => {
    const newStepNumber = instructionList.length + 1;

    const newInstruction = {
      stepNumber: newStepNumber,
      instruction: instructionOfRecipe.instruction.trim(),
    };

    setInstructionList((prev) => [...prev, newInstruction]);

    setInstructionOfRecipe({ stepNumber: newStepNumber + 1, instruction: "" });
  };

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
                  name="recipeTitle"
                  label="Title"
                  type="text"
                  autoComplete="recipe-title"
                  variant="standard"
                  className="full-width-field"
                />
              </div>

              <div className="form-group">
                <TextField
                  id="recipe-description"
                  name="recipeDescription"
                  label="Description"
                  multiline
                  maxRows={4}
                  autoComplete="recipe-description"
                  variant="standard"
                  className="full-width-field"
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
                    name="prepTime"
                    label="Preparation Time (mins)"
                    type="number"
                    variant="standard"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="cook-time"
                    name="cookTime"
                    label="Cooking Time (mins)"
                    type="number"
                    variant="standard"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="servings"
                    name="servings"
                    label="Servings"
                    type="number"
                    variant="standard"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
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
              <div>
                {ingredientList.map((element, index) => {
                  return (
                    <div key={index}>
                      <p>
                        {element.name} {element.quantity} {element.unit}
                      </p>
                    </div>
                  );
                })}
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

              <div>
                {instructionList.map((element) => (
                  <p key={element.stepNumber}>
                    {element.stepNumber}. {element.instruction}
                  </p>
                ))}
              </div>

              <div className="form-group">
                <p>TODO: Add UI for Image Upload</p>
              </div>

              <div className="form-group">
                <TextField
                  id="recipe-type"
                  name="recipeType"
                  select
                  label="Select Recipe Type"
                  defaultValue=""
                  helperText="Please select a recipe type"
                  variant="standard"
                  className="full-width-field"
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
                  name="flavorProfile"
                  select
                  label="Select Flavor Profile"
                  defaultValue=""
                  helperText="Please select a flavor profile"
                  variant="standard"
                  className="full-width-field"
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
