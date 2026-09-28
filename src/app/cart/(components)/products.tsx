"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { removeFromCart, updateQuantity } from "@/lib/features/cart/cart";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { motion } from "motion/react";
export default function ProductsInCart() {
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cart);

  const handleQuantity = (
    id: string | number,
    color: string,
    size: string,
    type: "inc" | "dec",
  ) => {
    const item = cart.items.find(
      (item) =>
        item.id === id &&
        item.selectedColor === color &&
        item.selectedSize === size,
    );

    if (!item) return;

    const newQuantity =
      type === "inc" ? item.selectedQuantity + 1 : item.selectedQuantity - 1;

    if (newQuantity < 1 || newQuantity > 999) return;

    dispatch(
      updateQuantity({
        id,
        color,
        size,
        quantity: newQuantity,
      }),
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 100, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-gray-200"
    >
      <div className="border-b px-5 py-4">
        <h2 className="font-semibold">Cart Items</h2>
      </div>

      <div className="divide-y">
        {cart.items.map((item) => (
          <div
            key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
            className="p-5 flex gap-5"
          >
            {/* Image */}
            <div className="relative size-28 shrink-0 bg-gray-100 rounded-2xl overflow-hidden">
              <Image
                src={
                  item.images[item.selectedColor] || item.images[item.colors[0]]
                }
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Color: {item.selectedColor}
                  </p>

                  <p className="text-sm text-gray-500">
                    Size: {item.selectedSize}
                  </p>
                </div>

                {/* Remove */}
                <button
                  type="button"
                  onClick={() =>
                    dispatch(
                      removeFromCart({
                        id: item.id,
                        color: item.selectedColor,
                        size: item.selectedSize,
                      }),
                    )
                  }
                  className="size-8 flex items-center justify-center rounded-2xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
                >
                  <Trash2 size={17} />
                </button>
              </div>

              <div className="flex items-center justify-between mt-5">
                {/* Quantity */}
                <div className="flex items-center border border-gray-300 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      handleQuantity(
                        item.id,
                        item.selectedColor,
                        item.selectedSize,
                        "dec",
                      )
                    }
                    disabled={item.selectedQuantity <= 1}
                    className="size-8 flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>

                  <input
                    type="text"
                    inputMode="numeric"
                    value={item.selectedQuantity}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (!/^\d*$/.test(value)) return;

                      if (value === "") return;

                      const quantity = Math.min(
                        999,
                        Math.max(1, Number(value)),
                      );

                      dispatch(
                        updateQuantity({
                          id: item.id,
                          color: item.selectedColor,
                          size: item.selectedSize,
                          quantity,
                        }),
                      );
                    }}
                    maxLength={3}
                    className="w-12 h-8 text-center text-sm border-x border-gray-300 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      handleQuantity(
                        item.id,
                        item.selectedColor,
                        item.selectedSize,
                        "inc",
                      )
                    }
                    disabled={item.selectedQuantity >= 999}
                    className="size-8 flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Price */}
                <span className="font-semibold">
                  ${(item.price * item.selectedQuantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Empty Cart */}
        {cart.items.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
