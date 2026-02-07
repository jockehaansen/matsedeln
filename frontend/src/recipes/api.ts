import { api } from "../api/client";
import type { RecipeType } from "./types/RecipeType";

export async function getAvailableRecipes() {
  const res = await api.get<RecipeType[]>("/api/recipes/available");
  return res.data;
}

export async function getUpcomingRecipes() {
  const res = await api.get<RecipeType[]>("api/recipes/upcoming");
  return res.data;
}

export async function updatePortions(id: number, delta: 1 | -1) {
  const res = await api.patch<RecipeType>(`/api/recipes/${id}/portions`, {
    delta,
  });
  return res.data;
}

export async function removeRecipe(id: number) {
  const res = await api.patch<void>(`/api/recipes/${id}/remove`);
  return res.data;
}
