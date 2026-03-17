import puppeteer from 'puppeteer';
import { mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

const url = process.argv[2] || 'http://localhost:4321';
const label = process.argv[3] || 'mobile';
const dir = './temporary screenshots';
mkdirSync(dir, { recursive: true });

const existing = readdirSync(dir).filter(f => f.startsWith('screenshot-'));
const num = existing.length + 1;
const filename = `screenshot-${num}-${label}.png`;

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await page.evaluate(async () => {
  const delay = ms => new Promise(r => setTimeout(r, ms));
  const height = document.body.scrollHeight;
  for (let y = 0; y < height; y += 300) {
    window.scrollTo(0, y);
    await delay(80);
  }
  window.scrollTo(0, 0);
  await delay(300);
});
await page.screenshot({ path: join(dir, filename), fullPage: true });
await browser.close();
console.log(`Saved: ${join(dir, filename)}`);
