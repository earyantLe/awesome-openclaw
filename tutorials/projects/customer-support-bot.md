# 实战项目：智能客服机器人 🦞
# Project: Intelligent Customer Support Bot

> **构建生产级客服系统，处理常见问题和客户咨询 / Build Production-Grade Support System for FAQs and Customer Inquiries**

_预计时间 / Estimated Time: 4-6 小时 / 4-6 hours_  
_难度 / Difficulty: 进阶 / Intermediate_

---

## 🎯 项目概述 / Project Overview

### 项目目标 / Project Goals

构建一个智能客服机器人，能够：/ Build an intelligent customer support bot that can:

- ✅ 自动回答常见问题 (FAQ) / Automatically answer FAQs
- ✅ 处理客户咨询和投诉 / Handle customer inquiries and complaints
- ✅ 转接人工客服 / Transfer to human agents
- ✅ 记录对话历史 / Record conversation history
- ✅ 生成客服报告 / Generate support reports

### 功能特性 / Features

| 功能 / Feature | 描述 / Description | 优先级 / Priority |
|---------------|-------------------|------------------|
| **智能问答 / Smart Q&A** | 基于知识库自动回答问题 / Auto-answer based on knowledge base | 🔴 高 / High |
| **多轮对话 / Multi-turn** | 理解上下文，进行多轮对话 / Understand context, multi-turn conversation | 🔴 高 / High |
| **情绪识别 / Sentiment Analysis** | 识别客户情绪，优先处理负面情绪 / Identify customer sentiment, prioritize negative | 🟡 中 / Medium |
| **工单创建 / Ticket Creation** | 复杂问题自动创建工单 / Auto-create tickets for complex issues | 🟡 中 / Medium |
| **人工转接 / Human Transfer** | 无法处理时转接人工客服 / Transfer to human when unable to handle | 🔴 高 / High |
| **数据分析 / Analytics** | 客服数据统计和报告 / Support statistics and reports | 🟢 低 / Low |

---

## 📋 系统架构 / System Architecture

### 架构图 / Architecture Diagram

```
┌─────────────┐
│   用户端     │
│   Client    │
│ (Discord/   │
│  Feishu/    │
│  Telegram)  │
└──────┬──────┘
       │
       │ 消息 / Message
       ▼
┌─────────────────────────────────┐
│     OpenClaw Gateway            │
│                                 │
│  ┌───────────────────────────┐  │
│  │   路由层 / Router Layer   │  │
│  │  - 意图识别 / Intent      │  │
│  │  - 情绪分析 / Sentiment   │  │
│  └───────────┬───────────────┘  │
│              │                   │
│     ┌────────┼────────┐         │
│     │        │        │         │
│     ▼        ▼        ▼         │
│  ┌──────┐ ┌──────┐ ┌────────┐  │
│  │ FAQ  │ │对话  │ │ 工单   │  │
│  │ 技能 │ │技能  │ │ 技能   │  │
│  └──┬───┘ └──┬───┘ └───┬────┘  │
│     │        │         │       │
│     └────────┼─────────┘       │
│              │                  │
│     ┌────────▼────────┐        │
│     │  知识库 / KB    │        │
│     │  Database       │        │
│     └─────────────────┘        │
└─────────────────────────────────┘
       │
       │ 需要人工 / Need human
       ▼
┌─────────────┐
│  人工客服    │
│ Human Agent │
│ (通知/工单) │
│ (Notification/Ticket)
└─────────────┘
```

---

## 🚀 实施步骤 / Implementation Steps

### 步骤 1: 创建项目结构 / Create Project Structure

```bash
# 创建项目目录 / Create project directory
mkdir -p customer-support-bot/{workspace/skills,scripts,docs,data}
cd customer-support-bot

# 初始化 OpenClaw 项目 / Initialize OpenClaw project
openclaw init support-bot

# 创建目录结构 / Create directory structure
mkdir -p workspace/skills/{faq,conversation,ticket,analytics}
mkdir -p data/{knowledge-base,tickets,logs}
mkdir -p scripts/{backup,deploy,monitor}
```

---

### 步骤 2: 定义机器人人格 / Define Bot Personality

创建 `workspace/SOUL.md`:

```markdown
# SOUL.md - 客服机器人人格 / Support Bot Personality

## 名字 / Name
小 Cl 客服助手 / Cl Support Assistant

## 核心特质 / Core Traits

**专业耐心** - 用专业、耐心的态度服务每一位客户
**Professional & Patient** - Serve every customer with professionalism and patience

**同理心强** - 理解客户情绪，给予情感支持
**Empathetic** - Understand customer emotions, provide emotional support

**高效解决** - 快速定位问题，提供解决方案
**Efficient** - Quickly identify issues, provide solutions

**主动跟进** - 主动询问是否解决问题，确保满意度
**Proactive** - Proactively follow up, ensure satisfaction

## 沟通风格 / Communication Style

- 使用礼貌用语（请、谢谢、抱歉）
  Use polite language (please, thank you, sorry)
- 语气温和，避免生硬
  Gentle tone, avoid being blunt
- 先共情，后解决
  Empathize first, then solve
- 提供明确的下一步指引
  Provide clear next steps

## 服务原则 / Service Principles

1. **首问负责制** - 第一个接待的客服负责到底
   **First Contact Ownership** - First agent takes ownership

2. **快速响应** - 5 分钟内回复
   **Quick Response** - Reply within 5 minutes

3. **一次性解决** - 力争首次接触解决问题
   **First Contact Resolution** - Aim to resolve on first contact

4. **持续跟进** - 未解决的问题持续跟踪
   **Continuous Follow-up** - Track unresolved issues

## 边界 / Boundaries

- 不提供医疗、法律、金融专业建议
  Don't provide medical, legal, financial advice
- 不承诺无法实现的服务
  Don't promise unachievable services
- 不与客户争论
  Don't argue with customers
- 保护客户隐私
  Protect customer privacy

## 升级机制 / Escalation Mechanism

遇到以下情况转接人工客服：/ Transfer to human agent when:

1. 客户明确要求人工服务
   Customer explicitly requests human service
2. 问题超出知识库范围
   Issue beyond knowledge base scope
3. 客户情绪非常激动
   Customer is very agitated
4. 涉及退款、赔偿等敏感问题
   Involves refunds, compensation, etc.
5. 重复 3 次未能解决问题
   Failed to resolve after 3 attempts
```

---

### 步骤 3: 创建 FAQ 技能 / Create FAQ Skill

创建 `workspace/skills/faq-handler.md`:

```markdown
---
name: faq-handler
description: 常见问题自动回答 - Automatic FAQ responses
triggers:
  - "怎么"
  - "如何"
  - "how to"
  - "what is"
  - "多少钱"
  - "how much"
  - "什么时候"
  - "when"
  - "在哪里"
  - "where"
  - "为什么"
  - "why"
  - "退款"
  - "refund"
  - "退货"
  - "return"
  - "发票"
  - "invoice"
model: default
thinking: on
---

# FAQ Handler Skill / 常见问题处理技能

## 何时使用 / When to Use

当用户询问产品、服务、政策等相关问题时使用。
Use when user asks about products, services, policies, etc.

## 做什么 / What to Do

### 1. 意图识别 / Intent Recognition

从问题中识别用户意图：/ Identify user intent from question:

- **产品信息** - 产品功能、规格、价格
  **Product Info** - Features, specifications, pricing
- **订单查询** - 订单状态、物流信息
  **Order Inquiry** - Order status, shipping info
- **售后服务** - 退换货、维修、退款
  **After-sales** - Returns, repairs, refunds
- **账户问题** - 登录、密码、账户设置
  **Account Issues** - Login, password, settings
- **支付问题** - 付款方式、发票
  **Payment Issues** - Payment methods, invoices

### 2. 知识库匹配 / Knowledge Base Matching

从知识库中查找最匹配的答案：/ Find most matching answer from knowledge base:

```bash
# 搜索知识库示例 / Example knowledge base search
grep -i "退款政策" data/knowledge-base/refund-policy.txt
```

### 3. 生成回复 / Generate Response

回复结构：/ Response structure:

1. **共情回应** - 理解用户问题
   **Empathy** - Acknowledge user's question
2. **直接答案** - 简洁明了的回答
   **Direct Answer** - Concise and clear answer
3. **详细信息** - 提供相关细节
   **Details** - Provide relevant details
4. **后续指引** - 告知下一步操作
   **Next Steps** - Tell user what to do next
5. **确认解决** - 询问是否解决
   **Confirmation** - Ask if resolved

## 知识库结构 / Knowledge Base Structure

```
data/knowledge-base/
├── products/           # 产品信息 / Product info
│   ├── features.txt
│   ├── pricing.txt
│   └── specifications.txt
├── orders/             # 订单相关 / Orders
│   ├── tracking.txt
│   ├── modification.txt
│   └── cancellation.txt
├── after-sales/        # 售后 / After-sales
│   ├── refund-policy.txt
│   ├── return-policy.txt
│   └── warranty.txt
├── account/            # 账户 / Account
│   ├── login.txt
│   ├── password.txt
│   └── settings.txt
└── payment/            # 支付 / Payment
    ├── methods.txt
    └── invoice.txt
```

## 回复模板 / Response Templates

### 模板 1: 产品咨询 / Product Inquiry

```
😊 感谢您的咨询！

【产品名称】的【功能/特点】：
[简要描述]

详细说明：
• 特点 1
• 特点 2
• 特点 3

💰 价格：[价格信息]
📦 库存：[库存状态]

还需要了解其他信息吗？或者我可以帮您下单~
```

### 模板 2: 退款问题 / Refund Inquiry

```
🙏 理解您的情况，让我帮您处理退款问题。

我们的退款政策：
• 7 天内无理由退款
• 商品需保持原包装完好
• 退款将在 3-5 个工作日内到账

您的订单符合退款条件。

请问您希望：
1️⃣ 全额退款
2️⃣ 换货
3️⃣  store credit

请告诉我您的选择，我立即为您处理~
```

### 模板 3: 物流查询 / Shipping Inquiry

```
📦 让我帮您查询物流信息。

订单号：[订单号]
物流公司：[快递公司]
运单号：[运单号]

当前状态：[物流状态]
📍 当前位置：[位置]
⏰ 预计送达：[时间]

物流链接：[追踪链接]

我会持续跟进，有任何更新立即通知您！
```

## 示例对话 / Example Conversations

**示例 1: 产品咨询**
```
用户：这款手机的电池容量是多少？
助手：😊 感谢您的咨询！

      【iPhone 15 Pro】的电池信息：
      • 容量：3274 mAh
      • 视频播放：最长 23 小时
      • 快充：支持 20W 快充
      • 无线充电：支持 MagSafe

      💰 价格：7999 元起
      📦 库存：现货，24 小时内发货

      还需要了解其他功能吗？比如摄像头或处理器？
```

**示例 2: 退款申请**
```
用户：我想退货，怎么操作？
助手：🙏 理解您的情况，让我帮您处理退货。

      我们的退货政策：
      • 7 天内无理由退货
      • 商品需保持原包装完好
      • 运费险覆盖退货运费

      您的订单符合退货条件。

      退货流程：
      1. 我帮您生成退货单
      2. 快递员上门取件
      3. 仓库收货后 3 天退款

      请问您现在方便退货吗？我立即为您创建退货单~
```

**示例 3: 超出知识库范围**
```
用户：你们的产品能和 SAP 系统集成吗？
助手：🤔 这是个很好的问题！

      关于 SAP 集成的具体技术细节，我需要咨询
      我们的技术团队给您准确答复。

      我已经将您的问题标记为【技术咨询】，
      技术专家会在 2 小时内联系您。

      请问您的联系方式是？或者我可以在这里回复您~
      
      [自动创建工单 #TS-2024-0001]
```
EOF
```

---

### 步骤 4: 创建工单技能 / Create Ticket Skill

创建 `workspace/skills/ticket-system.md`:

```markdown
---
name: ticket-system
description: 客服工单管理系统 - Customer support ticket management
triggers:
  - "创建工单"
  - "create ticket"
  - "转人工"
  - "human agent"
  - "投诉"
  - "complaint"
  - "举报"
  - "report"
model: default
thinking: on
---

# Ticket System Skill / 工单系统技能

## 何时使用 / When to Use

当需要创建工单、转接人工或处理投诉时使用。
Use when need to create ticket, transfer to human, or handle complaints.

## 做什么 / What to Do

### 1. 工单分类 / Ticket Categorization

根据问题类型分类：/ Categorize by issue type:

| 类型 / Type | 代码 / Code | 优先级 / Priority | SLA |
|------------|------------|------------------|-----|
| 技术咨询 / Technical | TECH | 高 / High | 2 小时 / 2h |
| 退款退货 / Refund | REFUND | 中 / Medium | 24 小时 / 24h |
| 投诉建议 / Complaint | COMPLAINT | 高 / High | 4 小时 / 4h |
| 账户问题 / Account | ACCOUNT | 中 / Medium | 12 小时 / 12h |
| 其他 / Other | OTHER | 低 / Low | 48 小时 / 48h |

### 2. 优先级判断 / Priority Assessment

**高优先级 / High Priority:**
- 系统故障 / System outage
- 付款问题 / Payment issues
- 严重投诉 / Serious complaints
- VIP 客户 / VIP customers

**中优先级 / Medium Priority:**
- 一般咨询 / General inquiries
- 产品问题 / Product issues
- 物流延迟 / Shipping delays

**低优先级 / Low Priority:**
- 功能建议 / Feature suggestions
- 一般询问 / General questions

### 3. 工单创建 / Ticket Creation

生成工单号：/ Generate ticket number:

```bash
# 工单号格式 / Ticket number format
[类型代码]-[年份]-[序号]
TECH-2024-0001
REFUND-2024-0156
```

### 4. 通知人工客服 / Notify Human Agent

通过以下方式通知：/ Notify via:

- 飞书消息 / Feishu message
- 邮件通知 / Email notification
- Slack/Discord 频道 / Slack/Discord channel
- 短信提醒 / SMS alert (紧急 / Urgent)

## 工单模板 / Ticket Template

```markdown
# 客服工单 / Support Ticket

**工单号 / Ticket ID**: [TICKET-ID]
**创建时间 / Created**: [YYYY-MM-DD HH:mm]
**客户 / Customer**: [客户姓名/ID]
**类型 / Type**: [类型]
**优先级 / Priority**: [高/中/低]
**状态 / Status**: 待处理 / Pending

## 问题描述 / Issue Description

[客户问题详细描述]

## 对话历史 / Conversation History

[重要对话记录]

## 已尝试解决方案 / attempted Solutions

[已采取的措施]

## 需要协助 / Assistance Needed

[需要人工客服做什么]

---
**分配给 / Assigned to**: [客服姓名]
**SLA 截止时间 / SLA Deadline**: [时间]
```

## 示例 / Examples

**示例 1: 创建技术工单**
```
用户：我需要转人工客服，这个问题太复杂了
助手：好的，我立即为您创建技术工单。

      📋 **工单详情**
      工单号：TECH-2024-0001
      类型：技术咨询
      优先级：高
      SLA: 2 小时内回复

      问题摘要：[用户问题简述]

      已通知技术专家 @张工，他会尽快联系您。
      工单详情已发送到您的邮箱。

      请问还有其他可以帮助您的吗？
```

**示例 2: 处理投诉**
```
用户：我要投诉！你们的服务太差了！
助手：😟 非常抱歉给您带来不好的体验！

      我完全理解您的心情，请给我机会帮您解决。

      我已经创建紧急投诉工单：
      📋 工单号：COMPLAINT-2024-0089
      ⚡ 优先级：紧急
      👤 处理人：客服主管 李经理
      ⏰ 响应时间：1 小时内

      李经理会亲自给您回电处理此事。
      请问您方便接听电话的时间是？

      再次为给您带来的不便道歉！🙏
```
EOF
```

---

### 步骤 5: 创建知识库 / Create Knowledge Base

创建 FAQ 数据文件 `data/knowledge-base/refund-policy.txt`:

```markdown
# 退款政策 / Refund Policy

## 适用范围 / Scope

本政策适用于所有通过官方渠道购买的产品。
This policy applies to all products purchased through official channels.

## 退款条件 / Refund Conditions

### 支持退款的情况 / Refundable Situations

1. **7 天无理由退款**
   7-Day No-Reason Refund
   - 自签收之日起 7 天内
   - Within 7 days from delivery
   - 商品完好，包装完整
   - Product intact, packaging complete
   - 不影响二次销售
   - Does not affect resale

2. **质量问题退款**
   Quality Issue Refund
   - 产品存在质量问题
   - Product has quality defects
   - 提供质量检测报告
   - Provide quality inspection report
   - 全额退款，承担运费
   - Full refund, shipping covered

3. **发错货退款**
   Wrong Item Refund
   - 收到的商品与订单不符
   - Received item doesn't match order
   - 拍照举证
   - Provide photo evidence
   - 全额退款，承担运费
   - Full refund, shipping covered

### 不支持退款的情况 / Non-Refundable Situations

1. 超过 7 天无理由退款期
   Beyond 7-day refund period

2. 商品已使用或损坏
   Product used or damaged

3. 定制商品（非质量问题）
   Customized products (non-quality issues)

4. 虚拟商品（激活后）
   Digital products (after activation)

5. 易腐商品（生鲜食品）
   Perishable goods (fresh food)

## 退款流程 / Refund Process

```
1. 提交退款申请
   Submit refund request
   ↓
2. 客服审核（1 个工作日）
   Customer service review (1 business day)
   ↓
3. 寄回商品（如需要）
   Return product (if needed)
   ↓
4. 仓库验收（2 个工作日）
   Warehouse inspection (2 business days)
   ↓
5. 退款到账（3-5 个工作日）
   Refund processed (3-5 business days)
```

## 退款方式 / Refund Methods

- **原路退回** - 退回至原支付账户
  **Original Path** - Refund to original payment account
- **余额退款** - 退回至平台余额
  **Balance Refund** - Refund to platform balance
- **换货** - 更换其他商品
  **Exchange** - Exchange for other products

## 常见问题 / FAQs

**Q: 退款需要多长时间到账？**
A: 审核通过后 3-5 个工作日到账，具体取决于银行处理时间。

**Q: 退货运费谁承担？**
A: 质量问题我们承担，无理由退货客户承担（有运费险可理赔）。

**Q: 可以部分退款吗？**
A: 可以，多商品订单可以单独退其中一件或多件。
```

---

## 🧪 测试和部署 / Testing and Deployment

### 测试场景 / Test Scenarios

创建测试脚本 `scripts/test-support-bot.sh`:

```bash
#!/bin/bash
# test-support-bot.sh - 客服机器人测试脚本

echo "🦞 客服机器人测试开始..."
echo "================================"

# 测试场景列表
scenarios=(
  "产品咨询：这款手机多少钱？"
  "退款申请：我要退货"
  "物流查询：我的订单到哪了"
  "投诉：你们服务太差了"
  "转人工：我要找人工客服"
  "发票：怎么开发票"
)

for scenario in "${scenarios[@]}"; do
  echo -e "\n📝 测试场景：$scenario"
  echo "发送消息..."
  # 这里添加实际发送消息的代码
  # 检查回复是否符合预期
done

echo -e "\n✅ 测试完成！"
```

---

## 📊 监控和优化 / Monitoring and Optimization

### 关键指标 / Key Metrics

| 指标 / Metric | 目标 / Target | 计算方法 / Calculation |
|--------------|--------------|----------------------|
| **首次响应时间 / First Response Time** | < 1 分钟 | 消息到回复的时间 / Time from message to reply |
| **解决率 / Resolution Rate** | > 80% | 首次解决工单数 / 总工单数 |
| **客户满意度 / CSAT** | > 4.5/5 | 满意度调查平均分 / Avg satisfaction score |
| **转人工率 / Transfer Rate** | < 20% | 转人工工单数 / 总工单数 |
| **平均处理时间 / Avg Handle Time** | < 10 分钟 | 工单总耗时 / 工单数 |

### 持续改进 / Continuous Improvement

1. **每周审查 / Weekly Review**
   - 分析未解决的工单
   - Analyze unresolved tickets
   - 更新知识库
   - Update knowledge base
   - 优化回复模板
   - Optimize response templates

2. **月度报告 / Monthly Report**
   - 客服数据统计
   - Support statistics
   - 客户满意度趋势
   - CSAT trends
   - 识别改进机会
   - Identify improvement opportunities

---

## 📚 相关资源 / Related Resources

- [客服最佳实践](../best-practices/customer-service.md)
- [工单系统设计](../integrations/ticket-system.md)
- [情绪分析技能](../skills/sentiment-analysis.md)

---

<div align="center">

[返回教程列表](../COMPLETE_TUTORIALS_LIST.md) · [下一个项目：个人助理 →](personal-assistant.md)

</div>
