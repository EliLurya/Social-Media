import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import ErrorMessage from "../common/ErrorMessage";

const GoogleSign = () => {
  const { handleLoginSuccessGoogle } = useAuth(); // Using handleLoginSuccessGoogle from AuthContext
  const [error, setError] = useState(""); // State to handle errors

  // Function to handle errors during Google login
  const handleLoginError = () => {
    setError("Google login failed. Please try again.");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 2, // Margin for top and bottom
      }}
    >
      {/* Divider to separate Google login from other forms */}
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography variant="caption" sx={{ mx: 1, whiteSpace: "nowrap" }}>
          OR
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>

      {/* Google Login Button */}
      <Box
        sx={{
          mt: 6,
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
