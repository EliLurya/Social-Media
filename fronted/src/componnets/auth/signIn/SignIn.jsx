import { useState } from "react";
import { Box, Button, Link } from "@mui/material";
import TextFields from "../../common/fields/TextFields";
import PasswordFields from "../../common/fields/PasswordFields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SignInFailed from "./SignInFailed";
import { getFlexStyles } from "../../common/style/CommonStyles";
import { ROUTES } from "../../../utils/routes";

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
  const { signIn, signInSuccessful } = useAuth(); // Accessing authentication-related functions and state from AuthContext

  const navigate = useNavigate();

  // Function called on form submission
  const onSubmit = async (data) => {
    try {
      await signIn(data); // Attempt to sign in with provided credentials
      if (signInSuccessful) {
        navigate(ROUTES.HOME);
      }
      setFailedSign(true); // Set failed sign-in state if sign-in is not successful
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
        <Box mr={2} ml={2}>
          <Box sx={getFlexStyles("column")}>
            <Box
              noValidate
              component="form"
              sx={{ maxWidth: "400px", width: "100%", mt: "2rem" }} // Adjust the maxWidth as needed
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
                  color="primary"
                  fontWeight={"bold"}
                  onClick={() => navigate(ROUTES.REQUEST_PASSWORD_RESET)}
                  sx={{ cursor: "pointer" }}
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
            {/* Display error message if sign-in fails */}
            {!signInSuccessful && failedSign && (
              <SignInFailed setFailedSign={setFailedSign}></SignInFailed>
            )}
            {/* Google sign-in component */}
          </Box>
        </Box>      
    </>
  );
};

export default SignIn;
