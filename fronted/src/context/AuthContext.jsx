import { createContext, useContext, useEffect, useState } from "react";
import * as userService from "../services/userService";

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component to provide authentication context to its children
export default function AuthProvider({ children }) {
  // State to track sign-up, sign-in status, and any errors
  const [signUpSuccessful, setSignUpSuccessful] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState("");
  const [signInSuccessful, setSignInSuccessful] = useState(false);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await userService.checkAuth();
        if (response.success) {
          setSignInSuccessful(true);
        } else {
          setSignInSuccessful(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setSignInSuccessful(false);
      }
    };
    verifyUser();
  }, []);

  // Reset the sign-up error message
  const resetErrorSignUp = () => {
    setErrorSignUp("");
  };

  // Function to handle user sign-up
  const signUp = async (credentials) => {
    try {
      const response = await userService.signUp(credentials);
      if (!response.success) {
        setErrorSignUp(response.message);
        return;
      }
      if (response.success) {
        setSignUpSuccessful(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle user sign-in
  const signIn = async (credentials) => {
    try {
      const response = await userService.signIn(credentials);
      if (!response.success) {
        return;
      }
      setSignInSuccessful(true);

      // setToken(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle user sign-out

  const signOut = async () => {
    try {
      const response = await userService.signOut();
      if (!response.success) {
        console.error(response.error);
      }
      setSignInSuccessful(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle Google sign-in success
  const handleLoginSuccessGoogle = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const response = await userService.signInWithGoogle(token);
      if (response.success) setSignInSuccessful(true);
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        signUpSuccessful,
        setSignUpSuccessful,
        errorSignUp,
        resetErrorSignUp,
        signInSuccessful,
        handleLoginSuccessGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the authentication context
export function useAuth() {
  return useContext(AuthContext);
}
