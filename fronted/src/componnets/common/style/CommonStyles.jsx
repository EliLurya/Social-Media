export const getFlexStyles = (direction = "column", additionalStyles = {}) => {
  return {
    display: "flex",
    flexDirection: direction,
    alignItems: "center",
    ...additionalStyles, // This spreads additional styles, allowing for overrides or extensions
  };
};