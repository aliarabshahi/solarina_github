"use client";

import { useEffect, useMemo, useState } from "react";

import ProductCard from "./components/ProductCard";

import { ProductType } from "@/app/types/productType";

import { getApiData } from "@/app/services/receive_data/apiServerFetch";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("all");

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
        setProducts(res.data || []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory]);

  const categories = useMemo(() => {
    const map = new Map();

    products.forEach((product) => {
      map.set(product.category_slug, {
        slug: product.category_slug,
        name: product.category_name,
      });
    });

    return Array.from(map.values());
  }, [products]);

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

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className="inline-flex items-center rounded-full
            bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700"
          >
            محصولات سولارینا
          </span>

          <h1
            className="mt-6 text-4xl sm:text-5xl font-extrabold
            tracking-tight text-gray-900 leading-tight"
          >
            انرژی خورشید،
            <span className="block text-blue-600 mt-2">
              همیشه همراهت
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            پنل‌های خورشیدی سبک، قابل حمل و مناسب سفر،
            طبیعت‌گردی و استفاده روزمره.
          </p>
        </div>

        {/* categories */}
        {!loading && categories.length > 0 && (
          <div
            className="flex flex-wrap items-center justify-center
            gap-3 mb-14"
          >
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all ${
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
                onClick={() =>
                  setSelectedCategory(category.slug)
                }
                className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all ${
                  selectedCategory === category.slug
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="text-center py-20 text-gray-500">
            در حال بارگذاری محصولات...
          </div>
        )}

        {error && (
          <div
            className="max-w-xl mx-auto bg-red-50 border border-red-200
            text-red-700 p-5 rounded-2xl text-center"
          >
            {error}
          </div>
        )}

        {!loading && !error && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3
            gap-8"
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            محصولی برای نمایش وجود ندارد
          </div>
        )}
      </section>
    </main>
  );
}
