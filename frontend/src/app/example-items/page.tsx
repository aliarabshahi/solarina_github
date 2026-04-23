"use client";

import ExampleItemsServerSeo from "./components/ExampleItemsServerSeo";
import ExampleItemsClient from "./components/ExampleItemsClient";

/**
 * ExampleItemsPage
 * Displays both fetching methods independently for comparison and testing
 */
export default function ExampleItemsPage() {
  return (
    <main className="min-h-screen bg-[#fffbfd] p-6" dir="rtl">
      <h1 className="text-2xl font-bold text-center text-solarina-dark mb-8">
        Example Items
      </h1>

      <div className="space-y-10">
        <ExampleItemsServerSeo />
        <ExampleItemsClient />
      </div>
    </main>
  );
}
