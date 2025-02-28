import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import PrivateRoute from "./PrivateRoute";

import UserLayout from "../layouts/UserLayout";
import CashierLayout from "../layouts/CashierLayout";
import StaffLayout from "../layouts/StaffLayout";
import AdminLayout from "../layouts/AdminLayout";

import Login from "../pages/Login";

// User pages
import Home from "../pages/user/Home";
import Cart from "../pages/user/Cart";
import Checkout from "../pages/user/Checkout";
import OrderReceipt from "../pages/user/OrderReceipt";
import Terms from "../pages/user/Terms";

// Cashier pages
import CashierOrders from "../pages/cashier/CashierOrders";
import CashierOrderHistory from "../pages/cashier/CashierOrderHistory";
import ManualOrder from "../pages/cashier/ManualOrder";
import CashierProfile from "../pages/cashier/CashierProfile";

// Staff pages
import Preparation from "../pages/staff/Preparation";
import Delivery from "../pages/staff/Delivery";
import StaffOrderHistory from "../pages/staff/StaffOrderHistory";
import StaffProfile from "../pages/staff/StaffProfile";

// Admin pages
import Dashboard from "../pages/admin/Dashboard";
import ManageStaff from "../pages/admin/ManageStaff";
import ManageCashiers from "../pages/admin/ManageCashiers";
import AdminProfile from "../pages/admin/AdminProfile";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        {/* <Route  element={<AdminRoute />}> */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="manage-staff" element={<ManageStaff />} />
            <Route path="manage-cashiers" element={<ManageCashiers />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        {/* </Route> */}

        {/* User routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="receipt" element={<OrderReceipt />} />
          <Route path="terms" element={<Terms />} />
        </Route>

        {/* Cashier routes */}
        {/* <Route  element={<PrivateRoute />}> */}
          <Route path="/cashier" element={<CashierLayout />}>
            <Route index element={<CashierOrders />} />
            <Route path="history" element={<CashierOrderHistory />} />
            <Route path="manual-order" element={<ManualOrder />} />
            <Route path="profile" element={<CashierProfile />} />
          </Route>
        {/* </Route> */}

        {/* Staff routes */}
        {/* <Route  element={<PrivateRoute />}> */}
          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<Preparation />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="history" element={<StaffOrderHistory />} />
            <Route path="profile" element={<StaffProfile />} />
          </Route>
        {/* </Route> */}

        {/* Not Found Page */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
