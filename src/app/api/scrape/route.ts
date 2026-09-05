import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const revalidate = 3600;

interface BlogArticle {
  title: string;
  link: string;
  excerpt: string;
}

export async function GET() {
  try {
    const response = await fetch("https://payhip.com/blog/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch content" },
        { status: response.status },
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const seenLinks = new Set<string>();
    const articles: BlogArticle[] = [];

    // post-<id> is unique per article, so match on the shared "post" class instead.
    $("div.page-content-container div.col-xs-12.col-md-8 article.post").each(
      (_, element) => {
        const article = $(element);
        const linkElement = article.find("h1 a, h2 a, h3 a").first();
        const title = linkElement.text().trim();
        const href = linkElement.attr("href");

        if (!title || !href) return;

        const link = href.startsWith("http")
          ? href
          : `https://payhip.com${href}`;

        if (seenLinks.has(link)) return;
        seenLinks.add(link);

        articles.push({
          title,
          link,
          excerpt: article.find("p").first().text().trim(),
        });
      },
    );

    // Longer excerpts indicate a fuller article match, used as a relevance signal.
    const mostRelevant = [...articles]
      .sort((a, b) => b.excerpt.length - a.excerpt.length)
      .slice(0, 3);

    return NextResponse.json({
      success: true,
      count: mostRelevant.length,
      articles: mostRelevant,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Scraping failed", details: (error as Error).message },
      { status: 500 },
    );
  }
}
