# OpenClaw 技能开发基础 🦞
# OpenClaw Skill Development Basics

> **从零开始学习技能开发，掌握核心概念和最佳实践 / Learn Skill Development from Scratch, Master Core Concepts and Best Practices**

_预计时间 / Estimated Time: 45 分钟 / 45 minutes_  
_难度 / Difficulty: 入门 / Beginner_

---

## 📋 目录 / Table of Contents

- [什么是技能？/ What is a Skill?](#-什么是技能--what-is-a-skill)
- [技能结构详解 / Skill Structure Details](#-技能结构详解--skill-structure-details)
- [触发器设计 / Trigger Design](#-触发器设计--trigger-design)
- [指令编写指南 / Instruction Writing Guide](#-指令编写指南--instruction-writing-guide)
- [工具使用 / Tool Usage](#-工具使用--tool-usage)
- [测试和调试 / Testing and Debugging](#-测试和调试--testing-and-debugging)
- [实战练习 / Hands-on Exercises](#-实战练习--hands-on-exercises)

---

## 🎯 什么是技能？/ What is a Skill?

**技能 (Skill)** 是 OpenClaw 的核心组件，它是一个 Markdown 文件，定义了 Agent 在特定场景下的行为模式。

**A Skill** is the core component of OpenClaw. It's a Markdown file that defines the agent's behavior patterns in specific scenarios.

### 技能的作用 / Role of Skills

| 作用 / Role | 说明 / Description | 示例 / Example |
|------------|-------------------|---------------|
| **场景识别 / Scenario Recognition** | 识别何时应该使用特定技能 / Identify when to use a specific skill | 用户问天气 → 使用天气技能 |
| **行为指导 / Behavior Guidance** | 指导 Agent 如何回应用户 / Guide how agent responds to users | 问候、查询、建议等 |
| **工具调用 / Tool Invocation** | 定义使用哪些工具完成任务 / Define which tools to use | 执行命令、读取文件、搜索网络 |
| **质量保证 / Quality Assurance** | 确保回复的一致性和准确性 / Ensure consistency and accuracy of responses | 标准化回复格式 |

---

## 📝 技能结构详解 / Skill Structure Details

### 完整技能示例 / Complete Skill Example

```markdown
---
name: weather-query
description: 天气查询技能 - Check weather conditions
triggers:
  - "天气"
  - "weather"
  - "会下雨吗"
  - "temperature"
model: default
thinking: off
---

# Weather Query Skill / 天气查询技能

## 何时使用 / When to Use

当用户询问天气情况、温度、降雨概率等气象信息时使用。
Use when user asks about weather conditions, temperature, rain probability, etc.

## 做什么 / What to Do

1. **提取地点 / Extract Location**
   - 从用户消息中识别城市名
   - Identify city name from user message
   - 如果没有指定地点，使用用户默认城市
   - Use user's default city if not specified

2. **获取天气数据 / Get Weather Data**
   - 使用 `exec` 工具调用 wttr.in API
   - Use `exec` tool to call wttr.in API
   - 解析返回的 JSON 或文本数据
   - Parse returned JSON or text data

3. **格式化回复 / Format Response**
   - 包含温度、天气状况、风力、湿度
   - Include temperature, condition, wind, humidity
   - 添加穿衣建议和出行提示
   - Add clothing suggestions and travel tips
   - 使用 emoji 增强可读性
   - Use emoji for better readability

## 使用工具 / Tools to Use

- `exec` - 执行 curl 命令获取天气
- `weather` - 内置天气技能（可选）

## 示例 / Examples

**用户**: 北京天气怎么样？
**助手**: 📍 北京：晴 ☀️ +22°C
      💨 西北风 3 级
      💧 湿度 45%
      今天适合户外活动！

**用户**: 上海会下雨吗？
**助手**: 📍 上海：小雨 🌧️ +18°C
      🌧️ 降水概率：80%
      建议携带雨具！☔
```

---

### YAML Frontmatter 详解 / YAML Frontmatter Details

```yaml
---
# 技能名称（唯一标识）/ Skill name (unique identifier)
name: skill-name

# 技能描述（中英双语）/ Skill description (bilingual)
description: 技能描述 - Skill description

# 触发器列表 / Trigger list
triggers:
  - "触发短语 1"
  - "触发短语 2"
  - "trigger phrase 3"

# 模型配置 / Model configuration
# default: 使用默认模型 / Use default model
# 或指定具体模型 / Or specify concrete model
model: default

# 是否启用思考 / Enable thinking
# on: 深度思考，适合复杂任务 / Deep thinking, suitable for complex tasks
# off: 快速响应，适合简单查询 / Quick response, suitable for simple queries
thinking: off

# 可选：技能版本 / Optional: skill version
version: 1.0.0

# 可选：作者信息 / Optional: author info
author: Your Name

# 可选：技能分类 / Optional: skill category
category: utility
---
```

---

## 🎯 触发器设计 / Trigger Design

### 触发器类型 / Trigger Types

#### 1. 关键词触发 / Keyword Triggers

最简单直接的触发方式：/ Simplest and most direct trigger method:

```yaml
triggers:
  - "天气"
  - "weather"
  - "温度"
  - "temperature"
```

**优点 / Pros:**
- ✅ 简单直接 / Simple and direct
- ✅ 易于理解和维护 / Easy to understand and maintain
- ✅ 触发准确 / Accurate triggering

**缺点 / Cons:**
- ❌ 可能错过变体表达 / May miss variant expressions
- ❌ 需要列举所有可能 / Need to list all possibilities

---

#### 2. 问句触发 / Question Triggers

针对问句形式的触发：/ Trigger for question formats:

```yaml
triggers:
  - "怎么样"
  - "是多少"
  - "怎么"
  - "how to"
  - "what is"
  - "会...吗"
```

**示例 / Examples:**
- "北京天气怎么样？" → 天气技能
- "怎么创建文件？" → 文件操作技能
- "这个多少钱？" → 价格查询技能

---

#### 3. 意图触发 / Intent Triggers

基于用户意图而非具体词汇：/ Based on user intent rather than specific words:

```yaml
triggers:
  # 问候意图 / Greeting intent
  - "你好"
  - "hello"
  - "早上好"
  - "hi"
  
  # 告别意图 / Farewell intent
  - "再见"
  - "bye"
  - "拜拜"
  - "goodbye"
```

---

### 触发器设计最佳实践 / Trigger Design Best Practices

#### ✅ 应该做的 / Do's

```yaml
# 1. 包含中英文触发 / Include Chinese and English triggers
triggers:
  - "天气"
  - "weather"
  - "查询天气"
  - "check weather"

# 2. 包含同义词和变体 / Include synonyms and variants
triggers:
  - "帮助"
  - "帮忙"
  - "help"
  - "assistance"

# 3. 包含口语化表达 / Include colloquial expressions
triggers:
  - "怎么做"
  - "咋弄"
  - "how to"
  - "what's the way"

# 4. 保持触发器简洁 / Keep triggers concise
triggers:
  - "天气"      # ✅ 好 / Good
  - "请帮我查询一下今天的天气情况"  # ❌ 太长 / Too long
```

#### ❌ 不应该做的 / Don'ts

```yaml
# 1. 避免太宽泛的触发 / Avoid too broad triggers
triggers:
  - "我"        # ❌ 太常见 / Too common
  - "你"        # ❌ 会误触发 / Will misfire
  - "a"         # ❌ 无意义 / Meaningless

# 2. 避免相互冲突 / Avoid conflicts
# 技能 A
triggers:
  - "文件操作"
# 技能 B
triggers:
  - "文件"      # ❌ 与技能 A 冲突 / Conflicts with Skill A

# 3. 避免过多触发器 / Avoid too many triggers
triggers:
  - "天气 1"
  - "天气 2"
  - "天气 3"
  # ... 50 个触发器 / 50 triggers  # ❌ 难以维护 / Hard to maintain
```

---

## ✍️ 指令编写指南 / Instruction Writing Guide

### 指令结构 / Instruction Structure

```markdown
## 何时使用 / When to Use

[清晰说明技能的触发场景]
[Clearly state the skill's trigger scenarios]

## 做什么 / What to Do

[分步骤说明执行流程]
[Step-by-step execution flow]

1. **第一步 / Step 1**
   - 详细说明 / Detailed explanation
   - 注意事项 / Notes

2. **第二步 / Step 2**
   - 详细说明 / Detailed explanation

## 使用工具 / Tools to Use

[列出需要使用的工具]
[List tools to be used]

## 示例 / Examples

[提供多个输入输出示例]
[Provide multiple I/O examples]
```

---

### 编写清晰指令的技巧 / Tips for Writing Clear Instructions

#### 1. 使用动作动词 / Use Action Verbs

```markdown
# ❌ 模糊 / Vague
- 处理用户请求
- 返回结果

# ✅ 清晰 / Clear
- **提取**用户消息中的城市名
- **调用**天气 API 获取数据
- **解析**返回的 JSON 响应
- **格式化**为易读的文本
- **发送**回复给用户
```

#### 2. 提供具体示例 / Provide Concrete Examples

```markdown
# ❌ 抽象 / Abstract
- 回复用户要友好

# ✅ 具体 / Concrete
- 使用 emoji 增加亲和力 😊
- 称呼用户为"你"而不是"您"
- 在回复结尾询问"还有其他问题吗？"
```

#### 3. 包含边界情况 / Include Edge Cases

```markdown
## 特殊情况处理 / Special Cases

**用户未指定地点:**
- 使用用户的默认城市
- 询问"您想查询哪个城市的天气？"

**API 调用失败:**
- 重试最多 3 次
- 告知用户"暂时无法获取天气信息"
- 建议稍后重试

**无效城市名:**
- 告知用户"未找到该城市"
- 提供拼写建议
```

---

## 🛠️ 工具使用 / Tool Usage

### 常用工具列表 / Common Tools List

| 工具 / Tool | 用途 / Usage | 示例 / Example |
|------------|-------------|---------------|
| `exec` | 执行系统命令 / Execute system commands | `curl`, `grep`, `ls` |
| `read` | 读取文件 / Read files | 读取配置文件 |
| `write` | 写入文件 / Write files | 保存数据 |
| `web_search` | 网络搜索 / Web search | 搜索信息 |
| `web_fetch` | 获取网页内容 / Fetch web content | 抓取新闻 |
| `message` | 发送消息 / Send messages | 通知用户 |

---

### 工具使用示例 / Tool Usage Examples

#### 使用 exec 工具 / Using exec Tool

```markdown
## 使用工具 / Tools to Use

- `exec` - 执行 curl 命令获取天气数据

### 命令示例 / Command Examples

```bash
# 获取当前天气 / Get current weather
curl "wttr.in/Beijing?format=3"

# 获取详细天气 / Get detailed weather
curl "wttr.in/Beijing?0"

# 单行格式 / One-line format
curl "wttr.in/Beijing?format=%l:+%c+%t+%w"
```

### 解析输出 / Parse Output

```bash
# 输出示例 / Example output:
# Beijing: +22°C, Clear, ↑15km/h NW

# 提取温度 / Extract temperature:
echo "+22°C" | grep -oP '[+-]?\d+°C'
```
```

#### 使用 web_search 工具 / Using web_search Tool

```markdown
## 使用工具 / Tools to Use

- `web_search` - 搜索最新信息

### 搜索示例 / Search Examples

**搜索新闻:**
```
query: "OpenClaw 最新发布"
count: 5
freshness: "week"
```

**搜索文档:**
```
query: "OpenClaw skill development guide"
count: 10
```
```

---

## 🧪 测试和调试 / Testing and Debugging

### 测试方法 / Testing Methods

#### 1. 手动测试 / Manual Testing

创建测试清单：/ Create test checklist:

```markdown
# 技能测试清单 / Skill Test Checklist

## 触发器测试 / Trigger Tests
- [ ] 测试所有触发器 / Test all triggers
- [ ] 测试大小写 / Test case sensitivity
- [ ] 测试中英文混合 / Test Chinese-English mix

## 功能测试 / Function Tests
- [ ] 正常场景 / Normal scenarios
- [ ] 边界情况 / Edge cases
- [ ] 错误处理 / Error handling

## 性能测试 / Performance Tests
- [ ] 响应时间 < 2 秒 / Response time < 2s
- [ ] 无内存泄漏 / No memory leaks
```

#### 2. 日志调试 / Log Debugging

```bash
# 查看技能加载日志 / View skill loading logs
openclaw gateway logs | grep "skill"

# 查看特定技能日志 / View specific skill logs
openclaw gateway logs | grep "weather-query"

# 实时跟踪日志 / Track logs in real-time
openclaw gateway logs --follow
```

---

### 常见问题和解决方案 / Common Issues and Solutions

| 问题 / Issue | 原因 / Cause | 解决方案 / Solution |
|-------------|-------------|-------------------|
| **技能未触发** | 触发器不匹配 | 检查触发器拼写和格式 |
| **技能加载失败** | YAML 格式错误 | 验证 frontmatter 语法 |
| **回复异常** | 指令不清晰 | 细化指令，添加示例 |
| **工具调用失败** | 权限不足 | 检查工具权限配置 |
| **性能慢** | thinking=on | 设置 thinking=off |

---

## 💪 实战练习 / Hands-on Exercises

### 练习 1: 创建名言技能 / Create Quote Skill

```markdown
---
name: daily-quote
description: 每日名言 - Daily inspirational quote
triggers:
  - "名言"
  - "quote"
  - "励志"
  - "inspiration"
  - "来句鸡汤"
model: default
thinking: off
---

# Daily Quote Skill / 每日名言技能

## 何时使用 / When to Use

当用户请求名言、励志语句或需要鼓励时使用。
Use when user requests quotes, inspirational messages, or needs encouragement.

## 做什么 / What to Do

1. **随机选择名言** / Select random quote
   - 从预定义列表中选择
   - Select from predefined list
   - 包含作者信息
   - Include author information

2. **添加解读** / Add interpretation
   - 提供简短的现实应用建议
   - Provide brief real-world application advice

3. **鼓励行动** / Encourage action
   - 激励用户付诸实践
   - Motivate user to take action

## 名言列表 / Quote List

- "The only way to do great work is to love what you do." — Steve Jobs
- "生活不止眼前的苟且，还有诗和远方。" — 高晓松
- [添加更多 / Add more]

## 示例 / Examples

**用户**: 来句名言
**助手**: 💡 "The only way to do great work is to love what you do."
      — Steve Jobs
      
      找到你热爱的工作，并为之努力！
      今天也要加油哦~ 🚀
```

---

### 练习 2: 创建计算器技能 / Create Calculator Skill

```markdown
---
name: calculator
description: 数学计算 - Math calculations
triggers:
  - "计算"
  - "calculate"
  - "等于多少"
  - "是多少"
model: default
thinking: off
---

# Calculator Skill / 计算器技能

## 何时使用 / When to Use

用户需要进行数学计算时使用。
Use when user needs mathematical calculations.

## 做什么 / What to Do

1. **提取表达式** / Extract expression
   - 从消息中识别数学表达式
   - Identify math expression from message

2. **执行计算** / Perform calculation
   - 使用 exec 执行 Python 或 bc
   - Use exec to run Python or bc

3. **格式化结果** / Format result
   - 保留 2 位小数
   - Keep 2 decimal places
   - 添加千位分隔符
   - Add thousand separators

## 示例 / Examples

**用户**: 计算 123 + 456
**助手**: 📊 计算结果：579

**用户**: 100 除以 3
**助手**: 📊 计算结果：33.33

**用户**: 1234567 * 89
**助手**: 📊 计算结果：109,876,463
```

---

### 练习 3: 创建倒数日技能 / Create Countdown Skill

```markdown
---
name: countdown
description: 倒数日计算 - Countdown calculation
triggers:
  - "倒数"
  - "countdown"
  - "还有几天"
  - "how many days"
  - "距离...还有"
model: default
thinking: on
---

# Countdown Skill / 倒数日技能

## 何时使用 / When to Use

用户询问距离某个日期还有多少天时使用。
Use when user asks how many days until a certain date.

## 做什么 / What to Do

1. **识别目标日期** / Identify target date
   - 从消息中提取日期
   - Extract date from message

2. **计算天数差** / Calculate day difference
   - 使用当前日期计算
   - Calculate using current date

3. **提供建议** / Provide suggestions
   - 根据事件类型给出准备建议
   - Give preparation suggestions based on event type

## 示例 / Examples

**用户**: 距离春节还有几天？
**助手**: 🎊 距离春节还有 25 天！
      开始准备年货了吗？🧧

**用户**: 距离我的生日还有多久
**助手**: 🎂 距离你的生日还有 12 天！
      想好怎么庆祝了吗？🎉
```

---

## 📚 下一步 / Next Steps

恭喜完成技能开发基础学习！/ Congratulations on completing skill development basics!

### 继续学习 / Continue Learning

1. 🎓 [高级技能开发](advanced-skills.md) - 复杂模式和工具集成
2. 🚀 [实战项目教程](../projects/customer-support-bot.md) - 实际应用
3. 📖 [最佳实践](../best-practices/design-patterns.md) - 设计模式

### 相关资源 / Related Resources

- [OpenClaw 官方技能仓库](https://github.com/openclaw/skills)
- [Skill Creator 技能](/usr/lib/node_modules/openclaw/skills/skill-creator/SKILL.md)
- [示例技能模板](../examples/example-skill.md)

---

<div align="center">

[返回教程列表](../COMPLETE_TUTORIALS_LIST.md) · [下一步：高级技能开发 →](advanced-skills.md)

</div>
