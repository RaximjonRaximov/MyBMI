import React, { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminLayout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Admin Panel</h1>
          <button
            onClick={logout}
            className="text-white hover:text-gray-200 font-semibold bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-800 text-white p-6 shadow-lg">
          <nav className="space-y-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/admin/manage-foods"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              Manage Foods
            </NavLink>
            <NavLink
              to="/admin/manage-staff"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              Manage Staff
            </NavLink>
          </nav>
        </aside>
        <main className="flex-1 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;