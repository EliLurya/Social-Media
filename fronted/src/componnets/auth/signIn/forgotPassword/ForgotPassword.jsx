import { Box, Button, Typography } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextFields from "../../../common/fields/TextFields";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as userService from "../../../../services/userService";
import useResponsive from "../../../../utils/useResponsive";

// Schema for form validation using Yup
const schema = yup.object({
  email: yup.string().required("Email Name is required").email(),
});

const ForgotPassword = () => {
  // useForm hook to manage form state and handle submission
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema), // Integrating Yup for validation
  });

  const [userMessage, setUserMessage] = useState(false); // State to manage user feedback message
  const navigate = useNavigate(); // Hook for programmatic navigation
  const matches = useResponsive(); // Custom hook for responsive design

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await userService.requestPasswordReset(data);

      if (response.success) {
        setUserMessage(true); // Update state if password reset request is successful
      } else {
        // Display alert if there's an error
        alert(response.error);
      }
    } catch (error) {
      // Log and alert any errors encountered
      console.error("Error:", error);
      alert("An error occurred while trying to reset password.");
    }
  };

  return (
    <>
      {!userMessage ? (
        // Form layout for resetting the password
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
            Rest Password
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ width: matches ? "40%" : "100%", mt: "2rem" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email input field */}
            <TextFields
              control={control}
              name="email"
              label={"Email"}
              errors={errors}
            ></TextFields>
            {/* Buttons for submitting or cancelling the password reset */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, p: 1, mr: 2 }}
              >
                Reset Password
              </Button>
              <Button
                onClick={() => navigate(-1)}
                fullWidth
                variant="outlined"
                sx={{
                  mt: 1,
                  p: 1,
                  backgroundColor: "transparent",
                  ":hover": {
                    backgroundColor: "transparent",
                    borderColor: "#973AA8",
                  },
                  color: "#973AA8",
                  borderColor: "#973AA8",
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        // Message layout shown after successfully requesting a password reset
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: "4rem",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center", // Center align the text
            }}
          >
            If an account with that email was found, we&rsquo;ve sent a reset
            link.
          </Typography>
          <Button
            sx={{
              mt: 2,
            }}
            variant="contained"
            onClick={() => navigate(-1)}
          >
            Sign In
          </Button>
        </Box>
      )}
    </>
  );
};

export default ForgotPassword;
