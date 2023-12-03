import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ROUTES } from "../utils/routes";
import VerificationUser from "../componnets/auth/VerificationUser";

// Lazy load the page components
const ForgotPasswordPage = React.lazy(() =>
  import("../pages/ForgotPasswordPage")
);
const NewPasswordPage = React.lazy(() => import("../pages/NewPasswordPage"));
const SignPage = React.lazy(() => import("../pages/SignPage"));
const SignRoutes = () => {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <Suspense>
        <Routes>
          <Route
            path="/request-password-reset"
            element={<ForgotPasswordPage />}
          />
          <Route path="/varification-user" element={<VerificationUser />} />
          <Route path="/sign" element={<SignPage />} />

          <Route path="/reset-password/:token" element={<NewPasswordPage />} />
          <Route path="/*" element={<Navigate to={"/sign"} />} />
        </Routes>
      </Suspense>
    </GoogleOAuthProvider>
  );
};

export default SignRoutes;
