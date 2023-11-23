import { createTheme } from "@mui/material/styles";
import ThemeButton from "./ThemeButton";

// This code creates a custom theme for Material-UI components using the createTheme function
const theme = createTheme(
  {
    // Here you can add other theme configurations that you might have
    // For example, you can define the palette, typography, breakpoints, etc.
  },
  ThemeButton // This imports custom configurations for the Button component
  // The ThemeButton object contains specific style overrides for the MuiButton component
  // It allows you to customize the appearance of all buttons in your application
);

export default theme;
