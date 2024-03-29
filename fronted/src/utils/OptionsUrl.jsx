const options = {
  GET: "GET",
  POST: "POST",
  PUT:"PUT",
  DELETE:"DELETE"
};

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
  refreshBasefireToken: {
    url: "/users/refresh-firebase-token",
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
  getPost: {
    url: "/user/action/getPost",
    method: options.POST,
  },
  userPosts: {
    url: "/user/action/posts",
    method: options.GET,
  },
  addOrRemovelLikes: {
    url: "/user/action/updatePost/",
    method: options.PUT,
  },
  updatePost: {
    url: "/user/action/updatePost/",
    method: options.PUT,
  },
  removePost: {
    url: "/user/action/deletePost/",
    method: options.DELETE,
  },
  createComment: {
    url: "/user/action/newComment/",
    method: options.POST,
  },
};
