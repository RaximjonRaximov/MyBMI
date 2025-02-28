import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";

const FoodCard = ({ image, name, price, description, id }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="bg-gray-50 p-2 rounded-lg shadow-md h-full max-w-[15rem]">
      <img
        src={image}
        alt={name}
        className="  h-[10rem] object-contain rounded-md mix-blend-multiply "
      />
      <h2 className="text-[1.2rem] font-semibold mt-2">{name}</h2>
      <p className="text-gray-500 text-[0.8rem]">{description}</p>
      <div className="text-[1rem] font-bold mt-2">{price} so‘m</div>

      {quantity === 0 ? (
        <button
          onClick={() => {
            handleIncrement();
            dispatch(addToCart({ id, name, price, image }));
          }}
          className="mt-4 w-full bg-[var(--main-color)] text-white text-[1rem] py-2 rounded-md"
        >
          + Add
        </button>
      ) : (
        <div className="flex items-center justify-between mt-4  w-full bg-[var(--grey-color)] text-white px-4 py-2 rounded-md">
          <button
            onClick={() => {
              dispatch(removeFromCart({ id, name, price, image }));
              handleDecrement();
            }}
            className=" text-[var(--white-color)]   flex items-center justify-center"
          >
            -
          </button>
          <span className="text-[1rem] font-semibold">{quantity}</span>
          <button
            onClick={() => {
              handleIncrement();
              dispatch(addToCart({ id, name, price, image }));
            }}
            className=" text-[var(--white-color)]   flex items-center justify-center"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodCard;
