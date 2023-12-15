import AddToCartButton from "./AddToCartButton.tsx";
import products_list from "../data/products_list.ts";
import { useEffect, useState } from "react";
import { ProductItem, ISubmitPayload } from "../interfaces";

import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../reducers/cartSlice.ts";

import { useSelector } from "react-redux";
import { RootState } from "../reducers/store.ts";

import { useMemo } from "react";

const Products: React.FC = () => {
  const [products, setProducts] = useState([] as ProductItem[]);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [sending, setSending] = useState(false);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const product = products.find((product) => product.sku === item.sku);
      return acc + (product?.price ?? 0) * item.count;
    }, 0);
  }, [cartItems, products]);

  useEffect(() => {
    setTimeout(() => {
      setProducts(products_list);
    }, 1000);
  }, []);

  const dispatch = useDispatch();

  const handleClear = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const data = {} as ISubmitPayload;

    console.log("cartItems", cartItems);
    cartItems.map((item) => (data[item.sku] = item.count));

    //sending data to server
    // await fetch("/api/submit", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });

    setSending(false);

    handleClear();
  };

  return (
    <div className="min-h-screen w-screen bg-gray-900  font-poppins text-gray-900 ">
      <div className="py-26 mx-auto max-w-5xl px-2 sm:p-20">
        <div className="mx-auto grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-10">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex flex-col justify-between overflow-hidden rounded-lg shadow-md "
            >
              <img
                src={product.image}
                alt={product.name}
                className={`h-full w-full bg-white object-contain transition-all duration-500 
                hover:scale-105 dark:bg-black `}
              />
              <div className="relative flex h-full flex-col justify-between border border-gray-100 bg-gray-100 p-4">
                <div className="mb-6 flex h-full flex-col  justify-between gap-4">
                  <div className="mx-auto justify-between gap-4">
                    <h2 className="mx-auto w-5/6 text-lg font-medium uppercase text-gray-900">
                      {product.name}
                    </h2>{" "}
                  </div>
                  <div className="flex items-center justify-between">
                    <div
                      dir="ltr"
                      className="mt-1.5 text-sm font-semibold text-primary-600"
                    >
                      ₪ {product.price}
                    </div>
                  </div>
                </div>

                <AddToCartButton sku={product.sku} />
              </div>
            </div>
          ))}
        </div>
        <form
          className="mt-6 flex justify-around gap-10"
          onSubmit={handleSubmit}
        >
          <div
            disabled={cartItems.length === 0}
            onClick={handleClear}
            className={`${
              cartItems.length === 0 && `opacity-50 `
            } ring-offset-indigo group mx-auto flex w-full max-w-xs items-center  justify-center  
        rounded  bg-gradient-to-b from-teal-600 to-teal-600/80  px-4 py-2 text-sm font-medium shadow-md shadow-teal-500 ring-1 ring-teal-500 transition  duration-500 ease-in-out hover:bg-gradient-to-l`}
          >
            <div className="text-center font-bold text-white">Clear</div>
          </div>
          <div className="">
            <p className="mb-1 text-lg font-bold text-white">
              ₪ {totalPrice.toFixed(2)}
            </p>
            {/* <p className="text-sm text-gray-700">including VAT</p> */}
          </div>

          <button
            disabled={cartItems.length === 0 || totalPrice === 0 || sending}
            className={`${
              cartItems.length === 0 && `opacity-50 `
            } ring-offset-indigo group mx-auto flex w-full max-w-xs items-center  justify-center  
        rounded  bg-gradient-to-b from-teal-600 to-teal-600/80  px-4 py-2 text-sm font-medium shadow-md shadow-teal-500 ring-1 ring-teal-500 transition  duration-500 ease-in-out hover:bg-gradient-to-l`}
          >
            <div className="text-center font-bold text-white">Purchase</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Products;
