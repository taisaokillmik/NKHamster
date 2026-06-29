import CategoryPage from "@/components/shared/CategoryPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chuột Hamster - NK Hamster",
  description: "Khám phá các giống hamster chất lượng và đáng yêu. Bear, Winter White, Robo, Campbell và nhiều giống khác.",
  openGraph: {
    title: "Chuột Hamster - NK Hamster",
    description: "Khám phá các giống hamster chất lượng và đáng yêu",
  },
};

export default function HamsterPage() {
  return <CategoryPage category="hamster" title="🐹 Chuột Hamster" description="Khám phá các giống hamster chất lượng và đáng yêu." />;
}
