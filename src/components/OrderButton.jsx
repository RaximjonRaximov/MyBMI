import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const OrderButton = () => {
  const { totalPrice, totalCount } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AnimatePresence>
      {/* totalCount 0 bo'lsa ham animatsiya bilan yo'qoladi */}
      {location.pathname==="/" && totalCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }} // Yo'qolish animatsiyasi
          transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          className="fixed bottom-[5rem] left-0 right-0 flex justify-center"
        >
          <div className="max-w-[90%] w-full shadow-lg flex items-center justify-between bg-[var(--main-color)] text-[var(--white-color)] py-3 px-5 rounded-full transition-transform transform hover:scale-105">
            <span className="bg-[var(--white-color)] text-[var(--main-color)] font-bold w-7 h-7 flex items-center justify-center rounded-full">
              {totalCount}
            </span>
            <button
              onClick={() => navigate("/cart")}
              className="flex-1 text-center font-semibold text-lg"
            >
              To'lash
            </button>
            <span className="font-semibold">{totalPrice.toLocaleString()} сум</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderButton;