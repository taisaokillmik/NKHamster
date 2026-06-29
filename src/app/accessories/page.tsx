import CategoryPage from "@/components/shared/CategoryPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phụ kiện Hamster - NK Hamster",
  description: "Phụ kiện giúp hamster của bạn sống thoải mái hơn. Bánh xe, nhà ngủ, bình nước, cát tắm và nhiều hơn nữa.",
  openGraph: {
    title: "Phụ kiện Hamster - NK Hamster",
    description: "Phụ kiện giúp hamster của bạn sống thoải mái hơn",
  },
};

export default function AccessoryPage() {
  return <CategoryPage category="accessory" title="🛏 Phụ kiện" description="Phụ kiện giúp hamster của bạn sống thoải mái hơn." />;
}
