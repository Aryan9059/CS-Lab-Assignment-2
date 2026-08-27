import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import CategoryIcon from "@/components/CategoryIcon";
import {
  FireIcon,
  SwatchIcon,
  BoltIcon,
  HeartIcon,
  LightBulbIcon,
  HandRaisedIcon,
  TagIcon,
  GiftIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const categoryIcons = [
  { label: "Diyas",     icon: FireIcon        },
  { label: "Rangoli",   icon: SwatchIcon      },
  { label: "Fireworks", icon: BoltIcon        },
  { label: "Sweets",    icon: HeartIcon       },
  { label: "Lanterns",  icon: LightBulbIcon   },
  { label: "Puja",      icon: HandRaisedIcon  },
  { label: "Cloths",    icon: TagIcon         },
  { label: "Gifts",     icon: GiftIcon        },
];

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <div className="bg-[#FFF8F0]">

      {/* ── Hero Banner ──────────────────────────────────────────────── */}
      <section className="hero-bg text-white overflow-hidden relative">
        {/* Decorative blurred orbs */}
        <div className="absolute top-[-80px] right-[-80px] w-96 h-96 rounded-full bg-[#E8620A]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 rounded-full bg-[#F5C842]/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6B21A8]/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* ── Left: Text ────────────────────────────────────────── */}
            <div className="flex-1 text-center lg:text-left">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-[#F5C842]/30 text-[#F5C842] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                <SparklesIcon className="w-3.5 h-3.5" />
                Festival of Lights 2025
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] mb-6 tracking-tight">
                Light up your
                <br />
                <span
                  className="text-[#F5C842] drop-shadow-[0_0_30px_rgba(245,200,66,0.5)]"
                  style={{ fontFamily: "var(--font-pacifico)", fontWeight: 400 }}
                >
                  Diwali
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-white/70 text-base md:text-lg max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
                Handpicked diyas, rangoli kits, sweets, lanterns and gifts —
                everything to make this Diwali unforgettable.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 bg-[#E8620A] hover:bg-[#c9540a] text-white font-bold px-8 py-3.5 rounded-full transition-all duration-200 shadow-[0_8px_30px_rgba(232,98,10,0.4)] hover:shadow-[0_8px_40px_rgba(232,98,10,0.55)] hover:-translate-y-0.5"
                >
                  Shop Now
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/products/1"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-3.5 rounded-full border border-white/25 transition-all duration-200"
                >
                  Buy This Product
                </Link>
              </div>

              {/* Stats row */}
              <div className="flex items-center justify-center lg:justify-start gap-8 pt-6 border-t border-white/10">
                {[
                  { value: "500+", label: "Products" },
                  { value: "Free", label: "Delivery" },
                  { value: "10k+", label: "Happy Customers" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-xl font-bold text-[#F5C842]">{stat.value}</p>
                    <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Mandala rotating image ──────────────────── */}
            <div className="flex-shrink-0 relative flex items-center justify-center w-72 h-72 md:w-80 md:h-80">

              {/* CSS keyframes injected inline */}
              <style>{`
                @keyframes spin-slow   { to { transform: rotate(360deg);  } }
                @keyframes spin-rev    { to { transform: rotate(-360deg); } }
                @keyframes spin-slower { to { transform: rotate(360deg);  } }
              `}</style>

              {/* Layer 1 — outermost slow conic-gradient ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #F5C842, #E8620A, #D4A017, #F5C842, #E8620A, #F5C842, transparent 60%, #F5C842)",
                  padding: "3px",
                  animation: "spin-slow 8s linear infinite",
                }}
              >
                <div className="w-full h-full rounded-full bg-[#320A5E]" />
              </div>

              {/* Layer 2 — dashed ring counter-rotating */}
              <div
                className="absolute rounded-full border-[3px] border-dashed border-[#F5C842]/50"
                style={{
                  inset: "10px",
                  animation: "spin-rev 12s linear infinite",
                }}
              />

              {/* Layer 3 — solid thin gold ring */}
              <div
                className="absolute rounded-full border border-[#D4A017]/60"
                style={{ inset: "18px" }}
              />

              {/* Layer 4 — petal dots ring (slow rotate) */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: "14px",
                  animation: "spin-slower 20s linear infinite",
                }}
              >
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#F5C842]"
                    style={{
                      top: "50%",
                      left: "50%",
                      transformOrigin: "0 0",
                      transform: `rotate(${i * 22.5}deg) translateY(-${(80)}%) translateX(-50%)`,
                    }}
                  />
                ))}
              </div>

              {/* Image circle */}
              <div
                className="absolute rounded-full overflow-hidden glow-gold"
                style={{ inset: "28px" }}
              >
                <ProductImage
                  src="/images/hero.webp"
                  alt="Diwali Diya"
                  sizes="220px"
                  className="object-cover"
                />
              </div>

              {/* Floating badge — top right */}
              <div className="absolute -top-1 right-2 bg-[#E8620A] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap z-10">
                <SparklesIcon className="w-3 h-3" />
                New Arrivals
              </div>

              {/* Floating badge — bottom left */}
              <div className="absolute -bottom-1 left-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap z-10">
                <GiftIcon className="w-3.5 h-3.5 text-[#F5C842]" />
                Free Gift Wrapping
              </div>

              {/* Small floating icon cards */}
              <div className="absolute top-4 -left-5 w-10 h-10 bg-[#4A1080] border border-[#F5C842]/30 rounded-xl flex items-center justify-center shadow-lg z-10">
                <LightBulbIcon className="w-5 h-5 text-[#F5C842]" />
              </div>
              <div className="absolute -bottom-3 right-6 w-10 h-10 bg-[#4A1080] border border-[#F5C842]/30 rounded-xl flex items-center justify-center shadow-lg z-10">
                <HandRaisedIcon className="w-5 h-5 text-[#F5C842]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Festive Collection ─────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 leading-tight">
                Explore our range of{" "}
                <span className="text-[#4A1080]">Diwali treasures</span>
              </h2>
              <p className="text-[#6B7280] leading-relaxed mb-6 max-w-md">
                The most magical time of year is here. Light up your home and
                celebrate with our curated range of Diwali essentials — from
                hand-crafted diyas to premium gift hampers.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#E8620A] hover:bg-[#c9540a] text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-md"
              >
                Explore The Range
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            {/* Image */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 rounded-3xl overflow-hidden shadow-2xl glow-gold">
                <ProductImage
                  src="/images/products/sparkles.jpg"
                  alt="Diwali Treasures"
                  sizes="256px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
            Shop by our{" "}
            <span
              className="text-[#E8620A]"
              style={{ fontFamily: "var(--font-pacifico)" }}
            >
              festive
            </span>{" "}
            categories
          </h2>
          <p className="text-[#6B7280] text-sm mb-10">
            Our wide range of categories are crafted using the finest materials
            for an amazing Diwali effect.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {categoryIcons.map((cat) => (
              <CategoryIcon key={cat.label} icon={cat.icon} label={cat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Shopping Checklist ────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
              Finish your{" "}
              <span className="text-[#E8620A]">shopping</span> checklist
            </h2>
            <p className="text-[#6B7280] text-sm max-w-xl mx-auto">
              It&apos;s easy to forget all the extra bits for Diwali — here&apos;s our
              curated checklist to help you prepare.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border-2 border-[#4A1080] text-[#4A1080] hover:bg-[#4A1080] hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-200"
            >
              View All Products
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Decor Range Feature ──────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 rounded-3xl overflow-hidden shadow-xl glow-gold">
                <ProductImage
                  src="/images/products/puja.webp"
                  alt="Puja Range"
                  sizes="256px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 leading-tight">
                Explore our{" "}
                <span className="text-[#4A1080]">puja</span> range of the
                season
              </h2>
              <p className="text-[#6B7280] leading-relaxed mb-6 max-w-md">
                The Diwali festivity is incomplete without a beautifully
                decorated puja thali with fragrant flowers and glowing diyas.
                Discover our artisan-made collection.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#4A1080] hover:bg-[#320A5E] text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-md"
              >
                Explore The Decors
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter / Coupon CTA ───────────────────────────────────── */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight">
                Join now and win some{" "}
                <span className="text-[#E8620A]">amazing</span> coupons
              </h2>
              <p className="text-[#6B7280] text-sm mt-2">
                Subscribe to get exclusive Diwali deals. Your first coupon is{" "}
                <code className="bg-[#4A1080]/10 text-[#4A1080] font-mono font-bold px-2 py-0.5 rounded">
                  SAVE20
                </code>
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 md:w-72 px-5 py-3 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#4A1080]/40"
              />
              <button className="bg-[#E8620A] hover:bg-[#c9540a] text-white p-3 rounded-full transition-colors shadow-md">
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
