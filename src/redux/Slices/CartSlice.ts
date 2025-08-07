import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loadCartFromLocalStorage, saveCartToLocalStorage } from "../Storage/storage";
import type { CartItem } from "../Types/types";


interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
      saveCartToLocalStorage(state.items);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload); // 👈 теперь фильтруем по item.id
      saveCartToLocalStorage(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = CartSlice.actions;
export default CartSlice.reducer;