export const validateTitle = (title: string): string => {
  if (title.trim().length < 1) {
    return `Title is Required`;
  }

  if (title.trim().length < 3) {
    return `3-100 characters long`;
  }

  if (title.trim().length > 100) {
    return "Title must be no more than 100 characters";
  }

  return "";
};

export const validateDescription = (description: string): string => {
  if (description.trim().length < 1) {
    return `Description is Required`;
  }

  if (description.trim().length < 10) {
    return `10-1000 characters long`;
  }

  if (description.trim().length > 1000) {
    return "Description must be no more than 1000 characters";
  }
  return "";
};

export const validateCategory = (category: string): string => {
  if (!category) {
    return "Category is required";
  }
  return "";
};

export const validateCuisine = (cuisine: string): string => {
  if (!cuisine) {
    return "Cuisine is required";
  }
  return "";
};

export const validateDifficulty = (difficulty: string): string => {
  if (!difficulty) {
    return "Difficulty level is required";
  }
  return "";
};

export const validatePreparationTime = (preparationTime: string): string => {
  const value = Number(preparationTime);

  if (!preparationTime.trim()) return "Preparation time is required (in minutes)";
  if (isNaN(value) || value < 1 || value > 240) {
    return "Between 1 and 240 minutes";
  }

  return "";
};

export const validateCookingTime = (cookingTime: string): string => {
  const value = Number(cookingTime);

  if (!cookingTime.trim()) return "Cooking time is required (in minutes)";
  if (isNaN(value) || value < 1 || value > 240) {
    return "Between 1 and 240 minutes";
  }

  return "";
};

export const validateServings = (servings: string): string => {
  const value = Number(servings);

  if (!servings.trim()) return "Serving count is required";
  if (isNaN(value) || value < 1 || value > 100) {
    return "Servings must be between 1 and 100";
  }

  return "";
};

export const validateIngredientList = (record:any):string =>{
  if(record.length === 0){
    return "Add atleast one Ingredient"
  }
  return "";
}

export const validateInstructionList = (record:any):string =>{
  if(record.length === 0){
    return "Add atleast one Instruction"
  }
  return "";
}

export const validateImage = (imageFile: File | null): string => {
  if (!imageFile) {
    return "Recipe image is required.";
  }

  const validTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (!validTypes.includes(imageFile.type)) {
    return "Only JPG, JPEG, or PNG images are allowed.";
  }

  const maxSizeInMB = 2;
  const sizeInMB = imageFile.size / (1024 * 1024);

  if (sizeInMB > maxSizeInMB) {
    return "Image must be smaller than 2MB.";
  }

  return "";
};


export const validateTag = (tag: string): string => {
  if (!tag) {
    return "Image level is required";
  }
  return "";
};

export const validateTasteTag = (tasteTag: string): string => {
  if (!tasteTag.trim()) {
    return "Taste is required";
  }
  return "";
};

