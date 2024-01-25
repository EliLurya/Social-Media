import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ROUTES } from "../utils/routes";
import VerificationUser from "../componnets/auth/VerificationUser";
import LoadingPage from "../utils/loadingPage/LoadingPage";

// Lazy load the page components
const ForgotPasswordPage = React.lazy(() =>
  import("../pages/ForgotPasswordPage")
);
const NewPasswordPage = React.lazy(() => import("../pages/NewPasswordPage"));
const SignPage = React.lazy(() => import("../pages/SignPage"));
const SignRoutes = () => {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <Suspense fallback={<LoadingPage></LoadingPage>}>
        <Routes>
          <Route
            path={ROUTES.REQUEST_PASSWORD_RESET}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={ROUTES.VAREFECATION_USER}
            element={<VerificationUser />}
          />
          <Route path={ROUTES.SIGN} element={<SignPage />} />

          <Route path="/reset-password/:token" element={<NewPasswordPage />} />
          <Route path="/*" element={<Navigate to={ROUTES.SIGN} />} />
        </Routes>
      </Suspense>
    </GoogleOAuthProvider>
  );
};

export default SignRoutes;
