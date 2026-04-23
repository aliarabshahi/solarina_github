
"use client";

import { useEffect, useState } from "react";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";

/**
 * ExampleItemsServer
 * Fetches data using getApiData → Server‑Side (SEO‑Friendly)
 */
export default function ExampleItemsServerSeo() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const res = await getApiData("/example-items/?page_size=5");
        setData(res.data || res);
      } catch (err) {
        console.error("Error fetching server-side data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServerData();
  }, []);

  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        getApiData Result <span className="text-sm text-gray-500">(Server‑Side / SEO‑Friendly)</span>
      </h2>

      {loading ? (
        <div className="text-center text-gray-500 mt-4">Loading data from server...</div>
      ) : (
        <pre className="bg-gray-100 text-gray-800 text-sm p-4 rounded overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </section>
  );
}
