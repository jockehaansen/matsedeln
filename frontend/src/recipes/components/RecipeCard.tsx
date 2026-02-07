import { useState } from "react";
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
import { EditOutlined, RemoveCircleOutline } from "@mui/icons-material";

import type { RecipeType } from "../types/RecipeType";
import { proteinColorMap } from "../../shared/proteinColorMap";
import ConfirmDialog from "../../shared/components/ConfirmDialog";

type RecipeProps = {
  recipe: RecipeType;
  onDeltaChange: (id: number, delta: 1 | -1) => Promise<void> | void;
  onRemoveClick: (id: number) => Promise<void> | void;
};

const dialogConfig = {
  lastPortion: {
    title: "Eat last portion?",
    message: "This will remove the recipe from the available list.",
    confirmText: "OK",
  },
  remove: {
    title: "Remove recipe?",
    message: "This will remove the recipe from your plan.",
    confirmText: "Remove",
  },
};

export default function RecipeCard({
  recipe,
  onDeltaChange,
  onRemoveClick,
}: RecipeProps) {
  const proteinChipColor = proteinColorMap[recipe.proteinType];
  const [dialogType, setDialogType] = useState<"lastPortion" | "remove" | null>(
    null,
  );

  const handleDecreaseClick = () => {
    if (recipe.portionsRemaining === 1) {
      setDialogType("lastPortion");
      return;
    }
    onDeltaChange(recipe.id, -1);
  };

  const handleRemoveRecipeClick = () => {
    setDialogType("remove");
  };

  const handleConfirm = () => {
    if (dialogType === "lastPortion") {
      onDeltaChange(recipe.id, -1);
    }

    if (dialogType === "remove") {
      onRemoveClick(recipe.id);
    }

    setDialogType(null);
  };

  const handleCancel = () => {
    setDialogType(null);
  };

  return (
    <>
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
            {/* Header */}
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
                  label={recipe.proteinType}
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
                  <Button
                    aria-label="decrease portions"
                    onClick={handleDecreaseClick}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>

                  <Button
                    aria-label="increase portions"
                    onClick={() => onDeltaChange(recipe.id, 1)}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>

            <Divider />

            {/* Edit & remove buttons */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
              <IconButton
                aria-label="edit recipe"
                onClick={() => null}
                size="small"
              >
                <EditOutlined fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="remove recipe"
                onClick={handleRemoveRecipeClick}
                size="small"
              >
                <RemoveCircleOutline fontSize="small" />
              </IconButton>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={dialogType !== null}
        title={dialogType ? dialogConfig[dialogType].title : ""}
        message={dialogType ? dialogConfig[dialogType].message : ""}
        confirmText={dialogType ? dialogConfig[dialogType].confirmText : ""}
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
