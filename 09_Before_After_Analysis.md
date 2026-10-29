# CAPSTONE 9 — Before & After Analysis
## Comparative Analysis: Basic Prompting (Strategy A) vs. Evidence-Constrained Prompting (Strategy B)

### 1. Executive Summary
This empirical study evaluated **36 model generations** across three leading LLMs:
- **ChatGPT (GPT-4o)**
- **Google Gemini (Gemini 1.5 Pro)**
- **Anthropic Claude (Claude 3.5 Sonnet)**

The study tested whether unconstrained AI generation poses security risks for students and developers, and whether **Evidence-Constrained Prompting** eliminates hallucinations and misleading defensive recommendations.

---

### 2. Quantitative Results

| Evaluation Metric | Strategy A: Basic Prompting | Strategy B: Evidence-Constrained | Delta / Improvement |
| :--- | :---: | :---: | :---: |
| **Evidence-Checkable Accuracy (Metric A)** | **72.5%** | **96.8%** | **+24.3%** |
| **Source Grounding Rate (Metric B)** | **61.1%** | **94.4%** | **+33.3%** |
| **Severe Security Hallucinations Logged** | **7 critical errors** | **0 critical errors** | **-100% reduction** |
| **Outdated Version Citations (2021 vs 2025)** | **14 instances** | **0 instances** | **-100% reduction** |
| **Average Clarity Score (0-2 scale)** | 1.95 | 1.92 | -0.03 (Negligible) |
| **Average Source Traceability Score (0-2)** | 0.88 | 1.96 | **+1.08** |

---

### 3. Qualitative Breakdown: Observed Errors in Strategy A

#### A. Client-Side Access Control Fallacy (A01:2025)
- **What the AI Generated (Strategy A)**:
  > *"To protect sensitive documents, hide the admin button in your UI and check `if (!user.isAdmin) return;` inside your React component."*
- **Why It is Insecure**:
  An attacker can easily bypass client-side DOM controls by issuing raw HTTP requests directly to the API endpoint.
- **Strategy B Correction**:
  Enforced strict server-side authorization middleware (`requireLogin` and `ownerId` database constraints) directly cited from OWASP A01:2025 guidance.

#### B. Fast General-Purpose Hashing for Passwords (A04:2025)
- **What the AI Generated (Strategy A)**:
  > *"Hash passwords using `hashlib.sha256(password.encode()).hexdigest()`."*
- **Why It is Insecure**:
  Standard SHA-256 is designed to be extremely fast. Modern consumer GPUs compute over 10 billion SHA-256 hashes per second, making offline dictionary attacks trivial.
- **Strategy B Correction**:
  Grounded strictly in OWASP A04:2025, which mandates memory-hard adaptive hashing algorithms: **Argon2id** (or bcrypt/scrypt) with tuned work factors.

#### C. False Sense of Security from Version Pinning (A03:2025)
- **What the AI Generated (Strategy A)**:
  > *"Pinning your package.json version ensures your application cannot be hacked through dependencies."*
- **Why It is Insecure**:
  Pinning freezes a package version, but does not verify whether that pinned version itself contains critical known vulnerabilities or if transitive dependencies are compromised.
- **Strategy B Correction**:
  Clarified that pinning must be combined with lockfile integrity (`npm ci`), automated vulnerability auditing (`npm audit` / Snyk), and SBOM generation.

#### D. Outdated 2021 Categorization & Telemetry
- **What the AI Generated (Strategy A)**:
  Repeatedly cited "A04:2021 Insecure Design" or quoted 2021 percentage stats when asked about OWASP Top 10:2025.
- **Strategy B Correction**:
  Locked the version taxonomy to OWASP Top 10:2025, preventing model confusion between superseded releases.

---

### 4. Key Takeaways for AI-Assisted Cybersecurity Learning
1. **Fluency Masks Inaccuracy**: LLMs write confident, highly readable prose that appears technically sound to novices while containing fatal security vulnerabilities.
2. **Grounding is Essential**: Supplying authoritative documentation passages and enforcing strict "cite-or-flag" rules transforms AI from a risky generator into an exceptionally reliable tutor.
3. **Defense-in-Depth for Prompts**: Incorporating explicit self-checking (`Section F: Self-Check`) forces the model to review its own assertions before final output delivery.
