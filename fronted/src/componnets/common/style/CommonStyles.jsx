export const getFlexStyles = (direction = "column", additionalStyles = {}) => {
  return {
    display: "flex",
    flexDirection: direction,
    alignItems: "center",
    ...additionalStyles, // This spreads additional styles, allowing for overrides or extensions
  };
};

export const getHoverButton = ( additionalStyles = {}) => {
  return {
    backgroundColor: "transparent",
    ":hover": {
      backgroundColor: (theme) => theme.palette.secondary.main,
      color: "white",
      borderColor: (theme) => theme.palette.secondary.main,
    },
    color: (theme) => theme.palette.secondary.main,
    borderColor: (theme) => theme.palette.secondary.main,
    ...additionalStyles, // This spreads additional styles, allowing for overrides or extensions
  };
};
