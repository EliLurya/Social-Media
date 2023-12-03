import { createTheme } from "@mui/material/styles";
import ThemeButton from "./ThemeButton";

// This code creates a custom theme for Material-UI components using the createTheme function
const lightTheme = createTheme(
  {
    palette: {
      primary: {
        main: "#47126B",
        mainText: "#47126B",
        bg:"red",
        AuxiliaryColor: "#e0d3e1",
        liteColor: "#F7F5F9",
        bright: "#ffffff",
      },
      secondary: {
        main: "#973AA8",
        contrastText: "#6411AD",
      },
      menu: {
        choice: "#e0d3e1",
        textChoice: "#47126B",
        hoverMenu: "#f7f5f9",
      },
    },
  },
  ThemeButton
);

const darkTheme = createTheme(
  {
    palette: {
      primary: {
        main: "#47126B",
        mainText: "#ecebec",
        AuxiliaryColor: "#ECEBEC",
        liteColor: "#F7F5F9",
        bright: "#000",
      },
      secondary: {
        main: "#973AA8",
        contrastText: "#6411AD",
      },
      background: {
        default: "#000000", // This sets the default background to black
        paper: "#1a1a1a", // This sets background of components like Card, Paper to a slightly lighter black
      },
      text: {
        primary: "#ffffff", // Text color that contrasts with black background
        secondary: "#cccccc", // Secondary text color
      },
      menu: {
        choice: "#413e43",
        textChoice: "#973AA8",
        hoverMenu: "#413e43",
      },
    },
  },
  ThemeButton
);

export { lightTheme, darkTheme };
