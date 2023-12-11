const options = {
  GET : "GET",
  POST : "POST",
}

export const OptionsUrl = {
  signUp: {
    url: "/users/signup",
    method: options.POST,
  },
  signIn: {
    url: "/users/signin",
    method: options.POST,
  },
  requestPasswordReset: {
    url: "/users/request-password-reset",
    method: options.POST,
  },
  sendEmailPasswordReset: {
    url: "/users/validate-reset-token/",
    method: options.GET,
  },
  newPasswordReset: {
    url: "/users/reset-password",
    method: options.POST,
  },
  connectGoogle: {
    url: "/users/signupgoogle",
    method: options.POST,
  },
  signOut: {
    url: "/users/signout",
    method: options.POST,
  },
  checkAuth: {
    url: "/users/check-auth",
    method: options.GET,
  },
  newPost: {
    url: "/user/action/newPost",
    method: options.POST,
  },
  allPosts: {
    url: "/user/action/feed",
    method: options.GET,
  },
};
