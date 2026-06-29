import { blogs } from "@/data/products";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogs.find((b) => b.slug === params.slug);
  if (!post) return { title: "Bài viết không tồn tại" };
  return {
    title: `${post.title} | NK Hamster`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [{ url: post.image }] },
  };
}

const blogContents: Record<string, string[]> = {
  "cach-nuoi-hamster": [
    "Hamster là một trong những thú cưng dễ nuôi và đáng yêu nhất. Trước khi đón hamster về nhà, bạn cần chuẩn bị đầy đủ: lồng phù hợp, thức ăn, nước uống và chất độn chuồng.",
    "🏠 Lồng: Nên chọn lồng có chiều ngang tối thiểu 60cm để hamster có đủ không gian vận động. Lồng mica hoặc lồng nhựa đều phù hợp, miễn là có đủ thông gió.",
    "🍽 Thức ăn: Hamster ăn hỗn hợp hạt, rau củ tươi và protein nhỏ. Tránh cho ăn hành, tỏi, nho, socola vì rất độc với hamster.",
    "💧 Nước: Dùng bình nước nhỏ gắn vào lồng, thay nước mỗi ngày. Không để nước trong bát vì hamster có thể bị ướt và lạnh.",
    "🛏 Chất độn chuồng: Dùng mùn cưa, rơm hoặc giấy xé nhỏ, dày 5–10cm để hamster đào bới — đây là bản năng tự nhiên của chúng.",
    "🌡 Nhiệt độ: Hamster nhạy cảm với nhiệt độ. Giữ phòng ở 18–24°C, tránh để gần điều hòa hoặc ánh nắng trực tiếp.",
    "Với sự chăm sóc đúng cách, hamster có thể sống khỏe mạnh 2–3 năm và là người bạn đồng hành tuyệt vời!",
  ],
  "chon-long-hamster": [
    "Lồng là môi trường sống quan trọng nhất của hamster. Việc chọn lồng phù hợp ảnh hưởng trực tiếp đến sức khỏe và hạnh phúc của bé.",
    "🔷 Lồng mica trong suốt: Ưu điểm là dễ quan sát, đẹp mắt và giữ chất độn chuồng không rơi ra ngoài. Nhược điểm là thông gió kém hơn nếu chỉ có lưới ở trên.",
    "🔶 Lồng nhựa mini: Giá rẻ, dễ vệ sinh, phù hợp cho người mới nuôi hoặc dùng tạm. Tuy nhiên không gian nhỏ, không phù hợp dài hạn.",
    "🔹 Lồng nhiều tầng: Rộng rãi, hamster có nhiều không gian khám phá. Phù hợp với các giống hamster lớn như Bear hoặc Campbell.",
    "📏 Kích thước tối thiểu: Theo khuyến nghị quốc tế, lồng hamster nên có diện tích đáy tối thiểu 900cm² (ví dụ 45×20cm) để đảm bảo phúc lợi động vật.",
    "Kết luận: Nếu ngân sách cho phép, hãy chọn lồng mica 2 tầng hoặc lồng nhiều tầng để hamster được thoải mái nhất.",
  ],
  "thuc-an-tot-nhat": [
    "Chế độ ăn cân bằng là yếu tố then chốt để hamster sống khỏe và lâu. Dưới đây là hướng dẫn đầy đủ về thức ăn cho hamster.",
    "✅ Thức ăn nên cho: Hạt hỗn hợp (lúa mì, yến mạch, hạt hướng dương ít), rau xanh (cải bó xôi, bông cải xanh, dưa chuột), trái cây ít đường (táo, dưa hấu bỏ hạt), protein (trứng luộc, thịt gà luộc, côn trùng sấy).",
    "❌ Thức ăn TUYỆT ĐỐI KHÔNG cho: Hành, tỏi, nho, nho khô, socola, kẹo ngọt, thức ăn nhiều muối hoặc gia vị, trái cây có hạt cứng.",
    "🥜 Hạt hướng dương: Hamster rất thích nhưng hàm lượng chất béo cao. Chỉ nên cho 3–5 hạt/ngày như phần thưởng.",
    "🌿 Rau củ: Cho ăn lượng nhỏ mỗi ngày, tươi và đã rửa sạch. Tránh rau bị dập hoặc héo.",
    "🍬 Snack thưởng: Bánh thưởng dinh dưỡng, snack phô mai hoặc snack sấy có thể dùng để tạo sự kết nối với hamster. Không nên cho quá nhiều.",
    "Hãy duy trì chế độ ăn đều đặn, theo dõi cân nặng và hoạt động của hamster để điều chỉnh khẩu phần phù hợp!",
  ],
};

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = blogs.find((b) => b.slug === params.slug);
  if (!post) notFound();

  const content = blogContents[post.slug] || [post.content];
  const otherPosts = blogs.filter((b) => b.slug !== post.slug);

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <Link href="/blog" className="text-sm text-amber-600 hover:text-amber-800 mb-6 inline-block">← Quay lại Blog</Link>

      <article className="bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
        <div className="p-8">
          <p className="text-xs text-gray-400 mb-3">{post.date}</p>
          <h1 className="text-3xl font-bold text-amber-800 mb-6">{post.title}</h1>
          <div className="space-y-4 text-gray-700 leading-7">
            {content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      {otherPosts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-amber-800 mb-4">Bài viết liên quan</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {otherPosts.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="bg-white rounded-2xl border border-amber-100 overflow-hidden hover:shadow-md transition-shadow flex gap-3">
                <img src={p.image} alt={p.title} className="w-24 h-24 object-cover flex-shrink-0" />
                <div className="p-3">
                  <h3 className="font-semibold text-amber-800 text-sm">{p.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
