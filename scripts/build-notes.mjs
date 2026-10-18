/**
 * 文章生成器：content/notes/*.md  →  public/zh/notes/<slug>/index.html
 *
 * 用法：
 *   npm run notes      生成所有文章 + 列表页 + 更新 sitemap
 *   npm run publish    生成 + 构建 + 部署到 Vercel
 *
 * 约定：
 *   content/notes/xxx.md            文章正文（Markdown + frontmatter）
 *   content/notes/xxx/              这篇的图片文件夹（可选，名字与 md 同名）
 *   md 里图片写  ![](fig1.jpg)      会复制到 /zh/notes/<slug>/fig1.jpg
 */
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import matter from 'gray-matter';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'content/notes');
const OUT = path.join(ROOT, 'public/zh/notes');
const SITE = 'https://www.dr-teng.com';

marked.setOptions({ gfm: true, breaks: false });

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const fmtDate = (d) => {
  const t = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(t.getTime())) return '';
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
};

const cnDate = (d) => {
  const t = d instanceof Date ? d : new Date(d);
  return `${t.getFullYear()} 年 ${t.getMonth() + 1} 月 ${t.getDate()} 日`;
};

function readingTime(md) {
  const cn = (md.match(/[\u4e00-\u9fa5]/g) || []).length;
  const en = (md.match(/[a-zA-Z]+/g) || []).length;
  return Math.max(1, Math.round(cn / 400 + en / 200));
}

function page({ title, desc, body, canonical, extraHead = '' }) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="author" content="滕龙吟">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="滕龙吟 Longyin Teng">
<meta name="twitter:card" content="summary_large_image">
${extraHead}
<style>
  :root{
    --paper:#faf9f6; --ink:#1a1a1a; --ink-2:#4a4a4a; --ink-3:#8a857c;
    --rule:#e2ded6; --accent:#8c3a2b;
    --serif:"Songti SC","Noto Serif SC","Source Han Serif SC",Georgia,"Times New Roman",serif;
    --sans:-apple-system,BlinkMacSystemFont,"PingFang SC","Helvetica Neue",Arial,sans-serif;
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--serif);-webkit-font-smoothing:antialiased}
  .wrap{max-width:720px;margin:0 auto;padding:0 28px 100px}
  .topbar{display:flex;justify-content:space-between;align-items:center;padding:22px 0;border-bottom:1px solid var(--rule);
    font-family:var(--sans);font-size:12px;letter-spacing:.1em;color:var(--ink-3);margin-bottom:56px}
  .topbar a{color:var(--ink-3);text-decoration:none}
  .topbar a:hover{color:var(--accent)}
  h1{font-size:34px;line-height:1.45;margin:0 0 18px;font-weight:600;letter-spacing:-.01em}
  .meta{font-family:var(--sans);font-size:13px;color:var(--ink-3);margin:0 0 44px;letter-spacing:.04em}
  .meta span+span:before{content:"　·　";color:var(--rule)}
  article{font-size:17px;line-height:1.95;color:var(--ink-2)}
  article h2{font-size:23px;color:var(--ink);margin:52px 0 18px;font-weight:600;line-height:1.5}
  article h3{font-size:19px;color:var(--ink);margin:36px 0 14px;font-weight:600}
  article p{margin:0 0 22px;text-align:justify}
  article strong{color:var(--ink);font-weight:600}
  article a{color:var(--accent);text-decoration:none;border-bottom:1px solid rgba(140,58,43,.3)}
  article a:hover{border-bottom-color:var(--accent)}
  article ul,article ol{margin:0 0 22px;padding-left:24px}
  article li{margin-bottom:10px}
  article blockquote{margin:0 0 26px;padding:4px 0 4px 20px;border-left:2px solid var(--accent);
    color:var(--ink-2);font-style:normal;background:rgba(140,58,43,.03)}
  article blockquote p{margin:0 0 12px}
  article img{max-width:100%;height:auto;display:block;margin:32px auto;border-radius:2px}
  article figcaption,.cap{font-family:var(--sans);font-size:13px;color:var(--ink-3);text-align:center;margin-top:-18px;margin-bottom:32px}
  article hr{border:0;border-top:1px solid var(--rule);margin:44px 0}
  article table{width:100%;border-collapse:collapse;margin:0 0 26px;font-family:var(--sans);font-size:14px}
  article th,article td{border-bottom:1px solid var(--rule);padding:10px 8px;text-align:left;vertical-align:top}
  article th{color:var(--ink);font-weight:600;background:rgba(0,0,0,.02)}
  article code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.9em;background:rgba(0,0,0,.045);padding:2px 5px;border-radius:3px}
  article pre{background:#f2f0ea;padding:18px;overflow-x:auto;border-radius:3px;font-size:13.5px;line-height:1.7}
  article pre code{background:none;padding:0}
  .tags{font-family:var(--sans);font-size:12px;color:var(--ink-3);margin:56px 0 0;padding-top:24px;border-top:1px solid var(--rule)}
  .tags em{font-style:normal;margin-right:14px}
  .back{font-family:var(--sans);font-size:13px;margin-top:40px}
  .back a{color:var(--ink-3);text-decoration:none}
  .back a:hover{color:var(--accent)}
  /* 列表页 */
  .list{list-style:none;padding:0;margin:0}
  .list li{padding:26px 0;border-bottom:1px solid var(--rule)}
  .list a{text-decoration:none;color:var(--ink)}
  .list h2{font-size:21px;margin:0 0 8px;font-weight:600;line-height:1.5}
  .list a:hover h2{color:var(--accent)}
  .list .d{font-family:var(--sans);font-size:12.5px;color:var(--ink-3);letter-spacing:.06em}
  .list p{margin:8px 0 0;font-size:15px;line-height:1.75;color:var(--ink-2)}
  @media(max-width:600px){h1{font-size:26px}.wrap{padding:0 20px 70px}article{font-size:16px}}
</style>
</head>
<body>
<div class="wrap">
  <div class="topbar">
    <span><a href="/zh/">滕龙吟 · 简历</a></span>
    <span><a href="/zh/notes/">文章</a>　·　<a href="/">主站</a></span>
  </div>
${body}
</div>
</body>
</html>
`;
}

// ---------- 主流程 ----------
if (!fs.existsSync(SRC)) {
  console.error(`没有找到 ${SRC}，请先创建并放入 .md 文件`);
  process.exit(1);
}

const files = fs.readdirSync(SRC).filter((f) => f.endsWith('.md'));
const posts = [];

for (const f of files) {
  const raw = fs.readFileSync(path.join(SRC, f), 'utf8');
  const { data, content } = matter(raw);
  const slug = data.slug || f.replace(/\.md$/, '');
  const date = data.date ? new Date(data.date) : new Date(fs.statSync(path.join(SRC, f)).mtime);
  const title = data.title || slug;
  const summary = data.summary || content.replace(/[#*>`\-\[\]]/g, '').trim().slice(0, 110);
  posts.push({ slug, title, summary, date, tags: data.tags || [], content, cover: data.cover || '', file: f });
}

posts.sort((a, b) => b.date - a.date);

// 1) 文章页
for (const p of posts) {
  const dir = path.join(OUT, p.slug);
  fs.mkdirSync(dir, { recursive: true });

  // 复制同名图片文件夹
  const assetDir = path.join(SRC, p.slug);
  if (fs.existsSync(assetDir) && fs.statSync(assetDir).isDirectory()) {
    for (const img of fs.readdirSync(assetDir)) {
      fs.copyFileSync(path.join(assetDir, img), path.join(dir, img));
    }
  }

  const html = marked.parse(p.content);
  const canonical = `${SITE}/zh/notes/${p.slug}/`;
  const cover = p.cover ? `${canonical}${p.cover}` : '';

  const ld = `<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"BlogPosting",
  "headline":${JSON.stringify(p.title)},
  "description":${JSON.stringify(p.summary)},
  "datePublished":"${fmtDate(p.date)}",
  "dateModified":"${fmtDate(p.date)}",
  "inLanguage":"zh-CN",
  "author":{"@type":"Person","@id":"${SITE}/#person","name":"滕龙吟","alternateName":"Longyin Teng"},
  "publisher":{"@type":"Person","@id":"${SITE}/#person","name":"滕龙吟"},
  "mainEntityOfPage":{"@type":"WebPage","@id":"${canonical}"}${cover ? `,\n  "image":"${cover}"` : ''}
}
</script>`;

  const body = `  <h1>${esc(p.title)}</h1>
  <p class="meta"><span>${cnDate(p.date)}</span><span>约 ${readingTime(p.content)} 分钟</span></p>
  <article>
${html}
  </article>
  ${p.tags.length ? `<p class="tags">${p.tags.map((t) => `<em>#${esc(t)}</em>`).join('')}</p>` : ''}
  <p class="back"><a href="/zh/notes/">← 全部文章</a>　·　<a href="/zh/">返回简历</a></p>`;

  fs.writeFileSync(
    path.join(dir, 'index.html'),
    page({ title: `${p.title}｜滕龙吟`, desc: p.summary, body, canonical, extraHead: ld }),
    'utf8'
  );
  console.log(`  ✓ /zh/notes/${p.slug}/`);
}

// 2) 列表页
const listBody = `  <h1>文章</h1>
  <p class="meta"><span>滕龙吟 Longyin Teng</span><span>共 ${posts.length} 篇</span></p>
  <ul class="list">
${posts
  .map(
    (p) => `    <li>
      <a href="/zh/notes/${p.slug}/">
        <h2>${esc(p.title)}</h2>
        <div class="d">${fmtDate(p.date)}</div>
        <p>${esc(p.summary)}</p>
      </a>
    </li>`
  )
  .join('\n')}
  </ul>
  <p class="back"><a href="/zh/">← 返回简历</a></p>`;

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(
  path.join(OUT, 'index.html'),
  page({
    title: '文章｜滕龙吟 Longyin Teng',
    desc: '滕龙吟的研究笔记：历史城市形态、清代县城、文化遗产无损检测。',
    body: listBody,
    canonical: `${SITE}/zh/notes/`,
  }),
  'utf8'
);
console.log(`  ✓ /zh/notes/（列表，${posts.length} 篇）`);

// 3) 更新 sitemap 的 notes 区块
const smPath = path.join(ROOT, 'public/sitemap.xml');
if (fs.existsSync(smPath)) {
  let sm = fs.readFileSync(smPath, 'utf8');
  const START = '<!-- NOTES:START -->';
  const END = '<!-- NOTES:END -->';
  const block = [
    START,
    `  <url><loc>${SITE}/zh/notes/</loc><lastmod>${fmtDate(posts[0]?.date || new Date())}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    ...posts.map(
      (p) =>
        `  <url><loc>${SITE}/zh/notes/${p.slug}/</loc><lastmod>${fmtDate(p.date)}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
    ),
    END,
  ].join('\n');

  if (sm.includes(START) && sm.includes(END)) {
    sm = sm.replace(new RegExp(`${START}[\\s\\S]*?${END}`), block);
  } else {
    sm = sm.replace('</urlset>', `${block}\n</urlset>`);
  }
  fs.writeFileSync(smPath, sm, 'utf8');
  console.log('  ✓ sitemap.xml 已更新');
}

// 4) 输出可推送的 URL 清单
const urls = [`${SITE}/zh/notes/`, ...posts.map((p) => `${SITE}/zh/notes/${p.slug}/`)];
fs.writeFileSync(path.join(ROOT, '.notes-urls.txt'), urls.join('\n') + '\n', 'utf8');
console.log(`\n完成：${posts.length} 篇文章。可推送 URL 已写入 .notes-urls.txt`);
