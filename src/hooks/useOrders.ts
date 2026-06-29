import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Order } from "@/types";

interface OrdersState {
  orders: Order[];
  addOrder: (order: Order) => Promise<void>;
  updateOrderStatus: (id: number, status: Order["status"]) => Promise<void>;
  loadOrders: () => Promise<void>;
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

export const useOrders = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: async (order) => {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        });
        const result = await response.json();
        if (result.order) set((state) => ({ orders: [result.order, ...state.orders] }));
      },
      updateOrderStatus: async (id, status) => {
        const response = await fetch(`/api/orders/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        const result = await response.json();
        if (result.order) {
          set((state) => ({ orders: state.orders.map((order) => (order.id === id ? result.order : order)) }));
        }
      },
      loadOrders: async () => {
        if (typeof window === "undefined") return;
        const stored = window.localStorage.getItem("nk-hamster-auth");
        const token = stored ? JSON.parse(stored)?.state?.token : null;
        const headers: Record<string, string> = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;
        const response = await fetch("/api/orders", { headers });
        const result = await response.json();
        if (result.orders) set({ orders: result.orders });
      },
    }),
    {
      name: "nk-hamster-orders",
      storage: createJSONStorage(() => storage),
    }
  )
);
