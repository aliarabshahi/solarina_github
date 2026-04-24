"use client";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaMailBulk,
  FaCheckCircle,
  FaMinusCircle, // simple minimal sign for remove
} from "react-icons/fa";
import { motion } from "framer-motion";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";

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
  product: string;  // product id as string
  quantity: string; // keep as string for easier binding
};

export default function OrderForm() {
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

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getApiData("/products/?page_size=100");
        if (res?.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };
    fetchProducts();
  }, []);

  /* ---------------- FORM HANDLERS ---------------- */
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

  /* ---------------- TOTAL PRICE ---------------- */
  const totalPrice = selectedProducts.reduce((sum, row) => {
    const product = products.find((p) => String(p.id) === row.product);
    if (!product) return sum;
    const qty = Number(row.quantity) || 0;
    return sum + product.price * qty;
  }, 0);

  /* ---------------- SUBMIT (dummy) ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // TODO: replace with real POST to /orders/
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    setMessage("سفارش شما با موفقیت ثبت شد ✅");

    // reset
    setSelectedProducts([{ product: "", quantity: "1" }]);
    setOrder({
      full_name: "",
      phone_number: "",
      email: "",
      address: "",
      postal_code: "",
      notes: "",
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-blue-500/15 w-full"
    >
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        ثبت سفارش
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
        {/* NAME */}
        <InputField
          label="نام کامل"
          icon={<FaUser />}
          required
          value={order.full_name}
          onChange={(v) => handleChange("full_name", v)}
        />

        {/* PHONE */}
        <InputField
          label="شماره موبایل"
          icon={<FaPhone />}
          required
          value={order.phone_number}
          onChange={(v) => handleChange("phone_number", v)}
        />

        {/* EMAIL (optional but kept for layout consistency) */}
        <InputField
          label="ایمیل"
          icon={<FaMailBulk />}
          value={order.email}
          onChange={(v) => handleChange("email", v)}
        />

        {/* PRODUCTS SECTION */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              محصولات مورد نظر
            </span>
            <button
              type="button"
              onClick={addProductRow}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              + افزودن محصول دیگر
            </button>
          </div>

          {selectedProducts.map((row, index) => {
            const canRemove = selectedProducts.length > 1;

            return (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end"
              >
                {/* PRODUCT SELECT */}
                <div className="sm:col-span-7">
                  <label className="block text-sm mb-2 text-gray-700">
                    محصول *
                  </label>
                  <select
                    required
                    value={row.product}
                    onChange={(e) =>
                      updateProductRow(index, "product", e.target.value)
                    }
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">انتخاب کنید...</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.price.toLocaleString()} تومان
                      </option>
                    ))}
                  </select>
                </div>

                {/* QUANTITY */}
                <div className="sm:col-span-3">
                  <label className="block text-sm mb-2 text-gray-700">
                    تعداد *
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={row.quantity}
                    onChange={(e) =>
                      updateProductRow(index, "quantity", e.target.value)
                    }
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* MINIMAL REMOVE ICON */}
                <div className="sm:col-span-2 flex justify-center sm:justify-end pb-1">
                  <button
                    type="button"
                    aria-label="حذف سطر"
                    disabled={!canRemove}
                    onClick={() => canRemove && removeProductRow(index)}
                    className={`flex items-center justify-center h-10 w-10 rounded-full border text-xs transition
                      ${
                        canRemove
                          ? "border-red-200 text-red-400 hover:border-red-400 hover:text-red-600 hover:bg-red-50"
                          : "border-gray-200 text-gray-300 cursor-default"
                      }`}
                  >
                    <FaMinusCircle className="text-base" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* TOTAL */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-sm text-gray-600">مجموع سفارش:</span>
          <span className="font-semibold text-blue-700">
            {totalPrice.toLocaleString()} تومان
          </span>
        </div>

        {/* ADDRESS */}
        <InputField
          label="آدرس دقیق"
          icon={<FaMapMarkerAlt />}
          required
          value={order.address}
          onChange={(v) => handleChange("address", v)}
        />

        {/* POSTAL CODE */}
        <InputField
          label="کد پستی"
          icon={<FaMailBulk />}
          required
          value={order.postal_code}
          onChange={(v) => handleChange("postal_code", v)}
        />

        {/* NOTES */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">
            توضیحات تکمیلی
          </label>
          <textarea
            value={order.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 text-sm"
            rows={3}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg transition flex items-center justify-center gap-2 text-sm font-medium"
        >
          {loading ? "در حال ثبت..." : "ثبت سفارش"}
        </button>

        {/* MESSAGE */}
        {message && (
          <div className="bg-green-100 text-green-800 p-3 rounded-lg text-sm flex items-center gap-2 mt-2">
            <FaCheckCircle />
            {message}
          </div>
        )}
      </form>
    </motion.section>
  );
}

/* ---------------- REUSABLE INPUT COMPONENT ---------------- */

function InputField({
  label,
  icon,
  value,
  onChange,
  required = false,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm mb-2 text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute right-3 top-3 text-blue-500">
          {icon}
        </div>
        <input
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
    </div>
  );
}
