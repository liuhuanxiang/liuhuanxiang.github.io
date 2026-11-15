# HX 的工程手记

个人博客源码：Astro + Markdown，部署到 GitHub Pages。

- 网站：<https://liuhuanxiang.github.io/>
- 作者的 GitHub：<https://github.com/liuhuanxiang>
- 环境：Node.js 24、pnpm 11.25.0

## 本地预览

```sh
corepack enable
pnpm install
pnpm dev
```

打开终端显示的本地地址。生产构建使用 `pnpm build`，结果位于 `dist/`；`pnpm preview` 可预览生产构建。

## 写一篇文章

```sh
pnpm new:post java-timeout "一次超时问题的排查"
```

编辑 `src/content/posts/java-timeout.md`。新文件默认 `draft: true`，不会出现在网站、搜索、RSS 或站点地图中。确认正文、来源和验证结果后，再改为 `draft: false`。

```yaml
---
title: "一次超时问题的排查"
description: "具体说明问题和结果，避免只写‘深入理解’。"
date: 2026-11-13
category: "工程实践"
tags: ["Java", "排查"]
draft: true
---
```

正文尽量包含：背景与边界、尝试与取舍、实现过程、验证结果、限制与下一步。区分实际验证、学习示例和 AI 建议，未测量的数据不要写成实测结果。

## 个人介绍和项目

- 个人介绍：`src/pages/about/index.astro`
- 项目展示：`src/pages/projects/index.astro`
- 首页：`src/pages/index.astro`
- 整站样式：`src/styles/global.css`
- 作者账号与站点地址：`astro.config.mjs`、`src/layouts/Base.astro`、`public/robots.txt`

项目页目前没有虚构案例。添加案例时提供问题、方案、演示或代码、验证结果和已知限制。

## 发布到 GitHub Pages

1. 在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。这是仓库的一次性设置。
2. 改动合并到 `master` 后，`.github/workflows/pages.yml` 会构建并发布 `dist/`。
3. Pull request 只构建、不发布；可以在 Actions 中查看结果。

仓库原有根目录 HTML 是 2019 年 Hexo 的生成结果，保留用于迁移追溯；它们不是新版源码，也不会打包进新版站点。不要直接编辑它们来更新新版网站。

旧文章 `/2019/01/18/hello-world/` 保留日期和正文主体。旧归档入口重定向到新的文章列表。新站不依赖 Google Fonts、jQuery、数据库或付费 AI 接口。

## 私人记录

只将决定公开的文章放入本仓库。个人知识库、日记、财务与家庭资料不在博客的读取或发布范围内。
