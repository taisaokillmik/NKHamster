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
