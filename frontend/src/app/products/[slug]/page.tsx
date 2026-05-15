"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import { ProductType } from "@/app/types/productType";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";

import { ShoppingBag, Zap } from "lucide-react";

export default function ProductDetailsPage() {
  const params = useParams();

  const slug = params.slug as string;

  const [product, setProduct] = useState<ProductType | null>(null);

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getApiData(`products/${slug}`);

      if (!res.error && res.data) {
        setProduct(res.data);

        if (res.data.images?.length > 0) {
          setSelectedImage(res.data.images[0].image_url);
        }
      }

      setLoading(false);
    };

    fetchProduct();
  }, [slug]);

  const formatToman = (rial: number) => {
    return (rial / 10).toLocaleString();
  };

  if (loading) {
    return (
      <div className="py-32 text-center text-gray-500">
        در حال بارگذاری...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-32 text-center text-red-500">
        محصول پیدا نشد
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen" dir="rtl">
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* gallery */}
          <div className="space-y-5">
            <div
              className="relative aspect-square rounded-3xl
              overflow-hidden bg-gray-100"
            >
              <Image
                src={
                  selectedImage ||
                  product.primary_image ||
                  "/images/solar/solar1.png"
                }
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() =>
                    setSelectedImage(img.image_url)
                  }
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === img.image_url
                      ? "border-blue-600"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img.image_url}
                    alt={img.alt_text || product.name}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* content */}
          <div className="flex flex-col justify-center">
            <span
              className="inline-flex w-fit items-center rounded-full
              bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700"
            >
              {product.category_name}
            </span>

            <h1
              className="mt-6 text-4xl font-extrabold
              text-gray-900 leading-tight"
            >
              {product.name}
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {product.description}
            </p>

            <div className="mt-10 flex items-center gap-4">
              {product.stock > 0 ? (
                <span
                  className="flex items-center gap-2
                  bg-green-50 text-green-700
                  px-4 py-3 rounded-2xl text-sm font-medium"
                >
                  <Zap size={18} />
                  موجود در انبار
                </span>
              ) : (
                <span
                  className="bg-red-50 text-red-700
                  px-4 py-3 rounded-2xl text-sm font-medium"
                >
                  ناموجود
                </span>
              )}
            </div>

            <div className="mt-10">
              <p className="text-sm text-gray-400 mb-2">
                قیمت محصول
              </p>

              <p className="text-5xl font-extrabold text-blue-600">
                {formatToman(product.price)}

                <span className="text-lg mr-2">
                  تومان
                </span>
              </p>
            </div>

            <div className="mt-12 flex gap-4">
              <Link
                href={`/order?product=${product.id}`}
                className="flex items-center justify-center gap-2
                bg-blue-600 hover:bg-blue-700 text-white
                px-8 py-5 rounded-2xl font-bold transition-all"
              >
                <ShoppingBag size={20} />
                خرید محصول
              </Link>

              <Link
                href="/products"
                className="border border-gray-200 hover:bg-gray-50
                px-8 py-5 rounded-2xl font-bold transition-all"
              >
                بازگشت
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
