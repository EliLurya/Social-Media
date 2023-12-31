import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";

const ProgressBar = ({ uploadProgress }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" value={uploadProgress} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(uploadProgress)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
