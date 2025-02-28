"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const [query, setQuery] = useState<string>("");

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = () => {
    if (query.trim() !== "") {
      router.replace(`/?q=${query.trim()}`, { scroll: false });
    }
  };
  return (
    <div className="flex gap-1 w-fit">
      <input
        className="bg-gray-100 px-4 py-2 rounded-lg outline-slate-400"
        type="text"
        placeholder="دنبال چه خبری هستی ؟"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 px-4 py-2 rounded-lg text-white transition-colors hover:bg-blue-600"
      >
        جستجو
      </button>
    </div>
  );
}
