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
  FaChevronDown,
  FaSearch,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { postApiData } from "@/app/services/receive_data/apiClientPost";
import { getUser } from "@/app/services/auth/authStorage";

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

  /* ✅ AUTO FILL PHONE FROM LOGGED IN USER */
  useEffect(() => {
    const user = getUser();

    if (user?.phone) {
      setOrder((prev) => ({
        ...prev,
        phone_number: user.phone,
      }));
    }
  }, []);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    if (activeDropdown === index) {
      setActiveDropdown(null);
      setSearchTerm("");
    }
  };

  const toggleDropdown = (index: number) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
      setSearchTerm("");
    } else {
      setActiveDropdown(index);
      setSearchTerm("");
    }
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

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      dir="rtl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative"
    >
      <h2 className="text-2xl font-bold text-blue-600 mb-8 text-center">
        ثبت سفارش جدید
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
        {/* Customer Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <FaCheckCircle className="text-blue-500" />
              انتخاب محصولات
            </h3>
          </div>

          {selectedProducts.map((row, index) => {
            const selectedProductName = row.product
              ? products.find((p) => String(p.id) === row.product)?.name ?? "انتخاب کنید"
              : "-- محصول مورد نظر را انتخاب کنید --";

            return (
              <div
                key={index}
                className={`flex flex-col sm:flex-row sm:items-end gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 relative transition-all ${
                  activeDropdown === index ? "z-30 ring-2 ring-blue-200" : "z-10"
                }`}
              >
                {/* Product Dropdown */}
                <div className="w-full sm:flex-1 min-w-0 relative">
                  <label className="block text-xs font-semibold text-gray-500 mb-2">
                    محصول {requiredStar}
                  </label>
                  <input type="hidden" required value={row.product} />

                  <div
                    onClick={() => toggleDropdown(index)}
                    title={selectedProductName}
                    className={`h-[46px] w-full border ${
                      activeDropdown === index
                        ? "border-blue-500 bg-blue-50/50 shadow-inner"
                        : "border-gray-300"
                    } rounded-lg px-3 text-sm bg-white cursor-pointer flex justify-between items-center transition-all hover:border-blue-400 shadow-sm relative z-20`}
                  >
                    <span
                      className={`truncate ml-2 ${
                        row.product ? "text-gray-800 font-medium" : "text-gray-400"
                      }`}
                    >
                      {selectedProductName}
                    </span>
                    <FaChevronDown
                      className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                        activeDropdown === index ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </div>

                  {/* Dropdown Menu (Centered, Wider & Scrollable) */}
                  {activeDropdown === index && (
                    <div className="absolute z-40 w-[calc(100vw-3rem)] sm:w-[720px] left-1/2 -translate-x-1/2 top-[85px] bg-white border border-gray-100 rounded-xl shadow-2xl flex flex-col overflow-hidden">
                      <div className="p-2 border-b border-gray-100 bg-gray-50/80">
                        <div className="relative">
                          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                          <input
                            type="text"
                            autoFocus
                            placeholder="جستجوی محصول..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full pl-3 pr-9 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="max-h-[260px] overflow-y-auto overflow-x-hidden">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((p) => (
                            <div
                              key={p.id}
                              onClick={() => {
                                updateProductRow(index, "product", String(p.id));
                                setActiveDropdown(null);
                                setSearchTerm("");
                              }}
                              className={`group flex justify-between items-center px-4 py-3 cursor-pointer border-b border-gray-50 last:border-0 transition-colors gap-4 ${
                                row.product === String(p.id)
                                  ? "bg-blue-50 text-blue-700"
                                  : "hover:bg-slate-50 text-gray-700"
                              }`}
                            >
                              <span
                                className={`font-medium truncate ${
                                  row.product === String(p.id)
                                    ? "text-blue-700"
                                    : "text-gray-700 group-hover:text-blue-600"
                                }`}
                              >
                                {p.name}
                              </span>
                              <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap flex-shrink-0">
                                {formatToman(p.price)} تومان
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-sm text-gray-500 text-center flex flex-col items-center gap-3">
                            <span className="text-gray-300 text-2xl">🔍</span>
                            محصولی یافت نشد
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div className="w-full sm:w-24 flex-shrink-0">
                  <label className="block text-xs font-semibold text-gray-500 mb-2">
                    تعداد {requiredStar}
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={row.quantity}
                    onChange={(e) =>
                      updateProductRow(index, "quantity", e.target.value)
                    }
                    className="h-[46px] w-full border border-gray-300 rounded-lg px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none shadow-sm transition-all text-center font-medium relative z-20"
                    dir="ltr"
                  />
                </div>

                {/* Remove Button */}
                <div className="w-full sm:w-[46px] flex-shrink-0 flex justify-end sm:block relative z-20">
                  <label className="hidden sm:block text-xs mb-2 invisible">
                    &nbsp;
                  </label>
                  {selectedProducts.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeProductRow(index)}
                      className="h-[46px] w-full sm:w-[46px] flex-shrink-0 inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all shadow-sm"
                      title="حذف محصول"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  ) : (
                    <div className="hidden sm:block h-[46px] w-[46px]"></div>
                  )}
                </div>
              </div>
            );
          })}

          <div className="flex justify-start relative z-10">
            <button
              type="button"
              onClick={addProductRow}
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-bold bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-lg transition-colors mt-2"
            >
              <span className="text-lg leading-none">+</span> افزودن محصول دیگر
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-5 rounded-xl flex justify-between items-center shadow-sm relative z-10">
          <span className="font-bold text-gray-700">مبلغ کل سفارش:</span>
          <span className="font-extrabold text-blue-700 text-xl tracking-tight">
            {formatToman(totalPrice)}{" "}
            <span className="text-sm font-medium text-blue-600">تومان</span>
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || totalPrice === 0}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 relative z-10 ${
            loading || totalPrice === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5"
          }`}
        >
          {loading ? "در حال پردازش..." : "ثبت سفارش و ادامه"}
        </button>

        {/* Error Message */}
        {message && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium text-center border border-red-200 relative z-10">
            {message}
          </div>
        )}
      </form>

      {/* Blurred Background Overlay */}
      {activeDropdown !== null && (
        <div
          className="fixed inset-0 z-20 bg-slate-800/10 backdrop-blur-[2px] transition-all duration-300"
          onClick={() => {
            setActiveDropdown(null);
            setSearchTerm("");
          }}
        />
      )}
    </motion.div>
  );
}
