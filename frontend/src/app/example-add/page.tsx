"use client";

import { useState } from "react";
import { postApiData } from "@/app/services/receive_data/apiClientPost";
import { FaPlusCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

type ExampleAddForm = {
  title: string;
  slug: string;
  description: string;
  is_active: boolean;
};

export default function ExampleAddPage() {
  const [form, setForm] = useState<ExampleAddForm>({
    title: "",
    slug: "",
    description: "",
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // handle input changes
  const handleChange = (field: keyof ExampleAddForm, value: string | boolean) => {
    setForm({ ...form, [field]: value });
  };

  // handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await postApiData("/example-items/", form);
    setLoading(false);
    setMessage(error ? error : "Item added successfully ✅");

    if (!error) {
      setForm({
        title: "",
        slug: "",
        description: "",
        is_active: true,
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#fffbfd]">
      <div className="max-w-3xl mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-center text-[#1F9ED0] mt-8 mb-10">
          Add New Item
        </h1>

        <motion.form
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          method="post"
          className="space-y-6 bg-white/70 backdrop-blur-md 
                     rounded-xl shadow-[0_2px_10px_rgba(31,158,206,0.08)]
                     border border-[#1F9ECE]/15 p-6 sm:p-8"
        >
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-800">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
              className="w-full border border-[#1F9ECE]/20 rounded-lg 
                         bg-white/60 p-3 placeholder-gray-400 text-gray-800 
                         focus:ring-2 focus:ring-[#1F9ECE] focus:border-[#1F9ECE]
                         transition text-sm sm:text-base"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium mb-2 text-gray-800">
              Slug
            </label>
            <input
              id="slug"
              type="text"
              placeholder="example-item-1"
              value={form.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              required
              className="w-full border border-[#1F9ECE]/20 rounded-lg 
                         bg-white/60 p-3 placeholder-gray-400 text-gray-800 
                         focus:ring-2 focus:ring-[#1F9ECE] focus:border-[#1F9ECE]
                         transition text-sm sm:text-base"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-800">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter description..."
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              className="w-full border border-[#1F9ECE]/20 rounded-lg 
                         bg-white/60 p-3 placeholder-gray-400 text-gray-800 
                         focus:ring-2 focus:ring-[#1F9ECE] focus:border-[#1F9ECE]
                         transition text-sm sm:text-base"
            />
          </div>

          {/* Active Toggle */}
          <div className="flex items-center gap-3">
            <input
              id="is_active"
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => handleChange("is_active", e.target.checked)}
              className="accent-[#1F9ECE] w-5 h-5"
            />
            <label htmlFor="is_active" className="text-sm text-gray-700">
              Active
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 
                       py-2.5 sm:py-3 px-6 rounded-lg text-white font-medium 
                       text-sm sm:text-base bg-gradient-to-r 
                       from-[#1F9ECE] to-[#F477B8] hover:from-[#198cb0] hover:to-[#e267a5]
                       shadow-md hover:shadow-lg transition-all duration-300 
                       disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <FaPlusCircle className="text-sm" />
            )}
            {loading ? "Submitting..." : "Add Item"}
          </button>

          {/* Message Feedback */}
          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-3 rounded-lg text-xs sm:text-sm flex items-center gap-2 ${
                message.startsWith("Item added successfully")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.startsWith("Item added successfully") ? (
                <FaCheckCircle />
              ) : (
                <FaTimesCircle />
              )}
              {message}
            </motion.div>
          )}
        </motion.form>
      </div>
    </main>
  );
}
