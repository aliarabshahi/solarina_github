"use client";

import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { ProductType } from "@/app/types/productType";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getApiData("products");

      if (res.error) {
        setError(res.error);
      } else {
        setProducts(res.data || []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

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
