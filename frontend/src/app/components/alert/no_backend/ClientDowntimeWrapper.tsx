// app/.../ClientDowntimeWrapper.tsx
"use client";

import useHealthCheck from "../../../services/hooks/useHealthCheck";
import GlobalDowntimeBanner from "./GlobalDowntimeBanner";

/** Wraps children with a global downtime banner if the health check fails */
export default function ClientDowntimeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isHealthy = useHealthCheck();

  return (
    <>
      {/* Show banner if service health check fails */}
      {!isHealthy && <GlobalDowntimeBanner />}
      {children}
    </>
  );
}
