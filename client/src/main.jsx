import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from 'react-helmet-async';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <GoogleOAuthProvider clientId="457908479853-6aaq58dll93iq1oakn4od2v9rqrhfavc.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
