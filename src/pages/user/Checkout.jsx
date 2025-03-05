import { useSelector } from "react-redux";
import { useState } from "react";

// Payment methods with placeholder image paths (replace with your actual image paths)
const paymentMethods = [
  { name: "Humo", value: "humo", image: "/humo.jpg" },
  { name: "Uzcard", value: "uzcard", image: "/uzcard.jpg" },
  { name: "Visa", value: "visa", image: "/visa.jpg" },
  { name: "Click", value: "click", image: "/click.jpg" },
  { name: "PayMe", value: "payme", image: "/payme.png" },
  { name: "Naqt pulda to'lash", value: "cash" }, // No image for cash payment
];

const Checkout = () => {
  const { items, totalPrice, finalPrice } = useSelector((state) => state.cart);
  const serviceFee = parseFloat((totalPrice * 0.1).toFixed(0)); // Calculate 10% service fee

  // State to store the selected payment method
  const [selectedPayment, setSelectedPayment] = useState(null);

  return (
    <div className="max-w-md mx-auto p-4 bg-[var(--main-color)]/20 mb-[5rem] rounded-lg">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-[var(--main-color)] mb-4">To'lov usuli</h1>

      {/* Payment Methods Section */}
      <div className="space-y-4 mb-8">
        {paymentMethods.map((method) => (
          <label
            key={method.value}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-300 hover:bg-[var(--main-color)]/40 cursor-pointer"
          >
            <div className="flex items-center">
              {method.image ? (
                <img src={method.image} alt={method.name} className="object-contain h-[2rem] mr-4" />
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

      {/* Receipt Section */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-bold text-[var(--main-color)] mb-2">Chek</h2>
        <div className="mb-4 text-gray-800">Stol raqami: 1</div>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-gray-800">
              <span>{item.name} x {item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(0)} so‘m</span>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex justify-between text-gray-800">
            <span>Buyurtma:</span>
            <span>{totalPrice} so‘m</span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Servis haqqi (10%):</span>
            <span>{serviceFee} so‘m</span>
          </div>
          <div className="flex justify-between font-bold text-[var(--main-color)] mt-2">
            <span>Yakuniy summa:</span>
            <span>{finalPrice} so‘m</span>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <button className="mt-4 w-full py-2 bg-[var(--main-color)] text-white rounded hover:[var(--main-color)]/50">
        Buyurtmani tasdiqlash
      </button>
    </div>
  );
};

export default Checkout;