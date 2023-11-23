import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * Custom hook for responsive design.
 *
 * @param {string} breakpoint - The breakpoint at which to check the screen size.
 *                              Defaults to 'md' (medium) if not provided.
 * @returns {boolean} - Returns true if the current screen size is at least as large as the specified breakpoint.
 */
const useResponsive = (breakpoint = "md") => {
  // Use the useTheme hook to access the Material-UI theme object.
  const theme = useTheme();

  // Use the useMediaQuery hook with the theme's breakpoints to determine
  // if the current screen size matches or exceeds the specified breakpoint.
  const matches = useMediaQuery(theme.breakpoints.up(breakpoint));

  // Return the result of the media query.
  // 'matches' will be true if the screen size is greater than or equal to the specified breakpoint.
  return matches;
};
export default useResponsive;
