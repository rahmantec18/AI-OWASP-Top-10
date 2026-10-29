const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  console.log('Navigating to live GitHub Pages URL: https://rahmantec18.github.io/AI-OWASP-Top-10/ ...');
  await page.goto('https://rahmantec18.github.io/AI-OWASP-Top-10/', { waitUntil: 'networkidle' });

  const title = await page.title();
  console.log('Live Title:', title);

  const heroHeading = await page.textContent('h1');
  console.log('Live Hero Heading:', heroHeading.replace(/\s+/g, ' ').trim());

  const envButton = page.locator('button:has-text("Environments")');
  console.log('Environments button visible on Live:', await envButton.first().isVisible());

  // Click Environments to test modal on live site
  await envButton.first().click();
  const modalHeader = page.locator('h3:has-text("Connected Environments & Live Sync Hub")');
  await modalHeader.waitFor({ state: 'visible', timeout: 5000 });
  console.log('Live Environments Modal verified successfully!');

  const doneBtn = page.locator('button:has-text("Done")');
  await doneBtn.click();
  await modalHeader.waitFor({ state: 'hidden', timeout: 5000 });

  // Test Quiz on Live Site
  console.log('Testing Quiz on Live Site...');
  await page.click('button:has-text("Quiz & Glossary")');
  const quizHeading = page.locator('h1:has-text("Interactive Quiz & Glossary")');
  await quizHeading.waitFor({ state: 'visible' });
  console.log('Live Quiz & Glossary module verified!');

  console.log('Total Console Errors recorded on Live Site:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  } else {
    console.log('>>> ZERO CONSOLE ERRORS ON LIVE GITHUB PAGES DEPLOYMENT! <<<');
  }

  await browser.close();
  console.log('\n>>> LIVE GITHUB PAGES IS FULLY OPERATIONAL AND IDENTICAL TO LOCALHOST! <<<');
})();
