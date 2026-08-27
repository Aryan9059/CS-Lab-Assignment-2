"use client";

import Link from "next/link";
import { useCart } from "@/lib/store";
import { Product } from "@/lib/data";
import ProductImage from "@/components/ProductImage";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image area */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-48 overflow-hidden bg-[#4A1080]/10">
          <ProductImage src={product.image} alt={product.name} />
          {product.badge && (
            <span className="absolute top-3 right-3 bg-[#E8620A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide z-10">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      {/* Info area */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-[#6B21A8] font-semibold uppercase tracking-widest mb-1">
          {product.category}
        </span>
        <Link
          href={`/products/${product.id}`}
          className="font-semibold text-[#1A1A1A] hover:text-[#4A1080] transition-colors leading-snug mb-2"
        >
          {product.name}
        </Link>
        <p className="text-sm text-[#6B7280] line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-[#E8620A]">
            &#x20B9;{product.price.toLocaleString("en-IN")}
          </span>
          <button
            onClick={() => addToCart(product, 1)}
            className="flex items-center gap-1.5 bg-[#4A1080] hover:bg-[#320A5E] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors active:scale-95"
          >
            <ShoppingCartIcon className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
