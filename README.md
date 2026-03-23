# Awesome OpenClaw 🦞

> **A curated list of awesome OpenClaw resources, skills, extensions, and community projects.**

## 🌐 Language / 语言

- 🇺🇸 **English** (You are here)
- 🇨🇳 **[中文](README_CN.md)** - 中文版本

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/earyantLe/awesome-openclaw?style=flat)](https://github.com/earyantLe/awesome-openclaw)
[![Last Updated](https://img.shields.io/github/last-commit/earyantLe/awesome-openclaw?label=updated)](https://github.com/earyantLe/awesome-openclaw/commits/main)
[![Contributors](https://img.shields.io/github/contributors/earyantLe/awesome-openclaw)](https://github.com/earyantLe/awesome-openclaw/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/earyantLe/awesome-openclaw)](https://github.com/earyantLe/awesome-openclaw/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Link Check](https://github.com/earyantLe/awesome-openclaw/actions/workflows/link-checker.yml/badge.svg)](.github/workflows/link-checker.yml)
[![Contributors](https://img.shields.io/badge/contributors-1-blue)](CONTRIBUTORS.md)

---

## 🚀 Quick Start

**New to OpenClaw?** Start here:

1. **[What is OpenClaw?](#-what-is-openclaw)** - Learn the basics
2. **[Installation](#-installation)** - Get up and running in 5 minutes
3. **[Featured Resources](#-featured-resources)** - Hand-picked best resources
4. **[Build Your First Skill](examples/example-skill.md)** - Step-by-step tutorial

> 💡 **Tip**: Join our [Discord Community](https://discord.com/invite/openclaw) for real-time help and discussions!

---

## 📑 Quick Navigation

<details open>
<summary><b>📖 目录导航 (点击展开/收起)</b></summary>

### 🌟 Getting Started
- [What is OpenClaw?](#-what-is-openclaw)
- [Installation](#-installation)
- [Quick Start](#-quick-start)

### 📚 Resources
- [Official Resources](#-official-resources)
- [Featured Resources](#-featured-resources)
- [Skills](#-skills) · [Built-in](#built-in-skills) · [Community](#community-skills) · [Feishu](#feishulark-skills) · [Miaoda](#miaoda-skills)
- [Extensions & Plugins](#-extensions--plugins)
- [Tools & Utilities](#-tools--utilities)

### 🎓 Learning
- [Tutorials & Guides](#-tutorials--guides)
- [Community Projects](#-community-projects)
- [Books & Resources](#-books--resources)

### 🤝 Community
- [Contributors](CONTRIBUTORS.md) - Hall of Fame
- [Contributing](#-contributing) - How to help
- [FAQ](#-faq) - Common questions
- [License](#-license) - MIT License

</details>

---

## 🦞 What is OpenClaw?

[OpenClaw](https://github.com/openclaw/openclaw) is an open-source AI agent runtime that transforms your LLM into a **proactive, tool-using assistant** with memory, scheduling, and real-world integrations.

### Why OpenClaw?

| Feature | Description |
|---------|-------------|
| 🧠 **Memory-Equipped** | Persistent memory files for long-term context and continuity |
| ⏰ **Cron & Scheduling** | Built-in task scheduler for proactive work and reminders |
| 🛠️ **Tool Ecosystem** | Extensible tool/skill system with 50+ integrations |
| 💬 **Multi-Channel** | Discord, Telegram, WhatsApp, Feishu, Slack, Signal, and more |
| 🔌 **Plugin Architecture** | Easy to extend with custom integrations and skills |

---

## 🔧 Installation

Get OpenClaw running in under 5 minutes:

```bash
# 1. Install OpenClaw globally
npm install -g openclaw

# 2. Initialize your workspace
openclaw init my-agent
cd my-agent

# 3. Start the gateway
openclaw gateway start

# 4. Check status
openclaw status
```

**Next Steps**: Check out the [Getting Started Guide](https://docs.openclaw.ai/getting-started) for detailed setup instructions.

---

## ⭐ Featured Resources

> 🏆 **Hand-picked high-quality resources to get you started quickly**

### 🎓 Essential Reading

| Resource | Type | Why It's Great |
|----------|------|----------------|
| [Official Documentation](https://docs.openclaw.ai) | Docs | Comprehensive guides from basics to advanced |
| [OpenClaw Core](https://github.com/openclaw/openclaw) | GitHub | Main repository with source code and examples |
| [OpenClaw Skills](https://github.com/openclaw/skills) | GitHub | Official skill templates and examples |

### 🚀 Popular Projects

| Project | Description | Status |
|---------|-------------|--------|
| [Feishu Plugin](https://github.com/earyantLe/feishu-openclaw-plugin) | Full Feishu/Lark enterprise integration | ⚠️ Contact author |
| [OpenClaw for VS Code](https://marketplace.visualstudio.com/items?itemName=openclaw.openclaw) | Editor integration for skill development | ✅ Active |

### 🎨 Community Highlights

| Resource | Description | Status |
|----------|-------------|--------|
| [Discord Community](https://discord.com/invite/openclaw) | Active community with helpful members | ✅ Active |
| [ClawHub](https://clawhub.ai) | Community marketplace for skills and extensions | ✅ Active |

---

## 📚 Official Resources

| Resource | Description | Link |
|----------|-------------|------|
| **OpenClaw Core** | Main repository with core runtime and framework | [GitHub](https://github.com/openclaw/openclaw) |
| **Documentation** | Official docs - Getting started, configuration, skills guide | [docs.openclaw.ai](https://docs.openclaw.ai) |
| **Discord Community** | Join community - Get help, share ideas, connect | [Join Discord](https://discord.gg/openclaw) |
| **ClawHub** | Discover and share skills - Community marketplace | [clawhub.ai](https://clawhub.ai) |
| **OpenClaw Skills** | Official skill repository with templates | [GitHub](https://github.com/openclaw/skills) |

---

## 🎯 Skills

OpenClaw skills are pre-defined task templates that define how the agent handles specific situations.

### Built-in Skills

> These skills come pre-installed with OpenClaw.

| Skill | Description | Use Case |
|-------|-------------|----------|
| `weather` | Weather forecasts via wttr.in or Open-Meteo | When user asks about weather conditions |
| `healthcheck` | Security hardening and system health checks | Audit system security and configuration |
| `skill-creator` | Create and manage AgentSkills | Authoring custom skills and templates |

### Community Skills

> Contributed by the community for specific use cases.

| Skill | Author | Description |
|-------|--------|-------------|
| `github-assistant` | Community | GitHub repository management and CI automation |
| `docker-helper` | Community | Docker containerization guidance and best practices |
| `notion-integration` | Community | Notion API integration for note-taking |
| `google-calendar` | Community | Google Calendar syncing and scheduling |
| `slack-bot` | Community | Slack bot integration for team collaboration |

### Feishu/Lark Skills

> 📦 **Feishu OpenClaw Plugin** - Complete Feishu/Lark enterprise integration (Contact @earyantLe for access)

| Skill | Description | Category |
|-------|-------------|----------|
| `feishu-bitable` | 飞书多维表格管理 / Bitable database management | Data Management |
| `feishu-calendar` | 飞书日历与日程管理 / Calendar and event scheduling | Productivity |
| `feishu-im-read` | 飞书 IM 消息读取 / Read and search messages | Communication |
| `feishu-create-doc` | 创建飞书云文档 / Create cloud documents | Documentation |
| `feishu-update-doc` | 更新飞书云文档 / Update documents | Documentation |
| `feishu-fetch-doc` | 获取飞书云文档内容 / Fetch document content | Documentation |
| `feishu-search-doc-wiki` | 飞书文档与知识库搜索 / Search docs and wiki | Search |
| `feishu-search-user` | 飞书员工搜索 / Search employee directory | HR |
| `feishu-task-task` | 飞书任务管理 / Task management | Productivity |
| `feishu-task-tasklist` | 飞书任务清单管理 / Task list management | Productivity |
| `feishu-drive-file` | 飞书云空间文件管理 / Cloud file operations | Storage |
| `feishu-wiki-space` | 飞书知识空间管理 / Knowledge base management | Knowledge |
| `feishu-sheet` | 飞书电子表格 / Spreadsheet management | Data |

### Miaoda Skills

> 🤖 **Miaoda Skills** - Advanced AI-powered capabilities (Built into Miaoda Cloud Computer)

| Skill | Description | Power |
|-------|-------------|-------|
| `miaoda-web-search` | 网页搜索与摘要 / Web search with AI summaries | 🔥 Hot |
| `miaoda-web-fetch` | 网页内容抓取 / Extract web content | Essential |
| `miaoda-image-understanding` | 图片理解与分析 / Image analysis | AI Vision |
| `miaoda-text-gen-image` | 文字生成图片 / Text-to-image generation | Generative |
| `miaoda-speech-to-text` | 语音转文字 / Speech-to-text conversion | Accessibility |
| `miaoda-doc-parse` | 智能文档解析 / Document Parsing (PDF/Word/Excel) | Enterprise |

---

## 🔌 Extensions & Plugins

Extend OpenClaw's capabilities with custom integrations.

### Core Extensions

| Extension | Description | Author | Status |
|-----------|-------------|--------|--------|
| [Feishu OpenClaw Plugin](https://github.com/earyantLe/feishu-openclaw-plugin) | 飞书 (Lark) integration - IM/Calendar/Docs/Bitable | @earyantLe | ⚠️ Contact author |
| [OpenClaw VS Code Extension](https://marketplace.visualstudio.com/items?itemName=openclaw.openclaw) | Editor integration for skill development | OpenClaw Team | ✅ Active |
| OpenClaw Cloud | Self-hosted cloud deployment tools | OpenClaw Team | ❌ Deprecated |

### Popular Integrations

Common integrations that work well with OpenClaw:

- ✅ **Messaging**: Discord, Telegram, WhatsApp, Slack, Signal, Feishu, Line
- ✅ **Cloud Storage**: AWS S3, Google Cloud Storage, Azure Blob
- ✅ **Databases**: PostgreSQL, MySQL, MongoDB, Redis
- ✅ **API Integrations**: OpenAI, Anthropic, Google, Microsoft
- ✅ **DevOps**: GitHub, GitLab, Jenkins, Docker

### 🔥 New & Trending (2025-2026)

| Integration | Description | Category |
|-------------|-------------|----------|
| [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) | Universal AI integration protocol for tools/data | 🆕 Protocol |
| [Notion AI](https://developers.notion.com/) | Notion database and docs integration | Productivity |
| [Linear](https://linear.app/docs/api) | Issue tracking and project management | DevOps |
| [Stripe](https://stripe.com/docs/api) | Payment processing automation | Finance |
| [Zoom AI Companion](https://developers.zoom.us/) | Meeting transcription and summaries | Communication |
| [Slack AI](https://api.slack.com/) | AI-powered Slack bot integrations | Communication |
| [Cursor](https://cursor.sh/) | AI-first code editor with agent support | Development |
| [Windsurf](https://codeium.com/windsurf) | AI code editor with deep integration | Development |

---

## 🌟 Community Projects

> 🚀 Projects built with OpenClaw by the community.

| Project | Author | Description |
|---------|--------|-------------|
| [OpenClaw VS Code](https://marketplace.visualstudio.com/items?itemName=openclaw.openclaw) | OpenClaw Team | Editor extension for skill development |
| [OpenClaw Docker](https://github.com/openclaw/docker) | Community | Docker images for easy deployment |
| [Awesome OpenClaw](https://github.com/earyantLe/awesome-openclaw) | @earyantLe | Curated list of OpenClaw resources |
| _Add your project_ | _You?_ | _Describe it_ |

### 🔥 Trending AI Agent Projects (2025-2026)

| Project | Description | Stars |
|---------|-------------|-------|
| [Claude Code](https://github.com/anthropics/claude-code) | Anthropic's official CLI for AI-powered development | 🔥 Hot |
| [Cline](https://github.com/cline/cline) | Autonomous coding agent for VS Code | ⭐ Popular |
| [Continue](https://github.com/continuedev/continue) | Open-source AI code assistant | ⭐ Popular |
| [Aider](https://github.com/paul-gauthier/aider) | AI pair programming in terminal | 🆙 Trending |
| [Swe-agent](https://github.com/princeton-nlp/SWE-agent) | Autonomous software engineer agent | 📈 Rising |

### Use Cases

How people are using OpenClaw:

- ✅ **Personal Assistant**: Daily tasks, calendar management, reminders
- ✅ **Team Collaboration**: Slack/Discord bots for team productivity
- ✅ **Customer Support**: Automated responses and ticket management
- ✅ **DevOps Automation**: CI/CD pipelines, monitoring, alerts
- ✅ **Content Creation**: Blog posts, social media, documentation

---

## 📖 Tutorials & Guides

### Official Guides

| Title | Author | Description |
|-------|--------|-------------|
| [Getting Started](https://docs.openclaw.ai/getting-started) | Official | Quick start guide for beginners |
| [Configuration Guide](https://docs.openclaw.ai/config) | Official | Configure OpenClaw for your needs |
| [Skills Guide](https://docs.openclaw.ai/skills) | Official | Create and customize skills |
| [TOOLS.md Guide](https://docs.openclaw.ai/tools) | Official | Tool development and integration |

### Community Tutorials

| Title | Author | Description |
|-------|--------|-------------|
| [Example Skill Template](examples/example-skill.md) | Community | Step-by-step skill creation guide |
| _Add your tutorial_ | _You_ | _Share your knowledge_ |

### Video Tutorials

| Title | Creator | Platform |
|-------|--------|----------|
| _Add your video_ | _You_ | _YouTube/Bilibili_ |

---

## 🛠️ Tools & Utilities

| Tool | Description |
|------|-------------|
| `openclaw gateway` | Manage the Gateway daemon service (start/stop/restart) |
| `openclaw status` | Check system status and health |
| `openclaw help` | View available commands and options |
| `openclaw configure` | Configure OpenClaw settings |
| `openclaw skills` | List and manage skills |

### Related Tools

| Tool | Description |
|------|-------------|
| `cloudcursor` | AI-powered code editor with OpenClaw integration |
| `locallm` | Local LLM model runtime for offline usage |
| `ollama` | Ollama Models for local AI tasks |

### 🔥 New Tools (2025-2026)

| Tool | Description | Category |
|------|-------------|----------|
| [MCP CLI](https://github.com/modelcontextprotocol/servers) | Model Context Protocol command-line tools | Protocol |
| [Claude Code](https://github.com/anthropics/claude-code) | Anthropic's official CLI agent | Agent |
| [Claude Agent SDK](https://docs.anthropic.com/claude-code/) | Build custom AI agents | SDK |
| [uv](https://github.com/astral-sh/uv) | Fast Python package manager for AI projects | Development |
| [Ripgrep](https://github.com/BurntSushi/ripgrep) | Fast code search tool | Development |
| [jq](https://jqlang.github.io/jq/) | JSON processor for API data handling | Utility |

### 🆕 What's New (March 2026)

| Tool/Resource | Description | Why It Matters |
|---------------|-------------|----------------|
| [GitHub Copilot Workspace](https://github.com/features/copilot) | AI-powered development environment | Native GitHub integration |
| [Cursor Composer](https://cursor.sh/) | Multi-file AI code generation | Understands entire codebase |
| [LangChain v0.3](https://python.langchain.com/) | Updated agent framework | Better LLM orchestration |
| [AutoGen Studio](https://microsoft.github.io/autogen/) | Multi-agent workflow builder | Visual agent orchestration |
| [Continue Dev](https://continue.dev/) | Open-source AI dev environment | Self-hostable alternative |

---

## 📚 Books & Resources

### Reading List

| Resource | Type | Description |
|----------|------|-------------|
| [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165) | Paper | GPT-3 paper |
| [Anthropic Research](https://www.anthropic.com/research) | Research | Anthropic's latest research papers |
| _Add your resource_ | _You_ | _Share valuable resources_ |

### Blogs & Newsletters

| Blog | Author | Frequency |
|------|--------|-----------|
| _Add your blog_ | _You_ | _Your frequency_ |

---

## ❓ FAQ

### General Questions

**Q: What is OpenClaw?**  
A: OpenClaw is an open-source AI agent runtime that turns your LLM into a proactive, tool-using assistant with memory, scheduling, and real-world integrations.

**Q: Is OpenClaw free?**  
A: Yes! OpenClaw is open-source and free to use under the MIT license.

**Q: What platforms does OpenClaw support?**  
A: OpenClaw supports Linux, macOS, and Windows. It can integrate with Discord, Telegram, WhatsApp, Feishu, Slack, and more.

**Q: Do I need coding experience?**  
A: Basic coding knowledge helps, but OpenClaw is designed to be accessible. Start with the [Getting Started Guide](https://docs.openclaw.ai/getting-started).

### Technical Questions

**Q: How do I install OpenClaw?**  
A: Run `npm install -g openclaw`, then `openclaw init my-agent`. See [Installation](#-installation) for details.

**Q: Can I create custom skills?**  
A: Absolutely! Check out our [Skills Guide](https://docs.openclaw.ai/skills) and [Example Skill Template](examples/example-skill.md).

**Q: How do I contribute?**  
A: See our [Contributing Guide](CONTRIBUTING.md) for how to submit resources, fix bugs, or add features.

**Q: Where can I get help?**
A: Join our [Discord Community](https://discord.com/invite/openclaw) or open an [Issue on GitHub](https://github.com/earyantLe/awesome-openclaw/issues).

### 🔧 Troubleshooting

**Q: How do I install skills?**
A: Use `npx skills add <repo> --skill <name>` or `openclaw skills check` to verify requirements.

**Q: Why does my skill show "missing"?**
A: Check the [Skills Check](#-skills) section for required binaries/API keys. Run `openclaw skills check` for details.

**Q: How do I fix "command not found"?**
A: Ensure Node.js 18+ is installed. Try `npm install -g openclaw --force` to reinstall.

### 📊 Resource Status

| Status | Meaning |
|--------|---------|
| ✅ Active | Actively maintained, links verified |
| ⚠️ Contact Author | Access requires contacting the author |
| ❌ Deprecated | No longer maintained, use alternatives |
| 🆕 New | Recently added (within 30 days) |

### Integration Questions

**Q: Which messaging platforms are supported?**  
A: Discord, Telegram, WhatsApp, Feishu, Slack, Signal, Line, and more via the plugin system.

**Q: Can I use OpenClaw with my own LLM?**  
A: Yes! OpenClaw supports various LLM providers including OpenAI, Anthropic, Google, and local models.

**Q: Is there a web interface?**  
A: Community members are working on web UIs. Check the [Community Projects](#-community-projects) section.

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** this repository
2. **Create** a branch (`git checkout -b feature/amazing-skill`)
3. **Add** your resource with a clear description
4. **Commit** your changes (`git commit -m 'Add amazing skill'`)
5. **Push** to the branch (`git push origin feature/amazing-skill`)
6. **Open** a Pull Request

### Contribution Guidelines

- ✅ Resources should be related to OpenClaw ecosystem
- ✅ Write clear, concise descriptions (1-2 sentences)
- ✅ Test all links before submitting
- ✅ Keep the list organized alphabetically within sections
- ✅ Use proper markdown formatting
- ✅ Be respectful and inclusive in all interactions

### What We Don't Accept

- ❌ Self-promotion without genuine value
- ❌ Broken or dead links
- ❌ Duplicate entries
- ❌ Unrelated resources
- ❌ Spam or low-quality content
- ❌ Discriminatory or harmful content

**Need help?** Read our [CONTRIBUTING.md](CONTRIBUTING.md) and [RESOURCES.md](RESOURCES.md) guides.

---

## 📜 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📈 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=earyantLe/awesome-openclaw&type=Date)](https://star-history.com/#earyantLe/awesome-openclaw&Date)

---

## 🙏 Acknowledgments

- **OpenClaw Team** - For creating this amazing AI agent runtime
- **Community Contributors** - For building skills, plugins, and tutorials
- **You!** - For using and contributing to the ecosystem

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| 📦 Total Skills | 47+ |
| 🔌 Integrations | 30+ |
| 📚 Documentation Pages | 20+ |
| ⭐ Contributors | Growing |
| 📅 Last Update | 2026-03-23 |

---

<div align="center">

**Made with 🦞 by the OpenClaw Community**

[⬆ Back to Top](#awesome-openclaw-) · [Report Issue](https://github.com/earyantLe/awesome-openclaw/issues/new/choose) · [Join Discord](https://discord.com/invite/openclaw)

</div>

</div>

---

> 📅 **Last Updated:** 2026-03-23
> 🔍 **Links Checked:** Weekly check enabled (Mondays 9AM UTC)
> 📊 **Status:** ✅ Active Maintenance · [View Changelog](https://github.com/earyantLe/awesome-openclaw/commits/main)

> 📅 **Last Updated:** 2026-03-23
> 🔍 **Links Checked:** 2026-03-23 (All links verified)
> 📊 **Status:** ✅ Active Maintenance
