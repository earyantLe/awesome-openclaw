# OpenClaw Complete Integrations List 🦞

> **Comprehensive guide to all OpenClaw integrations, plugins, and extensions**
>
> **完整 OpenClaw 集成、插件和扩展指南**

[![Last Updated](https://img.shields.io/badge/updated-2026--03--18-blue)]()
[![Total Integrations](https://img.shields.io/badge/integrations-30+-green)]()
[![Status](https://img.shields.io/badge/status-active-success)]()

---

## 📑 Table of Contents

- [Messaging Channels (消息通道)](#messaging-channels-消息通道)
- [Cloud Storage (云存储)](#cloud-storage-云存储)
- [Databases (数据库)](#databases-数据库)
- [API Integrations (API 集成)](#api-integrations-api-集成)
- [DevOps Tools (DevOps 工具)](#devops-tools-devops-工具)
- [Productivity Tools (生产力工具)](#productivity-tools-生产力工具)
- [AI & ML Services (AI 与机器学习服务)](#ai--ml-services-ai-与机器学习服务)
- [Configuration Templates (配置模板)](#configuration-templates-配置模板)

---

## Messaging Channels (消息通道)

### Discord

- **描述**: Discord bot integration for real-time community communication / Discord 机器人集成，用于实时社区通信
- **用途**: Community management, customer support, team collaboration / 社区管理、客户支持、团队协作
- **安装**: 
  ```bash
  npm install -g openclaw
  # Enable Discord plugin in openclaw.json
  ```
- **配置**: 
  ```json
  {
    "channels": {
      "discord": {
        "enabled": true,
        "botToken": "YOUR_BOT_TOKEN",
        "guildId": "YOUR_GUILD_ID"
      }
    }
  }
  ```
- **最佳实践**: 
  - Use rate limiting to avoid API bans / 使用速率限制避免 API 封禁
  - Implement proper error handling / 实现适当的错误处理
  - Set up logging for debugging / 设置日志用于调试
- **链接**: [Discord API Docs](https://discord.com/developers/docs) | [OpenClaw Discord](https://github.com/openclaw-ai/openclaw)
- **难度**: ⭐⭐⭐
- **状态**: ✅ Active

---

### Telegram

- **描述**: Telegram bot integration for messaging and notifications / Telegram 机器人集成，用于消息和通知
- **用途**: Personal assistant, notifications, automated responses / 个人助理、通知、自动回复
- **安装**: 
  ```bash
  npm install -g openclaw
  # Create bot via @BotFather, get token
  ```
- **配置**: 
  ```json
  {
    "channels": {
      "telegram": {
        "enabled": true,
        "botToken": "YOUR_BOT_TOKEN"
      }
    }
  }
  ```
- **最佳实践**: 
  - Store bot tokens securely / 安全存储机器人令牌
  - Use webhooks for real-time updates / 使用 webhook 实现实时更新
  - Implement command handlers / 实现命令处理器
- **链接**: [Telegram Bot API](https://core.telegram.org/bots/api)
- **难度**: ⭐⭐
- **状态**: ✅ Active

---

### WhatsApp

- **描述**: WhatsApp Business API integration for customer communication / WhatsApp Business API 集成，用于客户通信
- **用途**: Customer support, business messaging, notifications / 客户支持、商务消息、通知
- **安装**: 
  ```bash
  npm install -g openclaw
  # Set up WhatsApp Business API account
  ```
- **配置**: 
  ```json
  {
    "channels": {
      "whatsapp": {
        "enabled": true,
        "phoneNumberId": "YOUR_PHONE_NUMBER_ID",
        "accessToken": "YOUR_ACCESS_TOKEN"
      }
    }
  }
  ```
- **最佳实践**: 
  - Follow WhatsApp template guidelines / 遵循 WhatsApp 模板指南
  - Implement opt-in/opt-out mechanisms / 实现选择加入/退出机制
  - Monitor message quality ratings / 监控消息质量评级
- **链接**: [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)
- **难度**: ⭐⭐⭐⭐
- **状态**: ✅ Active

---

### Feishu/Lark (飞书)

- **描述**: Deep integration with Feishu/Lark enterprise platform (IM, Calendar, Docs, Bitable) / 与飞书/Lark 企业平台深度集成（IM、日历、文档、多维表格）
- **用途**: Enterprise automation, meeting scheduling, document management / 企业自动化、会议安排、文档管理
- **安装**: 
  ```bash
  npm install -g openclaw
  npm install @larksuiteoapi/feishu-openclaw-plugin
  ```
- **配置**: 
  ```json
  {
    "plugins": {
      "feishu-openclaw-plugin": {
        "enabled": true,
        "appId": "cli_xxx",
        "appSecret": "YOUR_APP_SECRET"
      }
    },
    "channels": {
      "feishu": {
        "enabled": true,
        "appId": "cli_xxx",
        "appSecret": "YOUR_APP_SECRET"
      }
    }
  }
  ```
- **最佳实践**: 
  - Use OAuth for user authentication / 使用 OAuth 进行用户认证
  - Implement rate limiting for API calls / 对 API 调用实施速率限制
  - Cache frequently accessed data / 缓存频繁访问的数据
- **链接**: [Feishu Open Platform](https://open.feishu.cn/document) | [GitHub](https://github.com/earyantLe/feishu-openclaw-plugin)
- **难度**: ⭐⭐⭐⭐
- **状态**: ✅ Active

---

### Slack

- **描述**: Slack bot integration for team collaboration / Slack 机器人集成，用于团队协作
- **用途**: Team communication, workflow automation, notifications / 团队通信、工作流自动化、通知
- **安装**: 
  ```bash
  npm install -g openclaw
  # Create Slack app, get bot token
  ```
- **配置**: 
  ```json
  {
    "channels": {
      "slack": {
        "enabled": true,
        "botToken": "xoxb-YOUR-BOT-TOKEN",
        "signingSecret": "YOUR_SIGNING_SECRET"
      }
    }
  }
  ```
- **最佳实践**: 
  - Use Slack Bolt framework / 使用 Slack Bolt 框架
  - Implement interactive components / 实现交互式组件
  - Set up proper scopes and permissions / 设置适当的范围和权限
- **链接**: [Slack API](https://api.slack.com/)
- **难度**: ⭐⭐⭐
- **状态**: ✅ Active

---

### Signal

- **描述**: Signal messenger integration for secure communication / Signal 消息集成，用于安全通信
- **用途**: Encrypted messaging, privacy-focused notifications / 加密消息、隐私保护通知
- **安装**: 
  ```bash
  npm install -g openclaw
  # Set up signal-cli
  ```
- **配置**: 
  ```json
  {
    "channels": {
      "signal": {
        "enabled": true,
        "phoneNumber": "+1234567890",
        "signalCliPath": "/usr/bin/signal-cli"
      }
    }
  }
  ```
- **最佳实践**: 
  - Secure signal-cli installation / 保护 signal-cli 安装
  - Implement message encryption / 实现消息加密
  - Regular backup of keys / 定期备份密钥
- **链接**: [Signal CLI](https://github.com/AsamK/signal-cli)
- **难度**: ⭐⭐⭐⭐⭐
- **状态**: ⚠️ Experimental

---

### Line

- **描述**: LINE messaging platform integration / LINE 消息平台集成
- **用途**: Customer engagement, marketing, notifications / 客户互动、营销、通知
- **安装**: 
  ```bash
  npm install -g openclaw
  # Create LINE provider, get channel token
  ```
- **配置**: 
  ```json
  {
    "channels": {
      "line": {
        "enabled": true,
        "channelAccessToken": "YOUR_CHANNEL_TOKEN",
        "channelSecret": "YOUR_CHANNEL_SECRET"
      }
    }
  }
  ```
- **最佳实践**: 
  - Use LINE LIFF for rich interfaces / 使用 LINE LIFF 实现丰富界面
  - Implement reply tokens properly / 正确使用回复令牌
  - Follow LINE design guidelines / 遵循 LINE 设计指南
- **链接**: [LINE Developers](https://developers.line.biz/)
- **难度**: ⭐⭐⭐
- **状态**: ✅ Active

---

## Cloud Storage (云存储)

### AWS S3

- **描述**: Amazon S3 cloud storage integration / 亚马逊 S3 云存储集成
- **用途**: File storage, backup, static asset hosting / 文件存储、备份、静态资源托管
- **安装**: 
  ```bash
  npm install aws-sdk
  ```
- **配置**: 
  ```json
  {
    "storage": {
      "aws-s3": {
        "enabled": true,
        "region": "us-east-1",
        "bucket": "your-bucket-name",
        "accessKeyId": "YOUR_ACCESS_KEY",
        "secretAccessKey": "YOUR_SECRET_KEY"
      }
    }
  }
  ```
- **最佳实践**: 
  - Use IAM roles instead of keys / 使用 IAM 角色代替密钥
  - Enable versioning for important files / 为重要文件启用版本控制
  - Implement lifecycle policies / 实施生命周期策略
- **链接**: [AWS S3 Docs](https://docs.aws.amazon.com/s3/)
- **难度**: ⭐⭐⭐
- **状态**: ✅ Active

---

### Google Cloud Storage

- **描述**: Google Cloud Storage integration / 谷歌云存储集成
- **用途**: File storage, data lakes, backup / 文件存储、数据湖、备份
- **安装**: 
  ```bash
  npm install @google-cloud/storage
  ```
- **配置**: 
  ```json
  {
    "storage": {
      "gcs": {
        "enabled": true,
        "projectId": "your-project-id",
        "bucket": "your-bucket-name",
        "keyFilename": "./service-account.json"
      }
    }
  }
  ```
- **最佳实践**: 
  - Use service accounts for authentication / 使用服务账户进行认证
  - Implement uniform bucket-level access / 实施统一桶级访问
  - Set up CORS for web access / 为 Web 访问设置 CORS
- **链接**: [GCS Docs](https://cloud.google.com/storage/docs)
- **难度**: ⭐⭐⭐
- **状态**: ✅ Active

---

### Azure Blob Storage

- **描述**: Microsoft Azure Blob Storage integration / 微软 Azure Blob 存储集成
- **用途**: Enterprise storage, backup, archival / 企业存储、备份、归档
- **安装**: 
  ```bash
  npm install @azure/storage-blob
  ```
- **配置**: 
  ```json
  {
    "storage": {
      "azure-blob": {
        "enabled": true,
        "connectionString": "YOUR_CONNECTION_STRING",
        "containerName": "your-container"
      }
    }
  }
  ```
- **最佳实践**: 
  - Use managed identities / 使用托管身份
  - Implement soft delete for recovery / 实施软删除以恢复
  - Set up access tiers / 设置访问层级
- **链接**: [Azure Blob Docs](https://docs.microsoft.com/azure/storage/blobs/)
- **难度**: ⭐⭐⭐
- **状态**: ✅ Active

---

## Databases (数据库)

### PostgreSQL

- **描述**: PostgreSQL relational database integration / PostgreSQL 关系数据库集成
- **用途**: Data persistence, analytics, transactional systems / 数据持久化、分析、事务系统
- **安装**: 
  ```bash
  npm install pg
  ```
- **配置**: 
  ```json
  {
    "database": {
      "postgresql": {
        "enabled": true,
        "host": "localhost",
        "port": 5432,
        "database": "openclaw_db",
        "user": "openclaw",
        "password": "YOUR_PASSWORD",
        "ssl": true
      }
    }
  }
  ```
- **最佳实践**: 
  - Use connection pooling / 使用连接池
  - Implement prepared statements / 实现预编译语句
  - Regular backups and maintenance / 定期备份和维护
- **链接**: [PostgreSQL Docs](https://www.postgresql.org/docs/)
- **难度**: ⭐⭐⭐
- **状态**: ✅ Active

---

### MySQL

- **描述**: MySQL relational database integration / MySQL 关系数据库集成
- **用途**: Web applications, CMS, e-commerce / Web 应用、CMS、电子商务
- **安装**: 
  ```bash
  npm install mysql2
  ```
- **配置**: 
  ```json
  {
    "database": {
      "mysql": {
        "enabled": true,
        "host": "localhost",
        "port": 3306,
        "database": "openclaw_db",
        "user": "openclaw",
        "password": "YOUR_PASSWORD"
      }
    }
  }
  ```
- **最佳实践**: 
  - Use connection pooling / 使用连接池
  - Implement proper indexing / 实现适当的索引
  - Enable query caching / 启用查询缓存
- **链接**: [MySQL Docs](https://dev.mysql.com/doc/)
- **难度**: ⭐⭐
- **状态**: ✅ Active

---

### MongoDB

- **描述**: MongoDB NoSQL database integration / MongoDB NoSQL 数据库集成
- **用途**: Document storage, real-time analytics, content management / 文档存储、实时分析、内容管理
- **安装**: 
  ```bash
  npm install mongodb
  ```
- **配置**: 
  ```json
  {
    "database": {
      "mongodb": {
        "enabled": true,
        "uri": "mongodb://localhost:27017",
        "database": "openclaw_db",
        "collection": "documents"
      }
    }
  }
  ```
- **最佳实践**: 
  - Use indexes for queries / 为查询使用索引
  - Implement schema validation / 实现模式验证
  - Set up replica sets for HA / 设置副本集实现高可用
- **链接**: [MongoDB Docs](https://docs.mongodb.com/)
- **难度**: ⭐⭐⭐
- **状态**: ✅ Active

---

### Redis

- **描述**: Redis in-memory data store integration / Redis 内存数据存储集成
- **用途**: Caching, session management, real-time data / 缓存、会话管理、实时数据
- **安装**: 
  ```bash
  npm install redis
  ```
- **配置**: 
  ```json
  {
    "database": {
      "redis": {
        "enabled": true,
        "host": "localhost",
        "port": 6379,
        "password": "YOUR_PASSWORD",
        "db": 0
      }
    }
  }
  ```
- **最佳实践**: 
  - Use Redis Sentinel for HA / 使用 Redis Sentinel 实现高可用
  - Implement key expiration / 实现键过期
  - Use appropriate data structures / 使用适当的数据结构
- **链接**: [Redis Docs](https://redis.io/documentation)
- **难度**: ⭐⭐
- **状态**: ✅ Active

---

## API Integrations (API 集成)

### OpenAI

- **描述**: OpenAI GPT API integration for AI capabilities / OpenAI GPT API 集成，用于 AI 能力
- **用途**: Text generation, chatbots, content creation / 文本生成、聊天机器人、内容创作
- **安装**: 
  ```bash
  npm install openai
  ```
- **配置**: 
  ```json
  {
    "ai": {
      "openai": {
        "enabled": true,
        "apiKey": "sk-YOUR-API-KEY",
        "model": "gpt-4",
        "maxTokens": 4096
      }
    }
  }
  ```
- **最佳实践**: 
  - Implement rate limiting / 实施速率限制
  - Use streaming for long responses / 对长响应使用流式传输
  - Cache common responses / 缓存常见响应
- **链接**: [OpenAI API](https://platform.openai.com/docs/)
- **难度**: ⭐⭐
- **状态**: ✅ Active

---

### Anthropic

- **描述**: Anthropic Claude API integration / Anthropic Claude API 集成
- **用途**: Safe AI assistant, content analysis, reasoning / 安全 AI 助手、内容分析、推理
- **安装**: 
  ```bash
  npm install @anthropic-ai/sdk
  ```
- **配置**: 
  ```json
  {
    "ai": {
      "anthropic": {
        "enabled": true,
        "apiKey": "sk-ant-YOUR-API-KEY",
        "model": "claude-3-opus-20240229",
        "maxTokens": 4096
      }
    }
  }
  ```
- **最佳实践**: 
  - Use system prompts for context / 使用系统提示提供上下文
  - Implement proper error handling / 实现适当的错误处理
  - Monitor token usage / 监控令牌使用
- **链接**: [Anthropic API](https://docs.anthropic.com/claude/docs)
- **难度**: ⭐⭐
- **状态**: ✅ Active

---

### Google AI

- **描述**: Google AI (Gemini) API integration / 谷歌 AI (Gemini) API 集成
- **用途**: Multimodal AI, vision, language understanding / 多模态 AI、视觉、语言理解
- **安装**: 
  ```bash
  npm install @google/generative-ai
  ```
- **配置**: 
  ```json
  {
    "ai": {
      "google": {
        "enabled": true,
        "apiKey": "YOUR-API-KEY",
        "model": "gemini-pro",
        "maxOutputTokens": 2048
      }
    }
  }
  ```
- **最佳实践**: 
  - Use appropriate safety settings / 使用适当的安全设置
  - Implement retry logic / 实现重试逻辑
  - Monitor quota usage / 监控配额使用
- **链接**: [Google AI](https://ai.google.dev/)
- **难度**: ⭐⭐
- **状态**: ✅ Active

---

### Microsoft Azure AI

- **描述**: Microsoft Azure AI Services integration / 微软 Azure AI 服务集成
- **用途**: Computer vision, speech, language services / 计算机视觉、语音、语言服务
- **安装**: 
  ```bash
  npm install @azure/ai-text-analytics
  ```
- **配置**: 
  ```json
  {
    "ai": {
      "azure": {
        "enabled": true,
        "endpoint": "https://YOUR_RESOURCE.cognitiveservices.azure.com/",
        "apiKey": "YOUR-API-KEY",
        "service": "text-analytics"
      }
    }
  }
  ```
- **最佳实践**: 
  - Use managed identities / 使用托管身份
  - Implement request throttling / 实现请求节流
  - Monitor service health / 监控服务健康
- **链接**: [Azure AI](https://azure.microsoft.com/en-us/products/ai-services/)
- **难度**: ⭐⭐⭐
- **状态**: ✅ Active

---

## DevOps Tools (DevOps 工具)

### GitHub

- **描述**: GitHub API integration for repository management / GitHub API 集成，用于仓库管理
- **用途**: CI/CD, issue tracking, code review / 持续集成/部署、问题跟踪、代码审查
- **安装**: 
  ```bash
  npm install @octokit/rest
  ```
- **配置**: 
  ```json
  {
    "devops": {
      "github": {
        "enabled": true,
        "token": "ghp_YOUR_TOKEN",
        "owner": "your-username",
        "repo": "your-repo"
      }
    }
  }
  ```
- **最佳实践**: 
  - Use fine-grained tokens / 使用细粒度令牌
  - Implement webhook handlers / 实现 webhook 处理器
  - Cache API responses / 缓存 API 响应
- **链接**: [GitHub API](https://docs.github.com/en/rest)
- **难度**: ⭐⭐⭐
- **状态**: ✅ Active

---

### GitLab

- **描述**: GitLab API integration for DevOps automation / GitLab API 集成，用于 DevOps 自动化
- **用途**: CI/CD pipelines, issue tracking, code management / CI/CD 流水线、问题跟踪、代码管理
- **安装**: 
  ```bash
  npm install @gitbeaker/rest
  ```
- **配置**: 
  ```json
  {
    "devops": {
      "gitlab": {
        "enabled": true,
        "token": "YOUR_TOKEN",
        "host": "https://gitlab.com",
        "projectId": 12345
      }
    }
  }
  ```
- **最佳实践**: 
  - Use project access tokens / 使用项目访问令牌
  - Implement pipeline triggers / 实现流水线触发
  - Monitor CI/CD metrics / 监控 CI/CD 指标
- **链接**: [GitLab API](https://docs.gitlab.com/ee/api/)
- **难度**: ⭐⭐⭐
- **状态**: ✅ Active

---

### Jenkins

- **描述**: Jenkins CI/CD integration / Jenkins CI/CD 集成
- **用途**: Build automation, deployment, testing / 构建自动化、部署、测试
- **安装**: 
  ```bash
  npm install jenkins
  ```
- **配置**: 
  ```json
  {
    "devops": {
      "jenkins": {
        "enabled": true,
        "baseUrl": "https://jenkins.example.com",
        "username": "YOUR_USERNAME",
        "apiKey": "YOUR_API_TOKEN"
      }
    }
  }
  ```
- **最佳实践**: 
  - Use API tokens instead of passwords / 使用 API 令牌代替密码
  - Implement job status monitoring / 实现作业状态监控
  - Set up proper credentials / 设置适当的凭证
- **链接**: [Jenkins API](https://www.jenkins.io/doc/book/using/remote-access-api/)
- **难度**: ⭐⭐⭐⭐
- **状态**: ✅ Active

---

### Docker

- **描述**: Docker containerization integration / Docker 容器化集成
- **用途**: Container management, deployment, orchestration / 容器管理、部署、编排
- **安装**: 
  ```bash
  npm install dockerode
  ```
- **配置**: 
  ```json
  {
    "devops": {
      "docker": {
        "enabled": true,
        "socketPath": "/var/run/docker.sock",
        "host": "tcp://localhost:2375"
      }
    }
  }
  ```
- **最佳实践**: 
  - Use Docker socket carefully / 小心使用 Docker 套接字
  - Implement resource limits / 实现资源限制
  - Monitor container health / 监控容器健康
- **链接**: [Docker API](https://docs.docker.com/engine/api/)
- **难度**: ⭐⭐⭐⭐
- **状态**: ✅ Active

---

## Productivity Tools (生产力工具)

### Notion

- **描述**: Notion workspace integration / Notion 工作区集成
- **用途**: Note-taking, project management, knowledge base / 笔记、项目管理、知识库
- **安装**: 
  ```bash
  npm install @notionhq/client
  ```
- **配置**: 
  ```json
  {
    "productivity": {
      "notion": {
        "enabled": true,
        "apiKey": "secret_YOUR_API_KEY",
        "databaseId": "YOUR_DATABASE_ID"
      }
    }
  }
  ```
- **最佳实践**: 
  - Use appropriate database schemas / 使用适当的数据库模式
  - Implement pagination for large datasets / 为大数据集实现分页
  - Cache frequently accessed pages / 缓存频繁访问的页面
- **链接**: [Notion API](https://developers.notion.com/)
- **难度**: ⭐⭐⭐
- **状态**: ✅ Active

---

### Google Calendar

- **描述**: Google Calendar integration for scheduling / 谷歌日历集成，用于日程安排
- **用途**: Meeting scheduling, reminders, event management / 会议安排、提醒、事件管理
- **安装**: 
  ```bash
  npm install googleapis
  ```
- **配置**: 
  ```json
  {
    "productivity": {
      "google-calendar": {
        "enabled": true,
        "credentials": "./credentials.json",
        "calendarId": "primary"
      }
    }
  }
  ```
- **最佳实践**: 
  - Use OAuth 2.0 for authentication / 使用 OAuth 2.0 进行认证
  - Implement proper token refresh / 实现适当的令牌刷新
  - Handle timezone correctly / 正确处理时区
- **链接**: [Google Calendar API](https://developers.google.com/calendar)
- **难度**: ⭐⭐⭐
- **状态**: ✅ Active

---

### Trello

- **描述**: Trello project management integration / Trello 项目管理集成
- **用途**: Task tracking, project boards, team collaboration / 任务跟踪、项目看板、团队协作
- **安装**: 
  ```bash
  npm install node-trello
  ```
- **配置**: 
  ```json
  {
    "productivity": {
      "trello": {
        "enabled": true,
        "apiKey": "YOUR_API_KEY",
        "token": "YOUR_TOKEN",
        "boardId": "YOUR_BOARD_ID"
      }
    }
  }
  ```
- **最佳实践**: 
  - Use webhooks for real-time updates / 使用 webhook 实现实时更新
  - Implement proper error handling / 实现适当的错误处理
  - Cache board data / 缓存看板数据
- **链接**: [Trello API](https://developer.atlassian.com/cloud/trello/)
- **难度**: ⭐⭐
- **状态**: ✅ Active

---

## AI & ML Services (AI 与机器学习服务)

### ElevenLabs TTS

- **描述**: ElevenLabs text-to-speech integration / ElevenLabs 文本转语音集成
- **用途**: Voice generation, audiobooks, accessibility / 语音生成、有声读物、无障碍访问
- **安装**: 
  ```bash
  npm install elevenlabs
  ```
- **配置**: 
  ```json
  {
    "ai": {
      "elevenlabs": {
        "enabled": true,
        "apiKey": "YOUR_API_KEY",
        "voiceId": "EXAVITQu4vr4xnSDxMaL",
        "modelId": "eleven_monolingual_v1"
      }
    }
  }
  ```
- **最佳实践**: 
  - Cache generated audio files / 缓存生成的音频文件
  - Use appropriate voice settings / 使用适当的语音设置
  - Monitor character usage / 监控字符使用
- **链接**: [ElevenLabs API](https://elevenlabs.io/docs/)
- **难度**: ⭐⭐
- **状态**: ✅ Active

---

### Brave Search

- **描述**: Brave Search API integration for web search / Brave Search API 集成，用于网络搜索
- **用途**: Web search, research, information retrieval / 网络搜索、研究、信息检索
- **安装**: 
  ```bash
  npm install node-fetch
  ```
- **配置**: 
  ```json
  {
    "ai": {
      "brave-search": {
        "enabled": true,
        "apiKey": "YOUR_API_KEY",
        "count": 10,
        "country": "US"
      }
    }
  }
  ```
- **最佳实践**: 
  - Implement rate limiting / 实施速率限制
  - Cache search results / 缓存搜索结果
  - Handle pagination properly / 正确处理分页
- **链接**: [Brave Search API](https://brave.com/search/api/)
- **难度**: ⭐⭐
- **状态**: ✅ Active

---

### Playwright

- **描述**: Playwright browser automation integration / Playwright 浏览器自动化集成
- **用途**: Web scraping, testing, automation / 网络爬虫、测试、自动化
- **安装**: 
  ```bash
  npm install playwright
  npx playwright install
  ```
- **配置**: 
  ```json
  {
    "browser": {
      "enabled": true,
      "executablePath": "/usr/bin/chromium-browser",
      "headless": true,
      "defaultProfile": "openclaw"
    }
  }
  ```
- **最佳实践**: 
  - Use headless mode in production / 在生产环境使用无头模式
  - Implement proper wait strategies / 实现适当的等待策略
  - Handle dynamic content / 处理动态内容
- **链接**: [Playwright Docs](https://playwright.dev/)
- **难度**: ⭐⭐⭐⭐
- **状态**: ✅ Active

---

## Configuration Templates (配置模板)

For detailed configuration templates, see the [config-templates](./config-templates/) directory.

### Quick Reference

| Template | File | Description |
|----------|------|-------------|
| Discord Bot | `discord-bot.json` | Discord 机器人配置模板 |
| Telegram Bot | `telegram-bot.json` | Telegram 机器人配置模板 |
| Feishu/Lark | `feishu-config.json` | 飞书/Lark 配置模板 |
| Slack Bot | `slack-bot.json` | Slack 机器人配置模板 |
| PostgreSQL | `postgresql-config.json` | PostgreSQL 数据库配置 |
| MongoDB | `mongodb-config.json` | MongoDB 数据库配置 |
| Redis | `redis-config.json` | Redis 缓存配置 |
| OpenAI | `openai-config.json` | OpenAI API 配置 |
| AWS S3 | `aws-s3-config.json` | AWS S3 存储配置 |
| Docker | `docker-config.json` | Docker 容器配置 |

---

## Integration Status Summary

| Category | Total | Active | Experimental | Deprecated |
|----------|-------|--------|--------------|------------|
| Messaging | 7 | 6 | 1 | 0 |
| Storage | 3 | 3 | 0 | 0 |
| Databases | 4 | 4 | 0 | 0 |
| API Integrations | 4 | 4 | 0 | 0 |
| DevOps | 4 | 4 | 0 | 0 |
| Productivity | 3 | 3 | 0 | 0 |
| AI & ML | 3 | 3 | 0 | 0 |
| **Total** | **28** | **27** | **1** | **0** |

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Test all integrations before submitting
2. Provide clear installation steps
3. Include configuration examples
4. Add troubleshooting tips
5. Keep descriptions bilingual (Chinese/English)

See [CONTRIBUTING.md](../CONTRIBUTING.md) for details.

---

<div align="center">

**Made with 🦞 by the OpenClaw Community**

[OpenClaw](https://github.com/openclaw-ai/openclaw) | [Documentation](https://docs.openclaw.ai) | [Discord](https://discord.gg/openclaw)

[⬆ Back to Top](#openclaw-complete-integrations-list-)

</div>

---

> 📅 **Last Updated:** 2026-03-18  
> 🔍 **Links Checked:** 2026-03-18  
> 📊 **Status:** ✅ Active Maintenance
