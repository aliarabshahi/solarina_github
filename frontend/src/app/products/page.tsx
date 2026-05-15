"use client";

import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { ProductType } from "@/app/types/productType";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";

// اضافه کردن تایپ برای دسته‌بندی
type CategoryType = {
  id: number;
  name: string;
  slug: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]); // استیت جدید برای دسته‌بندی‌ها
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // دریافت دسته‌بندی‌ها (فقط یک بار اجرا می‌شود)
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getApiData("product-categories"); // فراخوانی از اندپوینت بک‌اند
      if (!res.error && res.data) {
        setCategories(res.data);
      }
    };
    fetchCategories();
  }, []);

  // دریافت محصولات (هر بار که selectedCategory عوض شود اجرا می‌شود)
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

        <h1
          className=" text-4xl sm:text-5xl font-extrabold
          tracking-tight text-gray-900 leading-tight"
        >
          انرژی خورشید،
          <span className="block sm:inline text-blue-600 mt-2 sm:mt-0 sm:mr-2">
            همیشه همراهت
          </span>
        </h1>

        </div>

        {/* categories */}
        {categories.length > 0 && (
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
                onClick={() => setSelectedCategory(category.slug)}
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
            محصولی برای این دسته وجود ندارد
          </div>
        )}
      </section>
    </main>
  );
}
