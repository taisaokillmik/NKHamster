export interface Product {
  id: number;
  name: string;
  slug: string;
  category: "hamster" | "cage" | "food" | "accessory";
  price: number;
  priceLabel?: string;
  salePrice?: number;
  image: string;
  description: string;
  stock: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  role?: "admin" | "customer";
}

export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId?: number;
  customerName: string;
  phone: string;
  address: string;
  note?: string;
  paymentMethod?: "cod" | "bank";
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "shipping" | "completed" | "cancelled";
  createdAt: string;
}

export interface Promotion {
  id: number;
  title: string;
  description: string;
  discountPercent: number;
  active: boolean;
}

export interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}
