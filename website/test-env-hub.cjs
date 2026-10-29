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
  const modalHeader = page.locator('h3:has-text("Official GitHub Source Repository")');
  await modalHeader.waitFor({ state: 'visible', timeout: 5000 });
  console.log('Modal header verified!');

  const repoLink = page.locator('text=https://github.com/rahmantec18/AI-OWASP-Top-10');
  await repoLink.first().waitFor({ state: 'visible' });
  console.log('GitHub Repo URL verified in modal!');

  // Test Close button
  const doneBtn = page.locator('button:has-text("Done")');
  await doneBtn.click();
  await modalHeader.waitFor({ state: 'hidden', timeout: 5000 });
  console.log('Modal successfully closed via Done button!');

  // Verify Footer is clean
  console.log('Checking Footer navigation and ethics notice...');
  const footerEthics = page.locator('text=Controlled Defensive Demonstrations Only');
  await footerEthics.waitFor({ state: 'visible' });
  console.log('Footer verified cleanly!');

  await browser.close();
  console.log('\n>>> ALL CONNECTED ENVIRONMENT INTERLINK TESTS PASSED! <<<');
})();
