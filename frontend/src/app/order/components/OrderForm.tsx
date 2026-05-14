"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaMailBulk,
  FaCheckCircle,
  FaTrashAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { postApiData } from "@/app/services/receive_data/apiClientPost";

type OrderFormData = {
  full_name: string;
  phone_number: string;
  email: string;
  address: string;
  postal_code: string;
  notes: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
};

type SelectedProduct = {
  product: string;
  quantity: string;
};

export default function OrderForm() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([
    { product: "", quantity: "1" },
  ]);

  const [order, setOrder] = useState<OrderFormData>({
    full_name: "",
    phone_number: "",
    email: "",
    address: "",
    postal_code: "",
    notes: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* FETCH PRODUCTS */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getApiData("/products/?page_size=100");
        if (res?.data) setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    fetchProducts();
  }, []);

  /* HELPERS */
  const formatToman = (rial: number) => {
    return (rial / 10).toLocaleString();
  };

  // soft required star
  const requiredStar = (
    <span className="text-rose-400 text-sm font-medium">*</span>
  );

  /* FORM HANDLERS */
  const handleChange = (field: keyof OrderFormData, value: string) => {
    setOrder((prev) => ({ ...prev, [field]: value }));
  };

  const updateProductRow = (
    index: number,
    field: "product" | "quantity",
    value: string
  ) => {
    setSelectedProducts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addProductRow = () => {
    setSelectedProducts((prev) => [...prev, { product: "", quantity: "1" }]);
  };

  const removeProductRow = (index: number) => {
    if (selectedProducts.length === 1) return;
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  /* TOTAL PRICE */
  const totalPrice = selectedProducts.reduce((sum, row) => {
    const product = products.find((p) => String(p.id) === row.product);
    if (!product) return sum;

    const qty = Number(row.quantity) || 0;
    return sum + product.price * qty;
  }, 0);

  /* SUBMIT */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const orderData = {
      full_name: order.full_name,
      phone_number: order.phone_number,
      email: order.email,
      address: order.address,
      postal_code: order.postal_code,
      notes: order.notes,
      products: selectedProducts.map((row) => {
        const product = products.find((p) => String(p.id) === row.product);

        const quantity = Number(row.quantity) || 0;
        const unitPrice = product?.price || 0;

        return {
          product_id: Number(row.product),
          name: product?.name || "محصول یافت نشد",
          quantity,
          unit_price: unitPrice,
          total_price: quantity * unitPrice,
        };
      }),
      total_price: totalPrice,
    };

    try {
      const res = await postApiData<{
        tracking_code: string;
        order_id: number;
      }>("orders/draft/", orderData);

      if (res.error || !res.data?.tracking_code) {
        setMessage(res.error || "خطا در ثبت سفارش");
        setLoading(false);
        return;
      }

      router.push(`/order/review/${res.data.tracking_code}`);
    } catch (err) {
      console.error("Submit Error:", err);
      setMessage("خطا در ارتباط با سرور");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-blue-600 mb-8 text-center">
        ثبت سفارش جدید
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
        {/* Customer Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <FaUser className="text-gray-400" />
              نام و نام خانوادگی
              {requiredStar}
            </label>

            <input
              type="text"
              name="full_name"
              autoComplete="name"
              required
              value={order.full_name}
              onChange={(e) => handleChange("full_name", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none transition"
              placeholder="علی احمدی"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <FaPhone className="text-gray-400" />
              شماره موبایل
              {requiredStar}
            </label>

            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              required
              value={order.phone_number}
              onChange={(e) => handleChange("phone_number", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none transition"
              placeholder="09123456789"
              dir="ltr"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <FaMailBulk className="text-gray-400" />
              ایمیل
            </label>

            <input
              type="email"
              name="email"
              autoComplete="email"
              value={order.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none transition"
              placeholder="example@mail.com"
              dir="ltr"
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-gray-400" />
              کد پستی
              {requiredStar}
            </label>

            <input
              type="text"
              name="postal_code"
              autoComplete="postal-code"
              required
              value={order.postal_code}
              onChange={(e) => handleChange("postal_code", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none transition"
              placeholder="1234567890"
              dir="ltr"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-gray-400" />
            آدرس دقیق
            {requiredStar}
          </label>

          <textarea
            name="address"
            autoComplete="street-address"
            required
            value={order.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none transition h-24 resize-none"
            placeholder="استان، شهر، خیابان..."
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            توضیحات سفارش
          </label>

          <textarea
            name="notes"
            value={order.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none transition h-24 resize-none"
            placeholder="توضیحات اضافی (اختیاری)"
          />
        </div>

        {/* Products */}
        <div className="border-t pt-6 space-y-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <FaCheckCircle className="text-blue-500" />
            انتخاب محصولات
          </h3>

          {selectedProducts.map((row, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-end gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200"
            >
              {/* Product */}
              <div className="w-full sm:w-2/3">
                <label className="block text-xs text-gray-500 mb-1">
                  محصول {requiredStar}
                </label>

                <select
                  required
                  value={row.product}
                  onChange={(e) => updateProductRow(index, "product", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none"
                >
                  <option value="">-- انتخاب کنید --</option>

                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} - {formatToman(p.price)} تومان
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="w-full sm:w-1/4">
                <label className="block text-xs text-gray-500 mb-1">
                  تعداد {requiredStar}
                </label>

                <input
                  type="number"
                  min="1"
                  required
                  value={row.quantity}
                  onChange={(e) => updateProductRow(index, "quantity", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none"
                  dir="ltr"
                />
              </div>

              {/* Remove */}
              {selectedProducts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProductRow(index)}
                  className="h-[42px] w-[42px] inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition"
                  title="حذف محصول"
                  aria-label="حذف محصول"
                >
                  <FaTrashAlt size={18} />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addProductRow}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            + افزودن محصول دیگر
          </button>
        </div>

        {/* Total */}
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex justify-between items-center">
          <span className="font-semibold text-gray-700">مبلغ کل سفارش:</span>

          <span className="font-bold text-blue-700 text-lg">
            {formatToman(totalPrice)} تومان
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || totalPrice === 0}
          className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
            loading || totalPrice === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
          }`}
        >
          {loading ? "در حال پردازش..." : "ثبت سفارش و ادامه"}
        </button>

        {/* Error Message */}
        {message && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-200">
            {message}
          </div>
        )}
      </form>
    </motion.div>
  );
}
