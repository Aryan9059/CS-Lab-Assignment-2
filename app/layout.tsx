import type { Metadata } from "next";
import { Poppins, Pacifico } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diya's Shop | Festive Diwali Store",
  description:
    "Your one-stop destination for all things Diwali — diyas, rangoli, sweets, gifts and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${pacifico.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
