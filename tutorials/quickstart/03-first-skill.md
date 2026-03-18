# 创建你的第一个 OpenClaw 技能 🦞
# Create Your First OpenClaw Skill

> **从零开始学习技能开发 / Learn Skill Development from Scratch**

_预计时间 / Estimated Time: 30 分钟 / 30 minutes_  
_难度 / Difficulty: 入门 / Beginner_

---

## 🎯 学习目标 / Learning Objectives

完成本教程后，你将能够：/ After completing this tutorial, you will be able to:

- ✅ 理解 OpenClaw 技能的结构 / Understand OpenClaw skill structure
- ✅ 创建第一个自定义技能 / Create your first custom skill
- ✅ 配置技能触发器 / Configure skill triggers
- ✅ 编写技能指令 / Write skill instructions
- ✅ 测试和调试技能 / Test and debug skills

---

## 📋 什么是技能？/ What is a Skill?

**技能 (Skill)** 是 OpenClaw 的核心概念，它是一个 Markdown 文件，定义了 Agent 在特定场景下应该如何行动。

**A Skill** is the core concept of OpenClaw. It's a Markdown file that defines how the agent should behave in specific scenarios.

### 技能的组成部分 / Skill Components

```markdown
---
name: skill-name              # 技能名称 / Skill name
description: 技能描述          # 简要描述 / Brief description
triggers:                     # 触发器 / Triggers
  - "触发短语 1"
  - "触发短语 2"
model: default                # 模型配置 / Model config
thinking: on                  # 是否启用思考 / Enable thinking
---

# 技能指令 / Skill Instructions

## 何时使用 / When to Use
说明技能应该在什么情况下被触发

## 做什么 / What to Do
详细的执行步骤

## 使用工具 / Tools to Use
需要使用的工具列表

## 示例 / Examples
输入输出的示例
```

---

## 🚀 创建第一个技能

### 步骤 1: 创建技能文件 / Create Skill File

在你的项目目录中创建技能文件：/ Create skill file in your project directory:

```bash
# 进入项目目录 / Enter project directory
cd my-first-agent

# 创建 skills 目录（如果不存在）/ Create skills directory (if not exists)
mkdir -p workspace/skills

# 创建第一个技能文件 / Create first skill file
cat > workspace/skills/hello-world.md << 'EOF'
---
name: hello-world
description: 一个简单的问候技能 - A simple greeting skill
triggers:
  - "你好"
  - "hello"
  - "hi"
  - "早上好"
  - "下午好"
  - "晚上好"
model: default
thinking: off
---

# Hello World Skill

## 何时使用 / When to Use

当用户发送问候语时使用此技能，例如"你好"、"hello"等。
Use this skill when user sends greetings like "你好", "hello", etc.

## 做什么 / What to Do

1. 识别用户的问候类型（中文/英文，时间相关）
   Identify the greeting type (Chinese/English, time-related)

2. 根据时间返回合适的问候语
   Return appropriate greeting based on time

3. 保持友好、简洁的回复
   Keep the reply friendly and concise

## 示例 / Examples

**用户 / User**: "你好"
**助手 / Assistant**: "你好！我是你的 OpenClaw 助手，有什么可以帮你的吗？🦞"

**用户 / User**: "Good morning"
**助手 / Assistant**: "Good morning! How can I assist you today? ☀️"

**用户 / User**: "晚上好"
**助手 / Assistant**: "晚上好！希望你今天过得愉快！🌙"
EOF
```

---

### 步骤 2: 配置技能 / Configure Skill

编辑 `openclaw.json`，添加你的技能：/ Edit `openclaw.json` to add your skill:

```json
{
  "skills": {
    "entries": {
      "hello-world": { 
        "enabled": true 
      },
      "weather": { 
        "enabled": true 
      }
    },
    "paths": [
      "./workspace/skills",
      "/usr/lib/node_modules/openclaw/skills"
    ]
  }
}
```

---

### 步骤 3: 重启 Gateway / Restart Gateway

让技能生效：/ Make the skill take effect:

```bash
# 重启 Gateway / Restart Gateway
openclaw gateway restart

# 或者使用脚本 / Or use script
sh scripts/restart.sh
```

---

### 步骤 4: 测试技能 / Test Skill

在你的聊天频道中发送测试消息：/ Send test message in your chat channel:

```
你好
```

**预期回复 / Expected reply:**

```
你好！我是你的 OpenClaw 助手，有什么可以帮你的吗？🦞
```

---

## 🛠️ 创建实用技能：天气查询

让我们创建一个更实用的技能 - 天气查询。

### 完整技能示例 / Complete Skill Example

创建文件 `workspace/skills/weather-check.md`:

```markdown
---
name: weather-check
description: 查询天气信息 - Check weather information
triggers:
  - "天气"
  - "weather"
  - "会下雨吗"
  - "温度"
  - "temperature"
model: default
thinking: off
---

# Weather Check Skill / 天气查询技能

## 何时使用 / When to Use

当用户询问天气、温度、降雨等情况时使用此技能。
Use this skill when user asks about weather, temperature, rain, etc.

## 做什么 / What to Do

1. **提取地点 / Extract location**
   - 从用户消息中识别城市名
   - Identify city name from user message
   - 如果没有指定地点，使用默认城市（北京）
   - Use default city (Beijing) if not specified

2. **获取天气数据 / Get weather data**
   - 使用 `exec` 工具调用 wttr.in API
   - Use `exec` tool to call wttr.in API
   - 解析返回的天气信息
   - Parse returned weather information

3. **格式化回复 / Format reply**
   - 包含当前温度、天气状况、风力
   - Include current temperature, condition, wind
   - 添加未来 3 天预报（如果请求）
   - Add 3-day forecast if requested
   - 使用 emoji 增强可读性
   - Use emoji for better readability

## 使用工具 / Tools to Use

- `exec` - 执行 curl 命令获取天气数据
- `weather` - 内置天气技能（可选）

## 命令示例 / Command Examples

```bash
# 当前天气 / Current weather
curl "wttr.in/Beijing?format=3"

# 详细天气 / Detailed weather
curl "wttr.in/Beijing?0"

# 3 天预报 / 3-day forecast
curl "wttr.in/Beijing"

# 单行格式 / One-line format
curl "wttr.in/Beijing?format=%l:+%c+%t+%w"
```

## 回复模板 / Reply Templates

**简单查询 / Simple query:**
```
📍 [地点]: [天气状况] [温度]
💨 风力：[风力]
💧 湿度：[湿度]
```

**详细查询 / Detailed query:**
```
📍 [地点] 天气报告

当前 / Current:
🌡️ 温度：[温度] (体感 [体感温度])
☁️ 状况：[天气状况]
💨 风力：[风力] [风向]
💧 湿度：[湿度]
🌧️ 降水：[降水概率]

预报 / Forecast:
- 明天：[预报]
- 后天：[预报]
```

## 示例对话 / Example Conversations

**示例 1 / Example 1:**
```
用户：北京天气怎么样？
助手：📍 北京：晴 ☀️ +22°C
      💨 西北风 3 级
      💧 湿度 45%
      今天适合户外活动！
```

**示例 2 / Example 2:**
```
用户：上海会下雨吗？
助手：📍 上海天气预报
      当前：小雨 🌧️ +18°C
      🌧️ 降水概率：80%
      建议携带雨具！☔
```

**示例 3 / Example 3:**
```
User: Weather in Tokyo?
Assistant: 📍 Tokyo: Partly Cloudy ⛅ +20°C
           💨 Wind: NE 15km/h
           💧 Humidity: 60%
           Pleasant day for a walk!
```
EOF
```

---

## 🔧 技能开发技巧 / Skill Development Tips

### 1. 触发器设计 / Trigger Design

**好的触发器 / Good Triggers:**

```yaml
triggers:
  - "天气"           # 简短关键词 / Short keyword
  - "查询天气"       # 动词 + 名词 / Verb + noun
  - "会下雨吗"       # 问句形式 / Question form
  - "temperature"    # 英文触发 / English trigger
```

**避免的触发器 / Triggers to Avoid:**

```yaml
# ❌ 太宽泛 / Too broad
triggers:
  - "我"
  - "你"
  - "a"

# ❌ 太长 / Too long
triggers:
  - "请帮我查询一下今天的天气情况"
```

---

### 2. 指令编写 / Instruction Writing

**清晰的指令结构 / Clear Instruction Structure:**

```markdown
## 何时使用 / When to Use
- 明确说明触发场景
- Clearly state trigger scenarios
- 包含正面和反面例子
- Include positive and negative examples

## 做什么 / What to Do
- 分步骤说明
- Step-by-step instructions
- 使用编号列表
- Use numbered lists
- 每个步骤一个动作
- One action per step

## 示例 / Examples
- 提供多个输入输出示例
- Provide multiple I/O examples
- 覆盖常见场景
- Cover common scenarios
- 包含边界情况
- Include edge cases
```

---

### 3. 使用变量和条件 / Using Variables and Conditions

在技能中使用条件逻辑：/ Use conditional logic in skills:

```markdown
## 回复逻辑 / Reply Logic

根据时间选择问候语：/ Select greeting based on time:

- 05:00-11:00 → "早上好" / "Good morning" ☀️
- 11:00-13:00 → "中午好" / "Good afternoon" 🌞
- 13:00-17:00 → "下午好" / "Good afternoon" 🌤️
- 17:00-21:00 → "晚上好" / "Good evening" 🌆
- 21:00-05:00 → "晚上好" / "Good evening" 🌙

根据天气状况添加建议：/ Add suggestions based on weather:

- 下雨 → "记得带伞" / "Bring an umbrella" ☔
- 高温 (>30°C) → "注意防暑" / "Stay hydrated" 🥵
- 低温 (<5°C) → "注意保暖" / "Keep warm" 🥶
- 大风 → "小心高空坠物" / "Watch for falling objects" 💨
```

---

## 🧪 测试和调试 / Testing and Debugging

### 测试技能 / Testing Skills

创建测试脚本：/ Create test script:

```bash
#!/bin/bash
# test-skill.sh

echo "Testing hello-world skill..."
echo "Expected: Friendly greeting"
echo "Input: 你好"
# Send message through your channel
# Check response

echo "Input: hello"
# Send message
# Check response

echo "All tests completed!"
```

---

### 调试技巧 / Debugging Tips

**1. 查看日志 / View Logs**

```bash
# 实时查看日志 / View logs in real-time
openclaw gateway logs --follow

# 过滤特定技能日志 / Filter skill-specific logs
openclaw gateway logs | grep "hello-world"
```

**2. 检查技能加载 / Check Skill Loading**

```bash
# 列出已加载的技能 / List loaded skills
openclaw skills list

# 查看技能详情 / View skill details
openclaw skills get hello-world
```

**3. 常见问题 / Common Issues**

| 问题 / Issue | 原因 / Cause | 解决方案 / Solution |
|-------------|-------------|-------------------|
| 技能未触发 | 触发器不匹配 | 检查触发器拼写 / Check trigger spelling |
| 技能加载失败 | YAML 格式错误 | 验证 frontmatter / Validate frontmatter |
| 回复异常 | 指令不清晰 | 细化指令 / Refine instructions |
| 性能慢 | thinking=on | 设置 thinking=off / Set thinking=off |

---

## 📚 实战练习 / Hands-on Exercise

### 练习 1: 创建名言技能 / Create Quote Skill

创建一个随机名言生成技能：/ Create a random quote generation skill:

```markdown
---
name: daily-quote
description: 每日名言 - Daily inspirational quote
triggers:
  - "名言"
  - "quote"
  - "励志"
  - "inspiration"
model: default
thinking: off
---

# Daily Quote Skill

## 何时使用
用户请求名言、励志语句时

## 做什么
1. 从预定义列表随机选择名言
2. 包含作者信息
3. 添加相关 emoji
4. 可选：提供简短解读

## 示例
用户：给我一句名言
助手：💡 "The only way to do great work is to love what you do."
      — Steve Jobs
      
      找到你热爱的工作，并为之努力！🚀
```

---

### 练习 2: 创建计算器技能 / Create Calculator Skill

创建一个简单的数学计算技能：/ Create a simple math calculation skill:

```markdown
---
name: calculator
description: 数学计算 - Math calculations
triggers:
  - "计算"
  - "calculate"
  - "="
  - "等于多少"
model: default
thinking: off
---

# Calculator Skill

## 何时使用
用户需要进行数学计算时

## 做什么
1. 提取数学表达式
2. 使用 exec 执行计算
3. 返回结果，保留 2 位小数
4. 处理错误（除零等）

## 示例
用户：计算 123 + 456
助手：📊 计算结果：579

用户：100 / 3
助手：📊 计算结果：33.33
```

---

## 🎯 最佳实践 / Best Practices

### ✅ 应该做的 / Do's

1. **保持技能专注 / Keep skills focused**
   - 一个技能一个职责 / One skill, one responsibility
   - 避免大而全的技能 / Avoid large, all-in-one skills

2. **使用清晰的触发器 / Use clear triggers**
   - 3-5 个相关触发器 / 3-5 relevant triggers
   - 包含中英文 / Include Chinese and English

3. **提供充足示例 / Provide ample examples**
   - 至少 3 个示例 / At least 3 examples
   - 覆盖常见场景 / Cover common scenarios

4. **测试 thoroughly / Test thoroughly**
   - 测试所有触发器 / Test all triggers
   - 测试边界情况 / Test edge cases

### ❌ 不应该做的 / Don'ts

1. **不要过度复杂 / Don't overcomplicate**
   - 避免复杂的条件逻辑 / Avoid complex conditionals
   - 技能文件 < 500 行 / Skill file < 500 lines

2. **不要模糊触发 / Don't use vague triggers**
   - 避免单个常用字 / Avoid single common characters
   - 避免过于宽泛 / Avoid too broad

3. **不要忘记错误处理 / Don't forget error handling**
   - 考虑失败场景 / Consider failure scenarios
   - 提供友好错误消息 / Provide friendly error messages

---

## 📖 下一步 / Next Steps

恭喜完成第一个技能！/ Congratulations on completing your first skill!

### 继续学习 / Continue Learning

1. 🚀 [构建第一个机器人](04-first-bot.md) - 整合多个技能
2. 🎓 [技能开发基础](../skills/skill-basics.md) - 深入学习
3. 🛠️ [高级技能开发](../skills/advanced-skills.md) - 复杂模式

### 相关资源 / Related Resources

- [技能模板示例](../examples/example-skill.md)
- [官方技能仓库](https://github.com/openclaw/skills)
- [Skill Creator 技能](/usr/lib/node_modules/openclaw/skills/skill-creator/SKILL.md)

---

## 📝 技能检查清单 / Skill Checklist

创建技能时检查：/ Check when creating skills:

- [ ] YAML frontmatter 格式正确 / YAML frontmatter correct
- [ ] 触发器清晰且相关 / Triggers clear and relevant
- [ ] 指令分步骤说明 / Instructions step-by-step
- [ ] 包含至少 3 个示例 / At least 3 examples included
- [ ] 使用中英双语 / Bilingual (Chinese/English)
- [ ] 技能已添加到配置 / Skill added to configuration
- [ ] Gateway 已重启 / Gateway restarted
- [ ] 技能测试通过 / Skill tested successfully

---

<div align="center">

**继续学习 / Continue Learning**

[上一步：安装和配置 ←](02-installation.md) · [下一步：第一个机器人 →](04-first-bot.md)

[返回教程列表](../COMPLETE_TUTORIALS_LIST.md)

</div>
