import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTableNumber } from "../../redux/cartSlice";
import axios from "../../api/axios";

const OrderReceipt = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { tableNumber } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Stol raqamini so‘rash funksiyasi
  const promptTableNumber = () => {
    let input;
    do {
      input = prompt("Iltimos, stol raqamini kiriting (faqat raqam):");
      if (input === null) return null;
      input = input.trim();
    } while (!input || isNaN(input) || Number(input) <= 0);
    return Number(input);
  };

  // Table number’ni tekshirish va saqlash
  useEffect(() => {
    const storedTableNumber = sessionStorage.getItem("tableNumber");
    if (!tableNumber) {
      if (storedTableNumber) {
        dispatch(setTableNumber(storedTableNumber));
      } else {
        const promptedTableNumber = promptTableNumber();
        if (promptedTableNumber) {
          dispatch(setTableNumber(promptedTableNumber));
        } else {
          setError("Stol raqami kiritilmadi.");
        }
      }
    }
  }, [tableNumber, dispatch]);

  // Buyurtmalarni yuklash funksiyasi
  const fetchOrders = async () => {
    if (!tableNumber) return;

    setLoading(true);
    try {
      const response = await axios.get("/orders/");
      const filteredOrders = response.data.filter(
        (order) => order.table_number === Number(tableNumber)
      );
      setOrders(filteredOrders);
    } catch (err) {
      setError("Buyurtmalarni yuklashda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  // Har minutda API’ga so‘rov yuborish
  useEffect(() => {
    fetchOrders(); // Dastlabki yuklash

    const intervalId = setInterval(() => {
      fetchOrders(); // Har 60 soniyada yangilash
    }, 60000); // 60,000 ms = 1 minut

    // Komponent yopilganda intervalni tozalash
    return () => clearInterval(intervalId);
  }, [tableNumber]);

  // Buyurtma summasini hisoblash
  const calculateOrderSummary = (order) => {
    const totalPrice = order.total_price || 0;
    const serviceFee = totalPrice * 0.1;
    const finalPrice = totalPrice + serviceFee;
    return { totalPrice, serviceFee, finalPrice };
  };

  // Narxni formatlash
  const formatPrice = (price) => {
    if (!price) return "0 so'm";
    const numPrice = Number(price);
    return `${Math.round(numPrice).toLocaleString()} so'm`;
  };

  // Sana va vaqtni ajratib formatlash
  const formatDateTime = (dateString) => {
    if (!dateString) return { date: "Noma'lum", time: "Noma'lum" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = date.toLocaleTimeString("uz-UZ", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { date: formattedDate, time: formattedTime };
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-[var(--main-color)]/20 rounded-xl min-h-screen flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-green-600 mb-6 text-center">
        Buyurtmalaringiz {tableNumber ? `(Stol ${tableNumber})` : ""}
      </h1>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-800 rounded-lg text-center text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-600">Yuklanmoqda...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-600">Buyurtmalar yo‘q.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const { totalPrice, serviceFee, finalPrice } = calculateOrderSummary(order);
            const { date, time } = formatDateTime(order.order_time);
            return (
              <div key={order.id} className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Buyurtma #{order.id}
                </h2>
                <div className="space-y-3 text-sm text-gray-800">
                  <div>
                    {order.orderitems.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>
                          {item.product.name} x {item.quantity}
                        </span>
                        <span>{formatPrice(item.subtotal)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span>Jami:</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Xizmat haqqi (10%):</span>
                      <span>{formatPrice(serviceFee)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-green-600 mt-2">
                      <span>Yakuniy narx:</span>
                      <span>{formatPrice(finalPrice)}</span>
                    </div>
                  </div>
                  <p>
                    <strong>Sana:</strong> {date}
                  </p>
                  <p>
                    <strong>Vaqt:</strong> {time}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status.name || "Noma'lum"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && orders.length > 0 && (
        <p className="text-center text-gray-600 text-xs mt-6">
          Buyurtmalaringiz tayyorlanmoqda. Iltimos, stolingizda kuting.
        </p>
      )}
    </div>
  );
};

export default OrderReceipt;