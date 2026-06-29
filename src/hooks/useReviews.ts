import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Review } from "@/types";

interface ReviewsState {
  reviews: Review[];
  loadReviews: () => Promise<void>;
  addReview: (review: Omit<Review, "id" | "createdAt">) => Promise<void>;
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

export const useReviews = create<ReviewsState>()(
  persist(
    (set, get) => ({
      reviews: [],
      loadReviews: async () => {
        try {
          const response = await fetch("/api/reviews");
          const data = await response.json();
          set({ reviews: data.reviews || [] });
        } catch (error) {
          console.error("Failed to load reviews:", error);
        }
      },
      addReview: async (review) => {
        try {
          const response = await fetch("/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review),
          });
          const data = await response.json();
          if (data.review) {
            set((state) => ({
              reviews: [data.review, ...state.reviews],
            }));
          }
        } catch (error) {
          console.error("Failed to add review:", error);
          // Fallback to local storage if API fails
          set((state) => ({
            reviews: [
              {
                id: Date.now(),
                createdAt: new Date().toLocaleString("vi-VN"),
                ...review,
              },
              ...state.reviews,
            ],
          }));
        }
      },
    }),
    {
      name: "nk-hamster-reviews",
      storage: createJSONStorage(() => storage),
    }
  )
);
