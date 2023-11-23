import { FormControl, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { addErrorIntoField } from "./UtilsFields";
import ErrorMessage from "../ErrorMessage";

// TextFields component for rendering a text input field with error handling
const TextFields = ({ label, name, control, errors }) => {
  return (
    <FormControl fullWidth sx={{ mb: "1rem" }}>
      {/* Controller from react-hook-form to manage the TextField state */}
      <Controller
        name={name} 
        control={control} // Control object from useForm
        render={({ field }) => (
          <TextField
            {...field} // Spread field properties into TextField
            {...addErrorIntoField(errors[name])} // Adding error handling
            label={label} 
            required 
            variant="filled" 
            size="medium" 
            sx={{
              ".MuiInput-root": {
                "&.Mui-focused": {
                  borderColor: "transparent", 
                },
              },
              ".MuiFilledInput-root": {
                // Styles for filled variant
                backgroundColor: "white", 
                borderRadius: "20px", 
                "&:before": { borderBottom: "none" }, // Remove underline
                "&:after": { borderBottom: "none" }, // Remove underline on focus
                "&.Mui-focused": { backgroundColor: "white" }, // Maintain background on focus
              },
              ".MuiInputLabel-root": {
                // Styles for the label
                color: "black",
                "&.Mui-focused": {
                  color: "#47126B", // Color when focused
                },
              },
            }}
            InputProps={{ disableUnderline: true }} // Disable the underline
            inputProps={{
              // Additional props for the input element
              autoComplete: name, // Autocomplete attribute
              style: {
                // Custom styles for the input element
                border: "#e0d3e1 solid 1px",
                backgroundColor: "white",
                color: "black",
                borderRadius: "20px",
              },
            }}
          />
        )}
      />
      {/* Display error message if there's an error */}
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </FormControl>
  );
};

export default TextFields;
