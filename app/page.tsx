"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Category from "./components/Category";

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

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();

        setArticles(data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="container mx-auto w-full pt-5 flex flex-col gap-8">
      <div className="mb-5">
        <h2 className="text-3xl font-bold mb-4">اخبار برتر</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => {
            return (
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
            );
          })}
        </ul>
      </div>

      <div>
        <Category />
      </div>
    </div>
  );
}
