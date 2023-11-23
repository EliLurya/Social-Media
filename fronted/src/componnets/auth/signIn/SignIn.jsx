import { useEffect, useState } from "react";
import { Box, Button, Link, Typography } from "@mui/material";
import TextFields from "../../common/fields/TextFields";
import PasswordFields from "../../common/fields/PasswordFields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SignInFailed from "./SignInFailed";
import GoogleSign from "../GoogleSign";
import ShowLogo from "../../common/ShowLogo";
import useResponsive from "../../../utils/useResponsive";

// Create a schema for form validation using Yup
const schema = yup.object({
  email: yup.string().required("Email is required").email(),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  // useForm hook to handle form data, validation, and submission
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema), // Integrating Yup for schema validation
  });

  const [failedSign, setFailedSign] = useState(false); // State to track failed sign-in attempts
  const [isLoading, setIsLoading] = useState(true); // State to manage initial loading state
  const { signIn, signInSuccessful } = useAuth(); // Accessing authentication-related functions and state from AuthContext

  const navigate = useNavigate();
  const matches = useResponsive();

  // Function called on form submission
  const onSubmit = async (data) => {
    try {
      await signIn(data); // Attempt to sign in with provided credentials
      if (signInSuccessful) {
        navigate("/home");
      }
      setFailedSign(true); // Set failed sign-in state if sign-in is not successful
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide the loading indicator after 1 second
    }, 1000);
    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <>
      {!isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: "4rem",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#e0d3e1",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Sign In
          </Typography>
          <Box
            noValidate
            component="form"
            sx={{ width: matches ? "40%" : "100%", mt: "2rem" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email and password input fields */}
            <TextFields
              control={control}
              name="email"
              label={"Email"}
              errors={errors}
            ></TextFields>
            <PasswordFields
              name="password"
              control={control}
              label={"Password"}
              errors={errors}
            ></PasswordFields>
            <Box>
              <Link
                underline="none"
                href={"/request-password-reset"}
                color={"#47126B"}
                fontWeight={"bold"}
              >
                forgot password?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2, p: 1.5 }}
            >
              Sign In
            </Button>
          </Box>
          <Box>
            Don&rsquo;t have an account?
            <Link
              underline="none"
              href={"/signup"}
              color={"#47126B"}
              fontWeight={"bold"}
            >
              {" "}
              Sign Up
            </Link>
          </Box>
          {/* Display error message if sign-in fails */}
          {!signInSuccessful && failedSign && (
            <SignInFailed setFailedSign={setFailedSign}></SignInFailed>
          )}
          {/* Google sign-in component */}
          <Box mt={3} sx={{}}>
            <GoogleSign></GoogleSign>
          </Box>
        </Box>
      ) : (
        // Show logo while loading
        <ShowLogo></ShowLogo>
      )}
    </>
  );
};

export default SignIn;
