"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";

import { makeStore, AppStore } from "../lib/store";
import { loadCart, setHydrated } from "../lib/features/cart/cart";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState<AppStore>(makeStore);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (!savedCart) {
      store.dispatch(setHydrated());
      return;
    }

    try {
      const cartItems = JSON.parse(savedCart);

      store.dispatch(loadCart(cartItems));
    } catch (error) {
      console.error("Failed to load cart:", error);
      store.dispatch(setHydrated());
    }
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
