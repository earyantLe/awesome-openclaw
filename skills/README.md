# 🦞 Awesome OpenClaw Skills

> **Your comprehensive resource for OpenClaw skill development**
>
> **技能总数**: 47+ | **示例**: 5 complete examples | **最后更新**: 2026-03-18

---

## 🎯 What's Here?

This repository contains everything you need to master OpenClaw skills:

1. **📚 Complete Skills Catalog** - 47+ skills documented with examples
2. **📖 Development Guide** - Step-by-step skill creation tutorial
3. **💡 Code Examples** - 5 working examples from beginner to advanced
4. **🔧 Templates** - Ready-to-use skill templates

---

## 📁 Directory Structure

```
skills/
├── README.md                          # You are here!
├── COMPLETE_SKILLS_LIST.md            # Full catalog of 47+ skills
├── SKILL_DEVELOPMENT_GUIDE.md         # How to create skills
├── examples/                          # Working code examples
│   ├── README.md                      # Examples overview
│   ├── beginner/                      # 2 beginner examples
│   │   ├── 01-weather-checker.md
│   │   └── 02-feishu-doc-creator.md
│   ├── intermediate/                  # 2 intermediate examples
│   │   ├── 01-image-processor.md
│   │   └── 02-data-processor.md
│   └── advanced/                      # 2 advanced examples
│       ├── 01-feishu-bitable-automation.md
│       └── 02-multi-step-workflow.md
├── built-in/                          # Built-in skills (21 skills)
├── community/                         # Community skills (5 skills)
├── feishu/                            # Feishu skills (15 skills)
└── miaoda/                            # Miaoda AI skills (6 skills)
```

---

## 🚀 Quick Start

### For Beginners

Just starting with OpenClaw? Follow this path:

1. **Read**: [COMPLETE_SKILLS_LIST.md](./COMPLETE_SKILLS_LIST.md) - See what's possible
2. **Try**: [examples/beginner/01-weather-checker.md](./examples/beginner/01-weather-checker.md) - Your first skill
3. **Learn**: [SKILL_DEVELOPMENT_GUIDE.md](./SKILL_DEVELOPMENT_GUIDE.md) - How skills work
4. **Create**: Build your own skill!

**Time**: 1-2 hours

---

### For Developers

Already know programming? Jump right in:

1. **Skim**: [COMPLETE_SKILLS_LIST.md](./COMPLETE_SKILLS_LIST.md) - Find relevant skills
2. **Study**: [examples/intermediate/](./examples/intermediate/) - Real code examples
3. **Build**: Create a skill for your use case
4. **Share**: Contribute to the community

**Time**: 2-4 hours

---

### For Experts

Want to push the limits?

1. **Review**: [examples/advanced/](./examples/advanced/) - Complex workflows
2. **Integrate**: Connect multiple skills
3. **Innovate**: Create advanced automation
4. **Lead**: Mentor others in the community

**Time**: 4-8 hours

---

## 📊 Skills Overview

### By Category

| Category | Count | Description |
|----------|-------|-------------|
| **Built-in** | 21 | Core OpenClaw skills (weather, healthcheck, etc.) |
| **Community** | 5 | Community-contributed skills |
| **Feishu** | 15 | Feishu/Lark integration (docs, calendar, bitable) |
| **Miaoda** | 6 | AI-powered skills (search, image, speech) |
| **Total** | **47** | Growing daily! |

### By Difficulty

| Difficulty | Count | Percentage | Recommended For |
|------------|-------|------------|-----------------|
| ⭐☆☆☆☆ Beginner | 18 | 38% | Everyone |
| ⭐⭐☆☆☆ Easy | 10 | 21% | New developers |
| ⭐⭐⭐☆☆ Intermediate | 14 | 30% | Experienced devs |
| ⭐⭐⭐⭐☆ Advanced | 4 | 9% | API experts |
| ⭐⭐⭐⭐⭐ Expert | 1 | 2% | System architects |

---

## 🎓 Learning Resources

### Documentation

- **[Complete Skills List](./COMPLETE_SKILLS_LIST.md)** - Full catalog with descriptions
- **[Development Guide](./SKILL_DEVELOPMENT_GUIDE.md)** - How to create skills
- **[Examples README](./examples/README.md)** - Code examples guide

### Code Examples

#### Beginner (入门)

1. **Weather Checker** 🌤️ - Check weather with wttr.in API
   - Skills: Shell scripting, API calls
   - Time: 10 minutes

2. **Feishu Doc Creator** 📄 - Generate documents from templates
   - Skills: Python, Markdown, templates
   - Time: 15 minutes

#### Intermediate (进阶)

1. **Image Processor** 🖼️ - Batch image operations
   - Skills: PIL, threading, batch processing
   - Time: 30 minutes

2. **Data Processor** 📊 - CSV/JSON conversion and filtering
   - Skills: Pandas, data manipulation
   - Time: 40 minutes

#### Advanced (高级)

1. **Feishu Bitable Automation** 🤖 - Complete API integration
   - Skills: REST APIs, OAuth, webhooks
   - Time: 60 minutes

2. **Multi-Step Workflow** ⚡ - Orchestrate multiple skills
   - Skills: Async, system design, error handling
   - Time: 90 minutes

---

## 🛠️ Tools & Libraries

### Required

- **OpenClaw** - Core framework (`npm install -g openclaw`)
- **Python 3.8+** - For skill scripts
- **Git** - Version control

### Python Libraries

```bash
# Image processing
pip install Pillow

# Data processing
pip install pandas openpyxl

# API calls
pip install requests python-dotenv

# All-in-one
pip install pillow pandas requests python-dotenv
```

### CLI Tools

- **miaoda-studio-cli** - Miaoda AI commands
- **curl** - HTTP requests
- **git** - Version control

---

## 📖 How to Use This Repository

### 1. Browse Skills

Start with [COMPLETE_SKILLS_LIST.md](./COMPLETE_SKILLS_LIST.md) to see all available skills.

**Looking for something specific?**

- Weather → Built-in → Weather
- Documents → Feishu → Create Doc
- Images → Miaoda → Image Understanding
- Data → Miaoda → Doc Parse
- Automation → Advanced Examples

---

### 2. Learn by Example

Go to [examples/](./examples/) directory and pick an example at your level.

**Each example includes**:
- ✅ Complete source code
- ✅ Step-by-step instructions
- ✅ Test cases
- ✅ Common mistakes
- ✅ Best practices

---

### 3. Create Your Skill

Follow the [SKILL_DEVELOPMENT_GUIDE.md](./SKILL_DEVELOPMENT_GUIDE.md):

1. **Understand** - What problem does it solve?
2. **Plan** - What resources are needed?
3. **Initialize** - `scripts/init_skill.py`
4. **Develop** - Write code and documentation
5. **Test** - Try it on real tasks
6. **Package** - `scripts/package_skill.py`
7. **Share** - Submit to community

---

### 4. Contribute

Found a bug? Want to add a skill?

1. **Fork** the repository
2. **Create** your changes
3. **Test** thoroughly
4. **Submit** a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

## 🌟 Featured Skills

### Most Popular

1. **Weather** 🌤️ - Simple, no API key needed
2. **Feishu Bitable** 📊 - Powerful database automation
3. **Web Search** 🔍 - AI-powered search
4. **Image Understanding** 👁️ - Computer vision
5. **Document Creation** 📄 - Automated docs

### Most Powerful

1. **Healthcheck** 🛡️ - Security auditing
2. **Bitable Automation** 🤖 - Enterprise workflows
3. **Multi-Step Workflow** ⚡ - Complex orchestration
4. **Coding Agent** 💻 - AI pair programming
5. **Voice Call** 📞 - Telephony integration

---

## 💡 Tips & Tricks

### For Learning

1. **Start simple** - Don't jump to advanced examples immediately
2. **Copy and modify** - Learn by changing existing code
3. **Read the docs** - SKILL.md files are goldmines
4. **Experiment** - Break things and fix them
5. **Ask questions** - Join the community Discord

### For Development

1. **Use templates** - Don't reinvent the wheel
2. **Test early** - Test as you develop
3. **Document well** - Future you will thank you
4. **Handle errors** - Things will go wrong
5. **Keep it simple** - Complexity is the enemy

### For Production

1. **Monitor usage** - Track what works
2. **Log everything** - Debugging is easier
3. **Rate limit** - Respect API limits
4. **Backup data** - Always have a backup plan
5. **Security first** - Never commit secrets

---

## 🔗 External Resources

### Official

- [OpenClaw Website](https://openclaw.ai)
- [OpenClaw Documentation](https://openclaw.ai/docs)
- [GitHub Repository](https://github.com/openclaw/openclaw)

### Community

- [Discord Server](https://discord.gg/openclaw)
- [Skills Showcase](https://github.com/topics/openclaw-skill)
- [Community Forum](https://community.openclaw.ai)

### APIs & Services

- [Feishu Open Platform](https://open.feishu.cn/)
- [Miaoda AI](https://miaoda.feishu.cn/)
- [wttr.in Weather](https://wttr.in/)

---

## 📝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

1. **Add skills** - Create new skills for the community
2. **Improve docs** - Fix typos, add examples, clarify instructions
3. **Report bugs** - Found an issue? Let us know!
4. **Help others** - Answer questions in Discord
5. **Share knowledge** - Write tutorials, blog posts

### Contribution Process

1. **Fork** the repository
2. **Create** a branch (`git checkout -b feature/my-skill`)
3. **Make** your changes
4. **Test** thoroughly
5. **Commit** (`git commit -m "Add my-skill"`)
6. **Push** (`git push origin feature/my-skill`)
7. **Pull Request** - Submit for review

### What We're Looking For

- ✅ Well-documented skills
- ✅ Working code examples
- ✅ Clear instructions
- ✅ Proper error handling
- ✅ Security best practices

---

## 📊 Statistics

**As of 2026-03-18**:

- **Total Skills**: 47
- **Code Examples**: 5 complete examples
- **Documentation Pages**: 10+
- **Contributors**: Growing community
- **Downloads**: Thousands of skill uses

---

## 🎯 Roadmap

### Q2 2026

- [ ] 10+ new community skills
- [ ] Video tutorials for beginners
- [ ] Skill testing framework
- [ ] Automated skill validation
- [ ] Skill marketplace

### Q3 2026

- [ ] Skill certification program
- [ ] Advanced workshop series
- [ ] Enterprise skill templates
- [ ] Multi-language support
- [ ] Skill analytics

---

## 📧 Contact

**Questions? Suggestions? Want to collaborate?**

- **Discord**: [Join our server](https://discord.gg/openclaw)
- **GitHub**: [Open an issue](https://github.com/openclaw/openclaw/issues)
- **Email**: community@openclaw.ai
- **Twitter**: [@OpenClaw](https://twitter.com/openclaw)

---

## 📜 License

This repository is licensed under the **MIT License**.

See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

Thanks to all contributors who have made this resource possible!

Special thanks to:
- OpenClaw core team
- Feishu/Miaoda team
- Community contributors
- Early adopters and testers

---

**Last Updated**: 2026-03-18  
**Maintained by**: OpenClaw Community 🦞  
**Version**: 1.0.0

---

<div align="center">

### 🦞 Happy Skill Building!

**Made with ❤️ by the OpenClaw Community**

[Complete Skills List](./COMPLETE_SKILLS_LIST.md) • [Development Guide](./SKILL_DEVELOPMENT_GUIDE.md) • [Examples](./examples/)

</div>
