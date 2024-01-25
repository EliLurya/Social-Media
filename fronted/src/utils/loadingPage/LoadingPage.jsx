import React from "react";

const LoadingPage = () => {
  return (
    <Box
      sx={{
        mt: "4rem",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={120} sx={{ color: "secondary" }} />
      <Typography variant="h4" mt={5}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingPage;
