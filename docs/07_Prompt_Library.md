# CAPSTONE 9 — Prompt Library
## AI OWASP Top 10 Tutor: Standardized Prompting Strategies

This document records the exact prompt templates and configurations executed across all 6 OWASP Top 10:2025 categories in **ChatGPT (GPT-4o)**, **Google Gemini (Gemini 1.5 Pro)**, and **Anthropic Claude (Claude 3.5 Sonnet)**.

---

### Strategy A: Basic Prompting (Conversational Baseline)
**Purpose**: Assess baseline AI capability, fluency, and susceptibility to hallucinations or outdated recommendations when no explicit grounding constraints are applied.

```text
I am working on a cybersecurity education project based on the OWASP Top 10:2025.

OWASP category: [CATEGORY ID AND NAME]
Official OWASP source: [SOURCE URL]

Task:
1. Explain this security risk to a beginner in simple language.
2. Explain the same risk to an advanced learner using appropriate technical terminology.
3. Give one realistic, defensive educational example.
4. Describe the potential impact and common prevention measures.
5. Provide the official source URL.

Keep the beginner and advanced explanations separate.
Do not invent statistics or claim that information has been verified unless it has.
This is for defensive learning only.
```

---

### Strategy B: Evidence-Constrained Prompting (Rigorous Grounding)
**Purpose**: Constrain the AI's generation strictly to supplied official OWASP documentation passages, enforce explicit uncertainty declarations, and require claim-by-claim verification trails.

```text
I am evaluating AI accuracy for a cybersecurity education project using the OWASP Top 10:2025.

Category: [CATEGORY ID AND NAME]
Official OWASP source URL: [SOURCE URL]

Official source material:
[PASTE THE RELEVANT OFFICIAL OWASP DESCRIPTION AND PREVENTION GUIDANCE HERE]

Produce a structured research response with these sections:

A. BEGINNER EXPLANATION
Explain the risk in plain language, using a simple analogy if useful.

B. ADVANCED EXPLANATION
Explain the technical mechanism, common causes, security impact, and defensive mitigations.

C. DEFENSIVE EXAMPLE
Give a small educational example of the vulnerable pattern and a corrected version. Explain why the correction helps.

D. CLAIMS AND EVIDENCE
List each important factual claim separately. For each claim, provide the supporting source passage or section. Distinguish direct support, reasonable interpretation, and claims not established by the supplied source.

E. LIMITATIONS
Identify any details requiring another authoritative source. Do not invent quotations, statistics, URLs, or citations.

F. SELF-CHECK
Identify possible oversimplifications, outdated terminology, missing context, or technical errors in your own answer.

Rules:
- Treat the supplied official OWASP material as the authority for claims about the category.
- Do not imply that a claim has been independently verified.
- Do not label a claim as supported if the supplied evidence does not support it.
- Keep the response suitable for defensive education.
- Preserve the official category ID and name exactly as provided.
```

---

### Executed Prompt Variations by Category

#### 1. A01:2025 Broken Access Control
- **URL**: `https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/`
- **Official Excerpt Injected for Strategy B**:
  > "Access control enforces policy such that users cannot act outside of their intended permissions. Failures typically lead to unauthorized information disclosure, modification, or destruction of all data or performing a business function outside the user's limits. Common access control vulnerabilities include: bypassing access control checks by modifying the URL, internal application state, or the HTML page, or by using an attack tool modifying API requests; permitting viewing or editing someone else's account, by providing its unique identifier (insecure direct object references)... Access control is only effective if enforced in trusted server-side code or serverless API, where the attacker cannot modify the access control check or metadata."

#### 2. A02:2025 Security Misconfiguration
- **URL**: `https://top10.owasp.org/2025/A02_2025-Security_Misconfiguration/`
- **Official Excerpt Injected for Strategy B**:
  > "Security misconfiguration can happen at any level of an application stack, including the network services, platform, web server, application server, database, frameworks, custom code, and pre-installed virtual machines, containers, or storage. The application might be vulnerable if: unnecessarily enabled features, default accounts and passwords, error handling reveals stack traces or other overly informative error messages to users, or security settings in development environments are mistakenly applied to production."

#### 3. A03:2025 Software Supply Chain Failures
- **URL**: `https://top10.owasp.org/2025/A03_2025-Software_Supply_Chain_Failures/`
- **Official Excerpt Injected for Strategy B**:
  > "Expanded in 2025 to encompass vulnerabilities introduced across the software development lifecycle, third-party libraries, compromised build pipelines, unvetted open-source components, and package repository poisoning. Defenses include maintaining a continuous Software Bill of Materials (SBOM), enforcing cryptographic dependency verification (lockfiles, hash signing), vulnerability monitoring, and reproducible builds."

#### 4. A04:2025 Cryptographic Failures
- **URL**: `https://top10.owasp.org/2025/A04_2025-Cryptographic_Failures/`
- **Official Excerpt Injected for Strategy B**:
  > "The first thing is to determine the protection needs of data in transit and at rest. Passwords must be hashed using a modern adaptive cryptographic password hashing algorithm with salt and adequate work factor (e.g. Argon2id, scrypt, bcrypt, or PBKDF2). General-purpose fast hashing algorithms (MD5, SHA-1, SHA-256) are unsuitable for password storage. Proper encryption keys must be generated with cryptographic pseudo-random number generators and rotated securely."

#### 5. A05:2025 Injection
- **URL**: `https://top10.owasp.org/2025/A05_2025-Injection/`
- **Official Excerpt Injected for Strategy B**:
  > "An application is vulnerable to attack when user-supplied data is not validated, filtered, or sanitized by the application, or hostile data is directly concatenated in dynamic queries or commands. The primary defense against injection is the use of parameterized interfaces (prepared statements) which ensure the interpreter handles the user input strictly as data and not executable code."

#### 6. A07:2025 Authentication Failures
- **URL**: `https://top10.owasp.org/2025/A07_2025-Authentication_Failures/`
- **Official Excerpt Injected for Strategy B**:
  > "Confirmation of the user's identity, authentication, and session management is critical to protect against authentication-related attacks. Applications are vulnerable if they permit brute force attacks, credential stuffing, weak password recovery, expose session tokens in URLs, or lack multi-factor authentication (MFA). Prevention requires implementing rate limiting, multi-factor authentication, constant-time comparison, and secure session destruction."
