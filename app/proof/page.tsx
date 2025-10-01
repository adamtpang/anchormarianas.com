"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProofPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/about#trust");
  }, [router]);

  return null;
}
