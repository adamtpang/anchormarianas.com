"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PortfolioPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/work");
  }, [router]);

  return null;
}
