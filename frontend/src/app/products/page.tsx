"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import ProductCard from "./components/ProductCard";
import { ProductType } from "@/app/types/productType";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";

type CategoryType = {
  id: number;
  name: string;
  slug: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getApiData("product-categories");

      if (!res.error && res.data) {
        setCategories(
          res.data?.results ? res.data.results : res.data || []
        );
      }
    };

    fetchCategories();
  }, []);

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const endpoint =
        selectedCategory === "all"
          ? "products"
          : `products?category=${selectedCategory}`;

      const res = await getApiData(endpoint);

      if (res.error) {
        setError(res.error);
      } else {
        setProducts(
          res.data?.results ? res.data.results : res.data || []
        );
      }

      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory]);

  // search filter
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;

    return products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <main
      className="min-h-screen bg-white relative overflow-hidden"
      dir="rtl"
    >
      {/* top decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative right-[calc(50%-11rem)] aspect-[1155/678]
          w-[36rem] translate-x-1/2 rotate-[30deg]
          bg-gradient-to-tr from-[#93c5fd] to-[#3b82f6]
          opacity-20 sm:w-[72rem]"
        />
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h1
            className="text-3xl sm:text-5xl font-extrabold
            tracking-tight text-gray-900 leading-tight"
          >
            انرژی خورشید،
            <span className="block sm:inline text-blue-600 mt-2 sm:mt-0 sm:mr-2">
              همیشه همراهت
            </span>
          </h1>
        </div>

        {/* top bar (categories + search) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10 sm:mb-14">

          {/* categories */}
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
          </div>

          {/* minimal search */}
          <div className="relative w-full lg:w-auto">
            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="جستجو"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
              w-full lg:w-56
              bg-gray-100
              border border-transparent
              rounded-2xl
              py-2.5 sm:py-3 pr-11 pl-4
              text-xs sm:text-sm
              text-gray-700
              placeholder:text-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:bg-white
              transition-all
              "
            />
          </div>

        </div>

        {/* loading */}
        {loading && (
          <div className="text-center py-20 text-gray-500 text-sm sm:text-base">
            در حال بارگذاری محصولات...
          </div>
        )}

        {/* error */}
        {error && (
          <div
            className="max-w-xl mx-auto bg-red-50 border border-red-200
            text-red-700 p-4 sm:p-5 rounded-2xl text-center text-sm sm:text-base"
          >
            {error}
          </div>
        )}

        {/* products */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

        {/* empty */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500 text-sm sm:text-base">
            محصولی پیدا نشد
          </div>
        )}

      </section>
    </main>
  );
}
