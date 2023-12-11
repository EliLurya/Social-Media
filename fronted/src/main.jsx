import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CountextDataProvider from "./context/ContextData";
import  AuthProvider  from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
// When use with firebase, need initialized before any Firebase service is used 
import "./utils/imagesOperations/Firebase-config.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CountextDataProvider>
        <BrowserRouter>
          <App></App>
        </BrowserRouter>
      </CountextDataProvider>
    </AuthProvider>
  </React.StrictMode>
);
