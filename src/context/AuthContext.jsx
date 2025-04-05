// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roleId, setRoleId] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if the user is already logged in on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          refreshAccessToken(storedRefreshToken);
        } else {
          setAccessToken(token);
          setRefreshToken(storedRefreshToken);
          setRoleId(decodedToken.role_id);
          setIsAuthenticated(decodedToken.role_id === 1 || decodedToken.role_id === 2);
        }
      } catch (error) {
        console.error("Invalid token on app load:", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  // Function to refresh the access token using the refresh token
  const refreshAccessToken = async (refreshTokenToUse) => {
    try {
      const response = await axios.post("/refresh/", {
        refresh: refreshTokenToUse,
      });

      const { access } = response.data;
      const newAccessToken = access;

      localStorage.setItem("token", newAccessToken);
      setAccessToken(newAccessToken);

      const decodedToken = jwtDecode(newAccessToken);
      setRoleId(decodedToken.role_id);
      setIsAuthenticated(decodedToken.role_id === 1 || decodedToken.role_id === 2);

      console.log("Access token refreshed successfully:", response.data);
      console.log("Decoded New Access Token:", decodedToken);

      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh access token:", error.response?.data || error.message);
      logout();
      return null;
    }
  };

  // Set up a timer to refresh the token before it expires
  useEffect(() => {
    if (!accessToken || !refreshToken) return;

    const decodedToken = jwtDecode(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = (decodedToken.exp - currentTime) * 1000;
    const refreshThreshold = 5 * 60 * 1000;

    const timeout = setTimeout(() => {
      if (timeUntilExpiry > refreshThreshold) {
        return;
      }
      refreshAccessToken(refreshToken);
    }, Math.max(timeUntilExpiry - refreshThreshold, 0));

    return () => clearTimeout(timeout);
  }, [accessToken, refreshToken]);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post("/login/", {
        username,
        password,
      });

      const { access, refresh } = response.data;

      localStorage.setItem("token", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("isLoggedIn", "true");

      setAccessToken(access);
      setRefreshToken(refresh);

      const decodedToken = jwtDecode(access);
      setRoleId(decodedToken.role_id);
      setIsAuthenticated(decodedToken.role_id === 1 || decodedToken.role_id === 2);

      console.log("Login successful. Decoded Access Token:", decodedToken);

      if (decodedToken.role_id === 1) {
        navigate("/admin");
      } else if (decodedToken.role_id === 2) {
        navigate("/staff/delivery");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isLoggedIn");
    setAccessToken(null);
    setRefreshToken(null);
    setRoleId(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        roleId,
        accessToken,
        refreshToken,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;