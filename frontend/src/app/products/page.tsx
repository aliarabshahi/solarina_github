"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Star } from "lucide-react"; // Added Star icon for favorites

import ProductCard from "./components/ProductCard";
import { ProductType } from "@/app/types/productType";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";

type CategoryType = {
  id: number;
  name: string;
  slug: string;
};

// Skeleton Loader
const SkeletonCard = () => (
  <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
    <div className="aspect-square bg-gray-200 animate-pulse"></div>
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
      <div className="space-y-2.5">
        <div className="h-6 sm:h-7 bg-gray-200 rounded-lg animate-pulse w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full"></div>
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-5/6"></div>
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-1/3"></div>
        <div className="h-8 bg-gray-200 rounded-xl animate-pulse w-1/4"></div>
      </div>
      <div className="flex gap-2 sm:gap-3">
        <div className="flex-1 h-[46px] sm:h-[54px] bg-gray-200 rounded-xl sm:rounded-2xl animate-pulse"></div>
        <div className="flex-1 h-[46px] sm:h-[54px] bg-gray-200 rounded-xl sm:rounded-2xl animate-pulse"></div>
      </div>
    </div>
  </div>
);

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); // ✅ New State
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getApiData("product-categories?ordering=-priority");
      if (!res.error && res.data) {
        setCategories(res.data?.results ? res.data.results : res.data || []);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      // ✅ Build URL with Priority (Highest First) and Favorite filters
      let endpoint = "products?ordering=-priority";

      if (selectedCategory !== "all") {
        endpoint += `&category=${selectedCategory}`;
      }

      if (showFavoritesOnly) {
        endpoint += `&is_favorite=true`;
      }

      const res = await getApiData(endpoint);

      if (res.error) {
        setError(res.error);
      } else {
        setProducts(res.data?.results ? res.data.results : res.data || []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory, showFavoritesOnly]); // ✅ Refetch when favorite toggle changes

  // Search filter (client-side)
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;

    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <main className="min-h-screen bg-white relative overflow-hidden" dir="rtl">
      
      {/* Light decoration */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative right-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#93c5fd] to-[#3b82f6] opacity-20 sm:w-[72rem]" />
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            انرژی خورشید،
            <span className="block sm:inline text-blue-600 mt-2 sm:mt-0 sm:mr-2">
              همیشه همراهت
            </span>
          </h1>
        </div>

        {/* Top bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10 sm:mb-14">

          {/* Categories & Favorite Toggle */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 sm:px-5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              همه محصولات
            </button>

            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 sm:px-5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === category.slug
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}

            {/* ✅ Favorite Toggle Button */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                showFavoritesOnly
                  ? "bg-yellow-500 text-white shadow-lg"
                  : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200"
              }`}
            >
              <Star size={16} fill={showFavoritesOnly ? "white" : "none"} />
              محصولات منتخب
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-auto">
            <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full lg:w-56 bg-gray-100 border border-transparent rounded-2xl py-2.5 sm:py-3 pr-11 pl-4 text-xs sm:text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

        </div>

        {/* Grid handling */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => <SkeletonCard key={item} />)}
          </div>
        ) : error ? (
          <div className="max-w-xl mx-auto bg-red-50 border border-red-200 text-red-700 p-4 sm:p-5 rounded-2xl text-center text-sm sm:text-base">
            {error}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-sm sm:text-base">
            محصولی پیدا نشد
          </div>
        )}

      </section>
    </main>
  );
}
