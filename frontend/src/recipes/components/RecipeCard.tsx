import {
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  Box,
  ButtonGroup,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import type { RecipeType } from "../types/RecipeType";
import type { ProteinType } from "../types/ProteinType";
import { EditOutlined, RemoveCircleOutline } from "@mui/icons-material";
import { proteinColorMap } from "../../shared/proteinColorMap";

type RecipeProps = {
  recipe: RecipeType;
};

export default function RecipeCard({ recipe }: RecipeProps) {
  const proteinChipColor =
    proteinColorMap[recipe.protein.toLowerCase() as ProteinType];

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        width: "100%",
        minHeight: 120,
        height: "100%",
      }}
    >
      <CardContent>
        <Stack spacing={1.25}>
          {/*Header*/}
          <Stack>
            <Typography variant="h5" fontWeight={700}>
              {recipe.title}
            </Typography>
          </Stack>
          <Divider />

          {/* Tag & Counter */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 0.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", minWidth: 0 }}>
              <Chip
                size="small"
                variant="outlined"
                label={recipe.protein.toLowerCase()}
                sx={{
                  borderColor: proteinChipColor,
                  color: proteinChipColor,
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexShrink: 0,
              }}
            >
              <Chip variant="outlined" label={recipe.portionsRemaining} />
              <ButtonGroup size="small" variant="outlined">
                <Button aria-label="decrease portions" onClick={() => null}>
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button aria-label="increase portions" onClick={() => null}>
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
          <Divider />

          {/* Edit & remove buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
            <IconButton
              aria-label="edit recip
          e"
              onClick={() => null}
              size="small"
              disableRipple
              sx={{
                p: 0.25,
                mx: 0.25,
              }}
            >
              <EditOutlined fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="remove recip
          e"
              onClick={() => null}
              size="small"
              disableRipple
              sx={{
                p: 0.25,
                mx: 0.25,
              }}
            >
              <RemoveCircleOutline fontSize="small" />
            </IconButton>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
