/**
 * CAPSTONE 9 — AI OWASP Top 10 Tutor
 * Exhaustive End-to-End Automated Test Suite
 * Tests every single tab, button, filter, simulation, quiz interaction, and download on the site.
 */

const { chromium } = require('playwright');
const http = require('http');

const BASE_URL = 'http://localhost:5173';

function checkUrlStatus(path) {
  return new Promise((resolve) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      resolve(res.statusCode);
    }).on('error', (err) => {
      resolve(err.message);
    });
  });
}

(async () => {
  console.log('===============================================================');
  console.log('  STARTING EXHAUSTIVE TEST SUITE: AI OWASP Top 10 Tutor       ');
  console.log('===============================================================\n');

  let passedTests = 0;
  let totalTests = 0;
  const consoleErrors = [];

  function assert(condition, testName) {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`  [PASS] ${testName}`);
    } else {
      console.error(`  [FAIL] ${testName}`);
    }
  }

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  // Listen for uncaught console errors
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('ERR_SOCKET_NOT_CONNECTED')) {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  try {
    // -----------------------------------------------------------------
    // TEST SECTION 1: Initial Page Load & Meta
    // -----------------------------------------------------------------
    console.log('--- TEST SECTION 1: Page Load & Meta ---');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    const title = await page.title();
    assert(title.includes('OWASP AI Tutor'), `Page title contains 'OWASP AI Tutor' (got: "${title}")`);
    assert(title.includes('Top 10:2025'), `Page title mentions 'Top 10:2025'`);

    // -----------------------------------------------------------------
    // TEST SECTION 2: Dashboard Elements & Navigation
    // -----------------------------------------------------------------
    console.log('\n--- TEST SECTION 2: Dashboard Elements & Interactions ---');
    const heroHeading = await page.locator('h1').textContent();
    assert(heroHeading.includes("Don't just trust AI. Verify it."), 'Hero heading is present and correct');

    // Check Metrics Cards
    const metricTexts = await page.locator('div:has-text("OWASP Categories")').first().innerText();
    assert(metricTexts.includes('6 Core'), 'Metric card 1 shows 6 Core categories');
    assert(await page.locator('text=36 Runs').count() > 0, 'Metric card 2 shows 36 Runs');
    assert(await page.locator('text=96.8%').count() > 0, 'Metric card 3 shows 96.8% Strategy B Accuracy');
    assert(await page.locator('text=15 Qs').count() > 0, 'Metric card 4 shows 15 Verified Quiz Questions');

    // Test Hero Button: "Explore OWASP Library"
    await page.click('button:has-text("Explore OWASP Library")');
    await page.waitForTimeout(300);
    assert(await page.locator('h1:has-text("OWASP Knowledge Library")').count() > 0, 'Clicking "Explore OWASP Library" hero button navigates to Library');

    // Return to Dashboard via Nav
    await page.click('button:has-text("Dashboard")');
    await page.waitForTimeout(300);

    // Test Hero Button: "Compare AI Engines"
    await page.click('button:has-text("Compare AI Engines")');
    await page.waitForTimeout(300);
    assert(await page.locator('h1:has-text("AI Engine Comparison Lab")').count() > 0, 'Clicking "Compare AI Engines" button navigates to Comparison Lab');

    // Return to Dashboard
    await page.click('button:has-text("Dashboard")');
    await page.waitForTimeout(300);

    // Test clicking a category card on Dashboard (e.g. A04 Cryptographic Failures)
    await page.click('h3:has-text("Cryptographic Failures")');
    await page.waitForTimeout(300);
    assert(await page.locator('h1:has-text("OWASP Knowledge Library")').count() > 0, 'Clicking Cryptographic Failures card navigates to Library');
    assert(await page.locator('h2:has-text("Cryptographic Failures")').count() > 0, 'Cryptographic Failures is pre-selected in Library');

    // -----------------------------------------------------------------
    // TEST SECTION 3: OWASP Knowledge Library (All 6 Categories & Levels)
    // -----------------------------------------------------------------
    console.log('\n--- TEST SECTION 3: OWASP Knowledge Library ---');
    const categoriesToTest = [
      { id: 'A01:2025', name: 'Broken Access Control' },
      { id: 'A02:2025', name: 'Security Misconfiguration' },
      { id: 'A03:2025', name: 'Software Supply Chain Failures' },
      { id: 'A04:2025', name: 'Cryptographic Failures' },
      { id: 'A05:2025', name: 'Injection' },
      { id: 'A07:2025', name: 'Authentication Failures' },
    ];

    for (const cat of categoriesToTest) {
      await page.click(`button:has-text("${cat.id}")`);
      await page.waitForTimeout(200);
      const activeHeader = await page.locator('.lg\\:col-span-1 h2, .p-6 h2').first().textContent();
      assert(activeHeader.includes(cat.name), `Category pill ${cat.id} loads "${cat.name}"`);
    }

    // Test Level Toggle: Beginner vs Advanced
    await page.click('button:has-text("Beginner View")');
    await page.waitForTimeout(200);
    assert(await page.locator('h3:has-text("Beginner Conceptual Lesson")').count() > 0, 'Beginner View displays Beginner Conceptual Lesson');
    assert(await page.locator('text=Real-World Mental Analogy').count() > 0, 'Beginner View displays Mental Analogy box');

    await page.click('button:has-text("Advanced View")');
    await page.waitForTimeout(200);
    assert(await page.locator('h3:has-text("Advanced Architectural Analysis")').count() > 0, 'Advanced View displays Advanced Architectural Analysis');
    assert(await page.locator('text=Recommended OWASP 2025 Mitigations').count() > 0, 'Advanced View displays Mitigations Checklist');
    assert(await page.locator('text=Related CWEs').count() > 0, 'Advanced View displays CWE citations');

    // Test "Code Review Lab" shortcut button from Library
    await page.click('button:has-text("Code Review Lab")');
    await page.waitForTimeout(300);
    assert(await page.locator('h1:has-text("Secure Code Lab")').count() > 0, 'Library shortcut button navigates to Secure Code Lab');

    // -----------------------------------------------------------------
    // TEST SECTION 4: AI Comparison Lab (Strategy A vs B, Models, Prompts)
    // -----------------------------------------------------------------
    console.log('\n--- TEST SECTION 4: AI Comparison Lab ---');
    await page.click('button:has-text("AI Comparison Lab")');
    await page.waitForTimeout(300);

    // Verify presence of 3 models
    assert(await page.locator('h3:has-text("ChatGPT (GPT-4o)")').count() > 0, 'ChatGPT (GPT-4o) card present');
    assert(await page.locator('h3:has-text("Gemini (Gemini 1.5 Pro)")').count() > 0, 'Gemini (Gemini 1.5 Pro) card present');
    assert(await page.locator('h3:has-text("Claude (Claude 3.5 Sonnet)")').count() > 0, 'Claude (Claude 3.5 Sonnet) card present');

    // Test Strategy Toggle: Strategy A
    await page.click('button:has-text("Strategy A: Basic Prompt")');
    await page.waitForTimeout(200);
    assert(await page.locator('h3:has-text("Strategy A: Conversational Unconstrained Prompt")').count() > 0, 'Strategy A banner active');
    assert(await page.locator('text=Detected Hallucinations').count() > 0, 'Strategy A displays detected hallucinations');

    // Test Toggle Full Prompt
    await page.click('button:has-text("View Full Prompt")');
    await page.waitForTimeout(200);
    assert(await page.locator('text=Hide Full Prompt').count() > 0, 'Full prompt expands when clicked');
    await page.click('button:has-text("Hide Full Prompt")');
    await page.waitForTimeout(200);

    // Switch to Strategy B
    await page.click('button:has-text("Strategy B: Evidence-Constrained")');
    await page.waitForTimeout(200);
    assert(await page.locator('h3:has-text("Strategy B: Evidence-Constrained Grounding")').count() > 0, 'Strategy B banner active');
    const gradeCount = await page.locator('text=Grade: A+').count();
    assert(gradeCount > 0, `Strategy B elevates ChatGPT to Grade: A+`);

    // Switch category in Comparison Lab to A04
    await page.selectOption('select', 'A04:2025');
    await page.waitForTimeout(200);
    assert(await page.locator('text=Argon2id').count() > 0, 'Selecting A04:2025 in comparison shows Argon2id recommendations');

    // Test "Inspect in Verification Center" link
    await page.click('button:has-text("Inspect in Verification Center") >> nth=0');
    await page.waitForTimeout(300);
    assert(await page.locator('h1:has-text("Verification & Error Center")').count() > 0, 'Comparison card button navigates to Verification Center');

    // -----------------------------------------------------------------
    // TEST SECTION 5: Verification Center (Search, Filters, Row Details, Error Log)
    // -----------------------------------------------------------------
    console.log('\n--- TEST SECTION 5: Verification Center ---');
    // Check metric calculations
    assert(await page.locator('span:has-text("Metric A (Accuracy)")').count() > 0, 'Metric A banner visible');
    assert(await page.locator('span:has-text("Metric B (Grounding)")').count() > 0, 'Metric B banner visible');

    // Search filter test
    const initialRows = await page.locator('tbody tr').count();
    assert(initialRows > 5, `Initial claims table contains ${initialRows} rows`);

    await page.fill('input[placeholder*="Search claims"]', 'Argon2id');
    await page.waitForTimeout(200);
    const searchRows = await page.locator('tbody tr').count();
    assert(searchRows >= 1 && searchRows < initialRows, `Search filters claims down to ${searchRows} matching row(s)`);

    // Clear search
    await page.fill('input[placeholder*="Search claims"]', '');
    await page.waitForTimeout(200);

    // Status filter test: Incorrect
    await page.selectOption('select >> nth=0', 'Incorrect');
    await page.waitForTimeout(200);
    const incorrectRows = await page.locator('tbody tr').count();
    assert(incorrectRows > 0, `Filter by 'Incorrect' displays ${incorrectRows} flagged claim(s)`);

    // Reset status filter
    await page.selectOption('select >> nth=0', 'ALL');
    await page.waitForTimeout(200);

    // Click first row to expand detail drawer
    await page.click('tbody tr >> nth=0');
    await page.waitForTimeout(200);
    assert(await page.locator('text=Audit Record Details').count() > 0, 'Clicking claim row opens Audit Record Details drawer');
    assert(await page.locator('span:has-text("Authoritative OWASP Evidence")').count() > 0, 'Audit drawer displays Authoritative OWASP Evidence');
    await page.click('button:has-text("Close")');
    await page.waitForTimeout(200);

    // Switch to Sub-tab: "Observed Error Log"
    await page.click('button:has-text("Observed Error Log")');
    await page.waitForTimeout(300);
    assert(await page.locator('text=ERR-001').count() > 0, 'Error Log displays ERR-001');
    assert(await page.locator('text=Architectural Insecurity').count() > 0, 'Error Log shows Architectural Insecurity');
    assert(await page.locator('text=Weak Cryptographic Recommendation').count() > 0, 'Error Log shows Weak Cryptographic Recommendation');
    assert(await page.locator('text=Severity: Critical').count() > 0, 'Error Log displays Critical severity badge');

    // -----------------------------------------------------------------
    // TEST SECTION 6: Secure Code Lab (All 6 Labs & Attack Simulator)
    // -----------------------------------------------------------------
    console.log('\n--- TEST SECTION 6: Secure Code Lab & Attack Simulator ---');
    await page.click('button:has-text("Secure Code Lab")');
    await page.waitForTimeout(300);

    const labs = [
      { id: 'A01', name: 'Broken Access Control' },
      { id: 'A02', name: 'Security Misconfiguration' },
      { id: 'A03', name: 'Software Supply Chain' },
      { id: 'A04', name: 'Cryptographic Failures' },
      { id: 'A05', name: 'Injection' },
      { id: 'A07', name: 'Authentication Failures' },
    ];

    for (const lab of labs) {
      await page.click(`button:has-text("${lab.id}")`);
      await page.waitForTimeout(200);
      assert(await page.locator('.space-y-2 h2').textContent(), `Lab for ${lab.id} loaded properly`);
      assert(await page.locator('text=Insecure / Vulnerable Anti-Pattern').count() > 0, `${lab.id}: Vulnerable panel present`);
      assert(await page.locator('text=Hardened / Verified Defensive Pattern').count() > 0, `${lab.id}: Hardened panel present`);
    }

    // Select LAB-001 and run simulation
    await page.click('button:has-text("A01")');
    await page.waitForTimeout(200);
    await page.click('button:has-text("Run Simulation Test")');
    await page.waitForTimeout(1000); // Allow simulation animation to complete

    assert(await page.locator('text=Vulnerable Code Behavior').count() > 0, 'Simulation displays Vulnerable Code Behavior panel');
    assert(await page.locator('text=Hardened Code Behavior').count() > 0, 'Simulation displays Hardened Code Behavior panel');
    assert(await page.locator('text=DATA BREACH').count() > 0, 'Vulnerable simulation flags data breach');
    assert(await page.locator('text=HTTP 404 Not Found').count() > 0, 'Hardened simulation shows access blocked securely');

    // Test Copy button
    await page.click('button:has-text("Copy") >> nth=0');
    await page.waitForTimeout(200);
    assert(await page.locator('text=Copied').count() > 0, 'Copy button updates state to "Copied"');

    // -----------------------------------------------------------------
    // TEST SECTION 7: Quiz & Glossary (Interactive Quiz & Dictionary)
    // -----------------------------------------------------------------
    console.log('\n--- TEST SECTION 7: Interactive Quiz & Glossary ---');
    await page.click('button:has-text("Quiz & Glossary")');
    await page.waitForTimeout(300);

    // Initial score check
    const initialScoreText = await page.locator('.flex.items-baseline.gap-2').first().innerText();
    assert(initialScoreText.includes('/ 15 Correct (0%)'), 'Initial quiz score is 0 / 15');

    // Answer Q01: "What does access control determine in a web application?" -> Option A
    await page.click('button:has-text("User permissions and allowed operations")');
    await page.waitForTimeout(300);

    assert(await page.locator('div:has-text("Correct Answer")').count() > 0, 'Q01 answered correctly shows "Correct Answer" feedback');
    const q1ScoreText = await page.locator('.flex.items-baseline.gap-2').first().innerText();
    assert(q1ScoreText.includes('/ 15 Correct (7%)'), 'Score updates to 1 / 15 (7%)');
    assert(await page.locator('a:has-text("Verify against official OWASP source")').count() > 0, 'Shows official OWASP verification link');

    // Answer Q02: "Where must access control checks be strictly enforced to be effective?" -> Option B
    await page.click('button:has-text("Trusted server-side code or serverless APIs")');
    await page.waitForTimeout(300);
    const q2ScoreText = await page.locator('.flex.items-baseline.gap-2').first().innerText();
    assert(q2ScoreText.includes('/ 15 Correct (13%)'), 'Score updates to 2 / 15 (13%)');

    // Answer Q03 incorrectly intentionally to test wrong feedback
    await page.click('button:has-text("Grant everyone full administrative permissions")');
    await page.waitForTimeout(300);
    assert(await page.locator('div:has-text("Incorrect Answer")').count() > 0, 'Q03 answered with wrong option shows "Incorrect Answer" feedback');

    // Test Reset Quiz button
    await page.click('button:has-text("Reset Answers")');
    await page.waitForTimeout(200);
    const resetScoreText = await page.locator('.flex.items-baseline.gap-2').first().innerText();
    assert(resetScoreText.includes('/ 15 Correct (0%)'), 'Reset button clears answers and resets score to 0 / 15');

    // Test Glossary Sub-Tab
    await page.click('button:has-text("Glossary (12 Terms)")');
    await page.waitForTimeout(300);
    assert(await page.locator('h3:has-text("Access Control")').count() > 0, 'Glossary renders Access Control');
    assert(await page.locator('h3:has-text("Least Privilege")').count() > 0, 'Glossary renders Least Privilege');
    assert(await page.locator('h3:has-text("Parameterized Query")').count() > 0, 'Glossary renders Parameterized Query');

    // Search glossary
    await page.fill('input[placeholder*="Search glossary"]', 'Encryption');
    await page.waitForTimeout(200);
    assert(await page.locator('h3:has-text("Encryption")').count() > 0, 'Glossary search finds "Encryption"');
    await page.fill('input[placeholder*="Search glossary"]', '');

    // -----------------------------------------------------------------
    // TEST SECTION 8: Research Report & 7-Slide Presentation Viewer
    // -----------------------------------------------------------------
    console.log('\n--- TEST SECTION 8: Research Report & 7-Slide Deck ---');
    await page.click('button:has-text("Research & Slides")');
    await page.waitForTimeout(300);

    // Verify Slide 1
    assert(await page.locator('span:has-text("Slide 01")').count() > 0, 'Slide 01 title visible');
    assert(await page.locator('h3:has-text("CAPSTONE 9: AI OWASP Top 10 Tutor")').count() > 0, 'Slide 01 title text correct');

    // Click Next Slide to verify Slide 2
    await page.click('button:has-text("Next Slide")');
    await page.waitForTimeout(200);
    assert(await page.locator('span:has-text("Slide 02")').count() > 0, 'Next slide advances to Slide 02');
    assert(await page.locator('h3:has-text("Scope & Empirical Methodology")').count() > 0, 'Slide 02 title text correct');

    // Click thumbnail 05
    await page.click('button:has-text("05")');
    await page.waitForTimeout(200);
    assert(await page.locator('span:has-text("Slide 05")').count() > 0, 'Thumbnail 05 jumps to Slide 05');
    assert(await page.locator('h3:has-text("Defensive Learning: Vulnerable vs Fixed Code")').count() > 0, 'Slide 05 title correct');

    // Click thumbnail 07
    await page.click('button:has-text("07")');
    await page.waitForTimeout(200);
    assert(await page.locator('span:has-text("Slide 07")').count() > 0, 'Thumbnail 07 jumps to Slide 07');
    assert(await page.locator('h3:has-text("Conclusion, Limitations & Ethical Boundaries")').count() > 0, 'Slide 07 title correct');

    // Verify Quantitative Before/After Table
    assert(await page.locator('text=Quantitative Before/After Findings').count() > 0, 'Quantitative findings section present');
    assert(await page.locator('text=+24.3% Boost').count() > 0, 'Metric A shows +24.3% Boost in table');
    assert(await page.locator('text=-100% Elimination').count() > 0, 'Hallucinations show -100% Elimination in table');

    // -----------------------------------------------------------------
    // TEST SECTION 9: Automation & Deliverables Download Center
    // -----------------------------------------------------------------
    console.log('\n--- TEST SECTION 9: Automation & Deliverables Hub ---');
    await page.click('button:has-text("Automation & Downloads")');
    await page.waitForTimeout(300);

    assert(await page.locator('text=Python Automated Workbook Generator').count() > 0, 'Step 10 Automation spotlight visible');

    // Test Instant Live Quiz Export (.csv)
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 3000 }),
      page.click('button:has-text("Instant Live Quiz Export")')
    ]);
    const downloadName = download.suggestedFilename();
    assert(downloadName === 'OWASP_Quiz_Live_Export.csv', `Live CSV export generated: "${downloadName}"`);

    // Verify HTTP 200 on all static deliverables served by preview server
    const deliverablePaths = [
      '/CAPSTONE9_OWASP_AI_Verification.xlsx',
      '/01_Source_Register.xlsx',
      '/02_AI_Evaluation.xlsx',
      '/05_Quiz_and_Answer_Key.xlsx',
      '/06_Presentation.pptx',
      '/07_Prompt_Library.md',
      '/09_Before_After_Analysis.md',
      '/10_Ethics_and_Methodology.md',
      '/03_Verification_Report.md',
      '/04_Study_Guide.md',
      '/Automated_Quiz_Export.xlsx'
    ];

    for (const p of deliverablePaths) {
      const status = await checkUrlStatus(p);
      assert(status === 200, `Deliverable ${p} returns HTTP ${status}`);
    }

    // -----------------------------------------------------------------
    // TEST SECTION 10: Footer & Error Console Audit
    // -----------------------------------------------------------------
    console.log('\n--- TEST SECTION 10: Footer & Runtime Stability ---');
    assert(await page.locator('footer:has-text("Controlled Defensive Demonstrations Only")').count() > 0, 'Defensive ethics notice in footer');

    // Test footer navigation link
    await page.click('footer button:has-text("Code Lab")');
    await page.waitForTimeout(200);
    assert(await page.locator('h1:has-text("Secure Code Lab")').count() > 0, 'Footer link navigates to Code Lab');

    // Check console error count
    assert(consoleErrors.length === 0, `Zero uncaught console errors recorded (Found: ${consoleErrors.length})`);
    if (consoleErrors.length > 0) {
      console.error('Console errors logged:', consoleErrors);
    }

  } catch (err) {
    console.error('FATAL TEST EXCEPTION:', err);
    totalTests++;
  } finally {
    await browser.close();
  }

  console.log('\n===============================================================');
  console.log(`  TEST RESULTS: ${passedTests} / ${totalTests} PASSED (${Math.round((passedTests/totalTests)*100)}%)`);
  console.log('===============================================================\n');

  process.exit(passedTests === totalTests ? 0 : 1);
})();
