"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductType } from "@/types";
import { Plus, ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/lib/features/cart/cart";
import { toast } from "sonner";
export default function ClientProductPage({
  product,
}: {
  product: ProductType;
}) {
  const dispatch = useAppDispatch();
  const [productDetails, setProductDetails] = useState({
    productId: product.id,
    color: product.colors[0],
    size: product.sizes[0],
    quantity: 1,
  });

  const { color: selectedColor, size: selectedSize, quantity } = productDetails;

  const colorMap: Record<string, string> = {
    gray: "bg-gray-500",
    purple: "bg-purple-700",
    green: "bg-green-600",
    black: "bg-black",
    white: "bg-white",
    red: "bg-red-600",
    blue: "bg-blue-600",
    yellow: "bg-yellow-400",
    orange: "bg-orange-500",
    pink: "bg-pink-500",
    brown: "bg-amber-800",
  };

  const handleQuantity = (type: "inc" | "dec") => {
    setProductDetails((prev) => {
      if (type === "dec" && prev.quantity > 1) {
        return {
          ...prev,
          quantity: prev.quantity - 1,
        };
      }

      if (type === "inc") {
        return {
          ...prev,
          quantity: prev.quantity + 1,
        };
      }

      return prev;
    });
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        selectedColor: productDetails.color,
        selectedSize: productDetails.size,
        selectedQuantity: productDetails.quantity,
      }),
    );

    toast.success(`${product.name} added to cart`);
  };
  return (
    <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start my-20">
      {/* Product Image */}
      <div className="p-8 rounded-lg flex justify-center items-center">
        <Image
          src={
            product.images[selectedColor] || product.images[product.colors[0]]
          }
          alt={product.name}
          width={500}
          height={500}
          className="object-contain max-h-125 bg-gray-100"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-5">
        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <p className="text-gray-600 mt-2 text-sm leading-relaxed">
            {product.description}
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-4">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Sizes */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Size
            </label>

            <span className="text-xs font-medium text-gray-900 uppercase">
              {selectedSize}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() =>
                  setProductDetails((prev) => ({
                    ...prev,
                    size,
                  }))
                }
                className={`min-w-10 px-3 py-1.5 border text-xs font-medium uppercase transition ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Color
            </label>

            <span className="text-xs font-medium text-gray-900 capitalize">
              {selectedColor}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {product.colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() =>
                  setProductDetails((prev) => ({
                    ...prev,
                    color,
                  }))
                }
                aria-label={`Select ${color}`}
                title={color}
                className={`relative h-7 w-7 ${
                  selectedColor === color
                    ? "ring-1 ring-gray-400 ring-offset-1"
                    : ""
                }`}
              >
                <span
                  className={`absolute inset-0 border ${
                    colorMap[color] || "bg-gray-300"
                  } ${
                    color === "white" ? "border-gray-300" : "border-transparent"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Quantity
          </label>

          <div className="flex items-center border border-gray-300 w-max overflow-hidden">
            <button
              type="button"
              onClick={() => handleQuantity("dec")}
              className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 text-sm"
            >
              −
            </button>

            <span className="px-4 py-1.5 text-xs font-medium border-x border-gray-300">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => handleQuantity("inc")}
              className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 text-sm"
            >
              +
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 mt-1">
          <button
            type="button"
            className="w-full flex justify-center items-center gap-2 bg-[#1e293b] text-white py-2.5 text-sm font-semibold hover:bg-slate-800 transition cursor-pointer"
            onClick={handleAddToCart}
          >
            <Plus size={17} />
            Add to Cart
          </button>

          <button
            type="button"
            className="w-full flex justify-center items-center gap-2 border border-gray-300 bg-white text-gray-800 py-2.5 text-sm font-semibold hover:bg-gray-50 transition cursor-pointer"
          >
            <ShoppingCart size={17} />
            Buy this Item
          </button>
        </div>

        {/* Legal */}
        <p className="text-gray-500 text-xs leading-5">
          By clicking Pay Now, you agree to our{" "}
          <span className="underline hover:text-black px-px">
            Terms &amp; Conditions
          </span>{" "}
          and{" "}
          <span className="underline hover:text-black px-px">
            Privacy Policy
          </span>
          . You authorize us to charge your selected payment method for the
          total amount shown. All sales are subject to our return and{" "}
          <span className="underline hover:text-black">Refund Policies</span>.
        </p>
      </div>
    </section>
  );
}
