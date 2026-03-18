# 5 分钟快速上手 OpenClaw 🦞
# Get Started with OpenClaw in 5 Minutes

> **从零到运行你的第一个 AI Agent / From Zero to Running Your First AI Agent**

_预计时间 / Estimated Time: 5 分钟 / 5 minutes_  
_难度 / Difficulty: 入门 / Beginner_

---

## 🎯 学习目标 / Learning Objectives

完成本教程后，你将能够：/ After completing this tutorial, you will be able to:

- ✅ 安装 OpenClaw / Install OpenClaw
- ✅ 初始化工作空间 / Initialize workspace
- ✅ 启动 Gateway 服务 / Start Gateway service
- ✅ 验证安装成功 / Verify installation

---

## 📋 前置要求 / Prerequisites

- ✅ Node.js 18+ (推荐 v20+) / Node.js 18+ (v20+ recommended)
- ✅ npm 或 yarn / npm or yarn
- ✅ 基础命令行操作知识 / Basic command line knowledge

**检查 Node.js 版本 / Check Node.js version:**

```bash
node --version
```

---

## 🚀 快速开始 / Quick Start

### 步骤 1: 安装 OpenClaw / Install OpenClaw

使用 npm 全局安装 OpenClaw：/ Install OpenClaw globally with npm:

```bash
npm install -g openclaw
```

**验证安装 / Verify installation:**

```bash
openclaw --version
```

你应该看到类似输出：/ You should see output like:

```
openclaw/x.x.x linux-x64 node-v20.x.x
```

> 💡 **提示 / Tip**: 如果遇到权限错误，在 macOS/Linux 上使用 `sudo npm install -g openclaw`  
> **If you encounter permission errors**, use `sudo npm install -g openclaw` on macOS/Linux

---

### 步骤 2: 初始化工作空间 / Initialize Workspace

创建你的第一个 Agent 项目：/ Create your first agent project:

```bash
# 创建新项目 / Create new project
openclaw init my-first-agent

# 进入项目目录 / Enter project directory
cd my-first-agent
```

初始化后会看到以下结构：/ After initialization, you'll see this structure:

```
my-first-agent/
├── workspace/
│   ├── AGENTS.md      # Agent 配置文件 / Agent configuration
│   ├── SOUL.md        # Agent 人格定义 / Agent personality
│   ├── USER.md        # 用户信息 / User information
│   └── TOOLS.md       # 工具配置 / Tool configuration
├── skills/            # 自定义技能 / Custom skills
├── memory/            # 记忆文件 / Memory files
└── openclaw.json      # 主配置文件 / Main configuration
```

---

### 步骤 3: 配置模型 / Configure Model

编辑 `openclaw.json` 配置文件，设置你的 LLM 模型：/ Edit `openclaw.json` to configure your LLM model:

```json
{
  "model": {
    "provider": "openai",
    "name": "gpt-4o-mini"
  }
}
```

**支持的模型提供商 / Supported model providers:**

- `openai` - OpenAI GPT 系列
- `anthropic` - Claude 系列
- `google` - Gemini 系列
- `azure` - Azure OpenAI
- `local` - 本地模型 (Ollama 等)

> ⚠️ **重要 / Important**: 需要设置相应的 API 密钥环境变量 / You need to set corresponding API key environment variables

**设置 API 密钥 / Set API keys:**

```bash
# OpenAI
export OPENAI_API_KEY="sk-..."

# Anthropic
export ANTHROPIC_API_KEY="sk-ant-..."

# Google
export GOOGLE_API_KEY="..."
```

---

### 步骤 4: 启动 Gateway / Start Gateway

启动 OpenClaw Gateway 服务：/ Start the OpenClaw Gateway service:

```bash
# 标准启动 / Standard start
openclaw gateway start

# 或者使用脚本（推荐）/ Or use script (recommended)
sh scripts/start.sh
```

**检查状态 / Check status:**

```bash
openclaw gateway status
```

你应该看到：/ You should see:

```
✅ Gateway is running
Version: x.x.x
Uptime: xx minutes
```

---

### 步骤 5: 测试 Agent / Test Your Agent

发送一条测试消息：/ Send a test message:

```bash
# 如果使用 Discord
# If using Discord, send a message in your Discord channel

# 或者查看日志 / Or check logs
openclaw gateway logs
```

**简单测试 / Simple test:**

在你的聊天频道中输入：/ Type in your chat channel:

```
你好！请介绍一下你自己。
Hello! Please introduce yourself.
```

Agent 应该会根据 `SOUL.md` 中的定义回复你。/ The agent should reply based on the definition in `SOUL.md`.

---

## ✅ 验证清单 / Verification Checklist

- [ ] OpenClaw 安装成功 / OpenClaw installed successfully
- [ ] 工作空间已初始化 / Workspace initialized
- [ ] 模型配置完成 / Model configured
- [ ] Gateway 正在运行 / Gateway is running
- [ ] 能够收到 Agent 回复 / Can receive agent replies

---

## 🎉 恭喜！/ Congratulations!

你已经成功运行了第一个 OpenClaw Agent！/ You've successfully run your first OpenClaw agent!

### 下一步 / Next Steps

1. 📚 [安装和配置指南](02-installation.md) - 深入了解配置选项
2. 🛠️ [创建第一个技能](03-first-skill.md) - 学习技能开发
3. 🤖 [第一个机器人](04-first-bot.md) - 构建完整机器人

---

## ❓ 常见问题 / FAQ

**Q: 安装失败怎么办？/ What if installation fails?**

A: 检查 Node.js 版本（需要 18+），清除 npm 缓存后重试：/ Check Node.js version (18+ required), clear npm cache and retry:

```bash
npm cache clean --force
npm install -g openclaw
```

**Q: Gateway 启动失败？/ Gateway fails to start?**

A: 检查端口是否被占用，查看日志：/ Check if port is occupied, view logs:

```bash
openclaw gateway logs
```

**Q: 没有收到 Agent 回复？/ No agent replies?**

A: 检查：/ Check:
- API 密钥是否正确设置 / API keys set correctly
- 模型配置是否正确 / Model configuration correct
- 聊天频道配置是否正确 / Chat channel configured correctly

---

## 📚 相关资源 / Related Resources

- [官方文档](https://docs.openclaw.ai/getting-started)
- [配置指南](https://docs.openclaw.ai/config)
- [技能开发](https://docs.openclaw.ai/skills)
- [Discord 社区](https://discord.gg/openclaw)

---

<div align="center">

**继续学习 / Continue Learning**

[下一步：安装和配置 →](02-installation.md)

[返回教程列表](../COMPLETE_TUTORIALS_LIST.md)

</div>
