import { sendRequest } from "../utils/SendRequest";
import { OptionsUrl } from "../utils/OptionsUrl";

export const signUp = async (credentials) => {
  return sendRequest(OptionsUrl.signUp.url, {
    method: OptionsUrl.signUp.method,
    body: credentials,
  });
};

export const signIn = async (userData) => {
  return sendRequest(OptionsUrl.signIn.url, {
    method: OptionsUrl.signIn.method,
    body: userData,
  });
};

export const signInWithGoogle = async (token) => {
  return sendRequest(OptionsUrl.connectGoogle.url, {
    method: OptionsUrl.connectGoogle.method,
    body: { tokenGoogle: token },
  });
};

export const resetPassword = async (resetToken, newPassword) => {
  return sendRequest(OptionsUrl.newPasswordReset.url, {
    method: OptionsUrl.newPasswordReset.method,
    body: {
      resetToken: resetToken,
      newPassword: newPassword,
    },
  });
};

export const validateResetToken = async (token) => {
  return sendRequest(`${OptionsUrl.sendEmailPasswordReset.url}${token}`, {
    method: OptionsUrl.sendEmailPasswordReset.method,
  });
};

export const requestPasswordReset = async (data) => {
  return sendRequest(OptionsUrl.requestPasswordReset.url, {
    method: OptionsUrl.requestPasswordReset.method,
    body: data,
  });
};

export const signOut = async (data) => {
  return sendRequest(OptionsUrl.signOut.url, {
    method: OptionsUrl.signOut.method,
    body: data,
  });
};

export const checkAuth = async () => {
  return sendRequest(OptionsUrl.checkAuth.url, {
    method: OptionsUrl.checkAuth.method,
  });
};

export const refreshFireBaseToken = async () => {
  return sendRequest(OptionsUrl.refreshBasefireToken.url, {
    method: OptionsUrl.refreshBasefireToken.method
  });
};
