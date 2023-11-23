// Utility function to add error properties to form fields
export const addErrorIntoField = (errors) =>
  errors ? { error: true } : { error: false };

// Regular expression for password validation
export const pawdRagExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;
