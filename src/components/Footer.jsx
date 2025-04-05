// src/components/Footer.jsx
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, List, UtensilsCrossed } from "lucide-react";
import { useSelector } from "react-redux";
import OrderButton from "./OrderButton";
import { AnimatePresence } from "framer-motion";

const Footer = () => {
  const location = useLocation();
  const { totalCount } = useSelector((state) => state.cart);

  return (
    <div>
      <AnimatePresence>
        <OrderButton />
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 w-full bg-[var(--bg-white)] shadow-[0px_-1px_5px_0px_#00000024] p-3 z-20 flex justify-center">
        <div className="max-w-[25rem] w-full flex justify-around items-center mx-auto">
          <Link
            to="/"
            className={`flex flex-col items-center ${
              location.pathname === "/" ? "text-[var(--main-color)]" : "text-[var(--grey-color)]"
            }`}
          >
            <UtensilsCrossed size={24} className="active:scale-110 transition-transform" />
            <span className="text-sm">Restoran</span>
          </Link>

          <Link
            to="/cart"
            className={`relative flex flex-col items-center ${
              location.pathname === "/cart" ? "text-[var(--main-color)]" : "text-[var(--grey-color)]"
            }`}
          >
            <ShoppingCart size={24} className="active:scale-110 transition-transform" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalCount}
              </span>
            )}
            <span className="text-sm">Cart</span>
          </Link>

          <Link
            to="/receipt"
            className={`flex flex-col items-center ${
              location.pathname === "/receipt" ? "text-[var(--main-color)]" : "text-[var(--grey-color)]"
            }`}
          >
            <List size={24} className="active:scale-110 transition-transform" />
            <span className="text-sm">Orders</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;