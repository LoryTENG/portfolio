/**
 * 把新 URL 推送给百度（普通收录 API）
 *
 * 用法：
 *   npm run push:baidu         只推"没推过的"URL
 *   npm run push:baidu -- --all 强制重推 sitemap 里全部 URL
 *
 * 配额：未备案站点每日 9 条，0 点重置。
 * 状态记录在 .baidu-state.json（已成功推送的 URL + 日期），避免浪费配额。
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SITE = 'https://www.dr-teng.com';
const TOKEN = process.env.BAIDU_TOKEN || 'ViGo9IkYiqkKySVx';
const API = `http://data.zz.baidu.com/urls?site=${SITE}&token=${TOKEN}`;
const STATE = path.join(ROOT, '.baidu-state.json');

const force = process.argv.includes('--all');

// 1. 收集 URL：sitemap 里的全部 + .notes-urls.txt
function collect() {
  const urls = new Set();
  const sm = path.join(ROOT, 'public/sitemap.xml');
  if (fs.existsSync(sm)) {
    for (const m of fs.readFileSync(sm, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(m[1].trim());
  }
  const nu = path.join(ROOT, '.notes-urls.txt');
  if (fs.existsSync(nu)) {
    for (const line of fs.readFileSync(nu, 'utf8').split('\n')) {
      const u = line.trim();
      if (u.startsWith('http')) urls.add(u);
    }
  }
  return [...urls];
}

const state = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, 'utf8')) : { pushed: {} };

const all = collect();
const todo = force ? all : all.filter((u) => !state.pushed[u]);

console.log(`总 URL：${all.length}　已推过：${all.length - todo.length}　本次待推：${todo.length}`);

if (!todo.length) {
  console.log('没有新 URL，跳过。');
  process.exit(0);
}

const body = todo.join('\n') + '\n';
const res = await fetch(API, {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain' },
  body,
});

const text = await res.text();
let json = {};
try {
  json = JSON.parse(text);
} catch {
  /* 非 JSON */
}

if (res.ok && typeof json.success === 'number' && json.success > 0) {
  const today = new Date().toISOString().slice(0, 10);
  // 百度按顺序接收，成功了几条就记几条
  todo.slice(0, json.success).forEach((u) => (state.pushed[u] = today));
  state.lastRun = new Date().toISOString();
  state.lastResult = json;
  fs.writeFileSync(STATE, JSON.stringify(state, null, 2), 'utf8');
  console.log(`✓ 成功 ${json.success} 条，今日剩余配额 ${json.remain ?? '?'} 条`);
  if (json.not_same_site?.length) console.log('  ⚠ 站点不符：', json.not_same_site);
  if (json.not_valid?.length) console.log('  ⚠ 格式无效：', json.not_valid);
} else if (json.error === 505 || /over quota/i.test(json.message || '')) {
  console.log('✗ 今日配额已满（百度：over quota / 505），明天 0 点后再推。');
  console.log('  待推队列已保留，下次运行会自动继续。');
  process.exit(0);
} else {
  console.error(`✗ 推送失败 HTTP ${res.status}`);
  console.error(text.slice(0, 400));
  process.exit(1);
}
