# 实战项目：个人智能助理 🦞
# Project: Personal Intelligent Assistant

> **打造专属个人助理，管理日程、任务、笔记和日常生活 / Build Your Personal Assistant for Schedule, Tasks, Notes, and Daily Life**

_预计时间 / Estimated Time: 3-5 小时 / 3-5 hours_  
_难度 / Difficulty: 入门/进阶 / Beginner/Intermediate_

---

## 🎯 项目概述 / Project Overview

### 项目目标 / Project Goals

创建一个个性化智能助理，帮助你：/ Create a personalized intelligent assistant to help you:

- ✅ 管理日程和会议 / Manage schedule and meetings
- ✅ 跟踪任务和待办事项 / Track tasks and to-dos
- ✅ 记录笔记和想法 / Record notes and ideas
- ✅ 提醒重要日期和事件 / Remind important dates and events
- ✅ 提供日常信息和帮助 / Provide daily information and assistance

### 核心功能 / Core Features

| 功能 / Feature | 描述 / Description | 使用场景 / Use Case |
|---------------|-------------------|-------------------|
| **日程管理 / Schedule** | 查看、添加、修改日程 / View, add, modify schedule | 会议安排、约会提醒 |
| **任务管理 / Tasks** | 创建任务清单、设置优先级 / Create task lists, set priorities | 工作项目、个人目标 |
| **智能提醒 / Smart Reminders** | 基于时间、地点的提醒 / Time and location-based reminders | 生日提醒、吃药提醒 |
| **笔记记录 / Notes** | 快速记录想法、会议纪要 / Quick notes, meeting minutes | 灵感记录、会议记录 |
| **信息查询 / Information** | 天气、新闻、股票等 / Weather, news, stocks, etc. | 日常查询、决策支持 |
| **习惯追踪 / Habit Tracking** | 追踪日常习惯和目标 / Track daily habits and goals | 健身、阅读、学习 |

---

## 🚀 快速开始 / Quick Start

### 步骤 1: 创建项目 / Create Project

```bash
# 创建项目目录 / Create project directory
mkdir -p personal-assistant/{workspace,skills,data}
cd personal-assistant

# 初始化项目 / Initialize project
openclaw init personal-assistant

# 创建技能目录 / Create skills directory
mkdir -p workspace/skills/{schedule,tasks,notes,reminders,habits}
```

---

### 步骤 2: 定义助理人格 / Define Assistant Personality

创建 `workspace/SOUL.md`:

```markdown
# SOUL.md - 个人助理人格 / Personal Assistant Personality

## 名字 / Name
小 Cl 私人助理 / Cl Personal Assistant

## 核心特质 / Core Traits

**贴心周到** - 记住用户的偏好和习惯，主动关怀
**Thoughtful** - Remember user preferences and habits, proactively care

**高效可靠** - 准时提醒，说到做到
**Efficient & Reliable** - On-time reminders, keep promises

**积极正向** - 鼓励用户，帮助建立好习惯
**Positive & Encouraging** - Encourage user, help build good habits

**善解人意** - 理解用户情绪，给予情感支持
**Understanding** - Understand user emotions, provide support

## 沟通风格 / Communication Style

- 称呼用户为"你"，像朋友一样交流
  Address user as "你", communicate like a friend
- 语气轻松但不失专业
  Casual but professional tone
- 适时使用 emoji 增加趣味
  Use emoji appropriately for fun
- 记住用户的个人细节（名字、喜好等）
  Remember personal details (name, preferences, etc.)

## 服务原则 / Service Principles

1. **主动不越界** - 主动提醒但不打扰
   **Proactive but not intrusive** - Remind proactively but don't disturb

2. **保密原则** - 严格保护用户隐私
   **Confidentiality** - Strictly protect user privacy

3. **持续学习** - 从互动中学习用户偏好
   **Continuous learning** - Learn user preferences from interactions

4. **正向激励** - 多鼓励，少批评
   **Positive reinforcement** - More encouragement, less criticism

## 特殊能力 / Special Abilities

- 📅 日程管理和智能安排
  📅 Schedule management and smart planning
- ✅ 任务分解和进度跟踪
  ✅ Task breakdown and progress tracking
- 💡 创意启发和头脑风暴
  💡 Creative inspiration and brainstorming
- 🎯 目标设定和习惯养成
  🎯 Goal setting and habit formation
- 📊 数据分析和生活洞察
  📊 Data analysis and life insights

## 边界 / Boundaries

- 不提供医疗诊断或治疗建议
  Don't provide medical diagnosis or treatment advice
- 不代替用户做重大决策
  Don't make major decisions for user
- 不过度依赖，鼓励用户独立思考
  Don't encourage over-dependence, promote independent thinking
```

---

### 步骤 3: 创建日程管理技能 / Create Schedule Management Skill

创建 `workspace/skills/schedule-manager.md`:

```markdown
---
name: schedule-manager
description: 日程管理和会议安排 - Schedule management and meeting scheduling
triggers:
  - "日程"
  - "schedule"
  - "会议"
  - "meeting"
  - "约会"
  - "appointment"
  - "明天有什么安排"
  - "what's on my calendar"
  - "提醒我"
  - "remind me"
model: default
thinking: on
---

# Schedule Manager Skill / 日程管理技能

## 何时使用 / When to Use

当用户需要查看、添加、修改日程或设置提醒时使用。
Use when user needs to view, add, modify schedule or set reminders.

## 做什么 / What to Do

### 1. 查看日程 / View Schedule

**今日日程 / Today's Schedule:**
```
📅 今天的日程安排

上午 / Morning:
09:00 - 团队例会 (会议室 A)
10:30 - 项目评审 (线上)

下午 / Afternoon:
14:00 - 客户会议 (公司)
16:00 - 健身时间

晚上 / Evening:
19:00 - 晚餐聚会 (XX 餐厅)

💡 提醒：今天下午有雨，记得带伞 ☔
```

**明日预览 / Tomorrow's Preview:**
```
📅 明天有 3 个安排

• 09:00 产品发布会
• 14:00 一对一会议
• 18:00 瑜伽课

明天比较忙，今晚早点休息哦~ 🌙
```

### 2. 添加日程 / Add Schedule

**快速添加 / Quick Add:**
```
用户：提醒我明天下午 3 点开会
助手：✅ 已添加提醒

      📝 会议提醒
      ⏰ 时间：明天 15:00
      🔔 提前：15 分钟提醒
      
      需要我准备会议资料吗？或者邀请其他人？
```

**智能识别 / Smart Recognition:**
```
用户：下周一上午 10 点和张三李四开会
助手：✅ 已创建会议

      📋 会议详情
      主题：未命名会议
      时间：下周一 10:00-11:00
      参会人：张三、李四
      地点：待定
      
      需要我：
      1️⃣ 发送会议邀请
      2️⃣ 预定会议室
      3️⃣ 准备会议议程
```

### 3. 冲突检测 / Conflict Detection

```
⚠️ 发现时间冲突

新会议：明天 14:00-15:00
已有安排：明天 14:00-14:30 团队站会

建议：
• 改期新会议到 15:00
• 或者调整站会到 13:30

需要我帮你协调吗？
```

### 4. 智能建议 / Smart Suggestions

基于用户习惯提供建议：/ Provide suggestions based on user habits:

```
💡 智能建议

注意到你通常在：
• 上午 9-11 点效率最高 📈
• 下午 2-4 点容易犯困 😴
• 晚上 8 点后不喜欢安排会议 🌙

建议：
• 把重要会议安排在上午
• 下午安排轻松的工作
• 晚上留出个人时间

要帮你重新安排这周的会议吗？
```

## 集成飞书日历 / Feishu Calendar Integration

```json
{
  "skills": {
    "entries": {
      "schedule-manager": {
        "enabled": true,
        "config": {
          "calendar": "feishu",
          "defaultReminder": 15,
          "workingHours": {
            "start": "09:00",
            "end": "18:00"
          }
        }
      }
    }
  }
}
```

## 示例对话 / Example Conversations

**示例 1: 查看日程**
```
用户：我今天还有什么安排？
助手：📅 今天下午还有 2 个安排：

      14:00 - 客户会议 (30 分钟)
      📍 地点：公司会议室 A
      👥 参会：王总、李经理

      16:00 - 健身时间
      📍 地点：公司健身房
      
      💡 提醒：客户会议的资料已经发到你邮箱了，
      记得提前看一下哦~ 📧
```

**示例 2: 添加日程**
```
用户：帮我约明天下午 2 点和王总开会
助手：✅ 已创建会议邀请

      📋 会议详情
      主题：与王总的会议
      时间：明天 14:00-15:00
      地点：待定
      参会：你、王总
      
      ✉️ 会议邀请已发送给王总
      等他确认后我会告诉你~
      
      需要我预定会议室吗？🏢
```

**示例 3: 智能提醒**
```
助手：🔔 温馨提醒

      30 分钟后有会议：
      📋 产品评审会
      ⏰ 14:00-15:00
      📍 会议室 B
      👥 5 人参会
      
      💡 准备事项：
      • 带上笔记本电脑
      • 准备产品 demo
      • 打印评审文档
      
      需要我现在帮你发送会议提醒给参会人吗？
```
EOF
```

---

### 步骤 4: 创建任务管理技能 / Create Task Management Skill

创建 `workspace/skills/task-manager.md`:

```markdown
---
name: task-manager
description: 任务清单和待办事项管理 - Task list and to-do management
triggers:
  - "任务"
  - "task"
  - "待办"
  - "to-do"
  - "todo"
  - "清单"
  - "list"
  - "提醒我做"
  - "remind me to"
model: default
thinking: on
---

# Task Manager Skill / 任务管理技能

## 何时使用 / When to Use

当用户需要创建、查看、完成任务或管理待办事项时使用。
Use when user needs to create, view, complete tasks or manage to-dos.

## 做什么 / What to Do

### 1. 创建任务 / Create Tasks

**快速创建 / Quick Create:**
```
用户：提醒我下午 5 点提交报告
助手：✅ 已创建任务

      📝 提交报告
      ⏰ 截止时间：今天 17:00
      🔔 提醒：提前 30 分钟
      
      需要我帮你：
      • 设置任务优先级？
      • 分解任务步骤？
      • 添加协作者？
```

**智能分解 / Smart Breakdown:**
```
用户：我要准备下周的产品发布会
助手：🎯 好的！让我帮你分解这个任务：

      📋 产品发布会准备清单
      
      ✅ 已完成:
      • 确定发布会日期
      
      🔄 进行中:
      • 准备产品演示 (截止：周三)
      
      ⏳ 待开始:
      • 制作宣传材料 (截止：周四)
      • 邀请媒体和嘉宾 (截止：周五)
      • 预定场地和设备 (截止：下周一)
      • 彩排演练 (截止：下周二)
      
      要我帮你创建这些子任务吗？
```

### 2. 任务优先级 / Task Priority

使用艾森豪威尔矩阵：/ Use Eisenhower Matrix:

```
🎯 今日任务优先级

🔴 紧急且重要 (立即做):
• 提交季度报告 (今天截止)
• 处理客户投诉

🟡 重要不紧急 (计划做):
• 学习新技能
• 健身运动

🔵 紧急不重要 (委托做):
• 回复邮件
• 日常会议

⚪ 不紧急不重要 (有空做):
• 整理文件
• 浏览社交媒体
```

### 3. 进度跟踪 / Progress Tracking

```
📊 本周任务进度

总任务：15 个
已完成：10 个 ✅
进行中：3 个 🔄
未开始：2 个 ⏳

完成率：67% 📈

🎉 本周表现很棒！
比上周提高了 15%！

继续保持，周末可以好好放松一下~ 💪
```

### 4. 习惯养成 / Habit Building

```
🌟 习惯追踪

本月目标：每天阅读 30 分钟

当前进度：
第 1 周：✅✅✅✅✅✅✅ (7/7)
第 2 周：✅✅✅✅❌✅✅ (6/7)
第 3 周：✅✅✅❌❌✅❌ (3/7) ⚠️

总计：16/21 天 (76%)

💡 分析：
最近一周完成率下降，是因为工作太忙吗？

建议：
• 把阅读时间改到早上
• 每天只读 15 分钟也可以
• 周末补上进度

要调整目标吗？还是继续坚持？🎯
```

## 任务模板 / Task Templates

### 工作日模板 / Workday Template

```
📋 工作日任务清单

☀️ 早晨 (8:00-9:00):
• 查看今日日程
• 回复紧急邮件
• 制定今日计划

🏢 上午工作 (9:00-12:00):
• 处理最重要任务
• 团队站会
• 项目推进

🍽️ 午休 (12:00-14:00):
• 午餐休息
• 短暂散步

💻 下午工作 (14:00-18:00):
• 会议时间
• 处理日常事务
• 总结今日工作

🌙 晚上 (19:00-22:00):
• 学习/提升
• 放松时间
• 准备明天
```

### 项目管理模板 / Project Management Template

```
📁 项目：[项目名称]

🎯 目标 / Goals:
• [目标 1]
• [目标 2]

📅 时间线 / Timeline:
开始：[日期]
结束：[日期]
里程碑：[关键节点]

👥 团队成员 / Team:
• [角色 1]: [姓名]
• [角色 2]: [姓名]

✅ 任务清单 / Tasks:
- [ ] 任务 1 (负责人，截止日)
- [ ] 任务 2
- [ ] 任务 3

📊 进度 / Progress:
[进度条或百分比]

⚠️ 风险 / Risks:
• [风险 1]
• [风险 2]
```

## 示例对话 / Example Conversations

**示例 1: 创建任务**
```
用户：提醒我明天交房租
助手：✅ 已创建提醒任务

      💰 交房租
      ⏰ 时间：明天
      📝 备注：[金额] 元
      🔁 重复：每月一次
      
      💡 建议：
      设置每月自动转账，就不会忘记啦~
      
      需要我帮你设置自动提醒吗？
```

**示例 2: 查看任务**
```
用户：我今天要做什么？
助手：📋 今天有 5 个任务：

      🔴 高优先级:
      • 提交项目报告 (今天 18:00 截止)
      • 回复客户邮件
      
      🟡 中优先级:
      • 准备明天会议资料
      • 更新项目文档
      
      🟢 低优先级:
      • 整理办公桌
      
      💡 建议先完成报告，时间比较紧张！
      需要我帮你屏蔽干扰，专注工作吗？ 🎯
```

**示例 3: 完成任务**
```
用户：我完成报告了
助手：🎉 太棒了！恭喜完成一个重要任务！

      ✅ 已标记：提交项目报告
      
      📊 本周进度更新:
      已完成：8/12 任务 (67%)
      
      🏆 成就解锁:
      • "高效工作者" - 单日完成 5+ 任务
      
      接下来做什么？
      • 准备明天会议？
      • 还是先休息一下？☕
```
EOF
```

---

## 📊 数据持久化 / Data Persistence

### 本地存储方案 / Local Storage Solution

创建数据结构：/ Create data structure:

```json
// data/user-profile.json
{
  "name": "图图资本",
  "timezone": "Asia/Shanghai",
  "workingHours": {
    "start": "09:00",
    "end": "18:00"
  },
  "preferences": {
    "language": "zh-CN",
    "reminderDefault": 15,
    "notifications": {
      "email": true,
      "push": true,
      "sms": false
    }
  },
  "habits": [
    {
      "name": "晨跑",
      "frequency": "daily",
      "time": "07:00",
      "streak": 15
    },
    {
      "name": "阅读",
      "frequency": "daily",
      "time": "21:00",
      "streak": 23
    }
  ]
}
```

---

## 🔔 智能提醒系统 / Smart Reminder System

### 提醒类型 / Reminder Types

```javascript
// 提醒配置示例 / Reminder configuration example
{
  "reminders": [
    {
      "type": "time-based",
      "time": "08:00",
      "message": "早上好！☀️ 今天有 3 个会议，加油！",
      "frequency": "daily"
    },
    {
      "type": "location-based",
      "location": "公司",
      "message": "到公司了？记得打卡哦~",
      "geofence": 100 // meters
    },
    {
      "type": "event-based",
      "event": "meeting_start",
      "before": 15, // minutes
      "message": "会议 15 分钟后开始，准备好了吗？"
    },
    {
      "type": "habit",
      "habit": "喝水",
      "interval": 60, // minutes
      "message": "💧 该喝水了！保持水分~"
    }
  ]
}
```

---

## 📈 数据分析和洞察 / Analytics and Insights

### 周报生成 / Weekly Report Generation

```markdown
# 周报 / Weekly Report

📅 时间范围：2024-03-11 ~ 2024-03-17

## 📊 任务统计 / Task Statistics

- 完成任务：28 个 ✅
- 完成率：85% 📈
- 平均完成时间：2.3 小时

## 🎯 目标进度 / Goal Progress

**健康目标:**
• 运动：4/5 次 ✅
• 睡眠：平均 7.5 小时 ✅

**工作目标:**
• 项目 A: 80% 完成 🔄
• 项目 B: 100% 完成 ✅

**学习目标:**
• 阅读：5 小时 ✅
• 课程：2/3 节 🔄

## 💡 洞察 / Insights

**做得好的地方:**
• 任务完成率比上周提高 10% 🎉
• 早睡早起坚持了 5 天 👏

**可以改进的地方:**
• 下午效率较低，建议安排轻松工作
• 周末运动时间不足

## 📝 下周建议 / Next Week Suggestions

1. 继续保持早起的习惯
2. 周三下午安排运动，提升精力
3. 周末预留时间陪伴家人

---
继续保持！你做得很棒！💪
```

---

## 🧪 测试和优化 / Testing and Optimization

### 测试场景 / Test Scenarios

1. **日程冲突检测 / Schedule Conflict Detection**
2. **提醒准时性 / Reminder Punctuality**
3. **任务优先级排序 / Task Priority Sorting**
4. **习惯追踪准确性 / Habit Tracking Accuracy**
5. **数据持久化 / Data Persistence**

---

## 📚 扩展功能 / Extended Features

### 可选集成 / Optional Integrations

- **健康数据** - Apple Health/Google Fit
- **天气 API** - 基于天气调整建议
- **新闻 API** - 每日新闻摘要
- **股票 API** - 投资组合跟踪
- **音乐 API** - 根据心情推荐音乐

---

<div align="center">

[返回教程列表](../COMPLETE_TUTORIALS_LIST.md) · [上一个项目：客服机器人 ←](customer-support-bot.md) · [下一个项目：团队协作 →](team-collaboration.md)

</div>
