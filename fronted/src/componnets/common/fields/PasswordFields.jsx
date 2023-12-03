import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { addErrorIntoField } from "./UtilsFields";
import ErrorMessage from "../../common/ErrorMessage";

// PasswordFields component for rendering a password input with show/hide functionality
const PasswordFields = ({ label, name, control, errors }) => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Function to toggle the visibility of the password
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <FormControl fullWidth sx={{ mb: "1rem" }}>
      {/* Controller from react-hook-form to manage the TextField state */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            {...addErrorIntoField(errors[name])} // Adding error handling
            label={label}
            type={showPassword ? "text" : "password"} // Toggle between text and password type
            variant="filled"
            size="medium"
            // required
            sx={{
              ".MuiInput-root": {
                "&.Mui-focused": {
                  borderColor: "white",
                },
              },
              ".MuiFilledInput-root": {
                backgroundColor: "white",
                borderRadius: "20px",
                "&:before": { borderBottom: "none" },
                "&:after": { borderBottom: "none" },
                "&.Mui-focused": { backgroundColor: "white" }, // Maintain background on focus
                "&:hover": {
                  backgroundColor: "white", // Maintain background on hover
                },
              },
              ".MuiInputLabel-root": {
                color: "black",
                "&.Mui-focused": {
                  color: "primary",
                },
              },
            }}
            InputProps={{
              disableUnderline: true,
              sx: {
                border: (theme) =>
                  `${theme.palette.primary.AuxiliaryColor} solid 1px`,
                backgroundColor: "white",
                color: "black",
                borderRadius: "20px",
              },
              endAdornment: (
                // Add an icon button inside the TextField
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={(e) => e.preventDefault()} // Prevent focus state on click
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            autoComplete="current-password"
          />
        )}
      />
      {/* Display an error message if there's an error */}
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </FormControl>
  );
};

export default PasswordFields;
