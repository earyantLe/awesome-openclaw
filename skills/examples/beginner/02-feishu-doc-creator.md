# Beginner Example 2: Feishu Doc Creator 📄

> **Difficulty**: ⭐☆☆☆☆ (Beginner)  
> **Time to Complete**: 15 minutes  
> **Prerequisites**: Feishu account, basic Markdown knowledge

---

## Overview

This example shows how to create a skill for generating Feishu cloud documents from Markdown templates. Perfect for meeting notes, project docs, and knowledge base articles.

**本示例展示如何创建从 Markdown 模板生成飞书云文档的技能。适用于会议纪要、项目文档和知识库文章。**

---

## Skill Structure

```
feishu-doc-creator/
├── SKILL.md
├── scripts/
│   └── create_doc.py
└── templates/
    ├── meeting-notes.md
    └── project-plan.md
```

---

## Step 1: Create SKILL.md

```yaml
---
name: feishu-doc-creator
description: |
  Create Feishu cloud documents from Markdown templates. Supports rich formatting,
  tables, callouts, and media embedding.
  从 Markdown 模板创建飞书云文档。支持丰富格式、表格、高亮块和媒体嵌入。
  
  **When to use**: User needs to create meeting notes, project docs, knowledge base articles,
  or any structured document in Feishu.
  **触发词**: "创建文档", "create doc", "会议纪要", "meeting notes", "project plan"
---

# Feishu Document Creator

## When to Use

✅ **USE this skill when:**
- Creating meeting notes from template
- Generating project documentation
- Writing knowledge base articles
- Creating structured reports

❌ **DON'T use when:**
- Editing existing docs (use feishu-update-doc)
- Creating spreadsheets (use feishu-sheet)
- Creating Bitable databases (use feishu-bitable)

## Templates

### Meeting Notes Template

```markdown
# Meeting Notes: {title}

## Basic Info
- **Date**: {date}
- **Attendees**: {attendees}
- **Location**: {location}

## Agenda
1. {agenda_item_1}
2. {agenda_item_2}

## Discussion Points

### Topic 1
{content}

### Topic 2
{content}

## Action Items
- [ ] {action_1} - @{assignee}
- [ ] {action_2} - @{assignee}

## Next Meeting
- **Date**: {next_date}
- **Agenda**: {next_agenda}
```

### Project Plan Template

```markdown
# Project Plan: {project_name}

## Overview
<callout emoji="🎯" background-color="light-blue">
Project objective and key goals
</callout>

## Timeline
| Phase | Start Date | End Date | Owner |
|-------|------------|----------|-------|
| Planning | {date} | {date} | {name} |
| Execution | {date} | {date} | {name} |
| Review | {date} | {date} | {name} |

## Key Deliverables
- [ ] Deliverable 1
- [ ] Deliverable 2

## Risks
<callout emoji="⚠️" background-color="light-yellow">
- Risk 1: {description}
- Risk 2: {description}
</callout>

## Resources
- [Project Folder](folder_url)
- [Related Docs](doc_url)
```

## Commands

### Create Document

```json
{
  "action": "create",
  "title": "Meeting Notes: 2026-03-18",
  "markdown": "# Meeting Notes\n\nContent here...",
  "folder_token": "fldcnXXXXXXXXXXXX"
}
```

### Create in Knowledge Base

```json
{
  "action": "create",
  "title": "Project Documentation",
  "wiki_space": "my_library",
  "markdown": "# Project Docs\n\nContent..."
}
```

## Feishu Markdown Extensions

### Callouts (High Priority)

```html
<callout emoji="💡" background-color="light-blue">
Important information here
</callout>
```

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
```

### Task Lists

```markdown
- [ ] Todo item
- [x] Completed item
```

## Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Permission denied | No write access | Check folder permissions |
| Invalid markdown | Syntax error | Validate markdown format |
| Title too long | >255 characters | Shorten title |
```

---

## Step 2: Create Helper Script

Create `scripts/create_doc.py`:

```python
#!/usr/bin/env python3
"""
Feishu Document Creator
Usage: python create_doc.py --template meeting-notes --output doc.md
"""

import argparse
import json
from datetime import datetime
from pathlib import Path

# Template definitions
TEMPLATES = {
    "meeting-notes": """# Meeting Notes: {title}

## Basic Info
- **Date**: {date}
- **Attendees**: {attendees}
- **Location**: {location}

## Agenda
{agenda}

## Discussion Points

{content}

## Action Items
{actions}

## Next Meeting
- **Date**: {next_date}
- **Agenda**: {next_agenda}
""",
    
    "project-plan": """# Project Plan: {project_name}

## Overview
<callout emoji="🎯" background-color="light-blue">
{objective}
</callout>

## Timeline
| Phase | Start Date | End Date | Owner |
|-------|------------|----------|-------|
{timeline}

## Key Deliverables
{deliverables}

## Risks
<callout emoji="⚠️" background-color="light-yellow">
{risks}
</callout>
"""
}

def load_template(template_name):
    """Load template by name"""
    if template_name not in TEMPLATES:
        raise ValueError(f"Unknown template: {template_name}")
    return TEMPLATES[template_name]

def render_template(template_name, **kwargs):
    """Render template with provided values"""
    template = load_template(template_name)
    return template.format(**kwargs)

def save_document(content, output_path):
    """Save document to file"""
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ Document saved to: {output_path}")

def main():
    parser = argparse.ArgumentParser(description='Create Feishu documents from templates')
    parser.add_argument('--template', required=True, 
                       choices=['meeting-notes', 'project-plan'],
                       help='Template to use')
    parser.add_argument('--output', required=True,
                       help='Output file path')
    parser.add_argument('--data', type=json.loads,
                       help='Template data as JSON')
    
    args = parser.parse_args()
    
    # Default values
    defaults = {
        'title': 'Untitled Meeting',
        'date': datetime.now().strftime('%Y-%m-%d'),
        'attendees': 'TBD',
        'location': 'TBD',
        'agenda': '1. Agenda item 1\n2. Agenda item 2',
        'content': 'Discussion content...',
        'actions': '- [ ] Action item 1\n- [ ] Action item 2',
        'next_date': 'TBD',
        'next_agenda': 'TBD',
        'project_name': 'New Project',
        'objective': 'Project objective...',
        'timeline': '| Planning | 2026-01-01 | 2026-01-31 | John |',
        'deliverables': '- [ ] Deliverable 1\n- [ ] Deliverable 2',
        'risks': 'Risk 1: Description'
    }
    
    # Merge with provided data
    data = {**defaults, **(args.data or {})}
    
    # Render template
    content = render_template(args.template, **data)
    
    # Save document
    save_document(content, args.output)

if __name__ == '__main__':
    main()
```

Make it executable:

```bash
chmod +x scripts/create_doc.py
```

---

## Step 3: Test the Skill

### Test 1: Create Meeting Notes

```bash
python scripts/create_doc.py \
  --template meeting-notes \
  --output output/meeting-notes.md \
  --data '{
    "title": "Weekly Team Sync",
    "attendees": "Alice, Bob, Charlie",
    "location": "Conference Room A"
  }'
```

### Test 2: Create Project Plan

```bash
python scripts/create_doc.py \
  --template project-plan \
  --output output/project-plan.md \
  --data '{
    "project_name": "Website Redesign",
    "objective": "Redesign company website with modern UI/UX"
  }'
```

---

## Step 4: Integration with Feishu API

To actually create the document in Feishu:

```python
import requests

def create_feishu_doc(title, markdown, folder_token=None):
    """Create document in Feishu"""
    url = "https://open.feishu.cn/open-apis/docx/v1/documents"
    headers = {
        "Authorization": "Bearer YOUR_ACCESS_TOKEN",
        "Content-Type": "application/json"
    }
    
    data = {
        "title": title,
        "content": markdown
    }
    
    if folder_token:
        data["folder_token"] = folder_token
    
    response = requests.post(url, json=data, headers=headers)
    return response.json()

# Usage
result = create_feishu_doc(
    title="Meeting Notes: 2026-03-18",
    markdown="# Meeting Notes\n\nContent...",
    folder_token="fldcnXXXXXXXXXXXX"
)

print(f"Document created: {result['data']['document_id']}")
```

---

## Usage Examples

### Example 1: Quick Meeting Notes

**User**: "Create meeting notes for today's team sync"

**Agent**:
```bash
python scripts/create_doc.py \
  --template meeting-notes \
  --output meeting-notes.md \
  --data '{
    "title": "Team Sync 2026-03-18",
    "date": "2026-03-18",
    "attendees": "Team members"
  }'
```

### Example 2: Project Kickoff

**User**: "Create a project plan for the new mobile app"

**Agent**:
```bash
python scripts/create_doc.py \
  --template project-plan \
  --output mobile-app-plan.md \
  --data '{
    "project_name": "Mobile App Development",
    "objective": "Build iOS and Android app",
    "timeline": "| Design | 2026-03-01 | 2026-03-31 | Alice |\n| Dev | 2026-04-01 | 2026-06-30 | Bob |"
  }'
```

---

## Best Practices

1. **Use templates** - Standardize document structure
2. **Include metadata** - Date, attendees, owners
3. **Add callouts** - Highlight important information
4. **Use tables** - For timelines and comparisons
5. **Task lists** - Track action items

---

## Common Mistakes

| Mistake | Correct Approach |
|---------|-----------------|
| No folder_token specified | Always specify where to create doc |
| Invalid markdown syntax | Validate before creating |
| Missing required fields | Use defaults for optional fields |
| Too long titles | Keep titles under 255 characters |

---

## Next Steps

1. ✅ Try the **Intermediate** example (Data Processor)
2. ✅ Add more templates (reports, proposals, etc.)
3. ✅ Integrate with Feishu API for auto-upload
4. ✅ Create custom templates for your team

---

## Resources

- [Feishu Doc API](https://open.feishu.cn/document/server-docs/docs/drive-v1/document/create)
- [Lark-flavored Markdown](https://open.feishu.cn/document/server-docs/docs/drive-v1/document/markdown-spec)
- [OpenClaw Feishu Skills](../../feishu/)

---

**Last Updated**: 2026-03-18  
**Author**: OpenClaw Community 🦞
