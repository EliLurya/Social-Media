import { Box, Button, Link, Typography } from "@mui/material";
import TextFields from "../../../componnets/common/fields/TextFields";
import PasswordFields from "../../../componnets/common/fields/PasswordFields";
import { useForm } from "react-hook-form";
import CheckBoxFields from "../../../componnets/common/fields/CheckBoxFields";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { pawdRagExp } from "../../common/fields/UtilsFields";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GoogleSign from "../../auth/GoogleSign";
import ShowLogo from "../../common/ShowLogo";
import useResponsive from "../../../utils/useResponsive";
import LogoTop from "../LogoTop";
import { getFlexStyles } from "../../common/style/CommonStyles";

// Schema for form validation using Yup
const schema = yup.object({
  userName: yup.string().required("User Name is required"),
  email: yup.string().required("Email is required").email(),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      pawdRagExp,
      "Must Contain 8 Characters, Maximum 30 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
  privacy: yup.bool().oneOf([true], "Field must be checked"),
});

const SignUp = () => {
  // useForm hook to manage form state and handle form submission
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      privacy: false,
    },
    resolver: yupResolver(schema),
  });

  // State to control loading indication
  const [isLoading, setIsLoading] = useState(true);

  // Effect to show loading for 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const { signUp, signUpSuccessful, errorSignUp, resetErrorSignUp } = useAuth();
  const navigate = useNavigate();
  const matches = useResponsive(); // Custom hook for responsive design

  // Function to handle form submission
  const onSubmit = async (data) => {
    clearErrors();
    try {
      await signUp(data);
      if (signUpSuccessful) navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  // Effect to handle errors related to email after form submission
  useEffect(() => {
    if (errorSignUp) {
      if (errorSignUp.includes("Email already registered")) {
        setError("email", {
          type: "manual",
          message: "Email already registered",
        });
      }
      resetErrorSignUp();
    }
  }, [errorSignUp, setError]);

  // Conditional rendering based on loading state
  return (
    <>
      {!isLoading ? (
        <Box>
          <LogoTop></LogoTop>
          <Box
            sx={getFlexStyles("column", {
              mt: "1rem",
            })}
          >
            <Typography
              variant="h4"
              sx={{
                color: (theme) => theme.palette.primary.AuxiliaryColor,
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ width: matches ? "40%" : "100%", mt: "2rem" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Form fields for user input */}
              <TextFields
                name="userName"
                control={control}
                label="User Name"
                errors={errors}
              />
              <TextFields
                name="email"
                control={control}
                label="Email"
                errors={errors}
              />
              <PasswordFields
                name="password"
                control={control}
                label="Password"
                errors={errors}
              />
              <PasswordFields
                name="confirmPassword"
                control={control}
                label="Confirm Password"
                errors={errors}
              />
              <CheckBoxFields
                name="privacy"
                control={control}
                errors={errors}
              />

              {/* Sign Up and Cancel buttons */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, p: 2 }}
              >
                Sign Up
              </Button>
            </Box>
            <Box>
              Have an account?
              <Link
                underline="none"
                href="/signin"
                color="primary"
                fontWeight="bold"
              >
                {" "}
                Log in now{" "}
              </Link>
            </Box>
            <Box mt={3} mb={5}>
              <GoogleSign />
            </Box>
          </Box>
        </Box>
      ) : (
        <ShowLogo />
      )}
    </>
  );
};

export default SignUp;
