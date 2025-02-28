import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalPrice, finalPrice } = useSelector((state) => state.cart);
  const serviceFee = parseFloat((totalPrice * 0.1).toFixed(0));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Savatcha</h2>

      {items.length === 0 ? (
        <p>Savatcha bo‘sh</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} className="flex justify-between border-b p-2">
              <span>{item.name} ({item.quantity} × {item.price} so‘m)</span>
              <div>
                <button 
                  className="px-2 bg-green-500 text-white rounded" 
                  onClick={() => dispatch(addToCart(item))}
                >+</button>
                <button 
                  className="px-2 ml-2 bg-red-500 text-white rounded" 
                  onClick={() => dispatch(removeFromCart(item.id))}
                >-</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        <p><strong>Umumiy narx:</strong> {totalPrice} so‘m</p>
        <p><strong>+ 10% xizmat haqqi:</strong> {serviceFee} so‘m</p>
        <p><strong>Yakuniy narx:</strong> {finalPrice} so‘m</p>
      </div>
    </div>
  );
};

export default Cart;
