"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/store";
import ProductImage from "@/components/ProductImage";
import {
  ShoppingCartIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  ChevronRightIcon,
  TagIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function CartPage() {
  const {
    items,
    originalTotal,
    discountedTotal,
    couponLog,
    removeFromCart,
    updateQty,
    applyDiscount,
    clearCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const currentTotal =
    discountedTotal !== null ? discountedTotal : originalTotal;
  const totalSaved = parseFloat((originalTotal - currentTotal).toFixed(2));

  async function handleApplyCoupon() {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code.");
      return;
    }
    setCouponError("");
    setCouponLoading(true);

    try {
      // ⚠️ VULNERABILITY: sends the already-discounted total every time.
      // The server never checks how many times SAVE20 was applied.
      const res = await fetch("/api/coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: couponCode.trim().toUpperCase(),
          currentTotal,
        }),
      });
      const data = await res.json();

      if (data.valid) {
        applyDiscount(data.newTotal);
        setCouponError("");
      } else {
        setCouponError(data.message || "Invalid coupon code.");
      }
    } catch {
      setCouponError("Network error. Please try again.");
    } finally {
      setCouponLoading(false);
    }
  }

  // ── Empty cart ─────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="bg-[#FFF8F0] min-h-screen flex items-center justify-center">
        <div className="text-center py-20 px-4">
          <ShoppingCartIcon className="w-20 h-20 text-[#4A1080]/20 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
            Your cart is empty
          </h2>
          <p className="text-[#6B7280] mb-8">
            Add some Diwali essentials to get started.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#E8620A] hover:bg-[#c9540a] text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-md"
          >
            Start Shopping
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // ── Cart ───────────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#FFF8F0] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="text-sm text-[#6B7280] mb-8 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#4A1080] transition-colors">
            Home
          </Link>
          <ChevronRightIcon className="w-3.5 h-3.5 text-[#6B7280]/60" />
          <span className="text-[#1A1A1A] font-medium">Cart</span>
        </nav>

        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8">
          Shopping Cart{" "}
          <span className="text-lg font-normal text-[#6B7280]">
            ({items.reduce((s, i) => s + i.quantity, 0)} items)
          </span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Cart Table ─────────────────────────────────────────────── */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Table header */}
              <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 bg-[#4A1080]/5 text-xs font-semibold text-[#6B7280] uppercase tracking-widest">
                <span>Product</span>
                <span className="text-right">Price</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Subtotal</span>
                <span></span>
              </div>

              {/* Items */}
              {items.map((item, idx) => (
                <div
                  key={item.product.id}
                  className={`flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-5 ${
                    idx < items.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  {/* Product info */}
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#4A1080]/5 flex-shrink-0">
                      <ProductImage
                        src={item.product.image}
                        alt={item.product.name}
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/products/${item.product.id}`}
                        className="font-semibold text-[#1A1A1A] hover:text-[#4A1080] transition-colors text-sm"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-[#6B7280]">
                        {item.product.category}
                      </p>
                    </div>
                  </div>

                  {/* Unit price */}
                  <div className="text-right text-sm font-medium text-[#1A1A1A] hidden md:block">
                    &#x20B9;{item.product.price.toLocaleString("en-IN")}
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-[#4A1080]/20 text-[#4A1080] hover:bg-[#4A1080]/10 flex items-center justify-center transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-[#4A1080]/20 text-[#4A1080] hover:bg-[#4A1080]/10 flex items-center justify-center transition-colors"
                      aria-label="Increase quantity"
                    >
                      <PlusIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right text-sm font-bold text-[#E8620A]">
                    &#x20B9;
                    {(item.product.price * item.quantity).toLocaleString("en-IN")}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Continue shopping */}
            <div className="mt-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-sm text-[#4A1080] hover:underline font-medium"
              >
                <ChevronRightIcon className="w-4 h-4 rotate-180" />
                Continue Shopping
              </Link>
            </div>

          </div>

          {/* ── Order Summary Sidebar ──────────────────────────────────── */}
          <div className="lg:w-96">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-20">
              <h2 className="text-lg font-bold text-[#1A1A1A] mb-5">
                Order Summary
              </h2>

              {/* Totals */}
              <div className="space-y-3 pb-4 border-b border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Cart Total</span>
                  <span className="font-medium">
                    &#x20B9;{originalTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                {couponLog.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 flex items-center gap-1.5">
                      <TagIcon className="w-4 h-4" />
                      SAVE20 &times;{couponLog.length}
                    </span>
                    <span className="text-green-600 font-medium">
                      &minus;&#x20B9;
                      {totalSaved.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280] flex items-center gap-1.5">
                    <TruckIcon className="w-4 h-4" />
                    Delivery
                  </span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 pb-6">
                <span className="font-bold text-[#1A1A1A]">You Pay</span>
                <span className="text-2xl font-bold text-[#E8620A]">
                  &#x20B9;
                  {currentTotal.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              {/* Coupon input */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    placeholder="e.g. SAVE20"
                    className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-[#4A1080] transition-colors uppercase"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponLoading}
                    className="bg-[#4A1080] hover:bg-[#320A5E] disabled:opacity-60 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap"
                  >
                    {couponLoading ? "..." : "Apply"}
                  </button>
                </div>

                {/* Error */}
                {couponError && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1.5">
                    <XCircleIcon className="w-4 h-4 shrink-0" />
                    {couponError}
                  </p>
                )}

                {/* Success */}
                {couponLog.length > 0 && !couponError && (
                  <p className="text-green-600 text-xs mt-2 flex items-center gap-1.5">
                    <CheckCircleIcon className="w-4 h-4 shrink-0" />
                    Coupon applied! You saved &#x20B9;{totalSaved.toLocaleString("en-IN", { minimumFractionDigits: 2 })}.
                  </p>
                )}

                {couponLog.length > 0 && (
                  <button
                    onClick={() => {
                      clearCoupon();
                      setCouponCode("");
                    }}
                    className="text-xs text-[#6B7280] hover:text-red-500 mt-2 underline transition-colors"
                  >
                    Remove coupon
                  </button>
                )}
              </div>

              {/* Checkout CTA */}
              <button className="w-full flex items-center justify-center gap-2 bg-[#E8620A] hover:bg-[#c9540a] text-white font-bold py-3.5 rounded-xl transition-colors shadow-md text-sm">
                Proceed to Checkout
                <ArrowRightIcon className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[#6B7280]">
                <span className="flex items-center gap-1">
                  <ShieldCheckIcon className="w-3.5 h-3.5" />
                  Secure checkout
                </span>
                <span className="flex items-center gap-1">
                  <TruckIcon className="w-3.5 h-3.5" />
                  Free delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
