import { Box, Button, CircularProgress, Typography } from "@mui/material";
import PasswordFields from "../../../common/fields/PasswordFields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { pawdRagExp } from "../../../common/fields/UtilsFields";
import { useEffect, useState } from "react";
import * as userService from "../../../../services/userService";
import { getFlexStyles } from "../../../common/style/CommonStyles";
import { ROUTES } from "../../../../utils/routes";

// Validation schema for the password and confirmPassword fields
const schema = yup.object({
  password: yup.string().required("Password is required").matches(
    pawdRagExp, // Regular expression for password validation
    "Must Contain 8 Characters, Maximum 30 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
});

const NewPassword = () => {
  const { token } = useParams(); // Retrieve the reset token from URL parameters
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const [tokenValidationMessage, setTokenValidationMessage] = useState("");
  // Effect to validate the reset token on component mount
  useEffect(() => {
    const validateToken = async () => {
      setIsLoading(true);
      try {
        const responseData = await userService.validateResetToken(token);
        console.log(responseData + "responseData");
        if (!responseData.success) {
          setTokenValidationMessage("Invalid or expired reset token");
          setTimeout(() => {
            navigate("sign");
          }, 2500);
        }
      } catch (error) {
        console.error("Error validating token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [token, navigate]);

  // useForm hook for handling form data
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const responseData = await userService.resetPassword(
        token,
        data.password
      );

      if (responseData.success) {
        navigate(ROUTES.HOME);
      } else {
        console.error("Failed to reset password:", responseData.error);
      }
    } catch (error) {
      console.error("Error submitting new password:", error);
    }
  };

  // Show loading indicator while validating token
  if (isLoading) {
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
  }

  // Show message if token is invalid or expired
  if (tokenValidationMessage) {
    return (
      <Box
        sx={{
          mt: "4rem",
          m:2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4">{tokenValidationMessage}</Typography>
      </Box>
    );
  }

  // Main form layout for password reset
  return (
    <Box
      sx={getFlexStyles("column", {
        mt: "4rem",
      })}
    >
      <Typography variant="h5">Reset Password</Typography>
      <Box
        noValidate
        component="form"
        // sx={{ width: matches ? "40%" : "100%", mt: "2rem" }}
        sx={{ maxWidth: "400px", width: "100%", mt: "2rem" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <PasswordFields
          name="password"
          control={control}
          label={"Password"}
          errors={errors}
        />
        <PasswordFields
          name="confirmPassword"
          control={control}
          label={"Confirm Password"}
          errors={errors}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2, p: 1.5 }}
        >
          Create New Password
        </Button>
      </Box>
    </Box>
  );
};

export default NewPassword;
