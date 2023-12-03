import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import ErrorMessage from "../common/ErrorMessage";
import { getFlexStyles } from "../common/style/CommonStyles";

const GoogleSign = () => {
  const { handleLoginSuccessGoogle } = useAuth(); // Using handleLoginSuccessGoogle from AuthContext
  const [error, setError] = useState(""); // State to handle errors

  // Function to handle errors during Google login
  const handleLoginError = () => {
    setError("Google login failed. Please try again.");
  };

  return (
    <Box sx={getFlexStyles("column", { mb: 3 })}>
      {/* Divider to separate Google login from other forms */}
      <Box sx={getFlexStyles("none", { width: "100%" })}>
        <Divider
          sx={{
            flexGrow: 1,
            backgroundColor: (theme) => theme.palette.primary.main,
          }}
        />
        <Typography variant="caption" sx={{ mx: 1, whiteSpace: "nowrap" }}>
          OR
        </Typography>
        <Divider
          sx={{
            flexGrow: 1,
            backgroundColor: (theme) => theme.palette.primary.main,
          }}
        />
      </Box>

      {/* Google Login Button */}
      <Box
        sx={{
          mt: 5,
          transform: "scale(1.3)", // Increase size of Google login button
          transformOrigin: "center",
        }}
      >
        <GoogleLogin
          shape="circle"
          onSuccess={handleLoginSuccessGoogle}
          onError={handleLoginError}
        />
        {/* Display error message if there is an error */}
        {error && <ErrorMessage message={error} />}
      </Box>
    </Box>
  );
};

export default GoogleSign;
