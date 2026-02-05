import type { ProteinType } from "./ProteinType";

export type RecipeType = {
  id: number;
  title: string;
  proteinType: ProteinType;
  portionsRemaining: number;
  status: string;
};
