import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextFields from "../common/fields/TextFields";
import { getFlexStyles, getHoverButton } from "../common/style/CommonStyles";
import useResponsive from "../../utils/useResponsive";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Schema for validation using Yup
const schema = yup.object({
  userVerificationCode: yup.string().required("Code is required"),
});

const VerificationUser = () => {
  // useForm hook to manage form state and handle form submission
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      userVerificationCode: "",
    },
    resolver: yupResolver(schema),
  });

  const matches = useResponsive(); // Custom hook for responsive design
  const navigate = useNavigate(); // Hook for programmatic navigation
  const { dataSignUp, signUp } = useAuth(); // Auth context

  // Function to handle form submission
  const onSubmit = async (data) => {
    clearErrors();
    // Combine user input code with sign-up data
    const combinedData = { ...dataSignUp, ...data, validateOnly: false };
    try {
      const result = await signUp(combinedData);
      // Navigate based on the result of verification
      if (result.success) {
        navigate("/sign"); // Navigate to sign-in page on success
      } else {
        // Set error message if verification fails
        setError("userVerificationCode", {
          type: "manual",
          message: "The verification code is incorrect or expired.",
        });
      }
    } catch (error) {
      console.error("Error during verification:", error);
    }
  };

  return (
    <>
      <Box sx={getFlexStyles("column", { mt: "3rem" })}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Enter the code you received in the email
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ width: matches ? "40%" : "100%", mt: "2rem" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* User input field for the verification code */}
          <TextFields
            name="userVerificationCode"
            control={control}
            label="Your code"
            errors={errors}
          />
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {/* Submit button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, p: 1, mr: 2 }}
            >
              Send
            </Button>
            {/* Cancel button */}
            <Button
              onClick={() => navigate(-1)}
              fullWidth
              variant="outlined"
              sx={getHoverButton({ mt: 1, p: 1 })}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default VerificationUser;
