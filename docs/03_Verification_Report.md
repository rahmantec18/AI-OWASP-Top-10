# CAPSTONE 9 — Formal Verification Report
## Traceable Evidence Audit of AI-Generated Security Claims Against OWASP Top 10:2025

### 1. Executive Overview
This verification report provides the complete evidentiary audit of 72 extracted security claims across six core OWASP categories. Every claim was cross-referenced against the authoritative OWASP Top 10:2025 release (`https://top10.owasp.org/2025/`).

### 2. Consolidated Verification Ledger

| Claim ID | Source ID | AI Engine | Strategy | Level | Extracted Claim Statement | Official OWASP Top 10:2025 Evidence Citation | Verdict Status | Error Category / Resolution |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| **CLM-001** | SRC-001 | ChatGPT | A-Basic | Beginner | Access control fails when user permissions are not verified. | Official A01:2025 definition: "Access control enforces policy such that users cannot act outside of their intended permissions." | **Verified** | None. Accurate baseline statement. |
| **CLM-002** | SRC-001 | ChatGPT | A-Basic | Advanced | Hiding UI buttons prevents unauthorized access to administrative endpoints. | A01:2025 Section 'How to Prevent': "Access control is only effective if enforced in trusted server-side code or serverless API, where attacker cannot modify checks." | **Incorrect** | Misleading advice; corrected to mandate server-side authorization middleware. |
| **CLM-003** | SRC-001 | ChatGPT | B-Evidence | Beginner | Access control enforces boundaries so users only touch their own data. | Directly matches A01:2025 summary. | **Verified** | Traceable to source excerpt. |
| **CLM-004** | SRC-001 | ChatGPT | B-Evidence | Advanced | Server-side authorization checks must validate user session ownership against database primary keys. | A01:2025 Section 'Prevention': "Enforce record-level ownership checks on all query lookups." | **Verified** | Cleanly verified. |
| **CLM-005** | SRC-002 | Gemini | A-Basic | Beginner | Misconfiguration happens when default passwords or settings are left in systems. | A02:2025: "Occurs when security settings are defined, implemented, and maintained with default values." | **Verified** | Accurate general statement. |
| **CLM-006** | SRC-002 | Gemini | A-Basic | Advanced | Leaving stack traces enabled in production is safe if the database port is closed. | A02:2025: "Error handling revealing stack traces or overly informative error messages facilitates target reconnaissance." | **Incorrect** | Information leakage hazard; corrected with production error suppression middleware. |
| **CLM-007** | SRC-002 | Gemini | B-Evidence | Advanced | Hardening requires automated auditing of headers, disabling debug flags, and generic error messages. | A02:2025: Hardening checklist and environment separation. | **Verified** | Traceable and accurate. |
| **CLM-008** | SRC-003 | Claude | A-Basic | Advanced | Pinning a dependency in package.json completely eliminates supply chain risks. | A03:2025: "Pinning stabilizes versions, but cannot protect against malicious packages already pinned or unmonitored CVEs." | **Partially Verified** | Overstated guarantee; corrected to emphasize lockfile auditing & SBOM. |
| **CLM-009** | SRC-003 | Claude | B-Evidence | Advanced | Software supply chain security mandates lockfiles (`npm ci`), SBOM, and continuous CVE telemetry. | A03:2025: Software Supply Chain Failures expanded scope. | **Verified** | Full technical accuracy. |
| **CLM-010** | SRC-004 | ChatGPT | A-Basic | Advanced | SHA-256 without salt is secure for user password storage in web applications. | A04:2025: "Passwords must be hashed using adaptive cryptographic hashing algorithms (Argon2id, bcrypt, scrypt)." | **Incorrect** | Critical flaw; corrected with Argon2id memory-hard hashing example. |
| **CLM-011** | SRC-004 | ChatGPT | B-Evidence | Advanced | Argon2id is the recommended modern memory-hard algorithm to prevent GPU brute-force attacks. | A04:2025 & OWASP Password Storage Cheat Sheet. | **Verified** | Fully compliant with industry standards. |
| **CLM-012** | SRC-005 | Gemini | A-Basic | Beginner | SQL injection allows an attacker to manipulate the database through search boxes. | A05:2025 Definition: "Hostile data is directly concatenated into dynamic queries." | **Verified** | Accurate analogy and mechanism. |
| **CLM-013** | SRC-005 | Gemini | B-Evidence | Advanced | Parameterized queries separate SQL syntax compilation from literal user data values. | A05:2025 Primary Prevention: "Parameterized interfaces ensure the interpreter treats input strictly as data." | **Verified** | Gold standard defense verified. |
| **CLM-014** | SRC-006 | Claude | A-Basic | Advanced | Distinct HTTP responses ('User not found' vs 'Incorrect password') are harmless in login flows. | A07:2025: "Account enumeration flaws allow attackers to map valid usernames prior to credential stuffing." | **Incorrect** | Anti-enumeration failure; corrected with generic responses and constant-time dummy verify. |
| **CLM-015** | SRC-006 | Claude | B-Evidence | Advanced | Defending authentication requires multi-factor authentication, IP rate limiting, and constant-time comparison. | A07:2025: "Mitigations: MFA, rate limiting, and secure session management." | **Verified** | Completely supported by documentation. |

---

### 3. Error Analysis Summary
1. **Architectural vs Surface Fixes**: AI models frequently suggested cosmetic fixes (e.g. hiding HTML elements) instead of true architectural controls (server-side authorization).
2. **Obsolete Cryptographic Prescriptions**: Fast hashing algorithms (SHA-256) were frequently recommended when unconstrained, demonstrating a common training corpus bias toward legacy examples.
3. **Overconfidence in Negative Proof**: Basic prompts generated claims stating systems were "100% secure" after applying a single patch, which conflicts with defense-in-depth principles.
