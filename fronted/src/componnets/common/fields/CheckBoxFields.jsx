import { FormControlLabel, Checkbox } from "@mui/material";
import { Controller } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

// CheckBoxFields component for rendering a checkbox with label and error message
const CheckBoxFields = ({ name, control, errors }) => {
  return (
    <>
      {/* Controller from react-hook-form to manage checkbox state */}
      <Controller
        name={name} // Name of the field
        control={control} // Control object from useForm
        render={({ field }) => (
          // FormControlLabel to render the checkbox with a label
          <FormControlLabel
            control={
              // Custom styled Checkbox component
              <Checkbox
                sx={{
                  color: "#47126B", // Custom color
                  "&.Mui-checked": {
                    color: "#47126B", // Custom color when checked
                  },
                }}
                {...field} // Spread field properties into Checkbox
                required 
              />
            }
            label="I agree to our Terms, and Privacy Policy"
          />
        )}
      />
      {/* Display error message if there's an error for this field */}
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </>
  );
};

export default CheckBoxFields;
