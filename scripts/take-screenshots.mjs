import { chromium } from 'playwright';
import { spawn } from 'child_process';
import { setTimeout } from 'timers/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync, existsSync, rmSync, readdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = join(__dirname, '..', 'ai-screenshots');

const pages = [
  { path: '/', name: 'home' },
  { path: '/events', name: 'events' },
  { path: '/gallery', name: 'gallery' },
  { path: '/press-room', name: 'press-room' },
  { path: '/sponsors', name: 'sponsors' },
  { path: '/support', name: 'support' },
  { path: '/contact-us', name: 'contact-us' },
];

function cleanupScreenshots() {
  if (existsSync(outputDir)) {
    const files = readdirSync(outputDir);
    for (const file of files) {
      if (file.endsWith('.png')) {
        rmSync(join(outputDir, file));
        console.log(`Deleted: ${file}`);
      }
    }
    console.log('Screenshots cleaned up!');
  } else {
    console.log('No screenshots directory exists.');
  }
}

async function startDevServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npm', ['run', 'dev', '--', '--port', '5173'], {
      stdio: 'pipe',
      shell: true,
    });

    let output = '';
    server.stdout.on('data', (data) => {
      output += data.toString();
      if (output.includes('Local:') || output.includes('ready in')) {
        setTimeout(2000);
        resolve(server);
      }
    });

    server.stderr.on('data', (data) => {
      output += data.toString();
      if (output.includes('Local:') || output.includes('ready in')) {
        setTimeout(2000);
        resolve(server);
      }
    });

    setTimeout(5000).then(() => {
      resolve(server);
    });
  });
}

async function takeScreenshots(server) {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });

  const baseUrl = 'http://localhost:5173';

  for (const pageInfo of pages) {
    console.log(`Taking screenshot of ${pageInfo.path}...`);
    const page = await context.newPage();
    
    try {
      await page.goto(`${baseUrl}${pageInfo.path}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForSelector('h1', { timeout: 10000 });
      
      const screenshotPath = join(outputDir, `${pageInfo.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Saved: ${screenshotPath}`);
    } catch (error) {
      console.error(`Error taking screenshot of ${pageInfo.path}:`, error.message);
    }
    
    await page.close();
  }

  await browser.close();
  console.log('All screenshots taken!');
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--cleanup')) {
    cleanupScreenshots();
    return;
  }

  console.log('Starting dev server...');
  const server = await startDevServer();
  
  console.log('Taking screenshots...');
  await takeScreenshots(server);
  
  console.log('Stopping dev server...');
  server.kill();
  
  console.log('Done!');
}

main().catch(console.error);
