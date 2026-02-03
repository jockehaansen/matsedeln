import {
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
  LinearProgress,
} from "@mui/material";

import RecipeCard from "../../recipes/components/RecipeCard";
import type { RecipeType } from "../../recipes/types/RecipeType";
import { useEffect, useState } from "react";
import { getAvailableRecipes, getUpcomingRecipes } from "../../recipes/api";

export default function HomePage() {
  const budget = 3000;
  const spent = 1875;
  const pct = Math.min(100, Math.max(0, (spent / budget) * 100));

  const [availableRecipes, setAvailableRecipes] = useState<RecipeType[]>([]);
  const [upcomingRecipes, setUpcomingRecipes] = useState<RecipeType[]>([]);
  const [loading, isLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      isLoading(true);
      setError(null);

      try {
        const [available, upcoming] = await Promise.all([
          getAvailableRecipes(),
          getUpcomingRecipes(),
        ]);

        if (!cancelled) {
          setAvailableRecipes(available);
          setUpcomingRecipes(upcoming);
        }
      } catch (e) {
        if (!cancelled) setError("Failed to load recipes");
      } finally {
        if (!cancelled) isLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

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
              <List dense>
                {availableRecipes.map((recipe) => (
                  <ListItem key={recipe.id} sx={{ py: 0.5 }}>
                    <RecipeCard recipe={recipe} />
                  </ListItem>
                ))}
              </List>
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
              <List dense>
                {upcomingRecipes.map((upcoming) => (
                  <ListItem key={upcoming.id} sx={{ py: 0.5 }}>
                    <RecipeCard recipe={upcoming} />
                  </ListItem>
                ))}
              </List>
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
