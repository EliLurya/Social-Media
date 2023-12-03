import { Box, Button, Typography } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextFields from "../../../common/fields/TextFields";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as userService from "../../../../services/userService";
import {
  getFlexStyles,
  getHoverButton,
} from "../../../common/style/CommonStyles";
import { ROUTES } from "../../../../utils/routes";

// Schema for validating the email field
const schema = yup.object({
  email: yup.string().required("Email is required").email(),
});

const ForgotPassword = () => {
  // useForm hook to manage form state and handle form submission
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: { email: "" },
    resolver: yupResolver(schema),
  });

  // State variables
  const [userMessage, setUserMessage] = useState(false); // To display the message after form submission
  const [requestedEmail, setRequestedEmail] = useState(""); // To keep track of the email entered
  const [lastEmailSentTime, setLastEmailSentTime] = useState(null); // To track the time of the last email sent
  const [canResendEmail, setCanResendEmail] = useState(true); // To control the button's disabled state
  const navigate = useNavigate(); // For programmatic navigation
  const RESEND_EMAIL_TIME_LIMIT = 10 * 1000; // Time limit for resending email (10 seconds)

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      setRequestedEmail(data.email);
      const response = await userService.requestPasswordReset(data);
      if (response.success) {
        setUserMessage(true); // Display a message after successful submission
        setLastEmailSentTime(new Date().getTime());
      }
    } catch (error) {
      console.error("Error in sending reset email:", error);
    }
  };

  // Function to resend the password reset email
  const handleResendPasswordResetEmail = async () => {
    if (!requestedEmail || !canResendEmail) return; // Don't proceed if no email or if resend is not allowed yet
    try {
      const response = await userService.requestPasswordReset({
        email: requestedEmail,
      });
      if (response.success) {
        setLastEmailSentTime(new Date().getTime());
        setCanResendEmail(false); // Disable the resend button
      }
    } catch (error) {
      console.error("Error in resending reset email:", error);
    }
  };

  // Effect to re-enable the resend button after the time limit
  useEffect(() => {
    let timer;
    if (lastEmailSentTime) {
      timer = setTimeout(() => {
        setCanResendEmail(true);
      }, RESEND_EMAIL_TIME_LIMIT);
    }
    return () => clearTimeout(timer); // Clean up the timer
  }, [lastEmailSentTime]);

  return (
    <>
      {!userMessage ? (
        <Box sx={getFlexStyles("column", { m: 2 })}>
          <Typography
            variant="h4"
            sx={{
              color: (theme) => theme.palette.primary.AuxiliaryColor,
              fontWeight: "bold",
              textDecoration: "underline",
              mt: "3rem",
            }}
          >
            Reset Password
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ maxWidth: "400px", width: "100%", mt: "2rem" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextFields
              control={control}
              name="email"
              label="Email"
              errors={errors}
            />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                sx={getHoverButton({ mt: 1, p: 1 })}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={getFlexStyles("column", { mt: "4rem" })}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            If an account with that email was found, we&apos;ve sent a reset
            link.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
            <Button
              onClick={() => navigate(ROUTES.SIGN)}
              fullWidth
              variant="contained"
              sx={{ mt: 1, p: 1, mr: 2 }}
            >
              Sign In
            </Button>
            <Button
              onClick={handleResendPasswordResetEmail}
              disabled={!canResendEmail}
              title={!canResendEmail ? "Wait 10 seconds to resend" : ""}
              fullWidth
              variant="outlined"
              sx={getHoverButton({ mt: 1, p: 1 })}
            >
              I don&apos;t got the email
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ForgotPassword;
