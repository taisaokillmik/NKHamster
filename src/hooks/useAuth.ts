import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  users: User[];
  registerUser: (data: { name: string; email: string; password: string; phone?: string; address?: string }) => Promise<{ success: boolean; message: string }>;
  loginUser: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  loadSession: () => Promise<void>;
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

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      users: [],
      registerUser: async ({ name, email, password, phone, address }) => {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, phone, address }),
        });
        const result = await response.json();
        if (!result.success) return { success: false, message: result.message || "Đăng ký thất bại" };
        set({ user: result.user, token: result.token });
        return { success: true, message: "Đăng ký thành công." };
      },
      loginUser: async (email, password) => {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const result = await response.json();
        if (!result.success) return { success: false, message: result.message || "Đăng nhập thất bại" };
        set({ user: result.user, token: result.token });
        return { success: true, message: "Đăng nhập thành công." };
      },
      logout: async () => {
        if (get().token) {
          await fetch("/api/auth/logout", { method: "POST", headers: { Authorization: `Bearer ${get().token}` } });
        }
        set({ user: null, token: null });
      },
      updateProfile: async (data) => {
        if (!get().token || !get().user) return;
        const response = await fetch("/api/auth/me", {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${get().token}` },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result.user) set({ user: result.user });
      },
      loadSession: async () => {
        if (typeof window === "undefined") return;
        const stored = window.localStorage.getItem("nk-hamster-auth");
        if (!stored) return;
        const parsed = JSON.parse(stored);
        const token = parsed.state?.token;
        if (!token) return;
        const response = await fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } });
        const result = await response.json();
        if (result.user) set({ user: result.user, token });
      },
    }),
    {
      name: "nk-hamster-auth",
      storage: createJSONStorage(() => storage),
    }
  )
);
