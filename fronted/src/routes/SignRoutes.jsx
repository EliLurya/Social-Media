import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Lazy load the page components
const ForgotPasswordPage = React.lazy(() =>
  import("../pages/ForgotPasswordPage")
);
const NewPasswordPage = React.lazy(() => import("../pages/NewPasswordPage"));
const SignInPage = React.lazy(() => import("../pages/SignInPage"));
const SignUpPage = React.lazy(() => import("../pages/SignUpPage"));

const SignRoutes = () => {
  const { signUpSuccessful } = useAuth();

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <Suspense>
        <Routes>
          <Route
            path="/signup"
            element={
              signUpSuccessful ? <Navigate to="/signin" /> : <SignUpPage />
            }
          />
          <Route path="/signin" element={<SignInPage />} />
          <Route
            path="/request-password-reset"
            element={<ForgotPasswordPage />}
          />
          <Route path="/reset-password/:token" element={<NewPasswordPage />} />
          <Route path="/*" element={<Navigate to="/signin" />} />
        </Routes>
      </Suspense>
    </GoogleOAuthProvider>
  );
};

export default SignRoutes;
