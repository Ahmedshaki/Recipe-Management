export type Option = {
  value: string;
  label: string;
};

export type Category = "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Dessert";

export type Cuisine =
  | "Indian"
  | "Chinese"
  | "Italian"
  | "American"
  | "Mexican"
  | "Japanese"
  | "Mediterranean"
  | "Thai"
  | "French"
  | "Korean";

export type Difficulty = "Easy" | "Medium" | "Hard";

export type RecipeType = "Veg" | "Non-Veg";

export type FlavorProfile =
  | "Spicy"
  | "Sweet"
  | "Savory"
  | "Tangy"
  | "Bitter"
  | "Rich";

export type Ingredient = {
    name: string;
    quantity: number;
    unit: string;
  };
  

export type Instruction = {
  stepNumber: number,
  instruction: string
}