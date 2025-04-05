import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTableNumber, clearCart } from "../../redux/cartSlice"; // clearCart qo‘shildi
import axios from "../../api/axios";

// Naqd pulsiz to‘lov usullari
const paymentMethods = [
  { name: "Humo", value: "humo", image: "/humo.jpg" },
  { name: "Uzcard", value: "uzcard", image: "/uzcard.jpg" },
  { name: "Visa", value: "visa", image: "/visa.jpg" },
  { name: "Click", value: "click", image: "/click.jpg" },
  { name: "PayMe", value: "payme", image: "/payme.png" },
];

const Checkout = () => {
  const { items, totalPrice, finalPrice, tableNumber } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const serviceFee = parseFloat((totalPrice * 0.1).toFixed(0));
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [manualTableNumber, setManualTableNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const effectiveTableNumber = tableNumber || manualTableNumber;

  const handleConfirmOrder = async () => {
    if (!selectedPayment) {
      setError("Iltimos, to‘lov usulini tanlang.");
      return;
    }
    if (!effectiveTableNumber) {
      setError("Iltimos, stol raqamini kiriting.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderPayload = {
        table_number: Number(effectiveTableNumber),
        status_id: 1,
        orderitems: items.map((item) => ({
          product_id: Number(item.id),
          quantity: Number(item.quantity),
        })),
        total_price: totalPrice,
        service_fee: serviceFee,
        final_price: finalPrice,
        payment_method: selectedPayment,
      };

      const response = await axios.post("/orders/", orderPayload);
      console.log("Buyurtma muvaffaqiyatli yuborildi:", response.data);

      if (!tableNumber) {
        dispatch(setTableNumber(manualTableNumber)); // Qo‘lda kiritilgan bo‘lsa, Redux’ga saqlash
      }

      // Buyurtma yuborilgandan keyin cartni bo‘shatish
      dispatch(clearCart());

      navigate("/receipt");
    } catch (err) {
      setError("Buyurtmani yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
      console.error("Buyurtma xatosi:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-[var(--main-color)]/20 mb-[5rem] rounded-lg">
      <h1 className="text-2xl font-bold text-[var(--main-color)] mb-4">To‘lov usuli</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
      )}

      {/* Stol raqami kiritish (agar Redux’da yo‘q bo‘lsa) */}
      {!tableNumber && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stol raqami *
          </label>
          <input
            type="number"
            value={manualTableNumber}
            onChange={(e) => setManualTableNumber(e.target.value)}
            placeholder="Stol raqamini kiriting"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--main-color)] focus:border-[var(--main-color)]"
            required
          />
        </div>
      )}

      {/* To‘lov usullari */}
      <div className="space-y-4 mb-8">
        {paymentMethods.map((method) => (
          <label
            key={method.value}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-300 hover:bg-[var(--main-color)]/40 cursor-pointer"
          >
            <div className="flex items-center">
              {method.image ? (
                <img
                  src={method.image}
                  alt={method.name}
                  className="object-contain h-[2rem] mr-4"
                />
              ) : (
                <span className="text-gray-800 font-bold">{method.name}</span>
              )}
            </div>
            <input
              type="radio"
              name="payment"
              value={method.value}
              checked={selectedPayment === method.value}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="accent-[var(--main-color)]"
            />
          </label>
        ))}
      </div>

      {/* Chek */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-bold text-[var(--main-color)] mb-2">Chek</h2>
        <div className="mb-4 text-gray-800">Stol raqami: {effectiveTableNumber || "Kiritilmagan"}</div>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-gray-800">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>{(item.price * item.quantity).toLocaleString()} so‘m</span>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex justify-between text-gray-800">
            <span>Buyurtma:</span>
            <span>{totalPrice.toLocaleString()} so‘m</span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Servis haqqi (10%):</span>
            <span>{serviceFee.toLocaleString()} so‘m</span>
          </div>
          <div className="flex justify-between font-bold text-[var(--main-color)] mt-2">
            <span>Yakuniy summa:</span>
            <span>{finalPrice.toLocaleString()} so‘m</span>
          </div>
        </div>
      </div>

      {/* Tasdiqlash tugmasi */}
      <button
        onClick={handleConfirmOrder}
        disabled={loading}
        className={`mt-4 w-full py-2 bg-[var(--main-color)] text-white rounded ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:[var(--main-color)]/50"
        }`}
      >
        {loading ? "Yuborilmoqda..." : "Buyurtmani tasdiqlash"}
      </button>
    </div>
  );
};

export default Checkout;