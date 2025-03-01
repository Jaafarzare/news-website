"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Search from "./Search";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface Source {
  id: string | null;
  name: string;
}

interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export default function Category() {
  const categories = [
    "technology",
    "sports",
    "business",
    "health",
    "entertainment",
  ];

  const [selectedCategory, setSelectedCategory] =
    useState<string>("technology");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    fetchNews();
  }, [selectedCategory, searchQuery]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

      let url = `https://newsapi.org/v2/top-headlines?category=${selectedCategory}&country=us&apiKey=${API_KEY}`;

      if (searchQuery) {
        url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${API_KEY}`;
      }

      const res = await fetch(url);

      if (!res.ok) throw new Error("خطا در دریافت اخبار!");

      const data = await res.json();
      setArticles(data.articles);
    } catch (error) {
      setError(`خطا  ${error}در دریافت اخبار! لطفاً دوباره تلاش کنید.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">اخبار بر اساس دسته‌بندی</h1>

      <div className="flex gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg transition-colors ${
              category === selectedCategory
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => {
              setSelectedCategory(category);
              router.replace("/?q=", { scroll: false });
            }}
          >
            {category}
          </button>
        ))}

        <Search />
      </div>

      {/* نمایش خطا */}
      {error && <p className="text-red-500">{error}</p>}

      {/* نمایش لودینگ */}
      {loading && <p>در حال دریافت اخبار...</p>}

      {!loading && !error && (
        <>
          {articles.length === 0 ? (
            <p className="text-gray-600">نتیجه‌ای یافت نشد.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <li key={index} className="bg-white shadow-lg rounded-lg p-4">
                  {article.urlToImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  )}
                  <h3 className="text-lg font-bold mt-2">{article.title}</h3>
                  <p className="text-gray-600 mt-1">{article.description}</p>
                  <Link
                    href={`/news/${article.title}`}
                    className="text-blue-500 mt-2 block"
                  >
                    مطالعه بیشتر
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
