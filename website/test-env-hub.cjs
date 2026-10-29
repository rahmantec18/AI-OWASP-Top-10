const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  console.log('Checking Environment Hub in Navbar...');
  const envButton = page.locator('button:has-text("Environments")');
  await envButton.first().waitFor({ state: 'visible' });
  console.log('Found Environments button, clicking...');
  await envButton.first().click();

  console.log('Verifying Modal is visible...');
  const modalHeader = page.locator('h3:has-text("Connected Environments & Live Sync Hub")');
  await modalHeader.waitFor({ state: 'visible', timeout: 5000 });
  console.log('Modal header verified!');

  const liveLink = page.locator('text=https://rahmantec18.github.io/AI-OWASP-Top-10/');
  await liveLink.first().waitFor({ state: 'visible' });
  console.log('Live GitHub Pages URL verified in modal!');

  const localLink = page.locator('text=http://localhost:5173/');
  await localLink.first().waitFor({ state: 'visible' });
  console.log('Localhost URL verified in modal!');

  const repoLink = page.locator('text=https://github.com/rahmantec18/AI-OWASP-Top-10');
  await repoLink.first().waitFor({ state: 'visible' });
  console.log('GitHub Repo URL verified in modal!');

  // Test Close button
  const doneBtn = page.locator('button:has-text("Done")');
  await doneBtn.click();
  await modalHeader.waitFor({ state: 'hidden', timeout: 5000 });
  console.log('Modal successfully closed via Done button!');

  // Test Dashboard banner
  console.log('Checking Dashboard Connected Environments Banner...');
  const dashBanner = page.locator('h2:has-text("Connected Environments & Deployment Hub")');
  await dashBanner.waitFor({ state: 'visible' });
  console.log('Dashboard Connected Environments Hub verified!');

  // Test Footer banner
  console.log('Checking Footer Connected Environments Bar...');
  const footerBar = page.locator('text=Live Site: rahmantec18.github.io/AI-OWASP-Top-10/');
  await footerBar.waitFor({ state: 'visible' });
  console.log('Footer Connected Environments verified!');

  await browser.close();
  console.log('\n>>> ALL CONNECTED ENVIRONMENT INTERLINK TESTS PASSED! <<<');
})();
