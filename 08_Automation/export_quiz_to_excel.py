"""
CAPSTONE 9 — AI OWASP Top 10 Tutor
Step 10 Automation Task: Automated Quiz & Verified Answer Key Exporter
This standalone script exports the verified 15-question cybersecurity quiz into an Excel workbook
with formatted styles, auto-fit column widths, and verified source evidence URLs.
"""

import sys
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

QUIZ_DATA = [
    ("Q01", "A01:2025", "What does access control determine?", "User permissions and allowed actions", "Screen resolution and theme", "Network bandwidth limits", "Database file format", "A", "Access control enforces policy so that users cannot act outside their permitted operations.", "https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/", "Verified"),
    ("Q02", "A01:2025", "Where should access control checks be strictly enforced?", "Client-side HTML and JavaScript", "Trusted server-side code or APIs", "Browser CSS styling", "Code comments", "B", "Client-side checks are easily bypassed by intercepting or forging HTTP requests. Enforcement must happen on trusted server-side code.", "https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/", "Verified"),
    ("Q03", "A01:2025", "What is the core principle of Least Privilege?", "Grant everyone full administrative permissions", "Deny access to all valid users", "Give users only the minimum necessary permissions", "Share administrative credentials across teams", "C", "Least privilege minimizes risk by limiting privileges to only what is required to perform specific tasks.", "https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/", "Verified"),
    ("Q04", "A02:2025", "What defines a Security Misconfiguration?", "A properly rotated strong password", "An up-to-date security patch", "A daily database backup", "An insecure, default, or improperly maintained system setting", "D", "Misconfigurations arise from default accounts, exposed debug endpoints, missing security headers, or overly verbose error messages.", "https://top10.owasp.org/2025/A02_2025-Security_Misconfiguration/", "Verified"),
    ("Q05", "A02:2025", "Which practice defends against Security Misconfiguration in production?", "Expose detailed stack traces to end users", "Harden configurations and disable debug modes", "Disable all firewalls and security headers", "Store plaintext credentials in repository READMEs", "B", "Disabling debug features in production prevents information disclosure of database queries and internal architecture.", "https://top10.owasp.org/2025/A02_2025-Security_Misconfiguration/", "Verified"),
    ("Q06", "A03:2025", "What is a third-party software dependency?", "A required external library or package your application imports", "A user's plaintext password", "The visual layout of a web page", "A hardware firewall cable", "A", "Dependencies are external software components bundled into your application to provide functional capabilities.", "https://top10.owasp.org/2025/A03_2025-Software_Supply_Chain_Failures/", "Verified"),
    ("Q07", "A03:2025", "What scope should dependency management and vulnerability scanning track?", "Application logo image files only", "Direct top-level dependencies only", "Both direct and transitive (nested) dependencies", "Nothing once initial installation completes", "C", "Vulnerabilities frequently reside deep within transitive dependencies pulled in by direct packages.", "https://top10.owasp.org/2025/A03_2025-Software_Supply_Chain_Failures/", "Verified"),
    ("Q08", "A03:2025", "Does pinning an exact dependency version alone guarantee that a package is secure?", "Yes, pinned versions can never have security flaws", "Only when running on Windows servers", "Only for open-source software packages", "No, pinned versions can still contain known or discovered vulnerabilities", "D", "Pinning prevents unexpected automatic updates, but it does not guarantee that the pinned version is free from critical flaws.", "https://top10.owasp.org/2025/A03_2025-Software_Supply_Chain_Failures/", "Verified"),
    ("Q09", "A04:2025", "What represents a Cryptographic Failure according to OWASP?", "Slow page load times due to network latency", "Weaknesses in cryptographic algorithms, protocols, or key management", "A broken hyperlink on the home page", "A syntax error in a JavaScript loop", "B", "Cryptographic failures include using obsolete ciphers (e.g., MD5), missing encryption in transit, or improper secret storage.", "https://top10.owasp.org/2025/A04_2025-Cryptographic_Failures/", "Verified"),
    ("Q10", "A04:2025", "How should user passwords be securely stored in modern databases?", "Plain text in a restricted database column", "Reversible Base64 encoding", "Salted adaptive password hashing (e.g., Argon2id or bcrypt)", "Hardcoded directly into backend scripts", "C", "Adaptive hashing algorithms incorporate cryptographic salts and computationally tuned work factors to resist offline GPU brute-force attacks.", "https://top10.owasp.org/2025/A04_2025-Cryptographic_Failures/", "Verified"),
    ("Q11", "A05:2025", "What is the underlying mechanism of SQL Injection?", "Creating automated database backups", "A physical disruption of server hardware", "A secure token-based login process", "Hostile input altering the intended SQL syntax and execution logic", "D", "SQL injection occurs when untrusted user input is directly concatenated into a dynamic SQL query string.", "https://top10.owasp.org/2025/A05_2025-Injection/", "Verified"),
    ("Q12", "A05:2025", "What is the primary defensive measure against SQL Injection?", "Using parameterized queries (prepared statements)", "Concatenating strings with raw user input", "Hiding the submit button with CSS", "Renaming database table columns to longer names", "A", "Parameterized queries ensure the database engine compiles the query template first and treats user parameters strictly as data.", "https://top10.owasp.org/2025/A05_2025-Injection/", "Verified"),
    ("Q13", "A07:2025", "What is the primary purpose of Authentication?", "Styling user interface components", "Verifying the claimed identity of a user or service", "Compressing files before network transmission", "Indexing database tables for faster search", "B", "Authentication confirms that an entity is genuinely who they claim to be through valid credentials or assertions.", "https://top10.owasp.org/2025/A07_2025-Authentication_Failures/", "Verified"),
    ("Q14", "A07:2025", "What does Multi-Factor Authentication (MFA) strictly require?", "A very long username", "A publicly accessible social profile", "Two or more distinct authentication factor categories (knowledge, possession, inherence)", "Authentication without passwords or tokens", "C", "MFA combines distinct factor categories (e.g., password + authenticator TOTP token) rather than multiple instances of the same factor.", "https://top10.owasp.org/2025/A07_2025-Authentication_Failures/", "Verified"),
    ("Q15", "A07:2025", "Why should login endpoints enforce rate limiting?", "To change the background color of the web application", "To make user passwords publicly readable", "To bypass authorization checks during high traffic", "To mitigate automated brute-force and credential stuffing attacks", "D", "Rate limiting restricts the frequency of repeated authentication attempts from a single IP or account, blocking high-speed credential stuffing.", "https://top10.owasp.org/2025/A07_2025-Authentication_Failures/", "Verified")
]

def export_quiz(output_path="Automated_Quiz_Export.xlsx"):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Verified_Quiz"

    headers = ["Question_ID", "OWASP_ID", "Question", "Option_A", "Option_B", "Option_C", "Option_D", "Correct_Answer", "Explanation", "Evidence_URL", "Verification_Status"]
    ws.append(headers)

    header_font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
    header_fill = PatternFill(start_color="0F172A", end_color="0F172A", fill_type="solid")
    center_align = Alignment(horizontal="center", vertical="center", wrap_text=True)

    for col_idx in range(1, len(headers) + 1):
        cell = ws.cell(row=1, column=col_idx)
        cell.font = header_font
        cell.fill = header_fill
        cell.alignment = center_align

    ws.row_dimensions[1].height = 28

    data_font = Font(name="Calibri", size=10, color="0F172A")
    regular_align = Alignment(vertical="center", wrap_text=True)
    zebra_fill = PatternFill(start_color="F1F5F9", end_color="F1F5F9", fill_type="solid")

    for r_idx, row in enumerate(QUIZ_DATA, start=2):
        ws.append(list(row))
        ws.row_dimensions[r_idx].height = 24
        is_even = (r_idx % 2 == 0)
        for c_idx in range(1, len(headers) + 1):
            cell = ws.cell(row=r_idx, column=c_idx)
            cell.font = data_font
            cell.alignment = regular_align
            if is_even:
                cell.fill = zebra_fill

    for col in ws.columns:
        col_letter = get_column_letter(col[0].column)
        max_len = max(len(str(cell.value or '')) for cell in col)
        ws.column_dimensions[col_letter].width = min(max(max_len + 3, 12), 65)

    wb.save(output_path)
    print(f"[OK] Successfully exported {len(QUIZ_DATA)} verified quiz questions to: {output_path}")

if __name__ == "__main__":
    out_file = sys.argv[1] if len(sys.argv) > 1 else "Automated_Quiz_Export.xlsx"
    export_quiz(out_file)
