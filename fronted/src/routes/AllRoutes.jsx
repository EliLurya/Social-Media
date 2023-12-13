import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import Myposts from "../componnets/features/myPosts/Myposts";

// Lazy load the page components
const HomePage = React.lazy(() => import("../pages/HomePage"));
const SelectedPostPage = React.lazy(() => import("../pages/SelectedPostPage"));

const AllRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        {/* For checking routes */}
        <Route path="/newPost" element={<Myposts />} />
        <Route path="/post/:username/:postId" element={<SelectedPostPage />} />
        <Route path="/" element={<Navigate to={ROUTES.HOME} />} />
        <Route path="/*" element={<Navigate to={ROUTES.HOME} />} />
      </Routes>
    </Suspense>
  );
};
const NotFoundPage = () => {
  return <div>404 - Page Not Found</div>; // Simple Not Found Component
};
export default AllRoutes;
