import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/layout/site-header";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Northwind — Fashion, electronics and home",
    template: "%s · Northwind",
  },
  description:
    "Shop the latest in women's and men's fashion, electronics and home & living. Free shipping on orders over $50.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-full px-4">
        <SiteHeader />
        <main className="container mx-auto ">{children}</main>
      </body>
    </html>
  );
}
