"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductType } from "@/types";

export default function ProductCard({ product }: { product: ProductType }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const image = product.images[selectedColor];

  return (
    <Card className="mx-auto w-full max-w-sm overflow-hidden pt-0">
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={`${product.name} - ${selectedColor}`}
          className="aspect-square w-full object-cover"
        />

        <Badge className="absolute right-3 top-3">Featured</Badge>
      </div>

      {/* Info */}
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>

        <CardDescription>{product.shortDescription}</CardDescription>

        <div className="mt-2 text-lg font-semibold">${product.price}</div>

        {/* Colors */}
        <div className="flex items-center gap-2 pt-2">
          {product.colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              aria-label={`Select ${color}`}
              className={`h-6 w-6 rounded-full border-2 ${
                selectedColor === color ? "border-black" : "border-transparent"
              }`}
              style={{
                backgroundColor: color,
              }}
            />
          ))}
        </div>
      </CardHeader>

      <CardFooter>
        <Button className="w-full">View Product</Button>
      </CardFooter>
    </Card>
  );
}
