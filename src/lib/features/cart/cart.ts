import { ProductType } from "@/data/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem extends ProductType {
  selectedColor: string;
  selectedSize: string;
  selectedQuantity: number;
}

interface CartState {
  items: CartItem[];
  isHydrated: boolean;
}

const initialState: CartState = {
  items: [],
  isHydrated: false,
};
const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    loadCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.isHydrated = true;
    },
    resetCart: (state) => {
      state.items = [];
    },
    setHydrated: (state) => {
      state.isHydrated = true;
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.id === newItem.id &&
          item.selectedColor === newItem.selectedColor &&
          item.selectedSize === newItem.selectedSize,
      );

      if (existingItem) {
        existingItem.selectedQuantity += newItem.selectedQuantity;
      } else {
        state.items.push(newItem);
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{
        id: string | number;
        color: string;
        size: string;
      }>,
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.selectedColor === action.payload.color &&
            item.selectedSize === action.payload.size
          ),
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        id: string | number;
        color: string;
        size: string;
        quantity: number;
      }>,
    ) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedColor === action.payload.color &&
          item.selectedSize === action.payload.size,
      );

      if (item) {
        item.selectedQuantity = action.payload.quantity;
      }
    },
  },
});

export const {
  loadCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  setHydrated,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
