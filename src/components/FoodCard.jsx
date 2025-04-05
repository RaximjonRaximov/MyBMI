// src/components/FoodCard.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";

const FoodCard = ({ image, name, price, description, id, type }) => {
  const dispatch = useDispatch();

  // Get the quantity of this item in the cart
  const quantity = useSelector((state) =>
    state.cart.items.find((item) => item.id === id)?.quantity || 0
  );

  return (
    <div className="bg-gray-50 p-2 rounded-lg shadow-md h-full max-w-[15rem]">
      <img
        src={image || "https://via.placeholder.com/100"}
        alt={name}
        className="h-[10rem] object-contain rounded-md mix-blend-multiply"
      />
      <h2 className="text-[1.2rem] font-semibold mt-2">{name}</h2>
      <p className="text-gray-500 text-[0.8rem]">{description || "No description available"}</p>
      <div className="text-[1rem] font-bold mt-2">{price} so‘m</div>

      {quantity === 0 ? (
        <button
          onClick={() =>
            dispatch(
              addToCart({
                id,
                name,
                price: parseFloat(price), // Ensure price is a number
                image,
                description,
                type: type.name, // Store only the type name in the cart
              })
            )
          }
          className="mt-4 w-full bg-[var(--main-color)] text-white text-[1rem] py-2 rounded-md"
        >
          + Add
        </button>
      ) : (
        <div className="flex items-center justify-between mt-4 w-full bg-[var(--grey-color)] text-white px-4 py-2 rounded-md">
          <button
            onClick={() => dispatch(removeFromCart(id))}
            className="text-[var(--white-color)] flex items-center justify-center"
          >
            -
          </button>
          <span className="text-[1rem] font-semibold">{quantity}</span>
          <button
            onClick={() =>
              dispatch(
                addToCart({
                  id,
                  name,
                  price: parseFloat(price),
                  image,
                  description,
                  type: type.name,
                })
              )
            }
            className="text-[var(--white-color)] flex items-center justify-center"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodCard;