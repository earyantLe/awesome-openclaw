# ⚙️ 部署配置速查

## 📋 配置文件清单

| 文件 | 用途 | 是否提交 |
|------|------|----------|
| `.github/scripts/auto-update.sh` | 核心更新脚本 | ✅ 是 |
| `.github/config/update.config.example` | 配置模板 | ✅ 是 |
| `.github/config/update.config` | 实际配置 | ❌ 否（本地创建）|
| `.github/config/cron-job` | Cron 配置模板 | ✅ 是 |
| `.github/workflows/auto-update.yml` | GitHub Actions | ✅ 是 |
| `.github/config/monitoring.md` | 监控告警说明 | ✅ 是 |
| `.github/DEPLOYMENT.md` | 完整部署文档 | ✅ 是 |

---

## 🚀 3 分钟快速部署

```bash
# 1. 复制并编辑配置
cd /home/parallels/code/awesome-openclaw
cp .github/config/update.config.example .github/config/update.config
nano .github/config/update.config  # 填入 GITHUB_TOKEN

# 2. 设置权限
chmod +x .github/scripts/auto-update.sh

# 3. 配置 Cron
mkdir -p /var/log/awesome-openclaw
crontab -e
# 添加：15 */2 * * * /home/parallels/code/awesome-openclaw/.github/scripts/auto-update.sh >> /var/log/awesome-openclaw/cron.log 2>&1

# 4. 测试
.github/scripts/auto-update.sh
```

---

## 🔑 关键配置项

### 必填
```bash
export GITHUB_TOKEN="ghp_xxx"           # GitHub API Token
export LOG_DIR="/var/log/awesome-openclaw"  # 日志目录
```

### 可选（推荐）
```bash
export RATE_LIMIT_DELAY=2              # API 请求间隔（秒）
export MAX_CONCURRENT=3                # 最大并发数
export TELEGRAM_BOT_TOKEN="..."        # Telegram 告警
export TELEGRAM_CHAT_ID="..."          # Telegram 聊天 ID
export FEISHU_WEBHOOK="..."            # 飞书 webhook
```

---

## 📊 Cron 配置

**位置：** `/etc/cron.d/awesome-openclaw` 或 `crontab -e`

**执行频率：** 每 2 小时（在每小时的第 15 分钟）

```cron
15 */2 * * * root /home/parallels/code/awesome-openclaw/.github/scripts/auto-update.sh >> /var/log/awesome-openclaw/cron.log 2>&1
```

---

## 🔔 告警配置

### Telegram
```bash
export TELEGRAM_BOT_TOKEN="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
export TELEGRAM_CHAT_ID="-1001234567890"
```

### 飞书
```bash
export FEISHU_WEBHOOK="https://open.feishu.cn/open-apis/bot/v2/hook/xxx"
```

---

## 📈 监控命令

```bash
# 查看最近日志
tail -f /var/log/awesome-openclaw/update-latest.log

# 检查执行状态
grep -E "(✅|❌)" /var/log/awesome-openclaw/*.log | tail -10

# 查看 Cron 执行记录
grep CRON /var/log/syslog | grep awesome-openclaw | tail -20

# 检查 API 限流
curl -H "Authorization: Bearer $GITHUB_TOKEN" https://api.github.com/rate_limit
```

---

## 🐛 快速排查

| 问题 | 检查项 |
|------|--------|
| 脚本不执行 | `systemctl status cron` |
| API 限流 | 检查 Token 余额，增加 `RATE_LIMIT_DELAY` |
| 告警不发送 | 测试 webhook：`curl -X POST $FEISHU_WEBHOOK ...` |
| 权限错误 | `chmod +x .github/scripts/auto-update.sh` |

---

## 📖 详细文档

- 完整部署指南：`.github/DEPLOYMENT.md`
- 监控告警配置：`.github/config/monitoring.md`
