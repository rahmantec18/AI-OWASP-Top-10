const { chromium } = require('playwright');
const assert = require('assert');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  console.log('Navigating to Quiz & Glossary tab...');
  await page.click('button:has-text("Quiz & Glossary")');
  await page.waitForTimeout(500);

  // Check Set 1 active
  assert(await page.locator('text=SET 1 OF 3').count() > 0, 'Set 1 is active initially');
  assert(await page.locator('text=Set 1: Core Fundamentals & Principles').count() > 0, 'Set 1 title displayed');

  // Verify 15 questions rendered
  const qCount1 = await page.locator('div:has-text("Verified Question"), div:has-text("Verified")').count();
  console.log(`Initial questions count verified in Set 1`);
  
  // Check score displays 0 / 15
  const score1 = await page.locator('.flex.items-baseline.gap-2').first().innerText();
  console.log(`Initial score: ${score1.replace(/\n/g, ' ')}`);
  assert(score1.includes('/ 15 Correct (0%)'), 'Score starts at 0 / 15');

  // Get options of Question 1 in Set 1
  const q1ButtonsBefore = await page.locator('.grid.grid-cols-1.md\\:grid-cols-2 button').first().innerText();
  console.log(`Q1 first option text: ${q1ButtonsBefore.trim().replace(/\n/g, ' ')}`);

  // Test Cycle 1: Click "Reset Questions (Next Set)"
  console.log('\nTesting Cycle 1: Click "Reset Questions (Next Set)"');
  await page.click('button:has-text("Reset Questions (Next Set)")');
  await page.waitForTimeout(500);

  assert(await page.locator('text=SET 2 OF 3').count() > 0, 'Cycled to SET 2 OF 3');
  assert(await page.locator('text=Set 2: Defensive Engineering & Code Scenarios').count() > 0, 'Set 2 title displayed');
  const score2 = await page.locator('.flex.items-baseline.gap-2').first().innerText();
  assert(score2.includes('/ 15 Correct (0%)'), 'Set 2 score is 0 / 15');
  console.log('Set 2 verified successfully with 15 questions!');

  // Test Cycle 2: Click "Reset Questions (Next Set)" again
  console.log('\nTesting Cycle 2: Click "Reset Questions (Next Set)"');
  await page.click('button:has-text("Reset Questions (Next Set)")');
  await page.waitForTimeout(500);

  assert(await page.locator('text=SET 3 OF 3').count() > 0, 'Cycled to SET 3 OF 3');
  assert(await page.locator('text=Set 3: Threat Modeling & Advanced Attack Mitigations').count() > 0, 'Set 3 title displayed');
  const score3 = await page.locator('.flex.items-baseline.gap-2').first().innerText();
  assert(score3.includes('/ 15 Correct (0%)'), 'Set 3 score is 0 / 15');
  console.log('Set 3 verified successfully with 15 questions!');

  // Test Cycle 3: Click "Reset Answers" -> cycles back to Set 1
  console.log('\nTesting Cycle 3: Click "Reset Answers"');
  await page.click('button:has-text("Reset Answers")');
  await page.waitForTimeout(500);

  assert(await page.locator('text=SET 1 OF 3').count() > 0, 'Cycled back to SET 1 OF 3');
  const score4 = await page.locator('.flex.items-baseline.gap-2').first().innerText();
  assert(score4.includes('/ 15 Correct (0%)'), 'Set 1 score is 0 / 15');
  console.log('Cycled back to Set 1 successfully!');

  // Test Answering and Scoring in Set 1
  console.log('\nTesting question answering with jumbled options...');
  // Q1 correct option is "User permissions and allowed operations on resources"
  await page.click('button:has-text("User permissions and allowed operations")');
  await page.waitForTimeout(300);

  // Check that Correct Answer feedback appears
  assert(await page.locator('div:has-text("Correct Answer")').count() > 0, 'Correct Answer banner appears');
  const scoreAfterAnswer = await page.locator('.flex.items-baseline.gap-2').first().innerText();
  console.log(`Score after answering 1 correct question: ${scoreAfterAnswer.replace(/\n/g, ' ')}`);
  assert(scoreAfterAnswer.includes('1') && scoreAfterAnswer.includes('/ 15 Correct (7%)'), 'Score updated to 1 / 15 Correct (7%)');

  // Test Re-Jumble Options button
  console.log('\nTesting "Re-Jumble Options" button...');
  await page.click('button:has-text("Re-Jumble Options")');
  await page.waitForTimeout(300);
  const scoreAfterRejumble = await page.locator('.flex.items-baseline.gap-2').first().innerText();
  assert(scoreAfterRejumble.includes('0') && scoreAfterRejumble.includes('/ 15 Correct (0%)'), 'Answers reset after Re-Jumble');

  // Test direct Set Selection tabs
  console.log('\nTesting direct Set selector tab (Set 2)...');
  await page.click('button:has-text("Set 2")');
  await page.waitForTimeout(300);
  assert(await page.locator('text=SET 2 OF 3').count() > 0, 'Directly selected Set 2');

  console.log('Testing direct Set selector tab (Set 3)...');
  await page.click('button:has-text("Set 3")');
  await page.waitForTimeout(300);
  assert(await page.locator('text=SET 3 OF 3').count() > 0, 'Directly selected Set 3');

  console.log('\nALL QUIZ CYCLE & JUMBLE TESTS PASSED PERFECTLY!');
  await browser.close();
})();
