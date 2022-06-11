import React from "react";
import { Add } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

interface AddButtonProps {
  compact?: boolean;
}

export const AddButton = ({ compact }: AddButtonProps): JSX.Element => {
  const dimen = compact ? "3vh" : "5vh";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5fdd6b",
        borderRadius: "50%",
        height: dimen,
        width: dimen
      }}
    >
      <IconButton aria-label='add player button' size='small'>
        <Add fontSize={compact ? "small" : "medium"} />
      </IconButton>
    </Box>
  );
};
