"use client";

import { useCart } from "@/lib/store";
import { getProductById } from "@/lib/data";
import ProductImage from "@/components/ProductImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, use } from "react";
import {
  ShoppingCartIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: Props) {
  const { id } = use(params);
  const product = getProductById(id);

  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) notFound();

  function handleAdd() {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-[#FFF8F0] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="text-sm text-[#6B7280] mb-8 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#4A1080] transition-colors">
            Home
          </Link>
          <ChevronRightIcon className="w-3.5 h-3.5 text-[#6B7280]/60" />
          <Link
            href="/products"
            className="hover:text-[#4A1080] transition-colors"
          >
            Shop
          </Link>
          <ChevronRightIcon className="w-3.5 h-3.5 text-[#6B7280]/60" />
          <span className="text-[#1A1A1A] font-medium">{product.name}</span>
        </nav>

        {/* Product layout */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">

            {/* Image panel */}
            <div className="md:w-2/5 relative min-h-72 md:min-h-96 bg-[#4A1080]/5">
              <ProductImage
                src={product.image}
                alt={product.name}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            {/* Details panel */}
            <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              {/* Category + Badge */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs bg-[#4A1080]/10 text-[#4A1080] font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
                  {product.category}
                </span>
                {product.badge && (
                  <span className="text-xs bg-[#E8620A] text-white font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {product.badge}
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-3">
                {product.name}
              </h1>
              <p className="text-[#6B7280] leading-relaxed mb-6">
                {product.description}
              </p>

              <p className="text-3xl font-bold text-[#E8620A] mb-8">
                &#x20B9;{product.price.toLocaleString("en-IN")}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-[#1A1A1A]">
                  Quantity
                </span>
                <div className="flex items-center border-2 border-[#4A1080]/20 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-[#4A1080] hover:bg-[#4A1080]/10 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-semibold text-[#1A1A1A]">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-[#4A1080] hover:bg-[#4A1080]/10 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAdd}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold text-white transition-all duration-200 shadow-md ${
                    added
                      ? "bg-green-500"
                      : "bg-[#E8620A] hover:bg-[#c9540a]"
                  }`}
                >
                  {added ? (
                    <>
                      <CheckCircleIcon className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCartIcon className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
                <Link
                  href="/cart"
                  className="flex-1 py-3 px-6 rounded-full font-semibold text-[#4A1080] border-2 border-[#4A1080] hover:bg-[#4A1080] hover:text-white transition-all duration-200 text-center"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="mt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm text-[#4A1080] hover:underline font-medium"
          >
            <ChevronRightIcon className="w-4 h-4 rotate-180" />
            Back to all products
          </Link>
        </div>
      </div>
    </div>
  );
}
