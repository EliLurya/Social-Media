import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Creating a customized Alert component based on MuiAlert
// The 'forwardRef' is used to forward refs to the MuiAlert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// SignInFailed component displays an error alert message
export default function SignInFailed({ setFailedSign }) {
  const [open, setOpen] = React.useState(true); // State to control the visibility of the Snackbar

  // handleClose is called when the Snackbar needs to close
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // Do not close the Snackbar if the user clicks away
    }
    setOpen(false); // Close the Snackbar
    if (setFailedSign) setFailedSign(false); // Reset failed sign-in state, if the function is provided
  };

  return (
    <Snackbar
      open={open} // The Snackbar is open based on the 'open' state
      autoHideDuration={12000} // Snackbar will auto-hide after 12000 milliseconds (12 seconds)
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // Positioned at the top-center
      sx={{ top: { xs: "40%" } }}
    >
      <Alert onClose={handleClose} severity="error">
        Email and Password don&rsquo;t match
      </Alert>
    </Snackbar>
  );
}
