"use client";

import { useEffect, useState } from "react";
import { fetchApiData } from "@/app/services/receive_data/apiClientAxios";
import { ExampleItemsResponse } from "@/app/types/exampleType";

/**
 * ExampleItemsClient
 * Fetches data using fetchApiData → Client‑Side (Browser Rendering)
 */
export default function ExampleItemsClient() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const res = await fetchApiData<ExampleItemsResponse>("example-items", {
          page_size: 5,
        });
        setData(res);
      } catch (err) {
        console.error("Error fetching client-side data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClientData();
  }, []);

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        fetchApiData Result <span className="text-sm text-gray-500">(Client‑Side / Browser)</span>
      </h2>

      {loading ? (
        <div className="text-center text-gray-500 mt-4">Loading data from browser...</div>
      ) : (
        <pre className="bg-gray-100 text-gray-800 text-sm p-4 rounded overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </section>
  );
}
