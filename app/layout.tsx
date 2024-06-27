import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FilterProvider } from "@/components/filter/filter-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Такси Восход - лучший автопарк Санкт-Петербурга",
  description: "Найти авто под такси на самых выгодных условиях",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <FilterProvider>
        <body className={inter.className} suppressHydrationWarning>
          {children}
        </body>
      </FilterProvider>
    </html>
  );
}
