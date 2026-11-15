import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://liuhuanxiang.github.io',
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/archives/': '/articles/',
    '/archives/2019/': '/articles/',
    '/archives/2019/01/': '/articles/',
  },
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
