import { Suspense } from "react";
import VerifyPageClient from "./components/VerifyPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPageClient />
    </Suspense>
  );
}
