# Awesome OpenClaw 🦞

A curated list of awesome OpenClaw resources, skills, extensions, and community projects.

> "The best way to predict the future is to create it." — Alan Kay

[OpenClaw](https://github.com/openclaw/openclaw) is an open-source AI agent runtime that turns your LLM into a proactive, tool-using assistant with memory, scheduling, and real-world integrations.

## Why OpenClaw?

- 🧠 **Memory-Equipped** - Persistent memory files for long-term context and continuity
- ⏰ **Cron & Scheduling** - Built-in task scheduler for proactive work and reminders
- 🛠️ **Tool Ecosystem** - Extensible tool/skill system with 50+ integrations
- 💬 **Multi-Channel** - Support for Discord, Telegram, WhatsApp, Feishu, Slack, Signal, and more
- 🔌 **Plugin Architecture** - Easy to extend with custom integrations and skills

---

## Table of Contents

- [Official Resources](#official-resources)
- [Skills](#skills)
  - [Built-in Skills](#built-in-skills)
  - [Community Skills](#community-skills)
  - [Feishu/Lark Skills](#feishulark-skills)
  - [Miaoda Skills](#miaoda-skills)
- [Extensions & Plugins](#extensions--plugins)
- [Community Projects](#community-projects)
- [Tutorials & Guides](#tutorials--guides)
- [Tools & Utilities](#tools--utilities)
- [Books & Resources](#books--resources)
- [Contributing](#contributing)

---

## Official Resources

| Resource | Description |
|----------|-------------|
| [OpenClaw Core](https://github.com/openclaw/openclaw) | Main OpenClaw repository |
| [Documentation](https://docs.openclaw.ai) | Official documentation - Getting started, configuration, skills guide |
| [Discord Community](https://discord.com/invite/clawd) | Join the community - Get help, share ideas, and connect |
| [ClawHub](https://clawhub.com) | Discover and share skills - Community marketplace |
| [OpenClaw Skills](https://github.com/openclaw/skills) | Official skill repository |

---

## Skills

OpenClaw skills are pre-defined task templates that define how the agent should handle specific situations.

### Built-in Skills

These skills come pre-installed with OpenClaw.

| Skill | Description | Usage |
|-------|-------------|-------|
| `weather` | Weather forecasts via wttr.in or Open-Meteo | When user asks about weather |
| `healthcheck` | Security hardening and system health checks | Audit system security |
| `skill-creator` | Create and manage AgentSkills | Authoring custom skills |

### Community Skills

Contributed by the community for specific use cases.

| Skill | Author | Description |
|-------|--------|-------------|
| `github-assistant` | Community | GitHub repository management and CI automation |
| `docker-helper` | Community | Docker containerization guidance |
| `notion-integration` | Community | Notion API integration for note-taking |
| `google-calendar` | Community | Google Calendar syncing and scheduling |
| `slack-bot` | Community | Slack bot integration for team collaboration |

### Feishu/Lark Skills

> 📦 [Feishu OpenClaw Plugin](https://github.com/earyantLe/feishu-openclaw-plugin) - Full Feishu/Lark integration

| Skill | Description |
|-------|-------------|
| `feishu-bitable` | 飞书多维表格管理 |
| `feishu-calendar` | 飞书日历与日程管理 |
| `feishu-im-read` | 飞书 IM 消息读取 |
| `feishu-create-doc` | 创建飞书云文档 |
| `feishu-update-doc` | 更新飞书云文档 |
| `feishu-fetch-doc` | 获取飞书云文档内容 |
| `feishu-search-doc-wiki` | 飞书文档与知识库统一搜索 |
| `feishu-search-user` | 飞书员工搜索 |
| `feishu-task-task` | 飞书任务管理 |
| `feishu-task-tasklist` | 飞书任务清单管理 |
| `feishu-drive-file` | 飞书云空间文件管理 |
| `feishu-wiki-space` | 飞书知识空间管理 |
| `feishu-sheet` | 飞书电子表格 |

### Miaoda Skills

> 🤖 [Miaoda Skills](https://github.com/miaoda-ai/openclaw-skills) - Advanced AI-powered skills

| Skill | Description |
|-------|-------------|
| `miaoda-web-search` | 网页搜索与摘要 - Search the web with AI-generated summaries |
| `miaoda-web-fetch` | 网页内容抓取 - Extract and summarize web page content |
| `miaoda-image-understanding` | 图片理解与分析 - Analyze and describe image content |
| `miaoda-text-gen-image` | 文字生成图片 - Generate images from text descriptions |
| `miaoda-speech-to-text` | 语音转文字 - Convert audio/voice recordings to text |
| `miaoda-doc-parse` | 智能文档解析 (PDF/Word/Excel) - Intelligent Document Parsing |

---

## Extensions & Plugins

Extend OpenClaw's capabilities with custom integrations.

| Extension | Description | Author |
|-----------|-------------|--------|
| [Feishu OpenClaw Plugin](https://github.com/earyantLe/feishu-openclaw-plugin) | 飞书 (Lark) 集成插件 - IM/日历/文档/多维表格 | @earyantLe |
| [OpenClaw Cloud](https://github.com/openclaw/cloud) | Self-hosted OpenClaw cloud deployment tools | OpenClaw Team |
| [OpenClaw Docs](https://github.com/openclaw/docs) | Documentation site source code | OpenClaw Team |
| _Add your extension_ | _Submit your extension!_ | _You?_ |

### Popular Integrations

Common integrations that work well with OpenClaw:

- ✅ **Messaging**: Discord, Telegram, WhatsApp, Slack, Signal, Feishu, Line
- ✅ **Cloud Storage**: AWS S3, Google Cloud Storage, Azure Blob
- ✅ **Databases**: PostgreSQL, MySQL, MongoDB, Redis
- ✅ **API Integrations**: OpenAI, Anthropic, Google, Microsoft
- ✅ **DevOps**: GitHub, GitLab, Jenkins, Docker

---

## Community Projects

> 🚀 Projects built with OpenClaw by the community.

| Project | Author | Description |
|---------|--------|-------------|
| [OpenClaw WebUI](https://github.com/openclaw/webui) | OpenClaw Team | Web-based UI for OpenClaw management |
| [OpenClaw CLI](https://github.com/openclaw/cli) | OpenClaw Team | Command-line interface for OpenClaw |
| _Add your project_ | _You?_ | _Describe it_ |

### Use Cases

How people are using OpenClaw:

- ✅ **Personal Assistant**: Daily tasks, calendar management, reminders
- ✅ **Team Collaboration**: Slack/Discord bots for team productivity
- ✅ **Customer Support**: Automated responses and ticket management
- ✅ **DevOps Automation**: CI/CD pipelines, monitoring, alerts
- ✅ **Content Creation**: Blog posts, social media, documentation

---

## Tutorials & Guides

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
| [Building Your First Agent](https://medium.com/@openclaw) | Community | Step-by-step tutorial for beginners |
| [OpenClaw Best Practices](https://github.com/openclaw/openclaw/wiki) | Community | Tips and tricks for optimization |
| _Add your tutorial_ | _You_ | _Share your knowledge_ |

### Video Tutorials

| Title | Creator | Platform |
|-------|--------|----------|
| [OpenClaw Quickstart](https://youtube.com/openclaw) | OpenClaw Team | YouTube |
| _Add your video_ | _You_ | _YouTube/Bilibili_ |

### Quick Start

```bash
# Install OpenClaw globally
npm install -g openclaw

# Initialize your workspace
openclaw init my-agent

# Start the gateway
openclaw gateway start

# Check status
openclaw status
```

---

## Tools & Utilities

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
| `cloudcursor` | AI-powered code editor that integrates with OpenClaw |
| `locallm` | Local LLM model runtime for offline usage |
| `ollama` | Ollama Models for local AI tasks |

---

## Books & Resources

### Reading List

| Resource | Type | Description |
|----------|------|-------------|
| [Artificial General Intelligence](https://www.ofai.at/safety/age/paper.pdf) | Paper | OpenAI safety research |
| [Consolidating Learning from Human Feedback](https://www.anthropic.com/research) | Paper | Anthropic research |
| [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165) | Paper | GPT-3 paper |

### Blogs & Newsletters

| Blog | Author | Frequency |
|------|--------|-----------|
| [OpenClaw Blog](https://blog.openclaw.ai) | OpenClaw Team | Monthly |
| [The Bain Optimizer](https://bainoptimizer.com) | Community | Weekly |
| _Add your blog_ | _You_ | _Your frequency_ |

---

## Contributing

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

---

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Stars Over Time

[Star History](https://star-history.com/#earyantLe/awesome-openclaw)

<!-- StarHistory will be added after first star -->
<!--
<tiframe src="https://star-history.com/earyantLe/awesome-openclaw.svg"></tiframe>
-->

---

<div align="center">

**Made with 🦞 by the OpenClaw Community**

[OpenClaw](https://github.com/openclaw/openclaw) | [Documentation](https://docs.openclaw.ai) | [Discord](https://discord.com/invite/clawd)

</div>
