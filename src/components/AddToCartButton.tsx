import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseItem, decreaseItem } from "../reducers/cartSlice.ts";
import { RootState } from "../reducers/store.ts";

import { useMemo } from "react";

const AddToCartButton: React.FC<{ sku: string }> = ({ sku }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const quantity = cartItems.find((item) => item.sku === sku)?.count ?? 0;

  const dispatch = useDispatch();

  const handleIncreaseItem = useCallback(
    (sku) => {
      dispatch(increaseItem(sku));
    },
    [dispatch],
  );

  const handleDecreaseItem = useCallback(
    (sku) => {
      dispatch(decreaseItem(sku));
    },
    [dispatch],
  );

  const data = useMemo(() => {
    if (quantity === 0) {
      return {
        onClick: () => handleIncreaseItem(sku),
        text: "Add to Cart",
        bg_color: `hover:bg-gradient-to-l bg-gradient-to-b from-black to-black/80 shadow-gray-500 ring-1  ring-gray-500  
         ring-offset-2 ring-offset-black transition-all duration-500 ease-in-out`,

        text_color: "text-white",
        left_icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-3 h-5 w-5 shrink-0  stroke-white transition-all"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        ),

        right_icon: (
          <svg
            className="mx-3 hidden h-5 w-0 stroke-white transition-all group-hover:w-5 sm:block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            strokeWidth="2"
          >
            <path d="M9.057 20.47l-6.764-6.763a1 1 0 011.414-1.414l5.236 5.236 11.3-13.18a1.001 1.001 0 111.518 1.3L9.057 20.47z"></path>
          </svg>
        ),
      };
    }
    return {
      text: `Items (${quantity})`,

      bg_color: `hover:bg-gradient-to-l bg-gradient-to-b from-indigo-600 to-indigo-600/80 shadow-indigo-500 ring-1  ring-indigo-500  
       ring-offset-indigo transition-all duration-500 ease-in-out`,

      text_color: "text-white",
    };
  }, [quantity, sku, handleIncreaseItem]);

  const { text, bg_color, left_icon, right_icon, onClick, text_color } = data;

  return (
    <div className="flex items-center justify-center">
      {quantity >= 1 && (
        <button
          onClick={() => handleDecreaseItem(sku)}
          className="w-10 text-black opacity-75 transition hover:opacity-100"
        >
          -
        </button>
      )}
      <button
        type="button"
        onClick={onClick}
        className={`${bg_color} ${text_color} group  mx-auto flex w-full items-center justify-center rounded px-4 py-2 text-sm  font-medium shadow-md transition`}
      >
        {left_icon}
        <div className="text-center font-bold">{text}</div>
        {right_icon}
      </button>
      {quantity >= 1 && (
        <button
          onClick={() => handleIncreaseItem(sku)}
          className="w-10 text-black opacity-75 transition hover:opacity-100"
        >
          +
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
