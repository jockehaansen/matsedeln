import type { RecipeType } from "../../../recipes/types/RecipeType";

export const availableRecipes: RecipeType[] = [
  {
    id: 1,
    title: "Fläskpannkaka",
    protein: "meat",
    portionsRemaining: 2,
  },
  {
    id: 2,
    title: "Kyckling Curry",
    protein: "meat",
    portionsRemaining: 3,
  },
  {
    id: 3,
    title: "Korv m. Bröd",
    protein: "meat",
    portionsRemaining: 4,
  },
  {
    id: 4,
    title: "Nudlar + Dumplings",
    protein: "vegetarian",
    portionsRemaining: 1,
  },
];

export const upcomingRecipes: RecipeType[] = [
  {
    id: 5,
    title: "Salsciccia pasta",
    protein: "meat",
    portionsRemaining: 0,
  },
  {
    id: 6,
    title: "Fiskgryta",
    protein: "fish",
    portionsRemaining: 0,
  },
];
