"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/app/types/productType";
import { ShoppingBag, Zap } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function ProductCard({
  product,
}: {
  product: ProductType;
}) {
  const formatToman = (rial: number) => {
    return (rial / 10).toLocaleString();
  };

  const isOutOfStock = product.stock <= 0;

  const productImages =
    product.images?.length > 0
      ? product.images
      : [
          {
            id: 0,
            image_url: "/images/solar/solar1.png",
            alt_text: product.name,
            is_primary: true,
          },
        ];

  return (
    <div
      className="group bg-white border border-gray-100 rounded-3xl overflow-hidden
      shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop
          className="w-full h-full"
        >
          {productImages.map((img) => (
            <SwiperSlide key={img.id}>
              <div className="relative w-full h-full">
                <Image
                  src={img.image_url}
                  alt={img.alt_text || product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute top-4 right-4 z-10">
          <span
            className="bg-blue-600/90 backdrop-blur text-white text-xs
            px-3 py-1 rounded-full font-medium"
          >
            {product.category_name}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <Link href={`/products/${product.slug}`}>
          <div className="space-y-2">
            <h2
              className="text-xl font-bold text-gray-900
              group-hover:text-blue-600 transition-colors"
            >
              {product.name}
            </h2>

            <p className="text-sm leading-7 text-gray-600 line-clamp-3">
              {product.short_description}
            </p>
          </div>
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-1">
              قیمت
            </p>

            <p className="text-2xl font-extrabold text-blue-600">
              {formatToman(product.price)}
              <span className="text-sm mr-1 font-medium">
                تومان
              </span>
            </p>
          </div>

          <div>
            {product.stock > 0 ? (
              <span
                className="flex items-center gap-1 text-green-700
                bg-green-50 px-3 py-2 rounded-xl text-xs font-medium"
              >
                <Zap size={14} />
                موجود
              </span>
            ) : (
              <span
                className="bg-red-50 text-red-700
                px-3 py-2 rounded-xl text-xs font-medium"
              >
                ناموجود
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 flex items-center justify-center
            border border-blue-200 text-blue-600 hover:bg-blue-50
            py-4 rounded-2xl font-bold transition-all duration-300"
          >
            مشاهده جزئیات
          </Link>

          {isOutOfStock ? (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-2
              bg-blue-200 text-white py-4 rounded-2xl
              font-bold cursor-not-allowed"
            >
              <ShoppingBag size={18} />
              خرید
            </button>
          ) : (
            <Link
              href={`/order?product=${product.id}`}
              className="flex-1 flex items-center justify-center gap-2
              bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl
              font-bold transition-all duration-300"
            >
              <ShoppingBag size={18} />
              خرید
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
