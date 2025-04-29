export type Option = {
  value: string;
  label: string;
};

export type Ingredient = {
    name: string;
    quantity: number;
    unit: string;
  };
  

export type Instruction = {
  stepNumber: number,
  instruction: string
}

export interface RecipeFields {
  title: string;
  description: string;
  category: string;
  cuisine: string;
  difficulty: string;
  preparationTime: number;
  cookingTime: number;
  serving: number;
  tags: string;
  tasteTag: string;
}