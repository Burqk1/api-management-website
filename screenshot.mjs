import puppeteer from 'puppeteer';
import { mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

const url = process.argv[2] || 'http://localhost:4321';
const label = process.argv[3] || '';
const dir = './temporary screenshots';
mkdirSync(dir, { recursive: true });

const existing = readdirSync(dir).filter(f => f.startsWith('screenshot-'));
const num = existing.length + 1;
const filename = label ? `screenshot-${num}-${label}.png` : `screenshot-${num}.png`;

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
// Scroll through entire page to trigger IntersectionObserver
await page.evaluate(async () => {
  const delay = ms => new Promise(r => setTimeout(r, ms));
  const height = document.body.scrollHeight;
  for (let y = 0; y < height; y += 400) {
    window.scrollTo(0, y);
    await delay(100);
  }
  window.scrollTo(0, 0);
  await delay(500);
});
await page.screenshot({ path: join(dir, filename), fullPage: true });
await browser.close();
console.log(`Saved: ${join(dir, filename)}`);
