# 部署 OpenClaw 到生产环境 🦞
# Deploy OpenClaw to Production Environment

> **完整的生产部署指南，包含安全、监控和运维 / Complete Production Deployment Guide with Security, Monitoring, and Operations**

_预计时间 / Estimated Time: 1-2 小时 / 1-2 hours_  
_难度 / Difficulty: 进阶 / Intermediate_

---

## 🎯 学习目标 / Learning Objectives

完成本教程后，你将能够：/ After completing this tutorial, you will be able to:

- ✅ 选择合适的部署方案 / Choose appropriate deployment solution
- ✅ 配置生产环境安全 / Configure production environment security
- ✅ 设置监控和告警 / Set up monitoring and alerts
- ✅ 实现自动备份 / Implement automatic backups
- ✅ 处理常见问题和故障 / Handle common issues and failures

---

## 📋 部署方案 / Deployment Options

### 方案 1: 云服务器部署 / Cloud Server Deployment

**推荐指数 / Recommendation**: ⭐⭐⭐⭐⭐

**适合场景 / Best for**: 企业级应用、需要高可用性 / Enterprise applications, high availability required

#### 云服务器选择 / Cloud Server Options

| 提供商 / Provider | 推荐配置 / Recommended Config | 价格 / Price | 特点 / Features |
|------------------|------------------------------|-------------|-----------------|
| **AWS EC2** | t3.medium (2vCPU, 4GB) | ~$30/月 | 全球覆盖，生态完善 |
| **阿里云 ECS** | ecs.t5-c1m1.large | ~¥99/月 | 国内访问快，中文支持 |
| **腾讯云 CVM** | S2.MEDIUM2 | ~¥78/月 | 性价比高，微信集成 |
| **DigitalOcean** | 2GB Basic Droplet | $12/月 | 简单便宜，适合初创 |
| **Vultr** | 2GB Cloud Compute | $12/月 | 全球节点，按小时计费 |

#### 部署步骤 / Deployment Steps

```bash
# 1. 准备服务器 / Prepare server
# SSH 登录服务器 / SSH into server
ssh user@your-server-ip

# 2. 安装 Node.js / Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. 安装 OpenClaw / Install OpenClaw
sudo npm install -g openclaw

# 4. 创建项目目录 / Create project directory
mkdir -p /opt/openclaw/my-bot
cd /opt/openclaw/my-bot

# 5. 初始化项目 / Initialize project
openclaw init production-bot

# 6. 配置环境变量 / Configure environment variables
cat > .env << 'EOF'
# 生产环境配置 / Production Configuration
NODE_ENV=production
OPENAI_API_KEY=sk-...
DISCORD_BOT_TOKEN=MT...
LOG_LEVEL=info
EOF

# 7. 创建 systemd 服务 / Create systemd service
sudo cat > /etc/systemd/system/openclaw-bot.service << 'EOF'
[Unit]
Description=OpenClaw Bot Service
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/openclaw/my-bot
Environment=NODE_ENV=production
Environment=LOG_LEVEL=info
EnvironmentFile=/opt/openclaw/my-bot/.env
ExecStart=/usr/bin/openclaw gateway start
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=openclaw-bot

# 安全限制 / Security limits
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF

# 8. 启动服务 / Start service
sudo systemctl daemon-reload
sudo systemctl enable openclaw-bot
sudo systemctl start openclaw-bot

# 9. 检查状态 / Check status
sudo systemctl status openclaw-bot

# 10. 查看日志 / View logs
sudo journalctl -u openclaw-bot -f
```

---

### 方案 2: Docker 容器部署 / Docker Container Deployment

**推荐指数 / Recommendation**: ⭐⭐⭐⭐⭐

**适合场景 / Best for**: 微服务架构、需要快速扩展 / Microservices, rapid scaling required

#### Dockerfile 示例 / Dockerfile Example

创建 `Dockerfile`:

```dockerfile
FROM node:20-alpine

# 安装必要的工具 / Install necessary tools
RUN apk add --no-cache curl git bash

# 安装 OpenClaw / Install OpenClaw
RUN npm install -g openclaw

# 创建工作目录 / Create work directory
WORKDIR /app

# 复制项目文件 / Copy project files
COPY package*.json ./
COPY workspace/ ./workspace/
COPY skills/ ./skills/
COPY openclaw.json ./

# 暴露端口 / Expose port
EXPOSE 3000

# 健康检查 / Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# 启动命令 / Start command
CMD ["openclaw", "gateway", "start"]
```

#### Docker Compose 配置 / Docker Compose Configuration

创建 `docker-compose.yml`:

```yaml
version: '3.8'

services:
  openclaw-bot:
    build: .
    container_name: openclaw-bot
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - DISCORD_BOT_TOKEN=${DISCORD_BOT_TOKEN}
    volumes:
      - ./workspace/memory:/app/workspace/memory
      - ./logs:/app/logs
    networks:
      - openclaw-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 10s
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M

  # 可选：添加 Nginx 反向代理 / Optional: Add Nginx reverse proxy
  nginx:
    image: nginx:alpine
    container_name: openclaw-nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    depends_on:
      - openclaw-bot
    networks:
      - openclaw-network

networks:
  openclaw-network:
    driver: bridge

volumes:
  memory_data:
  logs_data:
```

#### 部署命令 / Deployment Commands

```bash
# 1. 构建镜像 / Build image
docker-compose build

# 2. 启动服务 / Start services
docker-compose up -d

# 3. 查看状态 / View status
docker-compose ps

# 4. 查看日志 / View logs
docker-compose logs -f openclaw-bot

# 5. 重启服务 / Restart services
docker-compose restart

# 6. 停止服务 / Stop services
docker-compose down

# 7. 更新部署 / Update deployment
docker-compose pull
docker-compose up -d --force-recreate
```

---

### 方案 3: Serverless 部署 / Serverless Deployment

**推荐指数 / Recommendation**: ⭐⭐⭐

**适合场景 / Best for**: 低流量应用、成本敏感 / Low traffic applications, cost-sensitive

#### Vercel 部署 / Deploy to Vercel

```bash
# 1. 安装 Vercel CLI / Install Vercel CLI
npm install -g vercel

# 2. 登录 Vercel / Login to Vercel
vercel login

# 3. 部署 / Deploy
vercel --prod
```

**注意 / Note**: Serverless 部署可能有冷启动问题，不适合实时对话场景。/ Serverless deployment may have cold start issues, not suitable for real-time conversations.

---

## 🔐 安全配置 / Security Configuration

### 1. 环境变量管理 / Environment Variables Management

**使用 .env 文件 / Using .env file:**

```bash
# .env.production
# 不要提交到版本控制！/ Do NOT commit to version control!

# 模型配置 / Model Configuration
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# 频道配置 / Channel Configuration
DISCORD_BOT_TOKEN=MT...
DISCORD_CLIENT_ID=...
FEISHU_APP_ID=cli_...
FEISHU_APP_SECRET=...

# 数据库配置 / Database Configuration (如有)
DATABASE_URL=postgresql://user:pass@host:5432/db

# 安全配置 / Security Configuration
JWT_SECRET=your-super-secret-key-min-32-chars
SESSION_SECRET=another-secret-key

# 日志配置 / Logging Configuration
LOG_LEVEL=warn
LOG_FORMAT=json
```

**保护 .env 文件 / Protect .env file:**

```bash
# 添加到 .gitignore / Add to .gitignore
echo ".env" >> .gitignore
echo ".env.production" >> .gitignore
echo ".env.local" >> .gitignore

# 设置文件权限 / Set file permissions
chmod 600 .env.production
```

---

### 2. 网络安全 / Network Security

#### 防火墙配置 / Firewall Configuration

```bash
# Ubuntu/Debian (UFW)
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 443/tcp   # HTTPS
sudo ufw deny 3000/tcp   # 禁止直接访问 Gateway / Block direct Gateway access
sudo ufw enable

# CentOS/RHEL (firewalld)
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

#### Nginx 反向代理配置 / Nginx Reverse Proxy Configuration

创建 `nginx/nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    # 上游服务器 / Upstream server
    upstream openclaw {
        server openclaw-bot:3000;
        keepalive 64;
    }

    # HTTP 重定向到 HTTPS / HTTP redirect to HTTPS
    server {
        listen 80;
        server_name your-domain.com;
        return 301 https://$server_name$request_uri;
    }

    # HTTPS 配置 / HTTPS Configuration
    server {
        listen 443 ssl http2;
        server_name your-domain.com;

        # SSL 证书 / SSL Certificates
        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;

        # SSL 优化 / SSL Optimization
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        # 安全头 / Security Headers
        add_header Strict-Transport-Security "max-age=31536000" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;

        # 反向代理配置 / Reverse Proxy Configuration
        location / {
            proxy_pass http://openclaw;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # 超时设置 / Timeout settings
            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }

        # 健康检查端点 / Health check endpoint
        location /health {
            proxy_pass http://openclaw/health;
            access_log off;
        }

        # 限制请求速率 / Rate limiting
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://openclaw/api/;
        }
    }

    # 限流配置 / Rate Limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
}
```

---

### 3. 访问控制 / Access Control

#### API 认证 / API Authentication

在 `openclaw.json` 中配置：/ Configure in `openclaw.json`:

```json
{
  "security": {
    "apiAuth": {
      "enabled": true,
      "type": "jwt",
      "secret": "${JWT_SECRET}",
      "expiresIn": "24h"
    },
    "rateLimit": {
      "enabled": true,
      "maxRequests": 100,
      "windowMs": 60000
    },
    "allowedOrigins": [
      "https://your-domain.com"
    ],
    "allowedIPs": [
      "192.168.1.0/24"
    ]
  }
}
```

---

## 📊 监控和告警 / Monitoring and Alerts

### 1. 应用监控 / Application Monitoring

#### 使用 PM2 进行进程管理 / Process Management with PM2

```bash
# 安装 PM2 / Install PM2
npm install -g pm2

# 使用 PM2 启动 / Start with PM2
pm2 start openclaw --name "openclaw-bot"

# 保存进程列表 / Save process list
pm2 save

# 设置开机自启 / Setup startup
pm2 startup

# 查看状态 / View status
pm2 status

# 查看日志 / View logs
pm2 logs openclaw-bot

# 监控资源使用 / Monitor resource usage
pm2 monit
```

#### PM2 生态系统配置 / PM2 Ecosystem Configuration

创建 `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'openclaw-bot',
    script: 'openclaw',
    args: 'gateway start',
    cwd: '/opt/openclaw/my-bot',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      LOG_LEVEL: 'info'
    },
    env_production: {
      NODE_ENV: 'production',
      LOG_LEVEL: 'warn'
    },
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    restart_delay: 4000,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
```

---

### 2. 日志管理 / Log Management

#### 日志轮转配置 / Log Rotation Configuration

创建 `/etc/logrotate.d/openclaw-bot`:

```bash
/opt/openclaw/my-bot/logs/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        systemctl reload openclaw-bot > /dev/null 2>&1 || true
    endscript
}
```

#### 集中式日志 / Centralized Logging

使用 ELK Stack (Elasticsearch, Logstash, Kibana):

```yaml
# docker-compose.logging.yml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"

  logstash:
    image: docker.elastic.co/logstash/logstash:8.11.0
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline:ro
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch

volumes:
  elasticsearch_data:
```

---

### 3. 告警配置 / Alert Configuration

#### 使用 Uptime Kuma 监控 / Monitor with Uptime Kuma

```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  uptime-kuma:
    image: louislam/uptime-kuma:1
    container_name: uptime-kuma
    ports:
      - "3001:3001"
    volumes:
      - uptime-kuma-data:/app/data
    restart: always

volumes:
  uptime-kuma-data:
```

**告警配置 / Alert Configuration:**

- ✅ HTTP 状态码监控 / HTTP status code monitoring
- ✅ 响应时间监控 / Response time monitoring
- ✅ SSL 证书过期提醒 / SSL certificate expiration alerts
- ✅ 宕机通知 / Downtime notifications (Email, Telegram, Discord)

---

## 💾 备份策略 / Backup Strategy

### 1. 数据备份 / Data Backup

#### 自动备份脚本 / Automatic Backup Script

创建 `scripts/backup.sh`:

```bash
#!/bin/bash
# backup.sh - 自动备份脚本

set -e

# 配置 / Configuration
BACKUP_DIR="/backups/openclaw"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# 创建备份目录 / Create backup directory
mkdir -p $BACKUP_DIR

# 备份工作空间 / Backup workspace
tar -czf $BACKUP_DIR/workspace_$DATE.tar.gz \
  --exclude='node_modules' \
  --exclude='logs' \
  /opt/openclaw/my-bot/workspace/

# 备份配置 / Backup configuration
tar -czf $BACKUP_DIR/config_$DATE.tar.gz \
  /opt/openclaw/my-bot/openclaw.json \
  /opt/openclaw/my-bot/.env

# 备份技能 / Backup skills
tar -czf $BACKUP_DIR/skills_$DATE.tar.gz \
  /opt/openclaw/my-bot/skills/

# 备份记忆文件 / Backup memory files
tar -czf $BACKUP_DIR/memory_$DATE.tar.gz \
  /opt/openclaw/my-bot/workspace/memory/

# 上传到云存储 (可选) / Upload to cloud storage (optional)
# aws s3 cp $BACKUP_DIR s3://your-bucket/openclaw-backups/ --recursive

# 清理旧备份 / Clean old backups
find $BACKUP_DIR -type f -mtime +$RETENTION_DAYS -delete

echo "Backup completed: $DATE"
```

#### 设置定时任务 / Setup Cron Job

```bash
# 编辑 crontab / Edit crontab
crontab -e

# 添加每天凌晨 2 点备份 / Add daily backup at 2 AM
0 2 * * * /opt/openclaw/my-bot/scripts/backup.sh >> /var/log/openclaw-backup.log 2>&1
```

---

### 2. 灾难恢复 / Disaster Recovery

#### 恢复脚本 / Recovery Script

创建 `scripts/restore.sh`:

```bash
#!/bin/bash
# restore.sh - 灾难恢复脚本

set -e

BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
    echo "Usage: $0 <backup_file.tar.gz>"
    exit 1
fi

echo "Starting restoration from $BACKUP_FILE..."

# 停止服务 / Stop service
systemctl stop openclaw-bot

# 解压备份 / Extract backup
tar -xzf $BACKUP_FILE -C /opt/openclaw/my-bot/

# 设置权限 / Set permissions
chown -R www-data:www-data /opt/openclaw/my-bot/

# 启动服务 / Start service
systemctl start openclaw-bot

echo "Restoration completed!"
```

---

## 🔧 性能优化 / Performance Optimization

### 1. 模型优化 / Model Optimization

```json
{
  "model": {
    "provider": "openai",
    "name": "gpt-4o-mini",
    "temperature": 0.7,
    "maxTokens": 1024,
    "timeout": 30000,
    "retry": {
      "maxAttempts": 3,
      "backoffMs": 1000
    }
  }
}
```

### 2. 缓存策略 / Caching Strategy

```javascript
// 实现简单缓存 / Implement simple cache
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 分钟缓存

// 缓存天气查询结果 / Cache weather query results
const getWeather = async (city) => {
  const cached = cache.get(`weather:${city}`);
  if (cached) return cached;
  
  const weather = await fetchWeather(city);
  cache.set(`weather:${city}`, weather);
  return weather;
};
```

### 3. 数据库优化 / Database Optimization

```json
{
  "database": {
    "connectionPool": {
      "min": 2,
      "max": 10,
      "idleTimeoutMs": 30000
    },
    "queryTimeout": 5000,
    "enableQueryCache": true
  }
}
```

---

## 📈 扩展方案 / Scaling Solutions

### 水平扩展 / Horizontal Scaling

```yaml
# Kubernetes 部署示例 / Kubernetes Deployment Example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: openclaw-bot
spec:
  replicas: 3
  selector:
    matchLabels:
      app: openclaw-bot
  template:
    metadata:
      labels:
        app: openclaw-bot
    spec:
      containers:
      - name: openclaw-bot
        image: your-registry/openclaw-bot:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: openclaw-bot
spec:
  selector:
    app: openclaw-bot
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

---

## ✅ 部署检查清单 / Deployment Checklist

### 上线前 / Pre-launch

- [ ] 所有功能测试通过 / All features tested
- [ ] 安全配置完成 / Security configured
- [ ] 监控告警设置 / Monitoring alerts configured
- [ ] 备份策略实施 / Backup strategy implemented
- [ ] 文档完善 / Documentation complete
- [ ] 团队培训完成 / Team training complete

### 上线后 / Post-launch

- [ ] 监控系统运行正常 / Monitoring working
- [ ] 收集用户反馈 / Collect user feedback
- [ ] 性能基线建立 / Performance baseline established
- [ ] 应急响应流程测试 / Emergency response tested
- [ ] 定期安全审计 / Regular security audits scheduled

---

## 📚 相关资源 / Related Resources

- [OpenClaw 官方部署文档](https://docs.openclaw.ai/deployment)
- [Docker 最佳实践](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Kubernetes 指南](https://kubernetes.io/docs/home/)
- [PM2 文档](https://pm2.keymetrics.io/docs/usage/quick-start/)

---

<div align="center">

**恭喜完成快速入门系列！/ Congratulations on Completing Quick Start Series!**

[上一步：第一个机器人 ←](04-first-bot.md)

[查看实战项目教程](../projects/customer-support-bot.md)

[返回教程列表](../COMPLETE_TUTORIALS_LIST.md)

</div>
