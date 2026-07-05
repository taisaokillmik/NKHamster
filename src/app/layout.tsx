import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { ToastProvider } from "@/components/ui/Toast";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import "./globals.css";

export const metadata = {
  title: "NK Hamster - Cửa hàng Hamster & Phụ kiện",
  description: "Cửa hàng bán chuột Hamster, lồng mica và phụ kiện uy tín",
  metadataBase: new URL('https://taisaokillmik.github.io/NKHamster'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white font-sans text-gray-800 antialiased">
        <Header />
        <ErrorBoundary>
          <ToastProvider>
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
            <BackToTop />
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
