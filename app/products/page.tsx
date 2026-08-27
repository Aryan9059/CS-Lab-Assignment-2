import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const filtered = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : products;

  return (
    <div className="bg-[#FFF8F0] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page header */}
        <div className="mb-10">
          <p className="text-[#E8620A] text-sm font-semibold uppercase tracking-widest mb-1">
            Our Collection
          </p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
                {query ? (
                  <>
                    Results for{" "}
                    <span className="text-[#4A1080]">&ldquo;{query}&rdquo;</span>
                  </>
                ) : (
                  "All Products"
                )}
              </h1>
              <p className="text-[#6B7280] mt-1 text-sm">
                {filtered.length === 0
                  ? "No products found."
                  : `${filtered.length} ${filtered.length === 1 ? "item" : "items"} found`}
              </p>
            </div>

            {/* Clear search */}
            {query && (
              <a
                href="/products"
                className="text-sm text-[#4A1080] hover:underline font-medium"
              >
                Clear search &times;
              </a>
            )}
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <MagnifyingGlassIcon className="w-16 h-16 text-[#4A1080]/20 mb-4" />
            <h2 className="text-xl font-semibold text-[#1A1A1A] mb-2">
              No results for &ldquo;{query}&rdquo;
            </h2>
            <p className="text-[#6B7280] text-sm mb-6">
              Try searching for diyas, rangoli, sweets, lanterns, or gifts.
            </p>
            <a
              href="/products"
              className="inline-flex items-center gap-2 bg-[#4A1080] hover:bg-[#320A5E] text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Browse all products
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
