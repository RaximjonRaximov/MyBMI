import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

// Import layouts
import AdminLayout from "./layouts/AdminLayout";
import StaffLayout from "./layouts/StaffLayout";
import UserLayout from "./layouts/UserLayout";

// Import pages
import Login from "./pages/Login";
import ManageFoods from "./pages/admin/ManageFoods";
import ManageStaff from "./pages/admin/ManageStaff";
import AdminProfile from "./pages/admin/AdminProfile";
import Delivery from "./pages/staff/Delivery";
import Preparation from "./pages/staff/Preparation";
import StaffOrderHistory from "./pages/staff/StaffOrderHistory";
import ManualOrder from "./pages/staff/ManualOrder"; // Updated import path
// User pages
import Home from "./pages/user/Home";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import OrderReceipt from "./pages/user/OrderReceipt";
import Terms from "./pages/user/Terms";

const App = () => {
  return (
    <Routes>
      {/* Public Routes (User Layout) */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/receipt" element={<OrderReceipt />} />
        <Route path="/terms" element={<Terms />} />
      </Route>

      <Route path="/login" element={<Login />} /> {/* Login route outside UserLayout */}

      {/* Admin Routes (Protected, with Admin Layout) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminProfile />} />
          <Route path="/admin/manage-foods" element={<ManageFoods />} />
          <Route path="/admin/manage-staff" element={<ManageStaff />} />
        </Route>
      </Route>

      {/* Staff Routes (Protected, with Staff Layout) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<StaffLayout />}>
          <Route path="/staff/delivery" element={<Delivery />} />
          <Route path="/staff/preparation" element={<Preparation />} />
          <Route path="/staff/order-history" element={<StaffOrderHistory />} />
          <Route path="/staff/manual-order" element={<ManualOrder />} /> {/* Updated route path */}
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default App;