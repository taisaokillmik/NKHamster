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

type BlogLine = { type: "heading" | "bullet" | "text"; content: string };

const blogContents: Record<string, BlogLine[]> = {
  "cach-nuoi-hamster": [
    { type: "heading", content: "1. Chuẩn bị chuồng nuôi" },
    { type: "bullet", content: "Chọn lồng rộng rãi, thông thoáng." },
    { type: "bullet", content: "Trang bị đầy đủ: nhà ngủ, bánh xe chạy, bình nước, chén ăn và lớp lót chuồng." },
    { type: "heading", content: "2. Thức ăn" },
    { type: "bullet", content: "Cho hamster ăn thức ăn chuyên dụng kết hợp với rau củ, hoa hoặc trái cây sấy khô." },
    { type: "bullet", content: "Luôn chuẩn bị nước sạch mỗi ngày." },
    { type: "bullet", content: "Không cho ăn socola, đồ mặn, cay hoặc nhiều đường." },
    { type: "heading", content: "3. Vệ sinh chuồng" },
    { type: "bullet", content: "Dọn thức ăn thừa và khu vực đi vệ sinh hằng ngày." },
    { type: "bullet", content: "Thay lớp lót và vệ sinh chuồng định kỳ để giữ môi trường sạch sẽ." },
    { type: "heading", content: "4. Chơi với hamster" },
    { type: "bullet", content: "Để hamster làm quen với môi trường mới trong vài ngày đầu." },
    { type: "bullet", content: "Chơi nhẹ nhàng và không đánh thức khi hamster đang ngủ." },
    { type: "heading", content: "5. Lưu ý" },
    { type: "bullet", content: "Không nuôi chung nhiều hamster trưởng thành trong cùng một chuồng." },
    { type: "bullet", content: "Không tắm bằng nước, chỉ sử dụng cát tắm chuyên dụng." },
    { type: "bullet", content: "Đặt chuồng ở nơi thoáng mát, tránh ánh nắng trực tiếp." },
    { type: "heading", content: "6. Dấu hiệu hamster khỏe mạnh" },
    { type: "bullet", content: "Ăn uống bình thường." },
    { type: "bullet", content: "Lông mượt, mắt sáng." },
    { type: "bullet", content: "Hoạt động nhanh nhẹn vào buổi tối." },
    { type: "text", content: "Chỉ cần một chiếc chuồng phù hợp, thức ăn đầy đủ, nước sạch và sự chăm sóc đúng cách, hamster sẽ luôn khỏe mạnh và mang đến cho bạn nhiều niềm vui." },
  ],
  "chon-long-hamster": [
    { type: "text", content: "Một chiếc lồng phù hợp sẽ giúp hamster có không gian vận động, giảm căng thẳng và phát triển khỏe mạnh." },
    { type: "heading", content: "Nên chọn" },
    { type: "bullet", content: "Lồng có kích thước rộng rãi, thông thoáng." },
    { type: "bullet", content: "Có đủ không gian để đặt bánh xe, nhà ngủ, chén ăn và bình nước." },
    { type: "bullet", content: "Chất liệu chắc chắn, dễ vệ sinh." },
    { type: "bullet", content: "Nếu dùng lồng mica, nên chọn loại có lỗ thông gió đầy đủ." },
    { type: "heading", content: "Không nên chọn" },
    { type: "bullet", content: "Lồng quá nhỏ hoặc chật hẹp." },
    { type: "bullet", content: "Lồng có khe hở quá lớn khiến hamster dễ chui ra ngoài." },
    { type: "bullet", content: "Lồng có nhiều cạnh sắc hoặc vật liệu dễ hỏng." },
    { type: "text", content: "💡 Mẹo: Hãy chọn chiếc lồng lớn nhất phù hợp với không gian và ngân sách của bạn. Hamster sẽ có nhiều không gian để chạy nhảy, đào hang và vui chơi, từ đó khỏe mạnh và năng động hơn." },
  ],
  "thuc-an-tot-nhat": [
    { type: "text", content: "Chế độ ăn hợp lý sẽ giúp hamster phát triển khỏe mạnh và duy trì sức khỏe lâu dài." },
    { type: "heading", content: "Thức ăn chính" },
    { type: "bullet", content: "Thức ăn chuyên dụng dành cho hamster." },
    { type: "bullet", content: "Hỗn hợp hạt và ngũ cốc." },
    { type: "heading", content: "Thức ăn bổ sung" },
    { type: "bullet", content: "Rau củ sấy khô." },
    { type: "bullet", content: "Hoa sấy khô." },
    { type: "bullet", content: "Trái cây sấy khô (cho ăn với lượng vừa phải)." },
    { type: "bullet", content: "Protein bổ sung như sâu sấy." },
    { type: "heading", content: "Nước uống" },
    { type: "text", content: "Hamster cần được cung cấp nước sạch mỗi ngày. Hãy kiểm tra bình nước thường xuyên để đảm bảo luôn có đủ nước." },
    { type: "heading", content: "Không nên cho ăn" },
    { type: "bullet", content: "Socola." },
    { type: "bullet", content: "Hành, tỏi." },
    { type: "bullet", content: "Đồ ăn mặn, cay hoặc nhiều đường." },
    { type: "bullet", content: "Thức ăn bị mốc hoặc đã hư hỏng." },
    { type: "text", content: "💡 Lưu ý: Cho hamster ăn với lượng vừa đủ và dọn thức ăn thừa hằng ngày để giữ chuồng luôn sạch sẽ." },
  ],
};

function renderLine(line: BlogLine, i: number) {
  if (line.type === "heading") {
    return <h2 key={i} className="text-xl font-bold text-amber-800 mt-6 mb-2">{line.content}</h2>;
  }
  if (line.type === "bullet") {
    return <li key={i} className="flex gap-2"><span className="text-amber-500 mt-1">•</span><span>{line.content}</span></li>;
  }
  return <p key={i} className="text-gray-700 leading-7">{line.content}</p>;
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = blogs.find((b) => b.slug === params.slug);
  if (!post) notFound();

  const lines = blogContents[post.slug];
  const otherPosts = blogs.filter((b) => b.slug !== post.slug);

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <Link href="/blog" className="text-sm text-amber-600 hover:text-amber-800 mb-6 inline-block">← Quay lại Blog</Link>

      <article className="bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
        <div className="p-8">
          <p className="text-xs text-gray-400 mb-3">{post.date}</p>
          <h1 className="text-3xl font-bold text-amber-800 mb-6">{post.title}</h1>
          <div className="space-y-2 text-gray-700 leading-7">
            {lines ? (
              <ul className="space-y-1">
                {lines.map((line, i) => renderLine(line, i))}
              </ul>
            ) : (
              <p>{post.content}</p>
            )}
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
