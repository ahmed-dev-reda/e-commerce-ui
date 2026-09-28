"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addToCart } from "@/lib/features/cart/cart";

export default function ProductCard({ product }: { product: ProductType }) {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [productDetails, setProductDetails] = useState({
    color: product.colors[0],
    size: product.sizes[0],
    quantity: 1,
  });

  const image = product.images[productDetails.color];

  function handleAddToCart() {
    dispatch(
      addToCart({
        ...product,
        selectedColor: productDetails.color,
        selectedSize: productDetails.size,
        selectedQuantity: productDetails.quantity,
      }),
    );
    toast.success(`${product.name} added to cart`);
  }

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-2/3">
          <img
            key={image}
            src={image}
            alt={`${product.name} - ${productDetails.color}`}
            className="object-cover hover:scale-105 transition-all duration-300"
          />

          {/* Quick view */}
          <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-md">
              View Product
            </span>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="gap-4 p-5">
        {/* Title */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{product.name}</h3>

          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
            {product.shortDescription}
          </p>
        </div>

        {/* Options */}
        <div className="flex items-end gap-7 mt-4">
          {/* Size */}
          <div className="space-y-2">
            <label
              htmlFor={`size-${product.id}`}
              className="block text-xs font-medium text-muted-foreground"
            >
              Size
            </label>

            <select
              id={`size-${product.id}`}
              value={productDetails.size}
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  size: e.target.value,
                }))
              }
              className="h-7 min-w-[64px] cursor-pointer rounded-md border bg-background px-2 text-sm outline-none transition-colors focus:border-foreground"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Colors */}
          <div className="space-y-2">
            <span className="block text-xs font-medium text-muted-foreground">
              Color
            </span>

            <div className="flex h-7 items-center gap-2">
              {product.colors.map((color) => {
                const isSelected = productDetails.color === color;

                return (
                  <button
                    key={color}
                    type="button"
                    aria-label={`Select ${color}`}
                    aria-pressed={isSelected}
                    onClick={() =>
                      setProductDetails((prev) => ({
                        ...prev,
                        color,
                      }))
                    }
                    className="relative flex size-5 items-center justify-center rounded-full transition-transform duration-200"
                  >
                    <span
                      className="size-4 rounded-full border shadow-md"
                      style={{ backgroundColor: color }}
                    />

                    {isSelected && (
                      <span className="absolute inset-0 rounded-full border-2 border-gray-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-5 pt-0">
        {/* Price */}
        <span className="text-lg font-semibold">
          ${product.price.toFixed(2)}
        </span>

        {/* Add to cart */}
        <Button
          onClick={handleAddToCart}
          type="button"
          className="gap-2 rounded-lg px-4"
          variant="ghost"
        >
          <ShoppingCart className="size-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
