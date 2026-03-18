# OpenClaw 安全最佳实践 🦞
# OpenClaw Security Best Practices

> **保护你的 Agent 和数据的安全指南 / Security Guide to Protect Your Agent and Data**

_预计时间 / Estimated Time: 1-2 小时 / 1-2 hours_  
_难度 / Difficulty: 进阶 / Intermediate_

---

## 🎯 学习目标 / Learning Objectives

完成本教程后，你将能够：/ After completing this tutorial, you will be able to:

- ✅ 识别常见安全风险 / Identify common security risks
- ✅ 实施安全配置 / Implement secure configurations
- ✅ 保护敏感数据 / Protect sensitive data
- ✅ 设置访问控制 / Set up access control
- ✅ 监控和应对安全事件 / Monitor and respond to security incidents

---

## 🔐 安全原则 / Security Principles

### 最小权限原则 / Principle of Least Privilege

只授予执行任务所需的最小权限：/ Grant only the minimum permissions needed to perform tasks:

```json
{
  "tools": {
    "allow": [
      "read",      // ✅ 只读权限 / Read-only
      "web_search" // ✅ 网络搜索 / Web search
    ],
    "deny": [
      "exec",      // ❌ 禁止执行命令 / Block command execution
      "write"      // ❌ 禁止写入 / Block writing
    ]
  }
}
```

### 纵深防御 / Defense in Depth

多层安全措施：/ Multiple layers of security:

```
┌─────────────────────────┐
│   网络安全层 / Network   │
│   防火墙、WAF、DDoS      │
├─────────────────────────┤
│   应用安全层 / App       │
│   认证、授权、审计       │
├─────────────────────────┤
│   数据安全层 / Data      │
│   加密、备份、访问控制   │
├─────────────────────────┤
│   物理安全层 / Physical  │
│   服务器、数据中心       │
└─────────────────────────┘
```

---

## 🔑 密钥和凭证管理 / Key and Credential Management

### 环境变量 / Environment Variables

**✅ 正确做法 / Best Practice:**

```bash
# .env 文件（不提交到 Git）/ .env file (do NOT commit to Git)
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=super-secret-key-min-32-chars
```

```bash
# 添加到 .gitignore / Add to .gitignore
echo ".env" >> .gitignore
echo ".env.production" >> .gitignore
echo ".env.local" >> .gitignore
```

**❌ 错误做法 / Bad Practice:**

```javascript
// ❌ 硬编码密钥 / Hardcoded keys
const API_KEY = "sk-1234567890abcdef";

// ❌ 提交到版本控制 / Commit to version control
git add .env
git commit -m "Add API keys"
```

---

### 密钥轮换 / Key Rotation

定期更换密钥：/ Rotate keys regularly:

```bash
#!/bin/bash
# rotate-keys.sh

echo "🔄 开始密钥轮换..."

# 1. 生成新密钥 / Generate new key
NEW_KEY=$(openssl rand -hex 32)

# 2. 更新环境变量 / Update environment variables
sed -i "s/JWT_SECRET=.*/JWT_SECRET=$NEW_KEY/" .env

# 3. 重启服务 / Restart service
systemctl restart openclaw-bot

# 4. 验证 / Verify
if [ $? -eq 0 ]; then
    echo "✅ 密钥轮换成功"
    # 5. 安全删除旧密钥 / Securely delete old key
    shred -u .env.backup
else
    echo "❌ 密钥轮换失败"
    exit 1
fi
```

**轮换周期 / Rotation Schedule:**

| 密钥类型 / Key Type | 轮换周期 / Rotation Period |
|-------------------|--------------------------|
| API 密钥 / API Keys | 每 90 天 / Every 90 days |
| JWT Secret | 每 30 天 / Every 30 days |
| 数据库密码 / DB Password | 每 60 天 / Every 60 days |
| SSH 密钥 / SSH Keys | 每年 / Annually |

---

## 🛡️ 网络安全 / Network Security

### 防火墙配置 / Firewall Configuration

```bash
# Ubuntu/Debian (UFW)
sudo ufw --force reset
sudo ufw default deny incoming    # 默认拒绝入站 / Default deny incoming
sudo ufw default allow outgoing   # 允许出站 / Allow outgoing

# 只开放必要端口 / Open only necessary ports
sudo ufw allow 22/tcp             # SSH
sudo ufw allow 443/tcp            # HTTPS
sudo ufw deny 3000/tcp            # 禁止直接访问 Gateway / Block direct Gateway

# 启用防火墙 / Enable firewall
sudo ufw enable
sudo ufw status verbose
```

---

### SSL/TLS 配置 / SSL/TLS Configuration

使用 Let's Encrypt 获取免费 SSL 证书：/ Get free SSL certificate with Let's Encrypt:

```bash
# 安装 Certbot / Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取证书 / Get certificate
sudo certbot --nginx -d your-domain.com

# 自动续期 / Auto-renewal
sudo certbot renew --dry-run
```

**Nginx SSL 配置 / Nginx SSL Configuration:**

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL 证书 / SSL Certificates
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # 现代 SSL 配置 / Modern SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    # 安全头 / Security Headers
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}

# HTTP 重定向到 HTTPS / HTTP redirect to HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## 👥 访问控制 / Access Control

### 用户认证 / User Authentication

实现 JWT 认证：/ Implement JWT authentication:

```javascript
// auth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '24h';

// 生成 Token / Generate Token
function generateToken(user) {
  return jwt.sign(
    { 
      userId: user.id, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// 验证 Token / Verify Token
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// 中间件 / Middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { generateToken, verifyToken, authMiddleware };
```

---

### 角色权限 / Role-Based Access Control (RBAC)

```json
{
  "roles": {
    "admin": {
      "permissions": [
        "skills:create",
        "skills:delete",
        "config:edit",
        "users:manage"
      ]
    },
    "user": {
      "permissions": [
        "skills:use",
        "config:view"
      ]
    },
    "guest": {
      "permissions": [
        "skills:use"
      ],
      "restrictions": [
        "rate_limit:10_per_minute"
      ]
    }
  }
}
```

---

## 📊 安全监控 / Security Monitoring

### 日志审计 / Log Auditing

记录所有安全相关事件：/ Log all security-related events:

```javascript
// security-logger.js
const fs = require('fs');
const path = require('path');

class SecurityLogger {
  constructor(logPath = './logs/security.log') {
    this.logPath = logPath;
  }

  log(event, details, user) {
    const entry = {
      timestamp: new Date().toISOString(),
      event,
      details,
      user: user?.id || 'anonymous',
      ip: user?.ip || 'unknown'
    };

    fs.appendFileSync(
      this.logPath,
      JSON.stringify(entry) + '\n'
    );

    // 严重事件告警 / Alert for critical events
    if (['LOGIN_FAILED', 'UNAUTHORIZED_ACCESS', 'DATA_BREACH'].includes(event)) {
      this.sendAlert(entry);
    }
  }

  loginSuccess(user) {
    this.log('LOGIN_SUCCESS', { method: user.authMethod }, user);
  }

  loginFailed(username, ip) {
    this.log('LOGIN_FAILED', { username, ip }, null);
  }

  unauthorizedAccess(user, resource) {
    this.log('UNAUTHORIZED_ACCESS', { resource }, user);
  }

  dataExport(user, recordCount) {
    this.log('DATA_EXPORT', { recordCount }, user);
  }

  sendAlert(entry) {
    // 发送告警到管理员 / Send alert to admin
    console.error('🚨 SECURITY ALERT:', entry);
  }
}

module.exports = new SecurityLogger();
```

---

### 入侵检测 / Intrusion Detection

监控异常行为：/ Monitor for anomalous behavior:

```javascript
// intrusion-detector.js
class IntrusionDetector {
  constructor() {
    this.failedAttempts = new Map();
    this.requestCounts = new Map();
    this.thresholds = {
      failedLogins: 5,      // 5 次失败登录 / 5 failed logins
      requestsPerMinute: 100, // 每分钟 100 次请求 / 100 requests/min
      dataExport: 1000       // 单次导出 1000 条 / 1000 records per export
    };
  }

  trackFailedLogin(ip) {
    const count = (this.failedAttempts.get(ip) || 0) + 1;
    this.failedAttempts.set(ip, count);

    if (count >= this.thresholds.failedLogins) {
      this.blockIP(ip);
      this.sendAlert(`🚨 暴力破解检测 / Brute force detected from ${ip}`);
    }
  }

  trackRequest(ip) {
    const now = Date.now();
    const minuteAgo = now - 60000;
    
    let requests = this.requestCounts.get(ip) || [];
    requests = requests.filter(time => time > minuteAgo);
    requests.push(now);
    
    this.requestCounts.set(ip, requests);

    if (requests.length >= this.thresholds.requestsPerMinute) {
      this.blockIP(ip);
      this.sendAlert(`🚨 DDoS 检测 / DDoS detected from ${ip}`);
    }
  }

  blockIP(ip) {
    // 实现 IP 封禁 / Implement IP blocking
    console.log(`🚫 Blocked IP: ${ip}`);
    // 添加到防火墙规则 / Add to firewall rules
    // exec(`iptables -A INPUT -s ${ip} -j DROP`);
  }

  sendAlert(message) {
    // 发送告警 / Send alert
    console.error(message);
  }
}

module.exports = new IntrusionDetector();
```

---

## 💾 数据安全 / Data Security

### 数据加密 / Data Encryption

**静态数据加密 / Data at Rest:**

```javascript
const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // 32 bytes

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag().toString('hex');
  
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted,
    authTag
  };
}

function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(encrypted.iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(encrypted.authTag, 'hex'));
  
  let decrypted = decipher.update(encrypted.encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
```

**传输数据加密 / Data in Transit:**

- 始终使用 HTTPS
  Always use HTTPS
- 使用 TLS 1.2+
  Use TLS 1.2+
- 禁用不安全的加密套件
  Disable insecure cipher suites

---

### 数据备份 / Data Backup

```bash
#!/bin/bash
# secure-backup.sh

set -e

BACKUP_DIR="/secure-backups"
DATE=$(date +%Y%m%d_%H%M%S)
ENCRYPTION_KEY=$BACKUP_ENCRYPTION_KEY

# 创建备份 / Create backup
tar -czf $BACKUP_DIR/data_$DATE.tar.gz \
  --exclude='node_modules' \
  --exclude='logs' \
  /opt/openclaw/my-bot/workspace/

# 加密备份 / Encrypt backup
openssl enc -aes-256-cbc \
  -salt \
  -pbkdf2 \
  -in $BACKUP_DIR/data_$DATE.tar.gz \
  -out $BACKUP_DIR/data_$DATE.tar.gz.enc \
  -pass pass:$ENCRYPTION_KEY

# 上传到云存储 / Upload to cloud storage
aws s3 cp $BACKUP_DIR/data_$DATE.tar.gz.enc \
  s3://your-bucket/backups/

# 本地只保留最近 7 天 / Keep only last 7 days locally
find $BACKUP_DIR -name "*.enc" -mtime +7 -delete

# 安全删除未加密文件 / Securely delete unencrypted files
shred -u $BACKUP_DIR/data_$DATE.tar.gz

echo "✅ 备份完成 / Backup completed"
```

---

## 🚨 应急响应 / Incident Response

### 安全事件分类 / Security Incident Classification

| 级别 / Level | 类型 / Type | 响应时间 / Response Time | 示例 / Examples |
|-------------|------------|-------------------------|----------------|
| **P0 - 严重 / Critical** | 数据泄露、系统被入侵 | 15 分钟 / 15 min | 数据库被拖、服务器被控制 |
| **P1 - 高 / High** | 未授权访问、暴力破解 | 1 小时 / 1 hour | 多次登录失败、异常访问 |
| **P2 - 中 / Medium** | 配置错误、弱密码 | 24 小时 / 24 hours | 开放端口、默认密码 |
| **P3 - 低 / Low** | 安全警告、漏洞扫描 | 1 周 / 1 week | SSL 即将过期、依赖漏洞 |

---

### 应急响应流程 / Incident Response Process

```
1. 检测 / Detection
   ↓
2. 分析 / Analysis
   ↓
3. 遏制 / Containment
   ↓
4. 根除 / Eradication
   ↓
5. 恢复 / Recovery
   ↓
6. 总结 / Lessons Learned
```

**应急响应清单 / Incident Response Checklist:**

```markdown
## P0 事件响应 / P0 Incident Response

### 立即行动 / Immediate Actions (0-15 分钟)

- [ ] 确认事件 / Confirm incident
- [ ] 启动应急响应团队 / Activate incident response team
- [ ] 隔离受影响系统 / Isolate affected systems
- [ ] 保存证据 / Preserve evidence
- [ ] 通知管理层 / Notify management

### 短期行动 / Short-term Actions (15 分钟 -2 小时)

- [ ] 分析攻击路径 / Analyze attack vector
- [ ] 修复漏洞 / Patch vulnerability
- [ ] 重置凭证 / Reset credentials
- [ ] 恢复数据 / Restore data
- [ ] 通知用户（如需要）/ Notify users if needed

### 后续行动 / Follow-up Actions (2-24 小时)

- [ ] 完整事件报告 / Complete incident report
- [ ] 安全审计 / Security audit
- [ ] 改进安全措施 / Improve security measures
- [ ] 团队复盘 / Team retrospective
```

---

## ✅ 安全检查清单 / Security Checklist

### 部署前 / Pre-deployment

- [ ] 所有密钥使用环境变量 / All keys use environment variables
- [ ] .env 文件已添加到.gitignore / .env added to .gitignore
- [ ] 防火墙配置完成 / Firewall configured
- [ ] SSL 证书已安装 / SSL certificate installed
- [ ] 数据库使用强密码 / Database uses strong password
- [ ] 禁用不必要的服务 / Unnecessary services disabled
- [ ] 系统更新到最新版本 / System updated to latest version
- [ ] 日志记录已配置 / Logging configured

### 运行中 / In Production

- [ ] 定期轮换密钥 / Rotate keys regularly
- [ ] 监控异常行为 / Monitor anomalous behavior
- [ ] 定期备份数据 / Backup data regularly
- [ ] 审查访问日志 / Review access logs
- [ ] 更新依赖包 / Update dependencies
- [ ] 进行安全扫描 / Perform security scans
- [ ] 测试应急响应计划 / Test incident response plan

### 审计 / Auditing

- [ ] 每季度安全审计 / Quarterly security audit
- [ ] 每年渗透测试 / Annual penetration test
- [ ] 代码审查包含安全检查 / Code review includes security checks
- [ ] 第三方依赖安全评估 / Third-party dependency security assessment

---

## 📚 相关资源 / Related Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [OpenClaw 安全文档](https://docs.openclaw.ai/security)

---

<div align="center">

[返回教程列表](../COMPLETE_TUTORIALS_LIST.md) · [上一个：设计模式 ←](design-patterns.md) · [下一个：性能优化 →](performance.md)

</div>
