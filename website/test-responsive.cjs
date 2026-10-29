const { chromium } = require('playwright');
const assert = require('assert');

const viewports = [
  { name: 'Mobile (iPhone 14)', width: 390, height: 844 },
  { name: 'Mobile Small (iPhone SE)', width: 375, height: 667 },
  { name: 'Tablet Portrait (iPad)', width: 768, height: 1024 },
  { name: 'Tablet Landscape (iPad)', width: 1024, height: 768 },
  { name: 'Laptop Standard', width: 1366, height: 768 },
  { name: 'Laptop High-DPI / Desktop', width: 1440, height: 900 }
];

const tabs = [
  'dashboard',
  'library',
  'comparison',
  'verification',
  'codelab',
  'quiz',
  'report',
  'downloads'
];

(async () => {
  console.log('====================================================');
  console.log('  RESPONSIVE AUDIT: Mobile, Tablet & Laptop Testing ');
  console.log('====================================================\n');

  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  for (const vp of viewports) {
    console.log(`\n--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    for (const tab of tabs) {
      // Navigate to tab via evaluation or button
      await page.evaluate((tabId) => {
        // Find navbar button or click via tab id
        const btns = Array.from(document.querySelectorAll('header button, nav button'));
        const match = btns.find(b => b.textContent.toLowerCase().includes(tabId) || 
          (tabId === 'library' && b.textContent.includes('OWASP Library')) ||
          (tabId === 'comparison' && b.textContent.includes('Comparison')) ||
          (tabId === 'verification' && b.textContent.includes('Verification')) ||
          (tabId === 'codelab' && b.textContent.includes('Code Lab')) ||
          (tabId === 'quiz' && b.textContent.includes('Quiz')) ||
          (tabId === 'report' && b.textContent.includes('Research')) ||
          (tabId === 'downloads' && b.textContent.includes('Downloads')) ||
          (tabId === 'dashboard' && b.textContent.includes('Dashboard'))
        );
        if (match) match.click();
      }, tab);

      await page.waitForTimeout(300);

      // Check for horizontal page overflow
      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const bodyWidth = document.body.scrollWidth;
        return {
          hasOverflow: docWidth > winWidth + 2 || bodyWidth > winWidth + 2,
          docWidth,
          winWidth,
          bodyWidth
        };
      });

      if (overflow.hasOverflow) {
        console.warn(`  [OVERFLOW WARNING] Tab "${tab}" on ${vp.name}: docWidth=${overflow.docWidth}px, windowWidth=${overflow.winWidth}px`);
      } else {
        console.log(`  [PASS] Tab "${tab}" layout fits perfectly within ${vp.width}px (no horizontal blowout)`);
      }
    }

    await context.close();
  }

  await browser.close();
  console.log('\nResponsive audit finished!');
})();
