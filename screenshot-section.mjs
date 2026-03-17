import puppeteer from 'puppeteer';
import { mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

const url = process.argv[2] || 'http://localhost:4321';
const label = process.argv[3] || 'section';
const scrollY = parseInt(process.argv[4] || '0');
const dir = './temporary screenshots';
mkdirSync(dir, { recursive: true });

const existing = readdirSync(dir).filter(f => f.startsWith('screenshot-'));
const num = existing.length + 1;
const filename = `screenshot-${num}-${label}.png`;

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
// Trigger all observers
await page.evaluate(async () => {
  const delay = ms => new Promise(r => setTimeout(r, ms));
  const height = document.body.scrollHeight;
  for (let y = 0; y < height; y += 400) {
    window.scrollTo(0, y);
    await delay(80);
  }
  window.scrollTo(0, 0);
  await delay(300);
});
// Scroll to target
await page.evaluate((y) => window.scrollTo(0, y), scrollY);
await page.evaluate(() => new Promise(r => setTimeout(r, 300)));
await page.screenshot({ path: join(dir, filename) }); // viewport only
await browser.close();
console.log(`Saved: ${join(dir, filename)}`);
