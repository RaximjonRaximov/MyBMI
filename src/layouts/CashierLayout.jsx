import { Outlet } from "react-router-dom";

const CashierLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Yon panel (agar kerak bo‘lsa) */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold">Kassir Paneli</h2>
        <nav>
          <ul>
            <li><a href="/cashier">Buyurtmalar</a></li>
            <li><a href="/cashier/history">Tarix</a></li>
            <li><a href="/cashier/manual-order">Qo‘lda buyurtma</a></li>
            <li><a href="/cashier/profile">Profil</a></li>
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

export default CashierLayout;
