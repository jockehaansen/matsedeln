import type { ProteinType } from "./ProteinType";

export type RecipeType = {
  id: number;
  title: string;
  protein: ProteinType;
  portionsRemaining: number;
};
