import { RecipeFields, Instruction, Ingredient } from "../../types/recipeFormsFileds.types";

export const createFormDataFromState = (
    recipeFields: RecipeFields,
    ingredientList: Ingredient[],
    instructionList: Instruction[],
    image: string
):Record<string, any> =>{
    return {
        ...recipeFields,
        coverImage: image,
        ingredients: ingredientList,
        instructions: instructionList,
      };
}