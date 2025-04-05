import React, { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const StaffLayout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-green-600 p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Staff Dashboard</h1>
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
              to="/staff/preparation"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition duration-200 ${
                  isActive
                    ? "bg-green-500 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              Preparation
            </NavLink>
            <NavLink
              to="/staff/delivery"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition duration-200 ${
                  isActive
                    ? "bg-green-500 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              Delivery
            </NavLink>

            <NavLink
              to="/staff/order-history"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition duration-200 ${
                  isActive
                    ? "bg-green-500 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              Order History
            </NavLink>
            <NavLink
              to="/staff/manual-order"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition duration-200 ${
                  isActive
                    ? "bg-green-500 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              Manual Order
            </NavLink>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StaffLayout;