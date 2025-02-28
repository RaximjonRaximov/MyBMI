import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <header>
        <h1>Admin Panel</h1>
        {/* Navigatsiya yoki yon menyu qo'shish mumkin */}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
