"use client";

import Link from "next/link";
import { useCart } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const { cartCount } = useCart();
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/products?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/products");
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#320A5E] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            href="/"
            className="text-2xl text-[#F5C842] hover:text-[#D4A017] transition-colors shrink-0"
            style={{ fontFamily: "var(--font-pacifico)" }}
          >
            Diya&apos;s Shop
          </Link>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your festive picks..."
                className="w-full rounded-full pl-5 pr-12 py-2 text-sm bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#F5C842]/60"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <MagnifyingGlassIcon className="w-4 h-4 text-white/60 hover:text-white transition-colors" />
              </button>
            </div>
          </form>

          {/* Nav links + Cart */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="hidden sm:block text-white/80 hover:text-[#F5C842] text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="hidden sm:block text-white/80 hover:text-[#F5C842] text-sm font-medium transition-colors"
            >
              Shop
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative group">
              <ShoppingCartIcon className="w-6 h-6 text-white group-hover:text-[#F5C842] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#E8620A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile search + menu icon */}
            <button
              onClick={() => router.push("/products")}
              className="sm:hidden"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-5 h-5 text-white/70" />
            </button>
            <Bars3Icon className="w-6 h-6 text-white/70 sm:hidden cursor-pointer" />
          </div>
        </div>

        {/* Mobile search bar */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your festive picks..."
              className="w-full rounded-full pl-5 pr-12 py-2 text-sm bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#F5C842]/60"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <MagnifyingGlassIcon className="w-4 h-4 text-white/60" />
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
}
