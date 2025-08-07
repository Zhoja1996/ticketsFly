// utils/storage.ts
import type { CartItem } from "./types"; // обновлённый тип

export const saveCartToLocalStorage = (cart: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Ошибка при сохранении корзины:", error);
  }
};

export const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Ошибка при загрузке корзины:", error);
    return [];
  }
};