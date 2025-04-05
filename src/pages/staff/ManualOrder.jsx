import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, removeItemCompletely } from "../../redux/cartSlice";

const ManualOrder = () => {
  const dispatch = useDispatch();
  const { items, totalPrice, finalPrice } = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/products/");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Format price for display
  const formatPrice = (price) => {
    if (!price) return "0 so'm";
    const numPrice = Number(price);
    return `${Math.round(numPrice).toLocaleString()} so'm`;
  };

  // Handle adding product to cart
  const handleAddToOrder = (product) => {
    // Format the product data to match what cartSlice expects
    const formattedProduct = {
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0, // Ensure price is a number
      image: product.image || "https://via.placeholder.com/100",
      description: product.description || "No description",
    };
    dispatch(addToCart(formattedProduct));
  };

  // Handle order submission using axios
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!tableNumber || items.length === 0) {
      setError("Please enter a table number and add at least one product to the order.");
      return;
    }

    // Prepare the order payload to match the API's expected format
    const orderData = {
      table_number: Number(tableNumber),
      status_id: 1,
      orderitems: items.map((item) => ({
        product_id: Number(item.id), // Ensure product_id is a number
        quantity: Number(item.quantity), // Ensure quantity is a number
      })),
    };

    console.log("Order payload being sent:", orderData); // Debug the payload

    try {
      const response = await axios.post("/orders/", orderData);
      console.log("Order response:", response.data); // Debug the response
      setSuccessMessage("Order placed successfully!");
      setTableNumber("");
      items.forEach((item) => dispatch(removeItemCompletely(item.id))); // Clear cart after order
    } catch (err) {
      console.error("Order error:", err.response?.data || err.message); // Debug the error
      setError("Failed to place order: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
        Manual Order
      </h1>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg shadow-md text-center text-sm font-medium">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg shadow-md text-sm font-medium">
          {error}
        </div>
      )}

      {/* Product Selection Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Products</h2>
        {loading ? (
          <div className="text-center text-gray-600">Loading products...</div>
        ) : (
          <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">ID</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Price</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Image</th>
                  <th className="py-3 px-4 text-right font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">{product.id}</td>
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">{formatPrice(product.price)}</td>
                    <td className="py-3 px-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                        onError={(e) => {
                          e.target.src = "/food.png";
                        }}
                      />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleAddToOrder(product)}
                        className="px-4 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 text-sm font-medium"
                      >
                        Add to Order
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Summary Section - Show only if items are selected */}
      {items.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-bold text-indigo-600 mb-2">Chek</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image || "https://via.placeholder.com/100"}
                    alt={item.name}
                    className="size-16 rounded-sm object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between text-gray-800">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>{(item.price * item.quantity).toLocaleString()} so‘m</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="text-sm text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      className="text-gray-600 transition hover:text-red-600"
                      onClick={() => dispatch(removeItemCompletely(item.id))}
                    >
                      <span className="sr-only">O'chirish</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
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
                <span>{(totalPrice * 0.1).toLocaleString()} so‘m</span>
              </div>
              <div className="flex justify-between font-bold text-indigo-600 mt-2">
                <span>Yakuniy summa:</span>
                <span>{finalPrice.toLocaleString()} so‘m</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table Number and Place Order */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Place Order</h2>
        <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Table Number *
            </label>
            <input
              type="number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Enter table number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 text-sm font-medium"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManualOrder;