import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, removeItemCompletely } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalPrice, finalPrice } = useSelector((state) => state.cart);
  const serviceFee = parseFloat((totalPrice * 0.1).toFixed(0));
  const navigate = useNavigate();

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Savatcha</h1>
          </header>

          <div className="mt-8">
            {items.length === 0 ? (
              <div className="text-center text-gray-600 flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-16 text-gray-400 mb-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p>Savatcha bo‘sh</p>
              </div>
            ) : (
              <>
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.image || "https://via.placeholder.com/100"}
                        alt={item.name}
                        className="size-16 rounded-sm object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-900">{item.name}</h3>
                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">Narx:</dt>
                            <dd className="inline">{item.price.toLocaleString()} so‘m</dd>
                          </div>
                          <div>
                            <dt className="inline"></dt>
                            <dd className="inline">{item.description || "No description"}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-4">
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
                        </div>

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
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <dt>Umumiy narx</dt>
                        <dd>{totalPrice.toLocaleString()} so‘m</dd>
                      </div>

                      <div className="flex justify-between">
                        <dt>Xizmat haqqi 10%</dt>
                        <dd>{serviceFee.toLocaleString()} so‘m</dd>
                      </div>

                      <div className="flex justify-between !text-base font-medium">
                        <dt>Yakuniy narx</dt>
                        <dd>{finalPrice.toLocaleString()} so‘m</dd>
                      </div>
                    </dl>

                    <div className="flex justify-end">
                      <button
                        onClick={() => navigate("/checkout")}
                        className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                      >
                        Buyurtma berish
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;