import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";

interface WishlistState {
  items: Product[];
  addItem: (p: Product) => void;
  removeItem: (id: number) => void;
  isInWishlist: (id: number) => boolean;
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

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          if (state.items.find((i) => i.id === product.id)) return state;
          return { items: [...state.items, product] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      isInWishlist: (id) => get().items.some((i) => i.id === id),
    }),
    {
      name: "nk-hamster-wishlist",
      storage: createJSONStorage(() => storage),
    }
  )
);
