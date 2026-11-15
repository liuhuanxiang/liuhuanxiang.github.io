import type { APIRoute } from 'astro';
import { publishedPosts, postUrl, escapeXml } from '../lib/posts';
export const GET: APIRoute = async ({ site }) => {
  const posts = await publishedPosts();
  const items = posts.map((post) => {
    const url = new URL(postUrl(post), site).href;
    return `<item><title>${escapeXml(post.data.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${post.data.date.toUTCString()}</pubDate><description>${escapeXml(post.data.description)}</description><category>${escapeXml(post.data.category)}</category></item>`;
  }).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>HX 的工程手记</title><link>${site}</link><description>记录实践、AI 探索，以及把问题弄明白的过程。</description><language>zh-CN</language>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
