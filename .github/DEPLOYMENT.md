# Awesome OpenClaw - 自动化更新部署说明

> 📦 部署指南：配置每 2 小时自动更新仓库内容的定时任务

---

## 📁 文件结构

```
.github/
├── scripts/
│   └── auto-update.sh          # 核心更新脚本
├── config/
│   ├── update.config.example   # 配置模板（提交到 Git）
│   ├── update.config           # 实际配置（本地创建，不提交）
│   ├── cron-job                # Cron 配置模板
│   ├── monitoring.md           # 监控告警说明
│   └── .gitignore              # 保护敏感文件
├── workflows/
│   └── auto-update.yml         # GitHub Actions 工作流（可选）
└── DEPLOYMENT.md               # 本文件
```

---

## 🚀 快速部署（3 步）

### 步骤 1：准备配置文件

```bash
cd /home/parallels/code/awesome-openclaw

# 复制配置模板
cp .github/config/update.config.example .github/config/update.config

# 编辑配置（填入 Token 等）
nano .github/config/update.config
```

**必填配置项：**

```bash
# GitHub Token（必需）
export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxx"

# 日志目录（必需）
export LOG_DIR="/var/log/awesome-openclaw"
```

**可选配置项：**

```bash
# Telegram 告警
export TELEGRAM_BOT_TOKEN="..."
export TELEGRAM_CHAT_ID="..."

# 飞书告警
export FEISHU_WEBHOOK="..."
```

### 步骤 2：设置执行权限

```bash
chmod +x .github/scripts/auto-update.sh
```

### 步骤 3：配置定时任务

**方案 A：使用 Cron（推荐）**

```bash
# 创建日志目录
sudo mkdir -p /var/log/awesome-openclaw
sudo chown $USER:$USER /var/log/awesome-openclaw

# 编辑 crontab
crontab -e

# 添加以下行（每 2 小时执行）
15 */2 * * * /home/parallels/code/awesome-openclaw/.github/scripts/auto-update.sh >> /var/log/awesome-openclaw/cron.log 2>&1

# 验证
crontab -l
```

**方案 B：使用 GitHub Actions（无需服务器）**

```bash
# 1. 在 GitHub 仓库启用 Actions
# Settings → Actions → Enable

# 2. 配置 Secrets（如需自定义 Token）
# Settings → Secrets and variables → Actions
# 添加：GITHUB_TOKEN, TELEGRAM_BOT_TOKEN, etc.

# 3. 推送工作流文件
git add .github/workflows/auto-update.yml
git commit -m "Add auto-update workflow"
git push

# 4. 验证
# Actions 标签页查看定时任务执行
```

---

## 🔧 高级配置

### 多 Token 轮询（高并发场景）

```bash
# 创建 Token 文件
mkdir -p ~/.config/awesome-openclaw
cat > ~/.config/awesome-openclaw/github-tokens.txt << EOF
ghp_token1_xxxxxxxxxxxx
ghp_token2_xxxxxxxxxxxx
ghp_token3_xxxxxxxxxxxx
EOF

# 设置权限（仅自己可读）
chmod 600 ~/.config/awesome-openclaw/github-tokens.txt

# 在 update.config 中配置
export GITHUB_TOKEN_FILE="${HOME}/.config/awesome-openclaw/github-tokens.txt"
```

### 调整执行频率

**Cron 表达式参考：**

| 频率 | Cron 表达式 |
|------|------------|
| 每 1 小时 | `15 * * * *` |
| 每 2 小时 | `15 */2 * * *` |
| 每 4 小时 | `15 */4 * * *` |
| 每天 3 次 | `15 6,14,22 * * *` |
| 工作日白天 | `15 9-18 * * 1-5` |

**修改方法：**

```bash
# 编辑 crontab
crontab -e

# 修改对应行的时间表达式
```

### 日志轮转（防止磁盘占用）

```bash
# 创建 logrotate 配置
sudo nano /etc/logrotate.d/awesome-openclaw

# 内容：
/var/log/awesome-openclaw/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 0644 $USER $USER
}
```

---

## ✅ 验证部署

### 1. 手动测试脚本

```bash
# 执行一次完整更新
.github/scripts/auto-update.sh

# 检查输出
# 应看到：
# [INFO] ==========================================
# [INFO] Awesome OpenClaw 自动化更新启动
# [INFO] ==========================================
# [INFO] 已加载 X 个 GitHub Token
# [INFO] 开始更新资源...
# [INFO] 成功获取仓库列表
# [INFO] ✅ 更新成功
```

### 2. 检查 Cron 状态

```bash
# 查看 cron 服务
systemctl status cron

# 查看执行记录
tail -f /var/log/awesome-openclaw/cron.log

# 等待下次执行，或修改时间为 1 分钟后测试
```

### 3. 检查 GitHub Actions（如使用）

```bash
# 访问仓库 Actions 标签页
# 确认 "Auto Update Resources" 工作流已创建
# 手动触发一次测试：Run workflow → Run workflow
```

---

## 🚨 故障排查

### 问题 1：脚本执行失败

```bash
# 检查日志
tail -100 /var/log/awesome-openclaw/update-*.log

# 手动执行排查
bash -x .github/scripts/auto-update.sh

# 常见原因：
# - GitHub Token 失效 → 更新 Token
# - 网络问题 → 检查代理/防火墙
# - 权限不足 → chmod +x
```

### 问题 2：Cron 未执行

```bash
# 检查 cron 服务
systemctl status cron

# 检查 cron 日志
grep CRON /var/log/syslog | tail -20

# 验证 cron 配置
crontab -l

# 测试 cron 环境
# 在 crontab 中添加测试任务：
# * * * * * echo "test" >> /tmp/cron-test.log
```

### 问题 3：API 限流

```bash
# 检查当前限流状态
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
     https://api.github.com/rate_limit

# 解决方案：
# 1. 等待限流重置（1 小时）
# 2. 使用多 Token 轮询
# 3. 降低执行频率
```

### 问题 4：告警未发送

```bash
# 测试 Telegram
curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d "chat_id=${TELEGRAM_CHAT_ID}" \
  -d "text=测试消息"

# 测试飞书
curl -X POST "$FEISHU_WEBHOOK" \
  -H "Content-Type: application/json" \
  -d '{"msg_type":"text","content":{"text":"测试消息"}}'
```

---

## 📊 监控与维护

### 日常检查

```bash
# 查看最近执行状态
grep -E "(✅|❌)" /var/log/awesome-openclaw/update-*.log | tail -10

# 统计成功率
echo "成功：$(grep -c '✅ 更新成功' /var/log/awesome-openclaw/*.log)"
echo "失败：$(grep -c '❌ 更新失败' /var/log/awesome-openclaw/*.log)"

# 检查磁盘占用
du -sh /var/log/awesome-openclaw/
```

### 定期维护

```bash
# 清理旧日志（> 7 天）
find /var/log/awesome-openclaw -name "*.log" -mtime +7 -delete

# 更新 Token（如过期）
# GitHub Personal Access Token 有效期通常为 90 天

# 审查配置
cat .github/config/update.config
```

---

## 🔐 安全建议

1. **Token 安全**
   - 使用最小权限 Token（仅 `public_repo`）
   - 定期轮换 Token（每 90 天）
   - 不要提交 Token 到 Git

2. **文件权限**
   ```bash
   chmod 700 .github/scripts/
   chmod 600 .github/config/update.config
   chmod 600 ~/.config/awesome-openclaw/github-tokens.txt
   ```

3. **日志保护**
   ```bash
   chmod 750 /var/log/awesome-openclaw/
   chmod 640 /var/log/awesome-openclaw/*.log
   ```

---

## 📞 支持

- 📖 详细文档：`.github/config/monitoring.md`
- 🐛 问题反馈：GitHub Issues
- 💬 社区讨论：OpenClaw Discord
