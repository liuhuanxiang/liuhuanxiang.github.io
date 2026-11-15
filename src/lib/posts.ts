import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export const postUrl = (post: Post) => post.data.permalink ?? `/articles/${post.id}/`;
export const formatDate = (date: Date) => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Shanghai',
}).format(date).replaceAll('/', '.');
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

export function readingMinutes(body = '') {
  const chinese = (body.match(/[\u3400-\u9fff]/g) ?? []).length;
  const words = (body.match(/[a-zA-Z0-9_]+/g) ?? []).length;
  return Math.max(1, Math.ceil((chinese + words * 2) / 400));
}

export async function publishedPosts() {
  return (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, (char) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
  }[char]!));
}
