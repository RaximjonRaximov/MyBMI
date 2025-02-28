import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingCart, List, UtensilsCrossed } from "lucide-react";

const Footer = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[var(--bg-white)] shadow-[0px_-1px_5px_0px_#00000024] p-3 flex justify-around items-center z-20">
      <Link 
        to="/" 
        className={`flex flex-col items-center ${location.pathname === "/" ? "text-[var(--main-color)]" : "text-[var(--grey-color)]"}`}
      >
        <UtensilsCrossed size={24} className=" active:scale-110 transition-transform" />
        <span className="text-sm">Restoran</span>
      </Link>
      <Link 
        to="/cart" 
        className={`flex flex-col items-center ${location.pathname === "/cart" ? "text-[var(--main-color)]" : "text-[var(--grey-color)]"}`}
      >
        <ShoppingCart size={24} className=" active:scale-110 transition-transform"/>
        <span className="text-sm">Cart</span>
      </Link>
      <Link 
        to="/receipt" 
        className={`flex flex-col items-center ${location.pathname === "/receipt" ? "text-[#8D7BFE]" : "text-[#95919f]"}`}
      >
        <List size={24} className=" active:scale-110 transition-transform"/>
        <span className="text-sm">Orders</span>
      </Link>
    </div>
  );
};

export default Footer;
