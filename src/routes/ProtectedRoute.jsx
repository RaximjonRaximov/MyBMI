// src/routes/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, roleId, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isStaffRoute = location.pathname.startsWith("/staff");

  // If the route is not admin or staff, allow access (user routes are public)
  if (!isAdminRoute && !isStaffRoute) {
    return <Outlet />;
  }

  // If the user is not authenticated, redirect to login for admin/staff routes
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Protect admin routes (roleId: 1)
  if (isAdminRoute && roleId !== 1) {
    return <Navigate to="/" replace />;
  }

  // Protect staff routes (roleId: 2)
  if (isStaffRoute && roleId !== 2) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;