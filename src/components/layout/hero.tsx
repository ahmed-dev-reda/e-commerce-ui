"use client";

import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [loading, setLoading] = useState(true);

  return (
    <section className="container mx-auto">
      <div className="relative w-full overflow-hidden">
        {loading && (
          <div className="absolute inset-0 animate-pulse rounded-xl bg-gray-200" />
        )}

        <Image
          src="/featured.png"
          alt="Hero"
          width={1200}
          height={400}
          priority
          onLoad={() => setLoading(false)}
          className={`w-full h-auto object-contain transition-opacity duration-500 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </section>
  );
}
