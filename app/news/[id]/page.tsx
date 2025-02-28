import { notFound } from "next/navigation";

type NewsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function page({ params }: NewsPageProps) {
  const id = (await params).id;

  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

  const url = `https://newsapi.org/v2/everything?q=${id}&apiKey=${API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    return notFound();
  }

  const data = await res.json();
  const article = data.articles[0];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <img
        src={article.urlToImage}
        alt={article.title}
        className="w-full max-h-[400px] object-cover mt-4"
      />

      <p className="mt-4 text-lg">{article.description}</p>
      <a
        href={article.url}
        target="_blank"
        className="text-blue-500 mt-4 block"
      >
        Read Full Article
      </a>
    </div>
  );
}
