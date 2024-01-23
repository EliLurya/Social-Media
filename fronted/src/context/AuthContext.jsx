import { createContext, useContext, useEffect, useState } from "react";
import * as userService from "../services/userService";
import { getAuth, signInWithCustomToken } from "firebase/auth";

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component to provide authentication context to its children
export default function AuthProvider({ children }) {
  // State to track sign-up, sign-in status, and any errors
  const [signUpSuccessful, setSignUpSuccessful] = useState(false);
  const [signInSuccessful, setSignInSuccessful] = useState(false);
  const [signUpCodeReq, setSignUpCodeReq] = useState(false);
  const [dataSignUp, setDataSignUp] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await userService.checkAuth();
        setSignInSuccessful(response.success);
      } catch (error) {
        setSignInSuccessful(false);
      }
      setIsLoading(false);
    };
    verifyUser();
  }, []);

  // Function to handle user sign-up
  const signUp = async (credentials) => {
    console.log(credentials);

    try {
      const response = await userService.signUp(credentials);
      if (!response.success) {
        return response;
      }
      if (response.success) {
        if (signUpCodeReq) setSignUpSuccessful(true);
        else {
          delete credentials.validateOnly;
          setDataSignUp(credentials);
          return response;
        }
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
      const auth = getAuth();
      //Token for firebaseToken
      await signInWithCustomToken(auth, response.firebaseToken);

      setSignInSuccessful(true);
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
      if (response.success) {
        const auth = getAuth();
        //Token for firebaseToken
        await signInWithCustomToken(auth, response.firebaseToken);
        setSignInSuccessful(true);
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  // Function to refresh the Firebase token
  const refreshFirebaseToken = async () => {
    try {
      const response = await userService.refreshFireBaseToken(); // Implement this method in your userService
      if (response.success) {
        const auth = getAuth();
        await signInWithCustomToken(auth, response.firebaseToken);
        console.log("Firebase token refreshed successfully.");
        return response.firebaseToken;
      }
    } catch (error) {
      console.error("Error refreshing Firebase token:", error);
      throw error;
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
        signInSuccessful,
        handleLoginSuccessGoogle,
        dataSignUp,
        setSignUpCodeReq,
        isLoading,
        refreshFirebaseToken,
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
