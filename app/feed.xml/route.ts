import { getPublicArticles } from "@/lib/articleService";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET() {
  let articles: Awaited<ReturnType<typeof getPublicArticles>>["articles"] = [];
  try {
    articles = (await getPublicArticles({ page: 1, pageSize: 20 })).articles;
  } catch {
    // Return a valid empty feed while the database is unavailable.
  }
  const items = articles.map((article) => {
    const url = `${siteConfig.url}/blog/${article.slug}`;
    const date = article.publishedAt ?? article.date;
    return `<item><title>${xml(article.name)}</title><link>${url}</link><guid>${url}</guid><pubDate>${date.toUTCString()}</pubDate><description>${xml(article.description)}</description><category>${xml(article.category.name)}</category></item>`;
  }).join("");
  const feed = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${xml(siteConfig.name)} — Writing &amp; Insights</title><link>${siteConfig.url}/blog</link><description>${xml(siteConfig.description)}</description><language>en</language>${items}</channel></rss>`;
  return new Response(feed, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=300" } });
}

function xml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}
