# OpenClaw 安装和配置指南 🦞
# OpenClaw Installation and Configuration Guide

> **完整的安装步骤和配置选项详解 / Complete Installation Steps and Configuration Options**

_预计时间 / Estimated Time: 20 分钟 / 20 minutes_  
_难度 / Difficulty: 入门 / Beginner_

---

## 📋 目录 / Table of Contents

- [系统要求 / System Requirements](#-系统要求--system-requirements)
- [安装步骤 / Installation Steps](#-安装步骤--installation-steps)
- [配置详解 / Configuration Details](#-配置详解--configuration-details)
- [环境配置 / Environment Setup](#-环境配置--environment-setup)
- [验证安装 / Verify Installation](#-验证安装--verify-installation)
- [故障排查 / Troubleshooting](#-故障排查--troubleshooting)

---

## 💻 系统要求 / System Requirements

### 最低要求 / Minimum Requirements

| 组件 / Component | 要求 / Requirement | 说明 / Notes |
|-----------------|-------------------|-------------|
| **操作系统 / OS** | Linux/macOS/Windows | Linux 推荐 / Linux recommended |
| **Node.js** | v18.0+ | v20+ 推荐 / v20+ recommended |
| **npm** | v8.0+ | 随 Node.js 安装 / Comes with Node.js |
| **内存 / RAM** | 512MB | 1GB+ 推荐 / 1GB+ recommended |
| **磁盘 / Disk** | 100MB | 不包含模型 / Excluding models |

### 推荐配置 / Recommended Configuration

| 组件 / Component | 推荐 / Recommended | 说明 / Notes |
|-----------------|-------------------|-------------|
| **CPU** | 2+ 核心 / cores | 4+ 核心更佳 / 4+ cores better |
| **RAM** | 2GB+ | 运行本地模型需要更多 / More for local models |
| **网络 / Network** | 稳定连接 / Stable | API 调用需要 / Required for API calls |

---

## 🚀 安装步骤 / Installation Steps

### 步骤 1: 安装 Node.js / Install Node.js

#### macOS

```bash
# 使用 Homebrew (推荐) / Using Homebrew (recommended)
brew install node@20

# 验证安装 / Verify installation
node --version
npm --version
```

#### Linux (Ubuntu/Debian)

```bash
# 使用 NodeSource 仓库 / Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证 / Verify
node --version
npm --version
```

#### Windows

1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载 LTS 版本 / Download LTS version
3. 运行安装程序 / Run installer
4. 验证 / Verify:
   ```powershell
   node --version
   npm --version
   ```

---

### 步骤 2: 安装 OpenClaw / Install OpenClaw

```bash
# 全局安装 OpenClaw / Install OpenClaw globally
npm install -g openclaw

# 验证安装 / Verify installation
openclaw --version
```

**预期输出 / Expected output:**

```
openclaw/x.x.x <platform>-<arch> node-v20.x.x
```

> ⚠️ **权限问题 / Permission Issues**  
> 如果遇到 `EACCES` 错误，使用：/ If you encounter `EACCES` error, use:
> 
> ```bash
> # macOS/Linux
> sudo npm install -g openclaw
> 
> # 或者配置 npm 使用用户目录 / Or configure npm to use user directory
> mkdir ~/.npm-global
> npm config set prefix '~/.npm-global'
> export PATH=~/.npm-global/bin:$PATH
> ```

---

### 步骤 3: 初始化项目 / Initialize Project

```bash
# 创建新项目 / Create new project
openclaw init my-agent

# 进入项目目录 / Enter project directory
cd my-agent

# 查看项目结构 / View project structure
ls -la
```

**项目结构 / Project structure:**

```
my-agent/
├── workspace/
│   ├── AGENTS.md          # Agent 配置 / Agent configuration
│   ├── SOUL.md            # 人格定义 / Personality definition
│   ├── USER.md            # 用户信息 / User information
│   ├── TOOLS.md           # 工具配置 / Tool configuration
│   ├── IDENTITY.md        # 身份标识 / Identity
│   └── memory/            # 记忆存储 / Memory storage
│       └── YYYY-MM-DD.md  # 每日记忆 / Daily memory
├── skills/                # 自定义技能 / Custom skills
├── scripts/               # 启动脚本 / Startup scripts
│   ├── start.sh
│   ├── stop.sh
│   └── restart.sh
├── openclaw.json          # 主配置文件 / Main configuration
├── package.json           # 项目依赖 / Project dependencies
└── README.md              # 项目说明 / Project readme
```

---

## ⚙️ 配置详解 / Configuration Details

### openclaw.json 配置文件

完整的配置示例：/ Complete configuration example:

```json
{
  "model": {
    "provider": "openai",
    "name": "gpt-4o-mini",
    "temperature": 0.7,
    "maxTokens": 2048
  },
  
  "channel": {
    "type": "discord",
    "token": "${DISCORD_BOT_TOKEN}",
    "guildId": "your-guild-id"
  },
  
  "skills": {
    "entries": {
      "weather": { "enabled": true },
      "healthcheck": { "enabled": true },
      "skill-creator": { "enabled": true }
    },
    "paths": [
      "./skills",
      "/usr/lib/node_modules/openclaw/skills"
    ]
  },
  
  "tools": {
    "allow": ["exec", "read", "write", "web_search"],
    "deny": []
  },
  
  "memory": {
    "enabled": true,
    "path": "./workspace/memory",
    "maxDays": 30
  },
  
  "gateway": {
    "port": 3000,
    "host": "localhost",
    "logLevel": "info"
  },
  
  "features": {
    "heartbeat": true,
    "heartbeatInterval": 1800000,
    "autoSave": true
  }
}
```

### 配置项说明 / Configuration Options

#### 1. 模型配置 / Model Configuration

```json
{
  "model": {
    "provider": "openai",      // 提供商 / Provider
    "name": "gpt-4o-mini",     // 模型名称 / Model name
    "temperature": 0.7,        // 创造性 (0-1) / Creativity (0-1)
    "maxTokens": 2048          // 最大 token 数 / Max tokens
  }
}
```

**支持的提供商 / Supported providers:**

| 提供商 / Provider | 配置示例 / Example | 环境变量 / Env Var |
|------------------|-------------------|-------------------|
| **OpenAI** | `"provider": "openai"` | `OPENAI_API_KEY` |
| **Anthropic** | `"provider": "anthropic"` | `ANTHROPIC_API_KEY` |
| **Google** | `"provider": "google"` | `GOOGLE_API_KEY` |
| **Azure** | `"provider": "azure"` | `AZURE_OPENAI_API_KEY` |
| **Local** | `"provider": "local"` | `OLLAMA_HOST` |

#### 2. 频道配置 / Channel Configuration

**Discord:**

```json
{
  "channel": {
    "type": "discord",
    "token": "${DISCORD_BOT_TOKEN}",
    "guildId": "your-guild-id",
    "channelId": "your-channel-id"
  }
}
```

**Feishu/Lark:**

```json
{
  "channel": {
    "type": "feishu",
    "appId": "${FEISHU_APP_ID}",
    "appSecret": "${FEISHU_APP_SECRET}",
    "verificationToken": "${FEISHU_VERIFICATION_TOKEN}"
  }
}
```

**Telegram:**

```json
{
  "channel": {
    "type": "telegram",
    "token": "${TELEGRAM_BOT_TOKEN}"
  }
}
```

#### 3. 技能配置 / Skills Configuration

```json
{
  "skills": {
    "entries": {
      "weather": { 
        "enabled": true,
        "config": {
          "defaultLocation": "Beijing"
        }
      },
      "feishu-bitable": { 
        "enabled": true 
      }
    },
    "paths": [
      "./skills",                    // 项目技能目录 / Project skills directory
      "~/.openclaw/skills",          // 全局技能目录 / Global skills directory
      "/usr/lib/node_modules/openclaw/skills"  // 系统技能目录 / System skills directory
    ]
  }
}
```

#### 4. 工具权限 / Tool Permissions

```json
{
  "tools": {
    "allow": [
      "exec",        // 执行命令 / Execute commands
      "read",        // 读取文件 / Read files
      "write",       // 写入文件 / Write files
      "web_search",  // 网络搜索 / Web search
      "browser"      // 浏览器控制 / Browser control
    ],
    "deny": [
      "message:delete"  // 禁止删除消息 / Block message deletion
    ]
  }
}
```

> ⚠️ **安全警告 / Security Warning**  
> 谨慎授予 `exec` 权限，它允许执行任意系统命令。/ Use caution granting `exec` permission, it allows arbitrary system commands.

#### 5. 内存配置 / Memory Configuration

```json
{
  "memory": {
    "enabled": true,           // 启用记忆功能 / Enable memory
    "path": "./workspace/memory",  // 存储路径 / Storage path
    "maxDays": 30,             // 保留天数 / Retention days
    "autoSave": true           // 自动保存 / Auto save
  }
}
```

#### 6. Gateway 配置 / Gateway Configuration

```json
{
  "gateway": {
    "port": 3000,              // 服务端口 / Service port
    "host": "localhost",       // 监听地址 / Listen address
    "logLevel": "info",        // 日志级别 / Log level: debug|info|warn|error
    "ssl": {
      "enabled": false,
      "cert": "./certs/cert.pem",
      "key": "./certs/key.pem"
    }
  }
}
```

---

## 🔐 环境配置 / Environment Setup

### 设置环境变量 / Set Environment Variables

#### 方法 1: 使用 .env 文件 (推荐) / Using .env file (Recommended)

创建 `.env` 文件：/ Create `.env` file:

```bash
# .env
# 模型 API 密钥 / Model API Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...

# 频道配置 / Channel Configuration
DISCORD_BOT_TOKEN=MT...
FEISHU_APP_ID=cli_...
FEISHU_APP_SECRET=...
TELEGRAM_BOT_TOKEN=...

# 其他配置 / Other Configuration
NODE_ENV=production
LOG_LEVEL=info
```

加载环境变量：/ Load environment variables:

```bash
# 在当前会话加载 / Load in current session
source .env

# 或自动加载 (添加到 ~/.bashrc 或 ~/.zshrc)
# Or auto-load (add to ~/.bashrc or ~/.zshrc)
echo 'source /path/to/your/.env' >> ~/.bashrc
source ~/.bashrc
```

#### 方法 2: 直接导出 / Direct Export

```bash
# macOS/Linux
export OPENAI_API_KEY="sk-..."
export DISCORD_BOT_TOKEN="MT..."

# Windows PowerShell
$env:OPENAI_API_KEY="sk-..."
$env:DISCORD_BOT_TOKEN="MT..."

# Windows CMD
set OPENAI_API_KEY=sk-...
set DISCORD_BOT_TOKEN=MT...
```

---

## ✅ 验证安装 / Verify Installation

### 1. 检查 OpenClaw 版本 / Check OpenClaw Version

```bash
openclaw --version
```

**预期输出 / Expected output:**
```
openclaw/1.0.0 linux-x64 node-v20.10.0
```

### 2. 检查 Gateway 状态 / Check Gateway Status

```bash
openclaw gateway status
```

**预期输出 / Expected output:**
```
✅ Gateway is running
Version: 1.0.0
Uptime: 5 minutes
Port: 3000
Model: gpt-4o-mini
```

### 3. 测试技能 / Test Skills

```bash
# 列出可用技能 / List available skills
openclaw skills list
```

**预期输出 / Expected output:**
```
Available Skills:
✅ weather - Weather forecasts
✅ healthcheck - System health checks
✅ skill-creator - Create and manage skills
```

### 4. 查看日志 / View Logs

```bash
# 实时查看日志 / View logs in real-time
openclaw gateway logs --follow

# 查看最近 100 行 / View last 100 lines
openclaw gateway logs --lines 100
```

---

## 🔧 故障排查 / Troubleshooting

### 问题 1: 安装失败 / Installation Fails

**症状 / Symptoms:**
```
npm ERR! code EACCES
npm ERR! permission denied
```

**解决方案 / Solution:**

```bash
# 方法 1: 使用 sudo / Use sudo
sudo npm install -g openclaw

# 方法 2: 修复 npm 权限 / Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g openclaw
```

---

### 问题 2: Gateway 无法启动 / Gateway Won't Start

**症状 / Symptoms:**
```
Error: Port 3000 is already in use
```

**解决方案 / Solution:**

```bash
# 方法 1: 更改端口 / Change port
# 编辑 openclaw.json
{
  "gateway": {
    "port": 3001  // 使用其他端口 / Use different port
  }
}

# 方法 2: 停止占用端口的进程 / Stop process using the port
lsof -i :3000  # 查看占用进程 / View process using port
kill -9 <PID>  # 终止进程 / Kill process
```

---

### 问题 3: API 密钥错误 / API Key Errors

**症状 / Symptoms:**
```
Error: Invalid API key
Error: Authentication failed
```

**解决方案 / Solution:**

```bash
# 1. 检查环境变量是否设置 / Check if env vars are set
echo $OPENAI_API_KEY

# 2. 验证密钥格式 / Verify key format
# OpenAI 密钥以 sk-开头 / OpenAI keys start with sk-
# Anthropic 密钥以 sk-ant-开头 / Anthropic keys start with sk-ant-

# 3. 重新设置密钥 / Reset key
export OPENAI_API_KEY="sk-..."

# 4. 测试 API 连接 / Test API connection
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

---

### 问题 4: 技能无法加载 / Skills Won't Load

**症状 / Symptoms:**
```
Warning: Failed to load skill: xxx
```

**解决方案 / Solution:**

```bash
# 1. 检查技能文件是否存在 / Check if skill files exist
ls -la ./skills/

# 2. 验证技能格式 / Verify skill format
# 技能文件必须包含 YAML frontmatter
# Skill files must include YAML frontmatter

# 3. 检查技能路径配置 / Check skill path configuration
cat openclaw.json | grep -A 5 "skills"

# 4. 重启 Gateway / Restart Gateway
openclaw gateway restart
```

---

### 问题 5: 内存不足 / Out of Memory

**症状 / Symptoms:**
```
JavaScript heap out of memory
```

**解决方案 / Solution:**

```bash
# 增加 Node.js 内存限制 / Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"

# 或修改启动脚本 / Or modify startup script
node --max-old-space-size=4096 $(which openclaw) gateway start
```

---

## 📚 下一步 / Next Steps

恭喜完成安装和配置！/ Congratulations on completing installation and configuration!

### 继续学习 / Continue Learning

1. 🛠️ [创建第一个技能](03-first-skill.md) - 学习技能开发
2. 🤖 [构建第一个机器人](04-first-bot.md) - 创建完整机器人
3. 🚀 [部署到生产环境](05-deployment.md) - 生产部署指南

### 相关资源 / Related Resources

- [官方配置文档](https://docs.openclaw.ai/config)
- [技能开发指南](https://docs.openclaw.ai/skills)
- [工具使用文档](https://docs.openclaw.ai/tools)
- [Discord 社区支持](https://discord.gg/openclaw)

---

## 📝 配置检查清单 / Configuration Checklist

- [ ] Node.js 已安装 (v18+) / Node.js installed (v18+)
- [ ] OpenClaw 全局安装 / OpenClaw globally installed
- [ ] 项目已初始化 / Project initialized
- [ ] 模型配置完成 / Model configured
- [ ] API 密钥已设置 / API keys set
- [ ] 频道配置完成 / Channel configured
- [ ] Gateway 可正常启动 / Gateway starts successfully
- [ ] 技能可以正常加载 / Skills load correctly
- [ ] 日志输出正常 / Logs output normally

---

<div align="center">

**继续学习 / Continue Learning**

[上一步：5 分钟快速上手 ←](01-5min-quickstart.md) · [下一步：创建第一个技能 →](03-first-skill.md)

[返回教程列表](../COMPLETE_TUTORIALS_LIST.md)

</div>
