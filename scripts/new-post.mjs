import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const [slug, title] = process.argv.slice(2).filter((arg) => arg !== '--');
if (!slug || !title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  process.stderr.write('用法：pnpm new:post <英文短名> "文章标题"\n例如：pnpm new:post java-timeout "一次超时问题的排查"\n');
  process.exit(1);
}
const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const directory = fileURLToPath(new URL('../src/content/posts/', import.meta.url));
await mkdir(directory, { recursive: true });
const target = resolve(directory, `${slug}.md`);
const content = `---\ntitle: ${JSON.stringify(title)}\ndescription: "补充一句具体的文章简介。"\ndate: ${date}\ncategory: "工程实践"\ntags: []\ndraft: true\n---\n\n## 问题与背景\n\n## 尝试与取舍\n\n## 实现过程\n\n## 验证结果\n\n## 限制与下一步\n`;
try {
  await writeFile(target, content, { flag: 'wx' });
  process.stdout.write(`已创建草稿：src/content/posts/${slug}.md\n确认内容和验证结果后，将 draft 改为 false 再发布。\n`);
} catch (error) {
  if (error.code === 'EEXIST') process.stderr.write(`草稿 ${slug}.md 已存在，没有覆盖。\n`);
  else process.stderr.write(`创建失败：${error.message}\n`);
  process.exit(1);
}
