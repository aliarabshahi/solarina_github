"use client";

import { useState, useEffect } from "react";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaMailBulk,
  FaCheckCircle,
  FaMinusCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { useRouter } from "next/navigation";

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
  const [loading] = useState(false);
  const router = useRouter();

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

  /* ---------------- HELPERS ---------------- */
  const formatToman = (rial: number) => {
    return (rial / 10).toLocaleString();
  };

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

  /* ---------------- SUBMIT HANDLER ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      ...order,
      products: selectedProducts.map((row) => {
        const product = products.find((p) => String(p.id) === row.product);
        const quantity = Number(row.quantity) || 0;
        const unitPrice = product?.price || 0;

        // --- START OF CHANGES ---
        return {
          product_id: Number(row.product),
          name: product?.name || "محصول یافت نشد", // CHANGED: from product_name to name
          quantity: quantity,
          unit_price: unitPrice, // ADDED: The price of a single item
          total_price: quantity * unitPrice, // ADDED: The total for this line item
        };
        // --- END OF CHANGES ---
      }),
      total_price: totalPrice,
    };

    const encoded = encodeURIComponent(JSON.stringify(orderData));
    router.push(`/order/review?data=${encoded}`);
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
        <InputField
          label="نام کامل"
          icon={<FaUser />}
          required
          name="full_name"
          autoComplete="name"
          type="text"
          value={order.full_name}
          onChange={(v: string) => handleChange("full_name", v)}
        />

        <InputField
          label="شماره موبایل"
          icon={<FaPhone />}
          required
          name="phone"
          autoComplete="tel"
          type="tel"
          value={order.phone_number}
          onChange={(v: string) => handleChange("phone_number", v)}
        />

        <InputField
          label="ایمیل"
          icon={<FaMailBulk />}
          name="email"
          autoComplete="email"
          type="email"
          value={order.email}
          onChange={(v: string) => handleChange("email", v)}
        />

        {/* PRODUCTS */}
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
                        {p.name} — {formatToman(p.price)} تومان
                      </option>
                    ))}
                  </select>
                </div>

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

                <div className="sm:col-span-2 flex justify-center sm:justify-end pb-1">
                  <button
                    type="button"
                    disabled={!canRemove}
                    onClick={() => canRemove && removeProductRow(index)}
                    className={`flex items-center justify-center h-10 w-10 rounded-full border ${
                      canRemove
                        ? "border-red-200 text-red-400 hover:border-red-400 hover:text-red-600 hover:bg-red-50"
                        : "border-gray-200 text-gray-300"
                    }`}
                  >
                    <FaMinusCircle />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-sm text-gray-600">مجموع سفارش:</span>
          <span className="font-semibold text-blue-700">
            {formatToman(totalPrice)} تومان
          </span>
        </div>

        <InputField
          label="آدرس"
          icon={<FaMapMarkerAlt />}
          required
          name="address"
          autoComplete="street-address"
          type="text"
          value={order.address}
          onChange={(v: string) => handleChange("address", v)}
        />

        <InputField
          label="کد پستی"
          icon={<FaMailBulk />}
          required
          name="postal_code"
          autoComplete="postal-code"
          type="text"
          value={order.postal_code}
          onChange={(v: string) => handleChange("postal_code", v)}
        />

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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-medium"
        >
          ثبت سفارش
        </button>

        {message && (
          <div className="bg-green-100 text-green-800 p-3 rounded-lg text-sm flex items-center gap-2">
            <FaCheckCircle />
            {message}
          </div>
        )}
      </form>
    </motion.section>
  );
}

/* INPUT COMPONENT */

function InputField({
  label,
  icon,
  value,
  onChange,
  required = false,
  name,
  autoComplete,
  type = "text",
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  name?: string;
  autoComplete?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm mb-2 text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute right-3 top-3 text-blue-500">{icon}</div>
        <input
          name={name}
          autoComplete={autoComplete}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
    </div>
  );
}
