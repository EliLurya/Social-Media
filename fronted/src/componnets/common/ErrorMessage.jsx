import { Box, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

// ErrorMessage component for displaying error messages in the UI
function ErrorMessage({ message }) {
  return (
    // Container Box with flex layout to align icon and text
    <Box sx={{ display: "flex", alignItems: "center", gap: "5px", mt: "6px" }}>
      {/* Error icon with reduced size */}
      <ErrorIcon color="error" sx={{ width: "20px" }} />

      <Typography color="error.main" variant="span" fontSize="14px">
        {message}
      </Typography>
    </Box>
  );
}

export default ErrorMessage;
