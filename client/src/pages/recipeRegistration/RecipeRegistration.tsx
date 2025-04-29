import "./recipeRegistration.css";
import {
  recipeCategories,
  cuisineOptions,
  difficultyOptions,
  recipeTypeOptions,
  flavorProfileOptions,
  unitOptions,
} from "../../constants/formOptionOfRecipe";
import { Ingredient } from "../../types/recipeFormsFileds.types";
import { Instruction } from "../../types/recipeFormsFileds.types";
import { ImageUploader } from "../../components/imageUploader/ImageUploader";
import { createFormDataFromState } from "../../features/recipeForm/recipeFormHelper";
import { handelApiSubmit } from "../../services/apiService";
import { uploadToCloudinary } from "../../utils/cloudinaryUtils";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import {
  validateCategory,
  validateCookingTime,
  validateCuisine,
  validateDescription,
  validateDifficulty,
  validateImage,
  validateIngredientList,
  validateInstructionList,
  validatePreparationTime,
  validateServings,
  validateTag,
  validateTasteTag,
  validateTitle,
} from "../../validations/recipeFieldsValidation";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import axios from "axios";

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
    tasteTag: "",
  });

  const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
  const [instructionList, setInstructionList] = useState<Instruction[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [touched, settouched] = useState(true);
  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string>("");
  const [cuisineError, setCuisineError] = useState<string>("");
  const [difficultyError, setDifficultyError] = useState<string>("");
  const [preparationTimeError, setPreparationTimeError] = useState<string>("");
  const [cookingTimeError, setCookingTimeError] = useState<string>("");
  const [servingError, setServingError] = useState<string>("");
  const [ingredientListError, setIngredientListError] = useState<string>("");
  const [instructionListError, setInstructionListError] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");
  const [tagError, setTagError] = useState<string>("");
  const [tasteError, setTasteError] = useState<string>("");

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
    if (newArray.length === 0) {
      setIngredientListError(validateIngredientList(newArray));
    } else {
      setIngredientListError("");
    }
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
    let newArray = [...instructionList, newInstruction];
    if (newArray.length === 0) {
      setInstructionListError(validateInstructionList(newArray));
    } else {
      setInstructionListError("");
    }
    setInstructionOfRecipe({ stepNumber: newStepNumber + 1, instruction: "" });
  };

  useEffect(() => {
    settouched(true);
    setTitleError(validateTitle(recipeFields.title));
    setDescriptionError(validateDescription(recipeFields.description));
    setCategoryError(validateCategory(recipeFields.category));
    setCuisineError(validateCuisine(recipeFields.cuisine));
    setDifficultyError(validateDifficulty(recipeFields.difficulty));
    setPreparationTimeError(
      validatePreparationTime(recipeFields.preparationTime)
    );
    setCookingTimeError(validateCookingTime(recipeFields.cookingTime));
    setServingError(validateServings(recipeFields.serving));
    setIngredientListError(validateIngredientList(ingredientList));
    setInstructionListError(validateInstructionList(ingredientList));
    setTagError(validateTag(recipeFields.tags));
    setTasteError(validateTasteTag(recipeFields.tasteTag));
    setImageError(validateImage(selectedImage));
  }, []);

  const handelRecipeFieldsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(value);
    setRecipeFields((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "title") {
      setTitleError(validateTitle(value));
    }

    if (name === "description") {
      setDescriptionError(validateDescription(value));
    }

    if (name === "category") {
      setCategoryError(validateCategory(value));
    }

    if (name === "cuisine") {
      setCuisineError(validateCuisine(value));
    }
    if (name === "difficulty") {
      setDifficultyError(validateDifficulty(value));
    }

    if (name === "preparationTime") {
      setPreparationTimeError(validatePreparationTime(value));
    }

    if (name === "cookingTime") {
      setCookingTimeError(validateCookingTime(value));
    }

    if (name === "serving") {
      setServingError(validateServings(value));
    }

    if (name === "tags") {
      setTagError(validateTag(value));
    }

    if (name === "tasteTag") {
      setTasteError(validateTasteTag(value));
    }
  };

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
    setImageError(validateImage(file));
  };

  const handelSumitData = async () => {
    try {
      let imageUrl = "";
      if (selectedImage) {
        imageUrl = await uploadToCloudinary(selectedImage);
      }
      const formData = createFormDataFromState(
        {
          ...recipeFields,
          preparationTime: Number(recipeFields.preparationTime),
          cookingTime: Number(recipeFields.cookingTime),
          serving: Number(recipeFields.serving),
        },
        ingredientList,
        instructionList,
        imageUrl
      );
      const response = await handelApiSubmit(
        "/registerRecipe",
        "POST",
        formData
      );
      showSuccessToast(response?.data?.message);
      setRecipeFields({
        title: "",
        description: "",
        category: "",
        cuisine: "",
        difficulty: "",
        preparationTime: "",
        cookingTime: "",
        serving: "",
        tags: "",
        tasteTag: "",
      });
      setIngredientDetail({
        name: "",
        quantity: "",
        unit: "",
      });
      setInstructionOfRecipe({
        stepNumber: 0,
        instruction: "",
      });
      setIngredientList([]);
      setInstructionList([]);
      setSelectedImage(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        showErrorToast(error?.response?.data?.message);
      }
    }
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
                  name="title"
                  type="text"
                  autoComplete="recipe-title"
                  variant="standard"
                  className="full-width-field"
                  value={recipeFields.title}
                  onChange={handelRecipeFieldsChange}
                  error={touched && titleError !== ""}
                  helperText={touched && titleError !== "" ? titleError : " "}
                />
              </div>

              <div className="form-group">
                <TextField
                  id="recipe-description"
                  name="description"
                  multiline
                  maxRows={4}
                  autoComplete="recipe-description"
                  variant="standard"
                  className="full-width-field"
                  value={recipeFields.description}
                  onChange={handelRecipeFieldsChange}
                  error={touched && descriptionError !== ""}
                  helperText={
                    touched && descriptionError !== "" ? descriptionError : " "
                  }
                />
              </div>

              <div className="form-group">
                <TextField
                  id="category"
                  name="category"
                  label="Select category"
                  select
                  defaultValue=""
                  variant="standard"
                  className="full-width-field"
                  value={recipeFields.category}
                  onChange={handelRecipeFieldsChange}
                  error={touched && categoryError !== ""}
                  helperText={
                    touched && categoryError !== "" ? categoryError : " "
                  }
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
                  label="Select cuisine"
                  defaultValue=""
                  variant="standard"
                  className="full-width-field"
                  value={recipeFields.cuisine}
                  onChange={handelRecipeFieldsChange}
                  error={touched && cuisineError !== ""}
                  helperText={
                    touched && cuisineError !== "" ? cuisineError : " "
                  }
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
                  variant="standard"
                  className="full-width-field"
                  value={recipeFields.difficulty}
                  onChange={handelRecipeFieldsChange}
                  error={touched && difficultyError !== ""}
                  helperText={
                    touched && difficultyError !== "" ? difficultyError : " "
                  }
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
                    type="number"
                    variant="standard"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    value={recipeFields.preparationTime}
                    onChange={handelRecipeFieldsChange}
                    error={touched && preparationTimeError !== ""}
                    helperText={
                      touched && preparationTimeError !== ""
                        ? preparationTimeError
                        : " "
                    }
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="cook-time"
                    name="cookingTime"
                    type="number"
                    variant="standard"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    value={recipeFields.cookingTime}
                    onChange={handelRecipeFieldsChange}
                    error={touched && cookingTimeError !== ""}
                    helperText={
                      touched && cookingTimeError !== ""
                        ? cookingTimeError
                        : " "
                    }
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="servings"
                    name="serving"
                    type="number"
                    variant="standard"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    value={recipeFields.serving}
                    onChange={handelRecipeFieldsChange}
                    error={touched && servingError !== ""}
                    helperText={
                      touched && servingError !== "" ? servingError : " "
                    }
                  />
                </div>
              </div>

              <div className="header-of-ingredient">
                <p>Enter the Ingredient Details</p>
                {ingredientListError !== "" ? (
                  <p style={{ color: "red", fontSize: "small" }}>
                    {ingredientListError}
                  </p>
                ) : (
                  ""
                )}
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
                {instructionListError !== "" ? (
                  <p style={{ color: "red", fontSize: "small" }}>
                    {instructionListError}
                  </p>
                ) : (
                  ""
                )}
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
                {imageError !==""?<p style={{color: "red", fontSize: "small"}}>{imageError}</p>:""}
                <div className="image-container-of-recipe">
                  <ImageUploader onImageChange={handleImageChange} />
                </div>
              </div>

              <div className="form-group">
                <TextField
                  id="recipe-type"
                  name="tags"
                  select
                  label="Select Recipe Type"
                  defaultValue=""
                  variant="standard"
                  className="full-width-field"
                  value={recipeFields.tags}
                  onChange={handelRecipeFieldsChange}
                  error={touched && tagError !== ""}
                  helperText={touched && tagError !== "" ? tagError : " "}
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
                  variant="standard"
                  className="full-width-field"
                  value={recipeFields.tasteTag}
                  onChange={handelRecipeFieldsChange}
                  error={touched && tasteError !== ""}
                  helperText={touched && tasteError !== "" ? tasteError : " "}
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
        <button
          className="btn-for-submit"
          type="submit"
          onClick={handelSumitData}
        >
          Submit
        </button>
      </div>

      <div className="footer-container"></div>
    </>
  );
};
