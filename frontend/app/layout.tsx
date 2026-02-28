import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cardiology Research Assistant | AI-Powered Medical Q&A",
  description: "Ask questions about recent cardiology research papers and get AI-powered answers with proper citations from medical literature.",
  keywords: ["cardiology", "medical research", "AI assistant", "research papers", "medical Q&A"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Header />
        {children}
      </body>
    </html>
  );
}

