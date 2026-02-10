import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { TrendingUp, BarChart3, Home } from "lucide-react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "香港 IPO 智能分析平台",
  description: "基于 AI 的香港新股申购分析与推荐系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        {/* 导航栏 */}
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group active:scale-95 transition-transform">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="hidden md:block">
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    香港 IPO 智能分析
                  </h1>
                  <p className="text-xs text-gray-500">AI-Powered IPO Analysis</p>
                </div>
              </Link>

              {/* 导航链接 */}
              <div className="flex items-center gap-4 sm:gap-6">
                <Link
                  href="/"
                  className="flex items-center gap-1.5 text-gray-600 active:text-blue-600 transition-colors active:scale-95"
                >
                  <Home className="w-5 h-5" />
                  <span className="text-[14px] sm:text-base font-medium">首页</span>
                </Link>
                <Link
                  href="/ipos"
                  className="flex items-center gap-1.5 text-gray-600 active:text-blue-600 transition-colors active:scale-95"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-[14px] sm:text-base font-medium">IPO 列表</span>
                </Link>
                <Link
                  href="/capital"
                  className="flex items-center gap-1.5 text-gray-600 active:text-blue-600 transition-colors active:scale-95"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-[14px] sm:text-base font-medium">资金配置</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* 主内容 */}
        <main className="min-h-screen">{children}</main>

        {/* 页脚 */}
        <footer className="bg-white border-t border-gray-200 mt-12 sm:mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="text-center text-gray-600">
              <p className="text-xs sm:text-sm break-words px-2">
                © 2026 香港 IPO 智能分析平台 · 数据仅供参考，投资需谨慎
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
