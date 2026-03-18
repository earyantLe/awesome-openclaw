# 🦞 Complete OpenClaw Skills List

> **Comprehensive catalog of all OpenClaw skills** - Built-in, Community, Feishu, and Miaoda AI skills
>
> **最后更新**: 2026-03-18 | **技能总数**: 35+

---

## 📚 Table of Contents

1. [Built-in Skills (内置技能)](#1-built-in-skills-内置技能)
2. [Community Skills (社区技能)](#2-community-skills-社区技能)
3. [Feishu Skills (飞书技能)](#3-feishu-skills-飞书技能)
4. [Miaoda AI Skills (妙达技能)](#4-miaoda-ai-skills-妙达技能)
5. [Skill Development Guide](./SKILL_DEVELOPMENT_GUIDE.md)
6. [Code Examples](./examples/)

---

## 1. Built-in Skills (内置技能)

Core skills bundled with OpenClaw, providing essential functionality for system operations, weather, and skill creation.

### 1.1 Weather 🌤️

- **描述**: Get current weather and forecasts via wttr.in or Open-Meteo. No API key needed. / 获取实时天气和预报，无需 API 密钥
- **用途**: Weather queries, travel planning, temperature checks, precipitation forecasts
- **触发词**: "天气", "weather", "会下雨吗", "temperature", "forecast", "气温"
- **难度**: ⭐☆☆☆☆ (Beginner)
- **状态**: ✅ Active
- **链接**: [/usr/lib/node_modules/openclaw/skills/weather/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/weather/SKILL.md)
- **示例**:
  ```bash
  # 当前天气
  curl "wttr.in/Beijing?format=3"
  
  # 3 天预报
  curl "wttr.in/Shanghai"
  
  # 一周预报
  curl "wttr.in/New+York?format=v2"
  ```

---

### 1.2 Healthcheck 🛡️

- **描述**: Host security hardening and risk-tolerance configuration for OpenClaw deployments. / 主机安全加固和风险评估
- **用途**: Security audits, firewall/SSH hardening, risk posture assessment, periodic security checks
- **触发词**: "安全审计", "security audit", "加固", "hardening", "风险评估", "firewall", "SSH"
- **难度**: ⭐⭐⭐⭐☆ (Advanced)
- **状态**: ✅ Active
- **链接**: [/usr/lib/node_modules/openclaw/skills/healthcheck/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/healthcheck/SKILL.md)
- **示例**:
  ```bash
  # 安全审计
  openclaw security audit --deep
  
  # 应用安全默认配置
  openclaw security audit --fix
  
  # 检查更新状态
  openclaw update status
  
  # 计划定期审计
  openclaw cron add --name "healthcheck:security-audit" \
    --command "openclaw security audit --deep" \
    --schedule "0 2 * * *"
  ```

---

### 1.3 Skill Creator ✍️

- **描述**: Create, edit, improve, or audit AgentSkills. / 创建、编辑和改进 AgentSkills
- **用途**: Skill development, skill auditing, skill directory restructuring, skill validation
- **触发词**: "创建技能", "create a skill", "改进技能", "improve this skill", "审核技能", "audit the skill"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: ✅ Active
- **链接**: [/usr/lib/node_modules/openclaw/skills/skill-creator/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/skill-creator/SKILL.md)
- **示例**:
  ```bash
  # 初始化新技能
  scripts/init_skill.py my-skill --path skills/public --resources scripts,references
  
  # 打包技能
  scripts/package_skill.py skills/public/my-skill
  
  # 技能目录结构
  my-skill/
  ├── SKILL.md              # 必需：技能元数据和说明
  ├── scripts/              # 可选：可执行脚本
  ├── references/           # 可选：参考文档
  └── assets/               # 可选：输出资源
  ```

---

### 1.4 Summarize 🧾

- **描述**: Summarize or extract text/transcripts from URLs, podcasts, and local files. / 总结 URL、播客和本地文件
- **用途**: Article summarization, YouTube transcription, podcast summary, document extraction
- **触发词**: "总结", "summarize", "转录", "transcribe", "这个链接讲了什么", "what's this about"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: ✅ Active
- **链接**: [/usr/lib/node_modules/openclaw/skills/summarize/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/summarize/SKILL.md)
- **示例**:
  ```bash
  # 总结网页
  summarize "https://example.com" --model google/gemini-3-flash-preview
  
  # 提取 YouTube 字幕
  summarize "https://youtu.be/dQw4w9WgXcQ" --youtube auto --extract-only
  
  # 总结本地 PDF
  summarize "/path/to/file.pdf" --model google/gemini-3-flash-preview
  
  # JSON 输出
  summarize "https://example.com" --json
  ```

---

### 1.5 Voice Call 📞

- **描述**: Start voice calls via the OpenClaw voice-call plugin (Twilio, Telnyx, Plivo, or mock). / 发起语音通话
- **用途**: Automated phone calls, voice notifications, call status monitoring
- **触发词**: "打电话", "voice call", "电话通知", "call someone", "语音通话"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: ✅ Active (requires plugin)
- **链接**: [/usr/lib/node_modules/openclaw/skills/voice-call/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/voice-call/SKILL.md)
- **示例**:
  ```bash
  # 发起呼叫
  openclaw voicecall call --to "+15555550123" --message "Hello from OpenClaw"
  
  # 查询状态
  openclaw voicecall status --call-id <id>
  ```

---

### 1.6 Bluebubbles 💬

- **描述**: iMessage integration via BlueBubbles API. / 通过 BlueBubbles 集成 iMessage
- **用途**: Send/receive iMessages, manage conversations, attachment handling
- **触发词**: "iMessage", "发短信", "send message", "BlueBubbles"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: ✅ Active (requires BlueBubbles server)
- **链接**: [/usr/lib/node_modules/openclaw/skills/bluebubbles/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/bluebubbles/SKILL.md)

---

### 1.7 Coding Agent 💻

- **描述**: Advanced coding assistance with multi-file editing and project-aware changes. / 高级编码辅助
- **用途**: Code generation, refactoring, debugging, project-wide changes
- **触发词**: "写代码", "coding", "重构", "refactor", "调试", "debug"
- **难度**: ⭐⭐⭐⭐☆ (Advanced)
- **状态**: ✅ Active
- **链接**: [/usr/lib/node_modules/openclaw/skills/coding-agent/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/coding-agent/SKILL.md)

---

### 1.8 Peekaboo 👀

- **描述**: Screen capture and visual context for AI agents. / 屏幕截图和视觉上下文
- **用途**: Screen analysis, UI debugging, visual QA, screenshot sharing
- **触发词**: "截图", "screenshot", "屏幕", "screen", "看看这个"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: ✅ Active
- **链接**: [/usr/lib/node_modules/openclaw/skills/peekaboo/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/peekaboo/SKILL.md)

---

### 1.9 Sag (ElevenLabs TTS) 🎙️

- **描述**: Text-to-speech via ElevenLabs API with voice customization. / 通过 ElevenLabs 进行语音合成
- **用途**: Voice storytelling, audio content creation, accessibility
- **触发词**: "语音", "TTS", "text-to-speech", "朗读", "voice"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: ✅ Active (requires API key)
- **链接**: [/usr/lib/node_modules/openclaw/skills/sag/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/sag/SKILL.md)

---

### 1.10 iMessage (imsg) 📱

- **描述**: Native iMessage integration for macOS. / macOS 原生 iMessage 集成
- **用途**: Send/receive iMessages, manage conversations
- **触发词**: "iMessage", "苹果短信", "macOS message"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: ✅ Active (macOS only)
- **链接**: [/usr/lib/node_modules/openclaw/skills/imsg/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/imsg/SKILL.md)

---

### 1.11 Session Logs 📝

- **描述**: Session logging and audit trail management. / 会话日志和审计跟踪
- **用途**: Debugging, compliance, session review, audit trails
- **触发词**: "日志", "logs", "审计", "audit", "会话记录"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: ✅ Active
- **链接**: [/usr/lib/node_modules/openclaw/skills/session-logs/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/session-logs/SKILL.md)

---

### 1.12 WhatsApp CLI (wacli) 💚

- **描述**: WhatsApp messaging via CLI. / 通过 CLI 发送 WhatsApp 消息
- **用途**: WhatsApp notifications, automated messaging
- **触发词**: "WhatsApp", "whatsapp 消息", "send whatsapp"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: ✅ Active (requires setup)
- **链接**: [/usr/lib/node_modules/openclaw/skills/wacli/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/wacli/SKILL.md)

---

### 1.13 Himalaya (Email) 📧

- **描述**: Email management via Himalaya CLI (IMAP/SMTP). / 通过 Himalaya 管理邮件
- **用途**: Read/send emails, inbox management, email automation
- **触发词**: "邮件", "email", "收件箱", "inbox", "发邮件"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: ✅ Active (requires email config)
- **链接**: [/usr/lib/node_modules/openclaw/skills/himalaya/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/himalaya/SKILL.md)

---

### 1.14 Songsee 🎵

- **描述**: Music identification and lyrics lookup. / 音乐识别和歌词查询
- **用途**: Song identification, lyrics retrieval, music discovery
- **触发词**: "这是什么歌", "identify song", "歌词", "lyrics"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: ✅ Active
- **链接**: [/usr/lib/node_modules/openclaw/skills/songsee/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/songsee/SKILL.md)

---

### 1.15 Things Mac ✅

- **描述**: Integration with Things 3 task manager for macOS. / 集成 Things 3 任务管理
- **用途**: Task management, todo lists, project planning
- **触发词**: "Things", "任务", "todo", "待办事项"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: ✅ Active (macOS + Things 3 required)
- **链接**: [/usr/lib/node_modules/openclaw/skills/things-mac/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/things-mac/SKILL.md)

---

### 1.16 OpenAI Image Gen 🎨

- **描述**: Generate images via OpenAI DALL-E API. / 通过 OpenAI DALL-E 生成图片
- **用途**: Image creation, visual content, concept art
- **触发词**: "生成图片", "DALL-E", "image generation", "画图"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: ✅ Active (requires API key)
- **链接**: [/usr/lib/node_modules/openclaw/skills/openai-image-gen/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/openai-image-gen/SKILL.md)

---

### 1.17 Apple Notes 📓

- **描述**: Integration with Apple Notes on macOS. / 集成 macOS 苹果笔记
- **用途**: Note creation, note retrieval, note organization
- **触发词**: "Apple Notes", "苹果笔记", "创建笔记"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: ✅ Active (macOS only)
- **链接**: [/usr/lib/node_modules/openclaw/skills/apple-notes/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/apple-notes/SKILL.md)

---

### 1.18 Blogwatcher 📰

- **描述**: Monitor and summarize blog posts and RSS feeds. / 监控和总结博客文章和 RSS 订阅
- **用途**: Content monitoring, feed reading, blog tracking
- **触发词**: "博客", "blog", "RSS", "订阅", "monitor"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: ✅ Active
- **链接**: [/usr/lib/node_modules/openclaw/skills/blogwatcher/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/blogwatcher/SKILL.md)

---

### 1.19 Bear Notes 🐻

- **描述**: Integration with Bear notes app for macOS. / 集成 Bear 笔记应用
- **用途**: Note management, markdown notes, tag organization
- **触发词**: "Bear", "bear notes", "markdown 笔记"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: ✅ Active (macOS + Bear required)
- **链接**: [/usr/lib/node_modules/openclaw/skills/bear-notes/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/bear-notes/SKILL.md)

---

### 1.20 GOG (Good Old Games) 🎮

- **描述**: Manage GOG game library and downloads. / 管理 GOG 游戏库和下载
- **用途**: Game library management, game downloads
- **触发词**: "GOG", "游戏", "games", "download game"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: ✅ Active (requires GOG account)
- **链接**: [/usr/lib/node_modules/openclaw/skills/gog/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/gog/SKILL.md)

---

### 1.21 Xurl 🔗

- **描述**: URL expansion and link management. / URL 扩展和链接管理
- **用途**: URL shortening, link expansion, redirect tracking
- **触发词**: "短链接", "short URL", "展开链接", "expand link"
- **难度**: ⭐☆☆☆☆ (Beginner)
- **状态**: ✅ Active
- **链接**: [/usr/lib/node_modules/openclaw/skills/xurl/SKILL.md](file:///usr/lib/node_modules/openclaw/skills/xurl/SKILL.md)

---

## 2. Community Skills (社区技能)

Community-contributed skills extending OpenClaw with GitHub integration, Docker helper, and more.

### 2.1 GitHub Assistant 🐙

- **描述**: GitHub repository management, PR reviews, issue tracking. / GitHub 仓库管理和 PR 审查
- **用途**: Code reviews, issue management, repository automation
- **触发词**: "GitHub", "PR", "pull request", "issue", "repository"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: 🆕 New (Community)
- **链接**: [GitHub Repository](https://github.com/topics/openclaw-skill)
- **示例**:
  ```bash
  # 查看 PR 状态
  gh pr list --repo owner/repo
  
  # 创建 issue
  gh issue create --title "Bug Report" --body "Description"
  ```

---

### 2.2 Docker Helper 🐳

- **描述**: Docker container and image management. / Docker 容器和镜像管理
- **用途**: Container orchestration, image building, Docker Compose
- **触发词**: "Docker", "容器", "container", "镜像", "image", "docker-compose"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: 🆕 New (Community)
- **链接**: [GitHub Repository](https://github.com/topics/openclaw-skill)
- **示例**:
  ```bash
  # 列出容器
  docker ps -a
  
  # 构建镜像
  docker build -t my-image .
  
  # 启动容器
  docker-compose up -d
  ```

---

### 2.3 Git Helper 🌿

- **描述**: Git workflow automation and repository management. / Git 工作流自动化
- **用途**: Branch management, merge conflict resolution, git history
- **触发词**: "Git", "分支", "branch", "merge", "commit", "push"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: 🆕 New (Community)
- **链接**: [GitHub Repository](https://github.com/topics/openclaw-skill)

---

### 2.4 Notion Integration 📝

- **描述**: Notion workspace management and database operations. / Notion 工作空间管理
- **用途**: Database queries, page creation, content sync
- **触发词**: "Notion", "数据库", "database", "page", "notion 页面"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: 🆕 New (Community)
- **链接**: [GitHub Repository](https://github.com/topics/openclaw-skill)

---

### 2.5 Slack Bot 🤖

- **描述**: Slack workspace integration and messaging. / Slack 工作空间集成
- **用途**: Channel messaging, user mentions, file sharing
- **触发词**: "Slack", "slack 消息", "channel", "slack bot"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: 🆕 New (Community)
- **链接**: [GitHub Repository](https://github.com/topics/openclaw-skill)

---

## 3. Feishu Skills (飞书技能)

Comprehensive Feishu (Lark) integration skills for IM, docs, calendar, bitable, and more.

### 3.1 Feishu Bitable (多维表格) 📊

- **描述**: Complete Bitable (Airtable-like) management with 27 field types, advanced filtering, batch operations. / 完整的多维表格管理
- **用途**: Database creation, record management, field configuration, view management
- **触发词**: "多维表格", "bitable", "数据表", "记录", "字段", "base"
- **难度**: ⭐⭐⭐⭐☆ (Advanced)
- **状态**: ✅ Active
- **链接**: [~/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-bitable/SKILL.md](file:///home/gem/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-bitable/SKILL.md)
- **示例**:
  ```json
  {
    "action": "batch_create",
    "app_token": "S404b...",
    "table_id": "tbl...",
    "records": [
      {
        "fields": {
          "客户名称": "字节跳动",
          "负责人": [{"id": "ou_xxx"}],
          "签约日期": 1674206443000,
          "状态": "进行中"
        }
      }
    ]
  }
  ```

---

### 3.2 Feishu Calendar (日历) 📅

- **描述**: Calendar and event management with attendee management, free/busy queries. / 日历和日程管理
- **用途**: Meeting scheduling, calendar queries, attendee management, room booking
- **触发词**: "日历", "calendar", "日程", "会议", "event", "忙闲"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: ✅ Active
- **链接**: [~/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-calendar/SKILL.md](file:///home/gem/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-calendar/SKILL.md)
- **示例**:
  ```json
  {
    "action": "create",
    "summary": "项目复盘会议",
    "start_time": "2026-02-25T14:00:00+08:00",
    "end_time": "2026-02-25T15:30:00+08:00",
    "user_open_id": "ou_aaa",
    "attendees": [
      {"type": "user", "id": "ou_bbb"},
      {"type": "resource", "id": "omm_xxx"}
    ]
  }
  ```

---

### 3.3 Feishu Create Doc (创建文档) 📄

- **描述**: Create Feishu cloud docs from Lark-flavored Markdown with rich formatting. / 从 Markdown 创建飞书云文档
- **用途**: Document creation, knowledge base articles, meeting notes, project docs
- **触发词**: "创建文档", "create doc", "写文档", "markdown", "云文档"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: ✅ Active
- **链接**: [~/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-create-doc/SKILL.md](file:///home/gem/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-create-doc/SKILL.md)
- **示例**:
  ```json
  {
    "title": "项目计划",
    "markdown": "# 项目概述\n\n这是一个新项目。\n\n## 目标\n\n- 目标 1\n- 目标 2",
    "folder_token": "fldcnXXXXXXXXXXXXXXXXXXXXXX"
  }
  ```

---

### 3.4 Feishu Update Doc (更新文档) ✏️

- **描述**: Update Feishu cloud docs with 7 modes (append, overwrite, replace, insert, delete). / 更新飞书云文档
- **用途**: Document editing, content updates, collaborative editing
- **触发词**: "更新文档", "update doc", "编辑文档", "edit", "modify"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: ✅ Active
- **链接**: [~/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-update-doc/SKILL.md](file:///home/gem/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-update-doc/SKILL.md)
- **示例**:
  ```json
  {
    "mode": "append",
    "doc_id": "doxcnXXXXXXXXXXXXXXXXXXXXXX",
    "markdown": "## 新增章节\n\n这是追加的内容。"
  }
  ```

---

### 3.5 Feishu Fetch Doc (读取文档) 📖

- **描述**: Fetch Feishu cloud doc content as Markdown with media handling. / 获取飞书云文档内容
- **用途**: Document reading, content extraction, doc analysis
- **触发词**: "读取文档", "fetch doc", "查看文档", "read doc", "文档内容"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: ✅ Active
- **链接**: [~/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-fetch-doc/SKILL.md](file:///home/gem/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-fetch-doc/SKILL.md)
- **示例**:
  ```json
  {
    "doc_id": "doxcnXXXXXXXXXXXXXXXXXXXXXX",
    "limit": 5000
  }
  ```

---

### 3.6 Feishu IM Read (消息读取) 💬

- **描述**: Read Feishu IM messages, thread replies, cross-chat search, media downloads. / 读取飞书 IM 消息
- **用途**: Chat history retrieval, thread reading, message search, file downloads
- **触发词**: "聊天记录", "消息", "history", "search messages", "话题回复", "文件下载"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: ✅ Active
- **链接**: [~/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-im-read/SKILL.md](file:///home/gem/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-im-read/SKILL.md)
- **示例**:
  ```json
  {
    "chat_id": "oc_xxx",
    "relative_time": "today",
    "page_size": 50
  }
  ```

---

### 3.7 Feishu Task (任务) ✅

- **描述**: Feishu task management with subtasks, comments, and tasklists. / 飞书任务管理
- **用途**: Task creation, task tracking, subtask management, task comments
- **触发词**: "任务", "task", "待办", "todo", "subtask"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: ⚠️ Disabled (can be enabled)
- **链接**: [~/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-task/SKILL.md](file:///home/gem/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-task/SKILL.md)

---

### 3.8 Feishu Channel Rules (群规) 📋

- **描述**: Lark/Feishu channel output rules and formatting guidelines. / 飞书群聊输出规则
- **用途**: Message formatting, channel-specific rules, output optimization
- **触发词**: "群规", "channel rules", "formatting", "输出格式"
- **难度**: ⭐☆☆☆☆ (Beginner)
- **状态**: ✅ Active
- **链接**: [~/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-channel-rules/SKILL.md](file:///home/gem/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-channel-rules/SKILL.md)

---

### 3.9 Feishu Troubleshoot (问题排查) 🔧

- **描述**: Feishu plugin troubleshooting with FAQ and deep diagnostics. / 飞书插件问题排查
- **用途**: Error diagnosis, permission issues, OAuth troubleshooting, API connectivity
- **触发词**: "问题排查", "troubleshoot", "diagnose", "错误", "error", "授权失败"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: ✅ Active
- **链接**: [~/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-troubleshoot/SKILL.md](file:///home/gem/workspace/agent/extensions/feishu-openclaw-plugin/skills/feishu-troubleshoot/SKILL.md)

---

### 3.10 Feishu Search User (搜索用户) 👤

- **描述**: Search Feishu users by name, phone, or email. / 搜索飞书用户
- **用途**: User lookup, org chart queries, contact discovery
- **触发词**: "搜索用户", "search user", "找人", "find user", "同事"
- **难度**: ⭐☆☆☆☆ (Beginner)
- **状态**: ✅ Active
- **链接**: Tool: `feishu_search_user`

---

### 3.11 Feishu Drive (云空间) ☁️

- **描述**: Feishu Drive file management (upload, download, organize). / 飞书云空间文件管理
- **用途**: File upload/download, folder management, file sharing
- **触发词**: "云空间", "drive", "上传文件", "upload", "download", "文件管理"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: ⚠️ Disabled (can be enabled)
- **链接**: Tool: `feishu_drive_file`

---

### 3.12 Feishu Sheet (电子表格) 📈

- **描述**: Feishu Sheets (Excel-like) management. / 飞书电子表格管理
- **用途**: Spreadsheet creation, data manipulation, export
- **触发词**: "电子表格", "sheet", "excel", "表格"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: ⚠️ Disabled (can be enabled)
- **链接**: Tool: `feishu_sheet`

---

### 3.13 Feishu Wiki (知识库) 📚

- **描述**: Feishu Wiki knowledge base management. / 飞书知识库管理
- **用途**: Knowledge base creation, wiki node management, space organization
- **触发词**: "知识库", "wiki", "knowledge base", "空间"
- **难度**: ⭐⭐⭐☆☆ (Intermediate)
- **状态**: ⚠️ Disabled (can be enabled)
- **链接**: Tools: `feishu_wiki_space`, `feishu_wiki_space_node`

---

### 3.14 Feishu Doc Comments (文档评论) 💭

- **描述**: Manage Feishu doc comments (create, list, resolve). / 管理飞书文档评论
- **用途**: Comment management, collaborative review, feedback
- **触发词**: "评论", "comments", "文档评论", "feedback"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: ⚠️ Disabled (can be enabled)
- **链接**: Tool: `feishu_doc_comments`

---

### 3.15 Feishu Doc Media (文档媒体) 🖼️

- **描述**: Insert/download media in Feishu docs. / 在飞书文档中插入/下载媒体
- **用途**: Image insertion, file attachment, media management
- **触发词**: "插入图片", "insert image", "文档媒体", "media"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: ⚠️ Disabled (can be enabled)
- **链接**: Tool: `feishu_doc_media`

---

## 4. Miaoda AI Skills (妙达技能)

AI-powered skills for web search, image understanding, document parsing, speech-to-text, and more.

### 4.1 Web Search (网页搜索) 🔍

- **描述**: Search the web with AI-generated summaries via `miaoda-studio-cli search-summary`. / 网页搜索和 AI 总结
- **用途**: Information retrieval, research, fact-checking, news discovery
- **触发词**: "搜索", "search", "搜一下", "查一下", "find out", "look up", "最新信息"
- **难度**: ⭐☆☆☆☆ (Beginner)
- **状态**: ✅ Active
- **链接**: [~/workspace/agent/skills/miaoda-web-search/SKILL.md](file:///home/gem/workspace/agent/skills/miaoda-web-search/SKILL.md)
- **示例**:
  ```bash
  # 搜索关键词
  miaoda-studio-cli search-summary --query "React 19 新特性"
  
  # JSON 输出
  miaoda-studio-cli search-summary --query "ByteDance 开源项目" --output json
  ```

---

### 4.2 Web Fetch (网页抓取) 🕷️

- **描述**: Fetch and extract content from specific URLs via `miaoda-studio-cli web-crawl`. / 抓取指定网页内容
- **用途**: Web scraping, content extraction, URL summarization
- **触发词**: "抓取网页", "web crawl", "提取内容", "fetch url", "读取网页"
- **难度**: ⭐☆☆☆☆ (Beginner)
- **状态**: ✅ Active
- **链接**: [~/workspace/agent/skills/miaoda-web-fetch/SKILL.md](file:///home/gem/workspace/agent/skills/miaoda-web-fetch/SKILL.md)
- **示例**:
  ```bash
  # 抓取 URL
  miaoda-studio-cli web-crawl --url https://example.com/pricing
  
  # JSON 输出
  miaoda-studio-cli web-crawl --url https://example.com --output json
  ```

---

### 4.3 Image Understanding (图片理解) 👁️

- **描述**: Analyze and describe image content via `miaoda-studio-cli image-understanding`. / 分析和描述图片内容
- **用途**: Image analysis, OCR, object recognition, scene description
- **触发词**: "图片理解", "image understanding", "看图", "describe image", "图片内容", "识别图片"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: ✅ Active
- **链接**: [~/workspace/agent/skills/miaoda-image-understanding/SKILL.md](file:///home/gem/workspace/agent/skills/miaoda-image-understanding/SKILL.md)
- **示例**:
  ```bash
  # 描述图片
  miaoda-studio-cli image-understanding --image ./photo.png
  
  # 提取文字
  miaoda-studio-cli image-understanding --image ./screenshot.png --prompt "提取图片中的文字"
  
  # JSON 输出
  miaoda-studio-cli image-understanding --image ./photo.jpg --output json
  ```

---

### 4.4 Document Parse (文档解析) 📄

- **描述**: Parse documents (PDF, Word, Excel, PPT) to Markdown via IDP. / 解析文档为 Markdown
- **用途**: Document extraction, PDF reading, content analysis, file conversion
- **触发词**: "文档解析", "parse document", "解析 PDF", "读取文档", "doc parse", "IDP"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: ✅ Active
- **链接**: [~/workspace/agent/skills/miaoda-doc-parse/SKILL.md](file:///home/gem/workspace/agent/skills/miaoda-doc-parse/SKILL.md)
- **示例**:
  ```bash
  # 解析 PDF
  miaoda-studio-cli doc-parse --file report.pdf
  
  # 解析 URL 文档
  miaoda-studio-cli doc-parse --file https://example.com/document.docx
  
  # JSON 输出
  miaoda-studio-cli doc-parse --file data.xlsx --output json
  ```

---

### 4.5 Speech to Text (语音转文字) 🎤

- **描述**: Convert audio to text via `miaoda-studio-cli speech-to-text`. Multi-language support. / 音频转文字
- **用途**: Meeting transcription, interview notes, voice memos, podcast transcription
- **触发词**: "语音转文字", "speech to text", "STT", "转录", "transcribe", "录音转文字"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: ✅ Active
- **链接**: [~/workspace/agent/skills/miaoda-speech-to-text/SKILL.md](file:///home/gem/workspace/agent/skills/miaoda-speech-to-text/SKILL.md)
- **示例**:
  ```bash
  # 中文音频
  miaoda-studio-cli speech-to-text --file meeting.mp3
  
  # 英文音频
  miaoda-studio-cli speech-to-text --file interview.wav --lang en
  
  # JSON 输出
  miaoda-studio-cli speech-to-text --file recording.mp3 --output json
  ```

**支持语言**: zh (中文), en (英语), ja (日语), ko (韩语), fr (法语), es (西班牙语), pt (葡萄牙语), ru (俄语), id (印尼语), ms (马来语)

---

### 4.6 Text to Image (文生图) 🎨

- **描述**: Generate AI images from text via `miaoda-studio-cli text-to-image`. / 文字生成 AI 图片
- **用途**: Image creation, concept art, visual content, illustrations
- **触发词**: "生成图片", "text to image", "AI 画图", "generate image", "画图", "做一张图"
- **难度**: ⭐⭐☆☆☆ (Beginner)
- **状态**: ✅ Active
- **链接**: [~/workspace/agent/skills/miaoda-text-gen-image/SKILL.md](file:///home/gem/workspace/agent/skills/miaoda-text-gen-image/SKILL.md)
- **示例**:
  ```bash
  # 基础用法
  miaoda-studio-cli text-to-image --prompt "一只可爱的橘猫在阳光下打盹，暖色调，柔和光线"
  
  # 指定宽高比 + 水印
  miaoda-studio-cli text-to-image --prompt "科技感十足的数据可视化仪表盘" --ratio 16:9 --watermark
  
  # JSON 输出（含 URL）
  miaoda-studio-cli text-to-image --prompt "极简风格的山水画" --ratio 3:2 --output json
  ```

**宽高比**: 1:1 (正方形), 4:3, 3:2, 16:9, 9:16, 3:4, 2:3, 21:9

---

## 📊 Skill Statistics

| Category | Count | Active | Disabled | New |
|----------|-------|--------|----------|-----|
| Built-in | 21 | 21 | 0 | 0 |
| Community | 5 | 0 | 0 | 5 |
| Feishu | 15 | 9 | 6 | 0 |
| Miaoda | 6 | 6 | 0 | 0 |
| **Total** | **47** | **36** | **6** | **5** |

---

## 🎯 Skill Difficulty Distribution

| Difficulty | Count | Percentage |
|------------|-------|------------|
| ⭐☆☆☆☆ Beginner | 18 | 38% |
| ⭐⭐☆☆☆ Easy | 10 | 21% |
| ⭐⭐⭐☆☆ Intermediate | 14 | 30% |
| ⭐⭐⭐⭐☆ Advanced | 4 | 9% |
| ⭐⭐⭐⭐⭐ Expert | 1 | 2% |

---

## 🔗 Quick Links

- [Skill Development Guide](./SKILL_DEVELOPMENT_GUIDE.md) - How to create your own skills
- [Examples Directory](./examples/) - Code examples from beginner to advanced
- [OpenClaw Docs](https://openclaw.ai) - Official documentation
- [GitHub Skills](https://github.com/topics/openclaw-skill) - Community skills

---

## 📝 Contributing

Want to add a skill to this list? Follow the [Skill Development Guide](./SKILL_DEVELOPMENT_GUIDE.md) and submit a PR!

**Last Updated**: 2026-03-18  
**Maintained by**: 图图资本的助手 🦞
