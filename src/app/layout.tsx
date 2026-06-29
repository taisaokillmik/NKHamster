import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { ToastProvider } from "@/components/ui/Toast";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import "./globals.css";

export const metadata = {
  title: "NK Hamster - Cửa hàng Hamster & Phụ kiện",
  description: "Cửa hàng bán chuột Hamster, lồng mica và phụ kiện uy tín",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col bg-hamster-50">
        <Header />
        <ErrorBoundary>
          <ToastProvider>
            <main className="flex-1">{children}</main>
            <Footer />
            <BackToTop />
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
