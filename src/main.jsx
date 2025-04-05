// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Use BrowserRouter
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./context/AuthContext";
import App from "./App"; // Correct import
import "./index.css";

// Use createRoot instead of ReactDOM.createRoot
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <AuthProvider>
        <App /> {/* Correct reference to App */}
      </AuthProvider>
    </Router>
  </Provider>
);