"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { X } from "lucide-react";

interface Toast { id: number; message: string; type?: "success" | "error" | "info" }
interface ToastContextType { showToast: (message: string, type?: Toast["type"]) => void }

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  const remove = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-20 right-6 z-50 space-y-2">
        {toasts.map((toast) => (
          <div key={toast.id} className={`flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lg text-white text-sm max-w-xs animate-fade-in
            ${toast.type === "error" ? "bg-red-500" : toast.type === "info" ? "bg-blue-500" : "bg-green-500"}`}>
            <span className="flex-1">{toast.message}</span>
            <button onClick={() => remove(toast.id)}><X className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
