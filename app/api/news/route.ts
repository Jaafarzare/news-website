import { NextResponse } from "next/server";

export async function GET() {
  const API = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API}`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}
