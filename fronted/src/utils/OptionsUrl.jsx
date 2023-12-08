export const OptionsUrl = {
  signUp: {
    url: "/users/signup",
    method: "POST",
  },
  signIn: {
    url: "/users/signin",
    method: "POST",
  },
  requestPasswordReset: {
    url: "/users/request-password-reset",
    method: "POST",
  },
  sendEmailPasswordReset: {
    url: "/users/validate-reset-token/",
    method: "GET",
  },
  newPasswordReset: {
    url: "/users/reset-password",
    method: "POST",
  },
  connectGoogle: {
    url: "/users/signupgoogle",
    method: "POST",
  },
  signOut: {
    url: "/users/signout",
    method: "POST",
  },
  checkAuth: {
    url: "/users/check-auth",
    method: "GET",
  },
  newPost: {
    url: "/user/action/newPost",
    method: "POST",
  },
};
