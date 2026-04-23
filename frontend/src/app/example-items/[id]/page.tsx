import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { notFound } from "next/navigation";

/**
 * ExampleItemDetailPage
 * Server‑Side, SEO‑friendly page that shows a single item by ID
 */
export default async function ExampleItemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // === 1️⃣ Fetch a single item by ID ===
  const response = await getApiData(`/example-items/${params.id}/`);

  // === 2️⃣ Extract data and handle not found cases ===
  const itemData = response?.data || response;
  if (!itemData || Object.keys(itemData).length === 0) {
    notFound();
  }

  // === 3️⃣ Render a simple JSON output for debugging (can replace with card UI later) ===
  return (
    <main className="min-h-screen bg-[#fffbfd] p-6" dir="rtl">
      <h1 className="text-2xl font-bold text-center text-solarina-dark mb-8">
        Example Item Detail — ID: {params.id}
      </h1>

      <section className="max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          getApiData Result <span className="text-sm text-gray-500">(Server‑Side / SEO‑Friendly)</span>
        </h2>

        <pre className="bg-gray-100 text-gray-800 text-sm p-4 rounded overflow-x-auto">
          {JSON.stringify(itemData, null, 2)}
        </pre>
      </section>
    </main>
  );
}
