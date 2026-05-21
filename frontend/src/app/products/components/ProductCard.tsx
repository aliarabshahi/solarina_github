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

        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
          <span
            className="bg-blue-600/90 backdrop-blur text-white text-[10px] sm:text-xs
            px-2 py-1 sm:px-3 rounded-full font-medium"
          >
            {product.category_name}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
        <Link href={`/products/${product.slug}`}>
          <div className="space-y-1.5 sm:space-y-2">
            <h2
              className="text-lg sm:text-xl font-bold text-gray-900
              group-hover:text-blue-600 transition-colors"
            >
              {product.name}
            </h2>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-600 line-clamp-2 sm:line-clamp-3">
              {product.short_description}
            </p>
          </div>
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <p className="hidden sm:block text-[10px] sm:text-xs text-gray-400 mb-1">
              قیمت
            </p>

            <p className="text-xl sm:text-2xl font-extrabold text-blue-600">
              {formatToman(product.price)}
              <span className="text-xs sm:text-sm mr-1 font-medium">
                تومان
              </span>
            </p>
          </div>

          <div>
            {product.stock > 0 ? (
              <span
                className="flex items-center gap-1 text-green-700
                bg-green-50 px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl text-[10px] sm:text-xs font-medium"
              >
                <Zap size={14} className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                موجود
              </span>
            ) : (
              <span
                className="bg-red-50 text-red-700
                px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl text-[10px] sm:text-xs font-medium"
              >
                ناموجود
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 flex items-center justify-center
            border border-blue-200 text-blue-600 hover:bg-blue-50
            py-3 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300"
          >
            مشاهده جزئیات
          </Link>

          {isOutOfStock ? (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2
              bg-blue-200 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl
              text-xs sm:text-sm font-bold cursor-not-allowed"
            >
              <ShoppingBag size={16} className="sm:w-[18px] sm:h-[18px]" />
              خرید
            </button>
          ) : (
            <Link
              href={`/order?product=${product.id}`}
              className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2
              bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl
              text-xs sm:text-sm font-bold transition-all duration-300"
            >
              <ShoppingBag size={16} className="sm:w-[18px] sm:h-[18px]" />
              خرید
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
