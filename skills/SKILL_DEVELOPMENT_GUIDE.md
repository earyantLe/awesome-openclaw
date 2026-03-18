# 🦞 OpenClaw Skill Development Guide

> **Complete guide to creating, testing, and publishing OpenClaw skills**
>
> **适用对象**: Skill developers, contributors, and advanced users
> **最后更新**: 2026-03-18

---

## 📚 Table of Contents

1. [What are Skills?](#1-what-are-skills)
2. [Skill Structure](#2-skill-structure)
3. [Development Environment](#3-development-environment)
4. [Step-by-Step Creation](#4-step-by-step-creation)
5. [Best Practices](#5-best-practices)
6. [Testing & Debugging](#6-testing--debugging)
7. [Publishing to Community](#7-publishing-to-community)
8. [Naming Conventions](#8-naming-conventions)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. What are Skills?

### 1.1 Definition

**Skills** are modular, self-contained packages that extend OpenClaw's capabilities by providing specialized knowledge, workflows, and tools.

**技能**是模块化的独立包，通过提供专业知识、工作流和工具来扩展 OpenClaw 的能力。

### 1.2 What Skills Provide

1. **Specialized Workflows** - Multi-step procedures for specific domains
   - 专业工作流 - 特定领域的多步骤流程

2. **Tool Integrations** - Instructions for working with specific file formats or APIs
   - 工具集成 - 特定文件格式或 API 的操作指南

3. **Domain Expertise** - Company-specific knowledge, schemas, business logic
   - 领域专业知识 - 公司特定的知识、架构、业务逻辑

4. **Bundled Resources** - Scripts, references, and assets for complex tasks
   - 捆绑资源 - 复杂任务的脚本、参考和资产

### 1.3 When to Create a Skill

Create a skill when:

- ✅ The same code is being rewritten repeatedly
- ✅ Deterministic reliability is needed
- ✅ Domain-specific knowledge should be preserved
- ✅ Complex workflows need to be reusable
- ✅ Team collaboration requires standardized processes

---

## 2. Skill Structure

### 2.1 Directory Layout

```
skill-name/
├── SKILL.md                    # REQUIRED: Skill metadata and instructions
├── scripts/                    # OPTIONAL: Executable code (Python/Bash/etc.)
│   ├── example.py
│   └── helper.sh
├── references/                 # OPTIONAL: Documentation for context loading
│   ├── api-docs.md
│   └── schema.md
└── assets/                     # OPTIONAL: Files used in output
    ├── logo.png
    └── template.docx
```

### 2.2 SKILL.md Structure

Every SKILL.md consists of two parts:

#### YAML Frontmatter (Required)

```yaml
---
name: skill-name
description: "Clear description of what the skill does and when to use it"
homepage: https://example.com (optional)
metadata: (optional)
  {
    "openclaw": {
      "emoji": "🎯",
      "requires": { "bins": ["curl"] }
    }
  }
---
```

**Required fields**:
- `name`: Skill name (lowercase, hyphens only)
- `description`: Comprehensive description including triggers

#### Markdown Body (Required)

The body contains:
- When to use the skill
- Usage examples
- Command syntax
- Best practices
- Troubleshooting tips

### 2.3 Bundled Resources

#### Scripts (`scripts/`)

**When to include**:
- When the same code is being rewritten repeatedly
- When deterministic reliability is needed

**Example**:
```python
# scripts/rotate_pdf.py
import pypdf
import sys

def rotate_pdf(input_path, output_path, degrees):
    reader = pypdf.PdfReader(input_path)
    writer = pypdf.PdfWriter()
    
    for page in reader.pages:
        page.rotate(degrees)
        writer.add_page(page)
    
    with open(output_path, "wb") as f:
        writer.write(f)

if __name__ == "__main__":
    rotate_pdf(sys.argv[1], sys.argv[2], int(sys.argv[3]))
```

#### References (`references/`)

**When to include**:
- For documentation that Codex should reference while working
- Database schemas, API documentation, domain knowledge

**Example**:
```markdown
# references/schema.md

## Database Schema

### Users Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | User name |
| email | TEXT | Unique email |
```

#### Assets (`assets/`)

**When to include**:
- When the skill needs files that will be used in the final output
- Templates, images, icons, boilerplate code

---

## 3. Development Environment

### 3.1 Prerequisites

- **OpenClaw installed**: `npm install -g openclaw`
- **Node.js**: v18 or higher
- **Git**: For version control
- **Text Editor**: VS Code, Cursor, or any editor

### 3.2 Setup

```bash
# Clone the skills repository
git clone https://github.com/your-org/openclaw-skills.git
cd openclaw-skills

# Create your skill directory
mkdir -p skills/my-new-skill

# Initialize with template
python scripts/init_skill.py my-new-skill --path skills --resources scripts,references
```

### 3.3 Tools

- **Skill Validator**: `scripts/validate_skill.py`
- **Skill Packager**: `scripts/package_skill.py`
- **Test Runner**: Custom test scripts per skill

---

## 4. Step-by-Step Creation

### Step 1: Understand the Skill

**Concrete examples first**:

Ask yourself:
- What functionality should this skill support?
- What would a user say that should trigger this skill?
- What are 3-5 concrete use cases?

**Example for `pdf-editor` skill**:
- "Rotate this PDF 90 degrees"
- "Merge these two PDFs"
- "Extract pages 1-5 from this document"

### Step 2: Plan Reusable Resources

Analyze each example:

1. **What code is repeated?** → Create scripts
2. **What knowledge is needed?** → Create references
3. **What templates are used?** → Create assets

**Example analysis**:

| Use Case | Repeated Code | Knowledge Needed | Assets |
|----------|--------------|------------------|--------|
| Rotate PDF | pypdf rotation logic | PDF structure | - |
| Merge PDF | pypdf merge logic | - | - |
| Extract pages | pypdf page extraction | - | - |

**Result**: Create `scripts/pdf_operations.py` with all PDF ops

### Step 3: Initialize the Skill

```bash
# Basic initialization
scripts/init_skill.py pdf-editor --path skills/public

# With resources
scripts/init_skill.py pdf-editor --path skills/public --resources scripts,references

# With example files
scripts/init_skill.py pdf-editor --path skills/public --resources scripts --examples
```

This creates:
```
pdf-editor/
├── SKILL.md
└── scripts/
    └── example.py (if --examples)
```

### Step 4: Edit the Skill

#### Write the Frontmatter

```yaml
---
name: pdf-editor
description: |
  PDF editing operations including rotation, merging, splitting, and text extraction.
  Use when: user needs to manipulate PDF files for: (1) Rotating pages, (2) Merging documents,
  (3) Extracting pages, (4) Text extraction, or (5) Adding watermarks.
---
```

#### Write the Body

```markdown
# PDF Editor

## When to Use

✅ **USE this skill when:**
- "Rotate this PDF"
- "Merge these PDFs"
- "Extract pages from this document"

❌ **DON'T use when:**
- Editing PDF text content (use PDF editor software)
- OCR scanning (use OCR tools)

## Commands

### Rotate PDF

```bash
python scripts/rotate_pdf.py input.pdf output.pdf 90
```

### Merge PDFs

```bash
python scripts/merge_pdfs.py output.pdf input1.pdf input2.pdf
```

## Examples

### Example 1: Rotate PDF

User: "Rotate this PDF 90 degrees clockwise"

```json
{
  "action": "rotate",
  "input": "document.pdf",
  "output": "rotated.pdf",
  "degrees": 90
}
```

## Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| File not found | Wrong path | Check file path |
| Permission denied | No write access | Check permissions |
```

### Step 5: Package the Skill

```bash
# Validate and package
scripts/package_skill.py skills/public/pdf-editor

# Output: pdf-editor.skill (zip file with .skill extension)
```

The packager will:
1. ✅ Validate YAML frontmatter
2. ✅ Check skill naming conventions
3. ✅ Verify file organization
4. ✅ Create distributable `.skill` file

### Step 6: Iterate

1. Use the skill on real tasks
2. Notice struggles or inefficiencies
3. Update SKILL.md or resources
4. Test again

---

## 5. Best Practices

### 5.1 Concise is Key

**The context window is a public good**. Only add context Codex doesn't already have.

❌ **Bad** (verbose):
```markdown
PDF is a file format developed by Adobe in 1993. It stands for Portable Document Format
and is used to present documents in a manner independent of application software...
```

✅ **Good** (concise):
```markdown
## Rotate PDF

```bash
python scripts/rotate_pdf.py input.pdf output.pdf 90
```
```

### 5.2 Set Appropriate Degrees of Freedom

**High freedom** (text instructions):
- Multiple approaches are valid
- Decisions depend on context

**Medium freedom** (pseudocode):
- Preferred pattern exists
- Some variation acceptable

**Low freedom** (specific scripts):
- Operations are fragile
- Consistency is critical

### 5.3 Progressive Disclosure

Keep SKILL.md under 500 lines. Move details to references:

```markdown
# Advanced Features

- **Form filling**: See [FORMS.md](references/FORMS.md)
- **API reference**: See [REFERENCE.md](references/REFERENCE.md)
- **Examples**: See [EXAMPLES.md](references/EXAMPLES.md)
```

### 5.4 What NOT to Include

❌ Don't create:
- README.md
- INSTALLATION_GUIDE.md
- QUICK_REFERENCE.md
- CHANGELOG.md

✅ Only include:
- SKILL.md (required)
- scripts/ (optional)
- references/ (optional)
- assets/ (optional)

---

## 6. Testing & Debugging

### 6.1 Manual Testing

Create test cases:

```markdown
## Test Cases

### Test 1: Basic Rotation
Input: test.pdf (1 page)
Command: python scripts/rotate_pdf.py test.pdf output.pdf 90
Expected: output.pdf rotated 90 degrees

### Test 2: Merge Multiple PDFs
Input: a.pdf, b.pdf, c.pdf
Command: python scripts/merge_pdfs.py merged.pdf a.pdf b.pdf c.pdf
Expected: merged.pdf with 3 pages
```

### 6.2 Automated Testing

Create test script:

```python
# tests/test_pdf_operations.py
import unittest
import os
from scripts.pdf_operations import rotate_pdf, merge_pdfs

class TestPDFOperations(unittest.TestCase):
    def test_rotate(self):
        rotate_pdf("test.pdf", "output.pdf", 90)
        self.assertTrue(os.path.exists("output.pdf"))
    
    def test_merge(self):
        merge_pdfs("merged.pdf", "a.pdf", "b.pdf")
        self.assertTrue(os.path.exists("merged.pdf"))

if __name__ == "__main__":
    unittest.main()
```

### 6.3 Debugging Tips

1. **Add logging**:
   ```python
   import logging
   logging.basicConfig(level=logging.DEBUG)
   logger = logging.getLogger(__name__)
   ```

2. **Validate inputs**:
   ```python
   assert os.path.exists(input_path), f"File not found: {input_path}"
   ```

3. **Handle errors gracefully**:
   ```python
   try:
       # operation
   except Exception as e:
       logger.error(f"Operation failed: {e}")
       raise
   ```

---

## 7. Publishing to Community

### 7.1 Preparation Checklist

- [ ] SKILL.md follows format guidelines
- [ ] All scripts tested and working
- [ ] No hardcoded secrets or API keys
- [ ] Documentation is bilingual (EN/CN if applicable)
- [ ] Examples are clear and runnable
- [ ] Skill packaged successfully

### 7.2 Submit to GitHub

1. **Fork the repository**:
   ```bash
   git fork https://github.com/openclaw/openclaw-skills
   ```

2. **Create feature branch**:
   ```bash
   git checkout -b feature/my-new-skill
   ```

3. **Add your skill**:
   ```bash
   cp -r my-skill skills/community/
   ```

4. **Commit and push**:
   ```bash
   git add skills/community/my-skill
   git commit -m "Add my-skill: description"
   git push origin feature/my-new-skill
   ```

5. **Create Pull Request**:
   - Go to GitHub
   - Click "New Pull Request"
   - Fill in description
   - Submit for review

### 7.3 PR Description Template

```markdown
## Skill Name
my-skill

## Description
Brief description of what the skill does.

## Use Cases
- Use case 1
- Use case 2

## Testing
- [ ] Tested on real examples
- [ ] All scripts working
- [ ] Documentation complete

## Category
- [ ] Built-in
- [x] Community
- [ ] Feishu
- [ ] Miaoda
```

---

## 8. Naming Conventions

### 8.1 Skill Names

**Format**: lowercase letters, digits, hyphens only

✅ **Good**:
- `pdf-editor`
- `web-search`
- `image-understanding`
- `speech-to-text`

❌ **Bad**:
- `PDF_Editor` (uppercase)
- `webSearch` (camelCase)
- `image understanding` (spaces)

### 8.2 File Names

**Scripts**: lowercase with underscores
- `rotate_pdf.py`
- `merge_documents.py`

**References**: lowercase with hyphens
- `api-docs.md`
- `schema-definition.md`

**Assets**: descriptive names
- `company-logo.png`
- `report-template.docx`

### 8.3 Folder Names

- `scripts/` (not `Script/` or `src/`)
- `references/` (not `docs/` or `ref/`)
- `assets/` (not `resources/` or `files/`)

---

## 9. Troubleshooting

### 9.1 Common Errors

#### Error: YAML frontmatter invalid

**Cause**: Missing required fields or syntax error

**Solution**:
```yaml
---
name: my-skill
description: "Clear description"
---
```

#### Error: Skill name invalid

**Cause**: Uppercase letters, spaces, or special characters

**Solution**: Use only lowercase letters, digits, and hyphens

#### Error: Packaging fails

**Cause**: Symlinks or missing files

**Solution**: Remove symlinks, ensure all referenced files exist

#### Error: Skill doesn't trigger

**Cause**: Description doesn't match user queries

**Solution**: Expand description with more trigger phrases

### 9.2 Getting Help

- **Documentation**: [OpenClaw Skills Docs](https://openclaw.ai/docs/skills)
- **GitHub Issues**: [Report bugs](https://github.com/openclaw/openclaw/issues)
- **Community**: [Discord server](https://discord.gg/openclaw)

---

## 📎 Appendix

### A. Skill Template

```yaml
---
name: skill-name
description: "What it does and when to use it"
---

# Skill Name

## When to Use

✅ **USE when:**
- Trigger phrase 1
- Trigger phrase 2

❌ **DON'T use when:**
- Exception 1
- Exception 2

## Commands

### Command 1

```bash
command --flag value
```

## Examples

### Example 1

User: "Example query"

```json
{
  "action": "example",
  "param": "value"
}
```

## Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Error message | Root cause | Fix |
```

### B. Quick Reference

| Task | Command |
|------|---------|
| Initialize skill | `scripts/init_skill.py name --path skills` |
| Package skill | `scripts/package_skill.py path/to/skill` |
| Validate skill | `scripts/validate_skill.py path/to/skill` |
| Test skill | Manual testing with real examples |

---

**Last Updated**: 2026-03-18  
**Maintained by**: OpenClaw Community 🦞
