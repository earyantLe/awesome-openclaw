# Security Policy

## Supported Versions

We release patches for security vulnerabilities regularly. Here's which versions are currently being supported:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to lirui940403@outlook.com with the subject line "Security Vulnerability Report".

### What to Include

Please include the following information in your report:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact of the vulnerability
- Any suggested fixes (if applicable)
- Your contact information for follow-up questions

### What to Expect

- **Acknowledgment**: You should receive an acknowledgment within 48 hours
- **Updates**: We'll provide updates every 7 days on the progress
- **Resolution**: We aim to resolve critical issues within 30 days

## Security Best Practices

If you're using OpenClaw, please follow these security best practices:

### 1. API Keys & Tokens

- Never commit API keys or tokens to version control
- Use environment variables for sensitive data
- Rotate your tokens regularly
- Use separate tokens for development and production

### 2. Access Control

- Limit access to your OpenClaw instance
- Use strong passwords for any authentication
- Enable two-factor authentication where available
- Regularly audit user permissions

### 3. Network Security

- Keep your OpenClaw instance behind a firewall when possible
- Use HTTPS for all communications
- Regularly update your system and dependencies
- Monitor for unusual activity

### 4. Data Privacy

- Be cautious about what data you share with your agent
- Don't store sensitive information in memory files
- Regularly backup and secure your data
- Follow your organization's data privacy policies

## Known Issues

We maintain a list of known security issues and their status:

| Issue | Status | Fixed In |
|-------|--------|----------|
| None currently | - | - |

## Security Updates

Security updates will be announced via:
- GitHub Security Advisories
- Discord community announcements
- Release notes

Thank you for helping keep OpenClaw and its users safe!
