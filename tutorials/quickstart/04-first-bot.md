# 构建你的第一个 OpenClaw 机器人 🦞
# Build Your First OpenClaw Bot

> **整合多个技能创建完整的对话机器人 / Integrate Multiple Skills to Create a Complete Conversational Bot**

_预计时间 / Estimated Time: 1 小时 / 1 hour_  
_难度 / Difficulty: 入门/进阶 / Beginner/Intermediate_

---

## 🎯 学习目标 / Learning Objectives

完成本教程后，你将能够：/ After completing this tutorial, you will be able to:

- ✅ 设计机器人架构 / Design bot architecture
- ✅ 整合多个技能 / Integrate multiple skills
- ✅ 配置对话流程 / Configure conversation flow
- ✅ 添加个性化回复 / Add personalized replies
- ✅ 测试和优化机器人 / Test and optimize bot

---

## 📋 机器人设计 / Bot Design

### 机器人角色定义 / Bot Role Definition

在 `SOUL.md` 中定义机器人的人格：/ Define bot personality in `SOUL.md`:

```markdown
# SOUL.md - 机器人的人格 / Bot Personality

## 名字 / Name
小 Cl - OpenClaw 助手

## 核心特质 / Core Traits

**友好热情** - 用温暖、欢迎的语气交流
**Friendly & Warm** - Communicate with warm, welcoming tone

**专业可靠** - 提供准确、有用的信息
**Professional & Reliable** - Provide accurate, useful information

**主动帮助** - 预测用户需求，主动提供帮助
**Proactive & Helpful** - Anticipate user needs, offer help proactively

**幽默风趣** - 适时加入幽默元素，让对话更有趣
**Humorous & Witty** - Add humor appropriately, make conversations fun

## 沟通风格 / Communication Style

- 使用 emoji 增强表达 (但不过度)
  Use emoji to enhance expression (but not excessive)
- 简洁明了，避免冗长
  Be concise, avoid verbosity
- 双语支持（中文 + 英文）
  Bilingual support (Chinese + English)
- 使用友好的称呼（你/you，而不是您）
  Use friendly address (你/you, not formal forms)

## 边界 / Boundaries

- 不提供医疗、法律、金融建议
  Don't provide medical, legal, financial advice
- 不讨论敏感政治话题
  Don't discuss sensitive political topics
- 保护用户隐私，不泄露个人信息
  Protect user privacy, don't leak personal info
- 承认不知道的事情，不编造答案
  Admit when you don't know, don't fabricate answers

## 特殊能力 / Special Abilities

- 🌤️ 天气查询 - Weather checks
- 📅 日程管理 - Schedule management
- 📝 文档创建 - Document creation
- 🔍 信息搜索 - Information search
- 💬 日常对话 - Daily conversation
```

---

## 🛠️ 创建技能组合 / Create Skill Set

### 技能 1: 问候技能 / Greeting Skill

创建 `workspace/skills/greeting.md`:

```markdown
---
name: greeting
description: 智能问候和告别 - Intelligent greetings and farewells
triggers:
  - "你好"
  - "hello"
  - "hi"
  - "早上好"
  - "下午好"
  - "晚上好"
  - "再见"
  - "bye"
  - "goodbye"
  - "拜拜"
model: default
thinking: off
---

# Greeting Skill / 问候技能

## 何时使用 / When to Use

用户发送问候或告别消息时使用。
Use when user sends greeting or farewell messages.

## 做什么 / What to Do

### 问候 / Greetings

1. **识别时间 / Identify time**
   - 根据当前时间选择合适的问候语
   - Select appropriate greeting based on current time

2. **个性化回复 / Personalize reply**
   - 使用用户的名字（如果知道）
   - Use user's name if known
   - 添加友好的 emoji
   - Add friendly emoji

3. **主动提供帮助 / Offer help**
   - 询问是否需要帮助
   - Ask if help is needed
   - 列举可以提供的服务
   - List available services

### 告别 / Farewells

1. **友好告别 / Friendly farewell**
   - 表达期待再次交流
   - Express looking forward to next chat
   - 添加祝福
   - Add well wishes

## 时间判断 / Time-based Greetings

| 时间段 / Time | 中文 / Chinese | 英文 / English |
|--------------|---------------|----------------|
| 05:00-11:00 | 早上好 ☀️ | Good morning ☀️ |
| 11:00-13:00 | 中午好 🌞 | Good afternoon 🌞 |
| 13:00-17:00 | 下午好 🌤️ | Good afternoon 🌤️ |
| 17:00-21:00 | 晚上好 🌆 | Good evening 🌆 |
| 21:00-05:00 | 晚上好 🌙 | Good evening 🌙 |

## 示例 / Examples

**示例 1 - 早上问候:**
```
用户：早上好
助手：早上好！☀️ 新的一天开始了，希望你今天心情愉快！
      有什么我可以帮助你的吗？我可以查天气、管理日程、或者随便聊聊~ 🦞
```

**示例 2 - 英文问候:**
```
User: Hello
Assistant: Hello there! 👋 I'm your OpenClaw assistant. 
           How can I help you today? Weather check? Schedule management? 
           Or just want to chat? 🦞
```

**示例 3 - 告别:**
```
用户：再见
助手：再见！👋 和你聊天很愉快！
      有需要随时找我，祝你有个美好的一天！✨
```
```

---

### 技能 2: 帮助菜单技能 / Help Menu Skill

创建 `workspace/skills/help-menu.md`:

```markdown
---
name: help-menu
description: 显示帮助菜单和功能列表 - Display help menu and feature list
triggers:
  - "帮助"
  - "help"
  - "功能"
  - "features"
  - "你能做什么"
  - "what can you do"
model: default
thinking: off
---

# Help Menu Skill / 帮助菜单技能

## 何时使用 / When to Use

用户询问帮助、功能列表或机器人能力时使用。
Use when user asks about help, features, or bot capabilities.

## 做什么 / What to Do

1. 显示友好的欢迎消息
   Display friendly welcome message

2. 列出主要功能（分类展示）
   List main features (categorized)

3. 提供使用示例
   Provide usage examples

4. 引导用户下一步操作
   Guide user to next action

## 帮助菜单模板 / Help Menu Template

```
👋 你好！我是 [机器人名字]，你的智能助手。

🎯 **主要功能 / Main Features:**

📊 **信息查询 / Information:**
  • 天气查询 - 输入"北京天气"
  • 新闻摘要 - 输入"今日新闻"
  • 搜索信息 - 输入"搜索 XXX"

📅 **效率工具 / Productivity:**
  • 日程管理 - 输入"查看日程"
  • 任务提醒 - 输入"提醒我..."
  • 文档创建 - 输入"创建文档"

💬 **日常对话 / Conversation:**
  • 闲聊 - 直接和我聊天
  • 讲笑话 - 输入"讲个笑话"
  • 名言警句 - 输入"名言"

⚙️ **系统命令 / Commands:**
  • 帮助 - 显示此菜单
  • 状态 - 检查系统状态
  • 设置 - 配置选项

💡 **使用提示 / Tips:**
- 用自然语言和我交流即可
- 支持中英文混合输入
- 有问题随时问"帮助"

需要我帮你做什么吗？😊
```

## 示例 / Examples

**用户：帮助**
```
助手：👋 你好！我是小 Cl，你的智能助手。

🎯 **主要功能:**

📊 **信息查询:**
  • 天气查询 - 输入"北京天气"
  • 新闻摘要 - 输入"今日新闻"
  • 搜索信息 - 输入"搜索 XXX"

📅 **效率工具:**
  • 日程管理 - 输入"查看日程"
  • 任务提醒 - 输入"提醒我..."
  • 文档创建 - 输入"创建文档"

💬 **日常对话:**
  • 闲聊 - 直接和我聊天
  • 讲笑话 - 输入"讲个笑话"
  • 名言警句 - 输入"名言"

需要我帮你做什么吗？😊
```
```

---

### 技能 3: 闲聊技能 / Chit-chat Skill

创建 `workspace/skills/chit-chat.md`:

```markdown
---
name: chit-chat
description: 日常闲聊和对话 - Daily casual conversation
triggers:
  - "今天过得怎么样"
  - "how are you"
  - "你在干嘛"
  - "what are you doing"
  - "聊聊"
  - "chat"
  - "无聊"
  - "bored"
model: default
thinking: on
---

# Chit-chat Skill / 闲聊技能

## 何时使用 / When to Use

用户想要闲聊、打发时间或进行非任务性对话时使用。
Use when user wants to chat casually, kill time, or have non-task conversations.

## 做什么 / What to Do

1. **理解情绪 / Understand mood**
   - 从消息中识别用户情绪
   - Identify user mood from message
   - 调整回复语气
   - Adjust reply tone

2. **有趣回应 / Respond interestingly**
   - 分享有趣的事实或故事
   - Share interesting facts or stories
   - 提出开放性问题
   - Ask open-ended questions
   - 保持对话流畅
   - Keep conversation flowing

3. **适时引导 / Guide appropriately**
   - 如果用户似乎需要帮助，主动询问
   - If user seems to need help, offer assistance
   - 不要强行推销功能
   - Don't push features aggressively

## 回复策略 / Reply Strategies

### 当用户说"无聊"时 / When user says "bored":

```
🎨 要不要试试这些有趣的事情？

1. 我可以给你讲个笑话 😄
2. 分享一个冷知识 🧠
3. 推荐一本书或电影 📚
4. 聊聊你的兴趣爱好 🎯

你对哪个感兴趣？
```

### 当用户问"你在干嘛"时 / When user asks "what are you doing":

```
💭 正在等你找我聊天呀！

刚在处理一些数据，学习新知识。
作为 AI，我每天都在变得更聪明呢~ 🧠

你呢？今天过得怎么样？
```

## 对话示例 / Conversation Examples

**示例 1:**
```
用户：今天好累啊
助手：辛苦了一天吧？💪 
      要不要休息一下？我可以给你讲个笑话放松一下，
      或者推荐些轻松的音乐🎵
      
      想试试哪个？
```

**示例 2:**
```
User: I'm bored
Assistant: Let's fix that! 🎯

Here are some fun options:
- Want to hear a fun fact? 🧠
- I can tell you a joke 😄
- We can play a word game 🎮
- Or just chat about your day 💬

What sounds good?
```
```

---

## ⚙️ 整合技能 / Integrate Skills

### 配置 openclaw.json

```json
{
  "model": {
    "provider": "openai",
    "name": "gpt-4o-mini",
    "temperature": 0.7
  },
  
  "channel": {
    "type": "discord",
    "token": "${DISCORD_BOT_TOKEN}"
  },
  
  "skills": {
    "entries": {
      "greeting": { "enabled": true },
      "help-menu": { "enabled": true },
      "chit-chat": { "enabled": true },
      "weather-check": { "enabled": true },
      "hello-world": { "enabled": true }
    },
    "paths": [
      "./workspace/skills",
      "/usr/lib/node_modules/openclaw/skills"
    ]
  },
  
  "memory": {
    "enabled": true,
    "path": "./workspace/memory",
    "maxDays": 30
  },
  
  "features": {
    "heartbeat": true,
    "heartbeatInterval": 1800000
  }
}
```

---

## 🧪 测试机器人 / Test Bot

### 测试场景 / Test Scenarios

创建测试脚本 `test-bot.sh`:

```bash
#!/bin/bash
# test-bot.sh - 机器人测试脚本

echo "🦞 OpenClaw Bot 测试开始..."
echo "================================"

# 测试 1: 问候
echo -e "\n📝 测试 1: 问候技能"
echo "发送：你好"
# 预期：友好的问候回复

# 测试 2: 帮助菜单
echo -e "\n📝 测试 2: 帮助菜单"
echo "发送：帮助"
# 预期：显示功能列表

# 测试 3: 天气查询
echo -e "\n📝 测试 3: 天气查询"
echo "发送：北京天气"
# 预期：显示天气信息

# 测试 4: 闲聊
echo -e "\n📝 测试 4: 闲聊"
echo "发送：今天好无聊"
# 预期：有趣的回应和建议

# 测试 5: 告别
echo -e "\n📝 测试 5: 告别"
echo "发送：再见"
# 预期：友好的告别

echo -e "\n✅ 测试完成！"
```

---

## 🎯 优化建议 / Optimization Tips

### 1. 个性化 / Personalization

在 `USER.md` 中记录用户偏好：/ Record user preferences in `USER.md`:

```markdown
# USER.md

## 用户偏好 / User Preferences

- **称呼**: 图图资本
- **喜欢的语气**: 友好、幽默
- **常用功能**: 天气查询、日程管理
- **活跃时间**: 工作日 9:00-18:00
- **语言偏好**: 中文为主，偶尔英文
```

### 2. 上下文记忆 / Context Memory

利用记忆功能记住对话历史：/ Use memory to remember conversation history:

```markdown
在 `workspace/memory/YYYY-MM-DD.md` 中记录：

## 重要对话 / Important Conversations

- 用户提到喜欢喝咖啡 ☕
- 用户的项目下周截止 📅
- 用户最近在学 Python 🐍
```

### 3. 主动关怀 / Proactive Care

设置定时任务主动关心用户：/ Set scheduled tasks to proactively care for users:

```json
{
  "features": {
    "heartbeat": true,
    "heartbeatInterval": 1800000,
    "heartbeatTasks": [
      {
        "time": "09:00",
        "message": "早上好！☀️ 今天有什么安排吗？"
      },
      {
        "time": "18:00",
        "message": "工作一天辛苦了！🌙 早点休息哦~"
      }
    ]
  }
}
```

---

## 📊 性能监控 / Performance Monitoring

### 关键指标 / Key Metrics

监控以下指标来优化机器人：/ Monitor these metrics to optimize bot:

| 指标 / Metric | 目标 / Target | 如何测量 / How to Measure |
|--------------|--------------|--------------------------|
| **响应时间 / Response Time** | < 2 秒 / < 2s | Gateway logs |
| **用户满意度 / User Satisfaction** | > 80% | 用户反馈 / User feedback |
| **技能触发准确率 / Trigger Accuracy** | > 90% | 日志分析 / Log analysis |
| **对话完成率 / Conversation Completion** | > 70% | 会话跟踪 / Session tracking |

### 日志分析 / Log Analysis

```bash
# 查看技能触发频率 / View skill trigger frequency
openclaw gateway logs | grep "skill triggered" | sort | uniq -c

# 查看错误日志 / View error logs
openclaw gateway logs | grep "ERROR"

# 查看用户活跃度 / View user activity
openclaw gateway logs | grep "message received" | wc -l
```

---

## 🚀 部署上线 / Deploy to Production

### 部署检查清单 / Deployment Checklist

- [ ] 所有技能测试通过 / All skills tested
- [ ] 错误处理完善 / Error handling complete
- [ ] 日志级别设置为 info / Log level set to info
- [ ] 配置备份完成 / Configuration backed up
- [ ] 监控告警设置 / Monitoring alerts configured
- [ ] 用户文档准备 / User documentation ready

### 上线后优化 / Post-launch Optimization

1. **收集反馈 / Collect feedback**
   - 主动询问用户体验
   - Proactively ask for user experience
   - 记录常见问题
   - Record common issues

2. **持续改进 / Continuous improvement**
   - 每周审查日志
   - Review logs weekly
   - 更新技能和回复
   - Update skills and replies
   - 添加新功能
   - Add new features

3. **性能优化 / Performance optimization**
   - 优化慢查询
   - Optimize slow queries
   - 缓存常用数据
   - Cache frequently used data
   - 调整模型参数
   - Adjust model parameters

---

## 📚 下一步 / Next Steps

恭喜完成第一个机器人！/ Congratulations on completing your first bot!

### 继续学习 / Continue Learning

1. 🚀 [部署到生产环境](05-deployment.md) - 生产部署指南
2. 🎓 [实战项目：客服机器人](../projects/customer-support-bot.md)
3. 🎓 [实战项目：个人助理](../projects/personal-assistant.md)

### 相关资源 / Related Resources

- [最佳实践：设计模式](../best-practices/design-patterns.md)
- [最佳实践：安全](../best-practices/security.md)
- [Discord 社区](https://discord.gg/openclaw)

---

<div align="center">

**继续学习 / Continue Learning**

[上一步：创建第一个技能 ←](03-first-skill.md) · [下一步：部署到生产环境 →](05-deployment.md)

[返回教程列表](../COMPLETE_TUTORIALS_LIST.md)

</div>
