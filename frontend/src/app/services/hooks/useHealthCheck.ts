"use client";

import { useEffect, useState } from "react";
import { getServerConfig } from "../config/config";

export default function useHealthCheck(intervalMs = 30000) {
  const [healthy, setHealthy] = useState(true);
  const { HEALTHCHECK_URL } = getServerConfig(); // use full URL from .env

  async function check() {
    try {
      const res = await fetch(HEALTHCHECK_URL, {
        cache: "no-store",
        redirect: "follow", // handle any proxy redirects
      });
      setHealthy(res.ok);
    } catch {
      setHealthy(false);
    }
  }

  useEffect(() => {
    check();
    const id = setInterval(check, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, HEALTHCHECK_URL]);

  return healthy;
}
