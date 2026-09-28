"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ShoppingCartIcon() {
  const [isOpen, setIsOpen] = useState(false);

  const cart = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.isHydrated) return;

    localStorage.setItem("cart", JSON.stringify(cart.items));
  }, [cart.items, cart.isHydrated]);
  const cartItemsCount = cart.items.reduce(
    (total, item) => total + item.selectedQuantity,
    0,
  );

  const cartItems = cart.items.slice(0, 4);

  return (
    <div className="relative">
      {/* Cart Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex items-center justify-center size-9 hover:bg-gray-100 transition"
      >
        <ShoppingCart size={18} />

        {cartItemsCount > 0 && (
          <span className="absolute z-10 right-0 -top-1 text-xs bg-amber-500 rounded-full size-4 flex items-center justify-center">
            {cartItemsCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 w-80 bg-white border border-gray-200 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-sm font-semibold">Shopping Cart</h3>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-black"
            >
              <X size={16} />
            </button>
          </div>

          {/* Products */}
          {cartItems.length > 0 ? (
            <div className="divide-y">
              {cartItems.map((item, index) => (
                <div
                  key={`${index}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-3 p-3"
                >
                  {/* Image */}
                  <div className="relative size-14 shrink-0 bg-gray-100">
                    <Image
                      src={
                        item.images[item.selectedColor] ||
                        item.images[item.colors[0]]
                      }
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium truncate">
                      {item.name}
                    </h4>

                    <p className="text-xs text-gray-500 mt-1">
                      {item.selectedColor} / {item.selectedSize}
                    </p>

                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        Qty: {item.selectedQuantity}
                      </span>

                      <span className="text-sm font-semibold">
                        ${(item.price * item.selectedQuantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center">
              <ShoppingCart size={24} className="mx-auto text-gray-400" />

              <p className="text-sm text-gray-500 mt-2">Your cart is empty</p>
            </div>
          )}

          {/* Footer */}
          <div className="border-t p-3">
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-black text-white text-center py-2.5 text-sm font-medium hover:bg-gray-800 transition"
            >
              View All Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
