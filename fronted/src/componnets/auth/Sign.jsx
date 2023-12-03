import { Box, Button, Typography } from "@mui/material";
import LogoTop from "./LogoTop";
import { getFlexStyles } from "../common/style/CommonStyles";
import GoogleSign from "./GoogleSign";
import SignIn from "./signIn/SignIn";
import { useEffect, useState } from "react";
import SignUp from "./signUp/SignUp";
import "./sign.css";

const Sign = () => {
  // State for managing which button (Sign In or Sign Up) is active
  const [buttonSignIn, setButtonSignIn] = useState(false);
  const [userSignUp, setUserSignUp] = useState(false);

  // useEffect to update the buttonSignIn state when userSignUp changes
  useEffect(() => {
    setButtonSignIn(true);
  }, [userSignUp]);

  return (
    // Main container for the Sign component
    <Box
      className={"backGround"}
      sx={getFlexStyles("column", { width: "100%" })}
    >
      {/* Logo at the top of the page */}
      <Box>
        <LogoTop></LogoTop>
      </Box>

      {/* Buttons to toggle between Sign In and Sign Up */}
      <Box sx={getFlexStyles("row")}>
        {/* Sign In Button */}
        <Button
          onClick={() => setButtonSignIn(true)}
          sx={{
            backgroundColor: "transparent",
            mr: 2,
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: buttonSignIn
                ? (theme) => theme.palette.primary.main
                : (theme) => theme.palette.primary.AuxiliaryColor,
              fontWeight: "bold",
              textDecoration: "underline",
              "&:hover": {
                color: (theme) => theme.palette.primary.main,
              },
            }}
          >
            Sign In
          </Typography>
        </Button>

        {/* Sign Up Button */}
        <Button
          onClick={() => setButtonSignIn(false)}
          sx={{
            ml: 2,
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: buttonSignIn
                ? (theme) => theme.palette.primary.AuxiliaryColor
                : (theme) => theme.palette.primary.main,
              fontWeight: "bold",
              textDecoration: "underline",
              "&:hover": {
                color: (theme) => theme.palette.primary.main,
              },
            }}
          >
            Sign Up
          </Typography>
        </Button>
      </Box>

      {/* Displaying either the SignIn or SignUp component based on buttonSignIn state */}
      <Box>
        {buttonSignIn ? (
          // Sign In Form
          <Box>
            <SignIn></SignIn>
          </Box>
        ) : (
          // Sign Up Form
          <Box>
            <SignUp setUserSignUp={setUserSignUp}></SignUp>
          </Box>
        )}
      </Box>

      {/* Google Sign In Button */}
      <Box mt={3}>
        <GoogleSign></GoogleSign>
      </Box>
    </Box>
  );
};

export default Sign;
