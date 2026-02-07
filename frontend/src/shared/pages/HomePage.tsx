import {
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@mui/material";

import RecipeCard from "../../recipes/components/RecipeCard";
import type { RecipeType } from "../../recipes/types/RecipeType";
import { useEffect, useState } from "react";
import {
  getAvailableRecipes,
  getUpcomingRecipes,
  removeRecipe,
  updatePortions,
} from "../../recipes/api";

export default function HomePage() {
  const budget = 3000;
  const spent = 1875;
  const pct = Math.min(100, Math.max(0, (spent / budget) * 100));

  const [availableRecipes, setAvailableRecipes] = useState<RecipeType[]>([]);
  const [upcomingRecipes, setUpcomingRecipes] = useState<RecipeType[]>([]);
  const [loading, isLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* TODO: 
  
  Handle api errors
  Transfer recipe from upcoming to available
  Edit recipe (v2)
  Remove recipe -> active
  Budget (set, reset, edit)
  */
  async function loadDashboard() {
    isLoading(true);
    setError(null);

    try {
      const [available, upcoming] = await Promise.all([
        getAvailableRecipes(),
        getUpcomingRecipes(),
      ]);

      setAvailableRecipes(available);
      setUpcomingRecipes(upcoming);
    } catch (e) {
      setError("Failed to load recipes");
      console.error(error, e);
    } finally {
      isLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  function applyPortionChange(res: RecipeType) {
    {
      /* finding the index to keep it´s index in the array*/
    }
    setAvailableRecipes((prev) => {
      const index = prev.findIndex((r) => r.id === res.id);
      if (index === -1) return prev;

      const copy = [...prev];
      copy[index] = res;
      return copy;
    });
  }

  const handleOnDeltaChange = async (id: number, delta: 1 | -1) => {
    try {
      const res = await updatePortions(id, delta);
      applyPortionChange(res);
      if (res.portionsRemaining == 0) {
        setAvailableRecipes((prev) => prev.filter((r) => r.id !== res.id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnRemoveClick = async (id: number) => {
    await removeRecipe(id);
    setAvailableRecipes((prev) => prev.filter((r) => r.id != id));
    setUpcomingRecipes((prev) => prev.filter((r) => r.id != id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h2" sx={{ mb: 8, fontWeight: 700 }}>
        Matsedeln
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{ borderRadius: 2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>
                Foods available
              </Typography>
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 120,
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <List dense>
                  {availableRecipes.map((recipe) => (
                    <ListItem key={recipe.id} sx={{ py: 0.5 }}>
                      <RecipeCard
                        recipe={recipe}
                        onDeltaChange={handleOnDeltaChange}
                        onRemoveClick={handleOnRemoveClick}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{ borderRadius: 2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>
                Coming recipes
              </Typography>
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 120,
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <List dense>
                  {upcomingRecipes.map((upcoming) => (
                    <ListItem key={upcoming.id} sx={{ py: 0.5 }}>
                      <RecipeCard
                        recipe={upcoming}
                        onDeltaChange={handleOnDeltaChange}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{ borderRadius: 2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>
                Stats
              </Typography>

              <Typography variant="body2" sx={{ mb: 1 }}>
                Money spent vs budget: {spent} / {budget}
              </Typography>

              <LinearProgress variant="determinate" value={pct} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
