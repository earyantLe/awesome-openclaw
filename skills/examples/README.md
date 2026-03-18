# 🦞 OpenClaw Skills Examples

> **Hands-on examples for learning OpenClaw skill development**
>
> **难度级别**: Beginner → Intermediate → Advanced  
> **示例数量**: 5+ complete examples  
> **最后更新**: 2026-03-18

---

## 📚 Table of Contents

1. [Beginner Examples (入门示例)](#beginner-examples-入门示例)
2. [Intermediate Examples (进阶示例)](#intermediate-examples-进阶示例)
3. [Advanced Examples (高级示例)](#advanced-examples-高级示例)
4. [Learning Path](#learning-path)
5. [Getting Started](#getting-started)

---

## Beginner Examples (入门示例)

Perfect for those new to OpenClaw or programming in general.

### 01. Weather Checker 🌤️

**难度**: ⭐☆☆☆☆ | **时间**: 10 分钟 | **前置**: 无

Learn to create a simple skill that checks weather using wttr.in API.

**你将学到**:
- ✅ Basic skill structure
- ✅ Shell script integration
- ✅ API calls without API keys
- ✅ Error handling basics

**文件**: [beginner/01-weather-checker.md](./beginner/01-weather-checker.md)

**示例代码**:
```bash
# Check weather
curl "wttr.in/Beijing?format=3"

# 3-day forecast
curl "wttr.in/Shanghai"
```

---

### 02. Feishu Doc Creator 📄

**难度**: ⭐☆☆☆☆ | **时间**: 15 分钟 | **前置**: Markdown 基础

Create Feishu cloud documents from Markdown templates.

**你将学到**:
- ✅ Template-based document generation
- ✅ Feishu Markdown extensions
- ✅ Python script basics
- ✅ JSON data handling

**文件**: [beginner/02-feishu-doc-creator.md](./beginner/02-feishu-doc-creator.md)

**示例代码**:
```python
# Create from template
python create_doc.py --template meeting-notes --output doc.md
```

---

## Intermediate Examples (进阶示例)

For developers comfortable with Python and basic APIs.

### 01. Image Processor 🖼️

**难度**: ⭐⭐⭐☆☆ | **时间**: 30 分钟 | **前置**: Python 基础，PIL

Batch image processing: resize, rotate, convert formats, watermark.

**你将学到**:
- ✅ PIL/Pillow library
- ✅ Batch processing
- ✅ Multi-threading
- ✅ Format conversion

**文件**: [intermediate/01-image-processor.md](./intermediate/01-image-processor.md)

**示例代码**:
```bash
# Batch resize
python batch_resize.py --input ./photos/ --output ./resized/ --width 1920

# Convert format
python process_image.py --input image.png --output image.jpg --format jpg
```

---

### 02. Data Processor 📊

**难度**: ⭐⭐⭐☆☆ | **时间**: 40 分钟 | **前置**: Python, CSV/JSON

Data format conversion, filtering, aggregation, and export.

**你将学到**:
- ✅ Pandas library
- ✅ CSV/JSON/Excel handling
- ✅ Data filtering
- ✅ Aggregation operations

**文件**: [intermediate/02-data-processor.md](./intermediate/02-data-processor.md)

**示例代码**:
```bash
# CSV to JSON
python convert_format.py --input data.csv --output data.json --from csv --to json

# Filter data
python filter_data.py --input data.csv --output filtered.csv --where "age>25"
```

---

## Advanced Examples (高级示例)

For experienced developers working with complex integrations.

### 01. Feishu Bitable Automation 🤖

**难度**: ⭐⭐⭐⭐☆ | **时间**: 60 分钟 | **前置**: REST APIs, OAuth 2.0

Complete Bitable automation with batch CRUD, webhooks, and data sync.

**你将学到**:
- ✅ Feishu Open Platform API
- ✅ OAuth 2.0 authentication
- ✅ Batch operations (500+ records)
- ✅ Webhook integration
- ✅ Rate limiting & retry logic

**文件**: [advanced/01-feishu-bitable-automation.md](./advanced/01-feishu-bitable-automation.md)

**示例代码**:
```python
# Initialize client
client = BitableClient(app_token, access_token)

# Batch import
result = client.batch_import(table_id, records, batch_size=500)
```

---

### 02. Multi-Step Workflow Automation ⚡

**难度**: ⭐⭐⭐⭐⭐ | **时间**: 90 分钟 | **前置**: Async programming, System design

Orchestrate multiple skills in a complex workflow: search → process → analyze → report → distribute.

**你将学到**:
- ✅ Workflow orchestration
- ✅ Async/await patterns
- ✅ Multi-skill integration
- ✅ Error handling at scale
- ✅ Progress tracking

**文件**: [advanced/02-multi-step-workflow.md](./advanced/02-multi-step-workflow.md)

**示例代码**:
```python
# Run complete workflow
workflow = MarketResearchWorkflow(topic, output_dir)
await workflow.run()
```

---

## Learning Path

### For Complete Beginners

1. ✅ Start with **Weather Checker** (learn basic structure)
2. ✅ Move to **Feishu Doc Creator** (learn templates)
3. ✅ Try **Image Processor** (learn libraries)
4. ✅ Explore **Data Processor** (learn data handling)
5. ✅ Attempt **Bitable Automation** (learn APIs)
6. ✅ Master **Multi-Step Workflow** (learn orchestration)

### For Experienced Developers

1. ✅ Skim beginner examples (30 min)
2. ✅ Study intermediate examples (1-2 hours)
3. ✅ Deep dive into advanced examples (3-4 hours)
4. ✅ Create your own skill (2-4 hours)

---

## Getting Started

### Prerequisites

- **Python 3.8+** installed
- **OpenClaw** installed (`npm install -g openclaw`)
- **Git** for version control
- **Text editor** (VS Code, Cursor, etc.)

### Setup

```bash
# Clone the repository
git clone https://github.com/your-org/awesome-openclaw.git
cd awesome-openclaw/skills/examples

# Install Python dependencies
pip install pillow pandas requests python-dotenv

# Verify installation
python --version
```

### Running Examples

Each example includes:
- ✅ Complete source code
- ✅ Step-by-step instructions
- ✅ Test cases
- ✅ Common mistakes to avoid
- ✅ Best practices

**To run an example**:

1. Read the example markdown file
2. Follow the setup instructions
3. Copy code to your workspace
4. Run the provided commands
5. Modify and experiment!

---

## Code Structure

### Beginner Examples

```
beginner/
├── 01-weather-checker/
│   ├── SKILL.md
│   └── scripts/
│       └── check_weather.sh
└── 02-feishu-doc-creator/
    ├── SKILL.md
    ├── scripts/
    │   └── create_doc.py
    └── templates/
        └── meeting-notes.md
```

### Intermediate Examples

```
intermediate/
├── 01-image-processor/
│   ├── SKILL.md
│   ├── scripts/
│   │   ├── process_image.py
│   │   └── batch_resize.py
│   └── references/
│       └── supported-formats.md
└── 02-data-processor/
    ├── SKILL.md
    ├── scripts/
    │   ├── convert_format.py
    │   └── filter_data.py
    └── examples/
        └── sample.csv
```

### Advanced Examples

```
advanced/
├── 01-feishu-bitable-automation/
│   ├── SKILL.md
│   ├── scripts/
│   │   ├── bitable_client.py
│   │   ├── batch_import.py
│   │   └── webhook_handler.py
│   └── tests/
│       └── test_bitable.py
└── 02-multi-step-workflow/
    ├── SKILL.md
    └── scripts/
        └── market_research_workflow.py
```

---

## Best Practices

### Code Quality

1. **Use type hints** - Makes code more readable
2. **Add docstrings** - Document functions and classes
3. **Handle errors** - Always catch and log errors
4. **Write tests** - Test critical functions
5. **Comment wisely** - Explain why, not what

### Skill Development

1. **Start simple** - Don't over-engineer initially
2. **Iterate** - Improve based on real usage
3. **Document** - Write clear SKILL.md files
4. **Test thoroughly** - Test edge cases
5. **Share** - Contribute to community

### Security

1. **Never commit secrets** - Use environment variables
2. **Validate inputs** - Check all user inputs
3. **Handle errors** - Don't expose internal errors
4. **Rate limit** - Respect API limits
5. **Audit dependencies** - Keep libraries updated

---

## Troubleshooting

### Common Issues

**Issue**: Python module not found  
**Solution**: `pip install -r requirements.txt`

**Issue**: Permission denied  
**Solution**: `chmod +x scripts/*.py`

**Issue**: API authentication failed  
**Solution**: Check environment variables

**Issue**: Skill doesn't trigger  
**Solution**: Review SKILL.md description

### Getting Help

- **Documentation**: [OpenClaw Docs](https://openclaw.ai/docs)
- **GitHub Issues**: [Report bugs](https://github.com/openclaw/openclaw/issues)
- **Community**: [Discord server](https://discord.gg/openclaw)
- **Examples**: This directory!

---

## Next Steps

After completing these examples:

1. ✅ **Create your own skill** - Follow [SKILL_DEVELOPMENT_GUIDE.md](../SKILL_DEVELOPMENT_GUIDE.md)
2. ✅ **Contribute** - Submit your skill to the community
3. ✅ **Learn more** - Explore [COMPLETE_SKILLS_LIST.md](../COMPLETE_SKILLS_LIST.md)
4. ✅ **Teach others** - Share your knowledge

---

## Resources

### Documentation

- [OpenClaw Official Docs](https://openclaw.ai)
- [Skill Development Guide](../SKILL_DEVELOPMENT_GUIDE.md)
- [Complete Skills List](../COMPLETE_SKILLS_LIST.md)

### Libraries

- [Pillow (Image Processing)](https://pillow.readthedocs.io/)
- [Pandas (Data Processing)](https://pandas.pydata.org/)
- [Requests (HTTP)](https://requests.readthedocs.io/)

### APIs

- [Feishu Open Platform](https://open.feishu.cn/)
- [wttr.in Weather API](https://wttr.in/:help)
- [miaoda-studio-cli](https://miaoda.feishu.cn/)

---

## Contributing

Want to add more examples? We'd love your contribution!

1. Fork the repository
2. Create your example
3. Write clear instructions
4. Test thoroughly
5. Submit a pull request

See [CONTRIBUTING.md](../CONTRIBUTING.md) for details.

---

**Last Updated**: 2026-03-18  
**Maintained by**: OpenClaw Community 🦞  
**License**: MIT
