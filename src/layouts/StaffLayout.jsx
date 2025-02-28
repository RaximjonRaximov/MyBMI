import { Outlet } from "react-router-dom";

const StaffLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Yon panel */}
      <aside className="w-64 bg-blue-800 text-white p-4">
        <h2 className="text-lg font-bold">Xodim Paneli</h2>
        <nav>
          <ul>
            <li><a href="/staff">Tayyorlanayotgan buyurtmalar</a></li>
            <li><a href="/staff/delivery">Yetkazib berish</a></li>
            <li><a href="/staff/history">Tarix</a></li>
            <li><a href="/staff/profile">Profil</a></li>
          </ul>
        </nav>
      </aside>

      {/* Asosiy kontent */}
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default StaffLayout;
