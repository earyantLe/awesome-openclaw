# 监控告警配置说明

## 📊 监控指标

### 1. 脚本执行监控

| 指标 | 阈值 | 告警级别 |
|------|------|----------|
| 执行失败率 | > 10% (24h) | ⚠️ 警告 |
| 连续失败次数 | >= 3 次 | 🚨 严重 |
| 执行超时 | > 10 分钟 | ⚠️ 警告 |
| API 限流触发 | > 5 次/小时 | ⚠️ 警告 |

### 2. 资源健康度

| 指标 | 检查项 |
|------|--------|
| GitHub API 可用性 | rate_limit 端点响应 |
| Token 余额 | 剩余请求次数 > 100 |
| 日志文件大小 | < 100MB/天 |
| 磁盘空间 | > 1GB 可用 |

---

## 🔔 告警渠道配置

### 方案 A：Telegram 通知

```bash
# 1. 创建 Telegram Bot
# 联系 @BotFather，获取 BOT_TOKEN

# 2. 获取 Chat ID
# 将 Bot 添加到群/频道，发送消息后访问：
# https://api.telegram.org/bot<BOT_TOKEN>/getUpdates

# 3. 配置环境变量
export TELEGRAM_BOT_TOKEN="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
export TELEGRAM_CHAT_ID="-1001234567890"
```

### 方案 B：飞书 webhook

```bash
# 1. 在飞书群添加「自定义机器人」
# 群设置 → 机器人 → 添加机器人 → 自定义

# 2. 获取 Webhook URL
# 复制生成的 webhook 地址

# 3. 配置环境变量
export FEISHU_WEBHOOK="https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxxx"
```

### 方案 C：GitHub Actions 通知

使用 `.github/workflows/auto-update.yml` 中的失败通知步骤，自动发送 Telegram 消息。

---

## 📈 监控面板

### 查看执行日志

```bash
# 实时日志
tail -f /var/log/awesome-openclaw/update-latest.log

# 查看最近 24 小时日志
grep "$(date +%Y-%m-%d)" /var/log/awesome-openclaw/*.log

# 统计执行成功率
grep -c "✅ 更新成功" /var/log/awesome-openclaw/*.log
grep -c "❌ 更新失败" /var/log/awesome-openclaw/*.log
```

### GitHub Actions 监控

1. 访问仓库 → Actions → Auto Update Resources
2. 查看执行历史、日志、成功率
3. 设置邮件通知：GitHub Settings → Notifications

### Cron 任务监控

```bash
# 查看 cron 执行记录
grep CRON /var/log/syslog | grep awesome-openclaw

# 检查 cron 服务状态
systemctl status cron

# 验证 cron 配置
crontab -l
sudo cat /etc/cron.d/awesome-openclaw
```

---

## 🚨 告警响应流程

### Level 1: 警告（单次失败）

1. 检查日志：`tail -100 /var/log/awesome-openclaw/update-*.log`
2. 确认是否临时网络问题
3. 等待下次自动重试

### Level 2: 严重（连续失败 >= 3）

1. 检查 GitHub Token 是否失效
2. 检查 API 限流状态
3. 手动执行脚本排查：`bash .github/scripts/auto-update.sh`
4. 如需，切换备用 Token

### Level 3: 紧急（持续失败 > 24h）

1. 上报问题到 Issue Tracker
2. 暂停定时任务避免日志堆积
3. 联系维护者介入

---

## 📋 健康检查清单

每日检查：

- [ ] 日志无 ERROR 级别错误
- [ ] 最近一次执行成功
- [ ] API 限流余额充足 (> 100)
- [ ] 告警渠道正常（测试消息）

每周检查：

- [ ] 清理旧日志（> 7 天）
- [ ] 更新 GitHub Token（如即将过期）
- [ ] 审查执行成功率

每月检查：

- [ ] 评估更新频率是否合理
- [ ] 优化检索查询条件
- [ ] 审查告警阈值
