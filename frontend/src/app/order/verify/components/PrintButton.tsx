"use client";

import { FaPrint } from "react-icons/fa";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors text-sm sm:text-base shadow-sm"
    >
      <FaPrint className="w-4 h-4 sm:w-5 sm:h-5" />
      چاپ / دانلود رسید
    </button>
  );
}
