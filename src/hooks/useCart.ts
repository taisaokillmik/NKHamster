import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";

interface CartItem { product: Product; quantity: number }

interface CartState {
  items: CartItem[];
  addItem: (p: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

const storage = {
  getItem: (name: string) => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(name);
  },
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            if (existing.quantity >= product.stock) return state;
            return {
              items: state.items.map((i) =>
                i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          if (product.stock <= 0) return state;
          return { items: [...state.items, { product, quantity: 1 }] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.product.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => {
          const item = state.items.find((i) => i.product.id === id);
          if (!item) return state;
          const capped = Math.min(quantity, item.product.stock);
          if (capped <= 0) return { items: state.items.filter((i) => i.product.id !== id) };
          return { items: state.items.map((i) => (i.product.id === id ? { ...i, quantity: capped } : i)) };
        }),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce(
          (sum, i) => sum + (i.product.salePrice || i.product.price) * i.quantity,
          0
        ),
    }),
    {
      name: "nk-hamster-cart",
      storage: createJSONStorage(() => storage),
    }
  )
);
