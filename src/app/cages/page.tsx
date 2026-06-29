import CategoryPage from "@/components/shared/CategoryPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lồng Hamster - NK Hamster",
  description: "Chọn lồng phù hợp cho hamster của bạn. Lồng mica, lồng nhựa, lồng nhiều tầng với giá tốt nhất.",
  openGraph: {
    title: "Lồng Hamster - NK Hamster",
    description: "Chọn lồng phù hợp cho hamster của bạn",
  },
};

export default function CagePage() {
  return <CategoryPage category="cage" title="🏠 Lồng Hamster" description="Chọn lồng phù hợp cho hamster của bạn." />;
}
