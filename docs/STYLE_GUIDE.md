# Awesome OpenClaw - Style Guide 🦞

> **Design and documentation standards for maintaining consistency across the Awesome OpenClaw repository.**

---

## 📋 Table of Contents

- [Writing Style Guide](#-writing-style-guide)
- [Visual Design Specifications](#-visual-design-specifications)
- [Resource Description Templates](#-resource-description-templates)
- [Submission Process & Checklist](#-submission-process--checklist)
- [Markdown Best Practices](#-markdown-best-practices)
- [Accessibility Guidelines](#-accessibility-guidelines)

---

## ✍️ Writing Style Guide

### Tone & Voice

**Be:**
- ✅ **Friendly** - Approachable and welcoming
- ✅ **Professional** - Clear and credible
- ✅ **Concise** - Respect readers' time
- ✅ **Helpful** - Focus on value and utility
- ✅ **Inclusive** - Welcome contributors from all backgrounds

**Avoid:**
- ❌ Overly casual slang or memes
- ❌ Corporate jargon or buzzwords
- ❌ Condescending or elitist language
- ❌ Excessive enthusiasm ("Amazing!", "Incredible!")
- ❌ Passive voice when active is clearer

### Examples

**Good:**
> "OpenClaw is an open-source AI agent runtime that transforms your LLM into a proactive, tool-using assistant."

**Bad:**
> "OpenClaw is like, this totally awesome thing that makes your AI do cool stuff!"

---

### Language & Terminology

| Term | Usage | Notes |
|------|-------|-------|
| **OpenClaw** | Always capitalize | Project name |
| **skill** | Lowercase (unless in title) | Refers to skill templates |
| **extension** | Lowercase | Plugins and integrations |
| **agent** | Lowercase | AI agent instance |
| **LLM** | Uppercase | Large Language Model |
| **GitHub** | Capitalize H | Platform name |
| **Markdown** | Capitalize M | Markup language |

### Internationalization (i18n)

**For bilingual content (Chinese/English):**

1. **Primary language**: English (for global reach)
2. **Chinese translations**: Provide for Feishu/Lark-specific resources
3. **Format**: 
   ```markdown
   `skill-name` - 中文名称 - English description
   ```

**Example:**
> `feishu-bitable` - 飞书多维表格管理 - Create, query, and manage Bitable databases

**Best Practices:**
- Keep technical terms in English (e.g., "API", "SDK", "CLI")
- Ensure translations are accurate, not literal
- Maintain consistency across all documentation
- Use simplified Chinese (简体中文)

---

## 🎨 Visual Design Specifications

### Badges (Shields.io)

**Standard Badge Set** (in order):

```markdown
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/earyantLe/awesome-openclaw?style=flat)](https://github.com/earyantLe/awesome-openclaw)
[![Last Updated](https://img.shields.io/github/last-commit/earyantLe/awesome-openclaw?label=updated)](https://github.com/earyantLe/awesome-openclaw/commits/main)
[![Contributors](https://img.shields.io/github/contributors/earyantLe/awesome-openclaw)](https://github.com/earyantLe/awesome-openclaw/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/earyantLe/awesome-openclaw)](https://github.com/earyantLe/awesome-openclaw/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
```

**Badge Color Guidelines:**

| Color | Usage |
|-------|-------|
| `yellow` | License, warnings |
| `blue` | Information, links |
| `green` | Success, active status |
| `brightgreen` | Positive actions (PRs welcome) |
| `red` | Errors, critical issues |
| `orange` | Beta, experimental features |

### Section Dividers

**Use horizontal rules sparingly:**

```markdown
---
```

**Placement:**
- After badge section
- Before major sections (every 3-4 sections max)
- Before footer

**Don't:**
- Use between every subsection
- Use multiple in a row
- Replace with emoji lines (e.g., `***` or `___`)

### Emoji Usage

**Guidelines:**
- Use emojis in section headers (1 per section)
- Use in tables for visual categorization
- Use in callout boxes for emphasis
- Don't overuse in body text

**Standard Emoji Set:**

| Emoji | Usage |
|-------|-------|
| 🦞 | OpenClaw brand, community |
| 🚀 | Quick start, launches, projects |
| 📚 | Documentation, books, resources |
| 🎯 | Skills, targets, focus |
| 🔌 | Extensions, plugins, integrations |
| 🌟 | Featured, community highlights |
| 📖 | Tutorials, guides, learning |
| 🛠️ | Tools, utilities, commands |
| ❓ | FAQ, questions |
| 🤝 | Contributing, community |
| 📜 | License, legal |
| ⭐ | Featured, recommended |
| 💡 | Tips, notes |
| ✅ | Do's, approved |
| ❌ | Don'ts, warnings |

### Tables

**Format:**

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Content  | Content  | Content  |
```

**Best Practices:**
- Left-align text columns
- Center-align short status columns
- Right-align numeric columns
- Keep descriptions concise (1-2 sentences max)
- Use header row for clarity

**Example:**

```markdown
| Skill | Description | Use Case |
|-------|-------------|----------|
| `weather` | Weather forecasts via wttr.in | When user asks about weather |
```

### Callout Boxes (Blockquotes)

**For tips and important notes:**

```markdown
> 💡 **Tip**: Join our [Discord Community](https://discord.com/invite/clawd) for real-time help!

> ⚠️ **Warning**: This feature is experimental and may change.

> 📦 **Note**: This plugin requires Feishu/Lark enterprise account.
```

---

## 📝 Resource Description Templates

### Template 1: Skills

```markdown
| `skill-name` | Brief description (1-2 sentences) | Category/Use Case |
```

**Example:**
```markdown
| `weather` | Weather forecasts via wttr.in or Open-Meteo | When user asks about weather conditions |
```

### Template 2: Extensions/Plugins

```markdown
| [Extension Name](URL) | Description | Author |
|-----------------------|-------------|--------|
```

**Example:**
```markdown
| [Feishu Plugin](https://github.com/earyantLe/feishu-openclaw-plugin) | 飞书 (Lark) 集成 - IM/Calendar/Docs | @earyantLe |
```

### Template 3: Tutorials

```markdown
| [Title](URL) | Author | Description |
|--------------|--------|-------------|
```

**Example:**
```markdown
| [Building Your First Agent](https://medium.com/@openclaw) | Community | Step-by-step tutorial for beginners |
```

### Template 4: Community Projects

```markdown
| [Project Name](URL) | Author | Description |
|---------------------|--------|-------------|
```

**Example:**
```markdown
| [OpenClaw WebUI](https://github.com/openclaw/webui) | OpenClaw Team | Web-based UI for management |
```

### Description Writing Formula

**Structure:**
```
[What it does] + [How/Why it's useful] + [Optional: Key feature]
```

**Examples:**

✅ **Good:**
- "Weather forecasts via wttr.in or Open-Meteo" (what + how)
- "GitHub repository management and CI automation" (what + use case)
- "Convert audio/voice recordings to text" (what + output)

❌ **Bad:**
- "A really cool skill that does weather stuff" (vague, informal)
- "This amazing tool will change your life!" (hype, no substance)
- "See link for details" (unhelpful, lazy)

**Length Guidelines:**
- **Ideal**: 10-20 words
- **Maximum**: 25 words
- **Minimum**: 5 words (must be meaningful)

---

## 📤 Submission Process & Checklist

### Before Submitting

**Pre-submission Checklist:**

- [ ] **Relevance**: Resource is directly related to OpenClaw ecosystem
- [ ] **Quality**: Resource provides genuine value (not self-promotion)
- [ ] **Links**: All URLs are tested and working
- [ ] **Description**: Clear, concise (1-2 sentences), follows template
- [ ] **Category**: Placed in correct section
- [ ] **Alphabetical**: Sorted correctly within section
- [ ] **Formatting**: Proper Markdown syntax
- [ ] **No Duplicates**: Checked existing entries
- [ ] **Language**: English (or bilingual with Chinese)
- [ ] **Spelling**: Proofread for typos and grammar

### Submission Steps

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/awesome-openclaw.git
   cd awesome-openclaw
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/add-resource-name
   ```

4. **Make your changes**
   - Edit `README_v2.md`
   - Follow the templates above
   - Test all links

5. **Preview your changes**
   ```bash
   # Use a Markdown previewer or GitHub preview
   ```

6. **Commit your changes**
   ```bash
   git add README_v2.md
   git commit -m "Add: [Resource Name] - [Brief description]"
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/add-resource-name
   ```

8. **Open a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Fill out the PR template
   - Submit!

### PR Template

**When opening a PR, include:**

```markdown
## Resource Type
- [ ] Skill
- [ ] Extension/Plugin
- [ ] Tutorial/Guide
- [ ] Community Project
- [ ] Tool/Utility
- [ ] Other (specify)

## Description
[Brief description of what you're adding]

## Checklist
- [ ] Links are tested and working
- [ ] Description follows style guide (1-2 sentences)
- [ ] Placed in correct section
- [ ] Sorted alphabetically
- [ ] No duplicate entries
- [ ] Markdown formatting is correct

## Additional Context
[Any extra information or context]
```

### Review Process

**What happens after submission:**

1. **Automated Checks**: GitHub Actions verify Markdown syntax
2. **Maintainer Review**: A maintainer reviews within 3-5 days
3. **Feedback**: May request changes or clarifications
4. **Merge**: Approved PRs are merged to main branch
5. **Credit**: Your contribution is acknowledged in the Contributors badge

---

## 📐 Markdown Best Practices

### Headers

**Use proper hierarchy:**

```markdown
# H1 - Main title (only one per file)
## H2 - Major sections
### H3 - Subsections
#### H4 - Minor subsections (use sparingly)
```

**Don't skip levels** (e.g., don't go from H2 to H4).

### Links

**Format:**
```markdown
[Link Text](URL)
```

**Best Practices:**
- Use descriptive link text (not "click here")
- Test all links before submitting
- Use HTTPS when available
- For multiple links, wrap in `<>` to suppress embeds if needed

**Example:**
✅ `[OpenClaw Documentation](https://docs.openclaw.ai)`  
❌ `[click here](https://docs.openclaw.ai)`

### Code Formatting

**Inline code:**
```markdown
Use backticks for `code` and command names
```

**Code blocks:**
````markdown
```bash
# Specify language for syntax highlighting
npm install -g openclaw
```
````

**Supported languages:** `bash`, `javascript`, `typescript`, `python`, `json`, `markdown`, `yaml`

### Lists

**Unordered lists:**
```markdown
- Item 1
- Item 2
  - Sub-item (indent with 2 spaces)
- Item 3
```

**Ordered lists:**
```markdown
1. First step
2. Second step
3. Third step
```

**Task lists:**
```markdown
- [ ] Incomplete task
- [x] Completed task
```

---

## ♿ Accessibility Guidelines

### Alt Text for Images

**When adding images:**
```markdown
![Descriptive alt text](image-url.png)
```

**Good alt text:**
- Describes the image content and purpose
- Is concise (1-2 sentences)
- Doesn't start with "Image of..." or "Picture of..."

**Example:**
✅ `![OpenClaw architecture diagram showing components and data flow]`  
❌ `![diagram]` or `![image123.png]`

### Screen Reader Considerations

**Do:**
- Use proper heading hierarchy (H1 → H2 → H3)
- Write descriptive link text
- Use tables for tabular data (not layout)
- Add alt text to all images
- Use lists for sequential or grouped items

**Don't:**
- Use emojis as the only content in links
- Rely on color alone to convey meaning
- Create complex nested tables
- Use images of text (use actual text instead)

### Color Contrast

**When creating badges or images:**
- Ensure text has sufficient contrast against background
- Follow WCAG AA standards (4.5:1 for normal text)
- Test with color blindness simulators

---

## 🔄 Version Control

### File Naming

| File | Purpose |
|------|---------|
| `README_v2.md` | Current main README (optimized version) |
| `README.md` | Original README (kept for reference) |
| `README-short.md` | Short version for quick previews |
| `CONTRIBUTING.md` | Contribution guidelines |
| `docs/STYLE_GUIDE.md` | This document - style standards |
| `docs/UX_IMPROVEMENTS.md` | UX analysis and recommendations |

### Git Commit Messages

**Format:**
```
type: subject

body (optional)
```

**Types:**
- `feat`: New feature or resource
- `fix`: Bug fix or correction
- `docs`: Documentation changes
- `style`: Formatting, style changes
- `refactor`: Code restructuring (no functional change)
- `chore`: Maintenance tasks

**Examples:**
```
feat: add miaoda-doc-parse skill

docs: update style guide with badge specifications

fix: correct broken link in tutorials section

style: format tables for better readability
```

---

## 📊 Quality Metrics

**Maintain these standards:**

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **Link Health** | 100% working | Test all links before merge |
| **Description Length** | 10-20 words | Count words in descriptions |
| **Readability** | Grade 8-10 | Use readability tools |
| **Load Time** | < 2 seconds | Minimize images, use CDN |
| **Mobile Friendly** | 100% responsive | Test on mobile devices |

---

## 🎓 Learning Resources

**Recommended reading:**

- [GitHub Markdown Guide](https://guides.github.com/features/mastering-markdown/)
- [Shields.io Documentation](https://shields.io/)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Awesome List Guidelines](https://github.com/sindresorhus/awesome/blob/main/awesome.md)

---

<div align="center">

**This style guide is a living document. Suggestions welcome!** 🦞

[Back to README](../README_v2.md) · [Contributing Guide](../CONTRIBUTING.md)

</div>
