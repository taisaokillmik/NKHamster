import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thức ăn trộn cho Hamster - NK Hamster",
  description: "Thức ăn trộn bình thường, trộn ngon, thức ăn hãng H1, H2 chuyên hamster Bear. Giá từ 25.000đ.",
  openGraph: {
    title: "Thức ăn trộn cho Hamster - NK Hamster",
    description: "Thức ăn trộn bình thường, trộn ngon, thức ăn hãng H1, H2 chuyên hamster Bear",
  },
};

export default function MixedFoodPage() {
  const foodOptions = [
    {
      name: "Thức ăn trộn bình thường",
      price: "25.000đ",
      description: "Thức ăn trộn bình thường, dinh dưỡng cân bằng cho hamster hàng ngày",
    },
    {
      name: "Thức ăn trộn ngon",
      price: "35.000đ",
      description: "Thức ăn trộn ngon, hương vị đặc biệt hamster yêu thích",
    },
    {
      name: "Thức ăn hãng H1",
      price: "110.000đ",
      description: "Thức ăn hãng H1 chất lượng cao, đảm bảo dinh dưỡng tối ưu cho hamster",
    },
    {
      name: "Thức ăn hãng H2 chuyên hamster Bear",
      price: "120.000đ",
      description: "Thức ăn hãng H2 chuyên dụng cho hamster Bear, tăng trưởng khỏe mạnh",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-amber-800 mb-4">🍽 Thức ăn trộn cho Hamster</h1>
        <p className="text-gray-600">Các loại thức ăn trộn chất lượng cho hamster của bạn</p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-4">
        {foodOptions.map((option, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{option.name}</h3>
                <p className="text-gray-600 text-sm">{option.description}</p>
              </div>
              <div className="text-2xl font-bold text-amber-700 md:text-right">
                {option.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}