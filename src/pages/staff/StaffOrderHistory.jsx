import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

const StaffOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/orders/");
      const historyOrders = response.data.filter(
        (order) => order.status.id === 3
      );
      setOrders(historyOrders);
    } catch (err) {
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeleteAllOrders = async () => {
    if (window.confirm("Are you sure you want to delete all orders?")) {
      setLoading(true);
      try {
        await axios.post("/all/delete-orders/");
        setOrders([]); // Clear the orders list
        alert("All orders deleted successfully.");
      } catch (err) {
        setError("Failed to delete orders.");
      } finally {
        setLoading(false);
      }
    }
  };

  const calculateOrderSummary = (order) => {
    const totalPrice = order.total_price || 0;
    const serviceFee = totalPrice * 0.1;
    const finalPrice = totalPrice + serviceFee;
    return { totalPrice, serviceFee, finalPrice };
  };

  const formatPrice = (price) => {
    if (!price) return "0 so'm";
    const numPrice = Number(price);
    return `${Math.round(numPrice).toLocaleString()} so'm`;
  };

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
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-gray-100 to-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center tracking-tight">
          Staff Order History
        </h1>
        <button
          onClick={handleDeleteAllOrders}
          disabled={loading || orders.length === 0}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            loading || orders.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Delete All Orders
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg shadow-md text-sm font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-600">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-600">No orders in history.</div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {orders.map((order) => {
            const { totalPrice, serviceFee, finalPrice } = calculateOrderSummary(order);
            const { date, time } = formatDateTime(order.order_time);
            return (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] flex flex-col flex-between"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Order #{order.id} - Table {order.table_number}
                </h2>
                <div className="p-4 bg-white rounded-lg">
                  <h3 className="text-lg font-bold text-indigo-600 mb-2">Order Details</h3>
                  <div className="space-y-2">
                    {order.orderitems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-gray-800">
                            <span>
                              {item.product.name} x {item.quantity}
                            </span>
                            <span>{formatPrice(item.subtotal)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-gray-800">
                      <span>Subtotal:</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-gray-800">
                      <span>Service Fee (10%):</span>
                      <span>{formatPrice(serviceFee)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-indigo-600 mt-2">
                      <span>Final Price:</span>
                      <span>{formatPrice(finalPrice)}</span>
                    </div>
                    <div className="mt-2 text-gray-600">
                      <p><strong>Sana:</strong> {date}</p>
                      <p><strong>Vaqt:</strong> {time}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StaffOrderHistory;