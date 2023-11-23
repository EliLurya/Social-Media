import React, { Suspense } from "react";
import {  Route, Routes } from "react-router-dom";

// Lazy load the page components
const HomePage = React.lazy(() => import("../pages/HomePage"));
const SelectedPostPage = React.lazy(() => import("../pages/SelectedPostPage"));

const AllRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/post/:username/:postId" element={<SelectedPostPage />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;

