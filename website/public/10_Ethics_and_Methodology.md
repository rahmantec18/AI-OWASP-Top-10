# CAPSTONE 9 — Ethics, Limitations & Methodology
## Research Ethics Statement and Experimental Design

---

### 1. Research Ethics Statement
This project is conducted strictly under **defensive cybersecurity educational principles**. The objective of the AI OWASP Top 10 Tutor is to empower software developers, students, and engineers to build resilient software and understand the limitations of artificial intelligence when generating security advice.

#### Core Ethical Safeguards:
1. **Defensive Education Only**: All code samples illustrate defensive mitigation patterns, input validation, authenticated session handling, and secure configurations.
2. **Zero Offensive Exploitation**: No live exploit payloads, automated denial-of-service scripts, credential stuffing bots, or brute-force engines are implemented or executed against real infrastructure.
3. **Controlled Mock Lab Boundaries**: All demonstrations use synthetic data, local mock server responses, and sandbox database instances. No external production environments, college networks, or corporate systems were targeted.
4. **No Real Credentials or PII**: All usernames, emails, authentication tokens, and simulated records are completely synthetic (e.g. `user@example.com`, `doc-101`).
5. **Responsible AI Usage**: AI outputs were not trusted implicitly. Every output underwent independent human and source-grounded verification before incorporation into educational curricula.

---

### 2. Research Methodology

#### Research Question:
> *"How accurately can AI explain common web application risks, and how can its explanations be verified against official OWASP material?"*

#### Experimental Matrix:
- **6 OWASP Categories**:
  - A01:2025 Broken Access Control
  - A02:2025 Security Misconfiguration
  - A03:2025 Software Supply Chain Failures
  - A04:2025 Cryptographic Failures
  - A05:2025 Injection
  - A07:2025 Authentication Failures
- **3 Frontier AI Models**:
  - OpenAI ChatGPT (GPT-4o)
  - Google DeepMind Gemini (Gemini 1.5 Pro)
  - Anthropic Claude (Claude 3.5 Sonnet)
- **2 Prompting Paradigms**:
  - Strategy A (Basic / Unconstrained Conversational Request)
  - Strategy B (Evidence-Constrained, Source-Anchored Prompting)
- **Total Experimental Outputs**: 36 comprehensive generation runs.

#### Evaluation Metric Formulas:

$$\text{Metric A (Accuracy \%)} = \frac{V + 0.5 \cdot P}{V + P + I + O} \times 100$$

$$\text{Metric B (Source Grounding \%)} = \frac{V + P}{V + P + I + O + U} \times 100$$

Where:
- $V$ = Verified claims (Fully supported by official source)
- $P$ = Partially verified claims (Core idea correct, but context missing or overgeneralized)
- $I$ = Incorrect claims (Directly contradicted by security standards or official documentation)
- $O$ = Outdated claims (Relies on superseded releases, e.g. OWASP 2021)
- $U$ = Unsupported by source (Claim may be true in general computing, but not substantiated by the provided OWASP 2025 reference)

---

### 3. Study Limitations
1. **Sample Scope**: While the selected six categories represent the most prevalent web application flaws, the remaining four OWASP Top 10:2025 categories were excluded to ensure depth of code review.
2. **Framework Specificity**: Defensive code examples use Node.js/Express and Python; subtle implementation nuances may vary across enterprise stacks such as Spring Boot, Django, or ASP.NET Core.
3. **Model Version Drift**: AI model weights and system prompt calibrations are updated frequently by vendors. Results reflect evaluations recorded during October 2026.
