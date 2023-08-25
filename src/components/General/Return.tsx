"use client";

import { usePathname, useRouter } from "next/navigation";

export default function Return() {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === "/") return null;

  const navigateBack = () => {
    router.back();
  };

  return (
    <span className="cursor-pointer text-white">
      <a onClick={() => navigateBack()}>&larr;</a>
    </span>
  );
}
