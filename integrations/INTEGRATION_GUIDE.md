# OpenClaw Integration Guide 🦞

> **Complete guide to developing, debugging, and optimizing OpenClaw integrations**
>
> **OpenClaw 集成开发、调试和优化完整指南**

[![Last Updated](https://img.shields.io/badge/updated-2026--03--18-blue)]()
[![Difficulty](https://img.shields.io/badge/difficulty-intermediate-yellow)]()

---

## 📑 Table of Contents

1. [Integration Development Basics](#1-integration-development-basics)
2. [Common Integration Patterns](#2-common-integration-patterns)
3. [Debugging and Troubleshooting](#3-debugging-and-troubleshooting)
4. [Performance Optimization](#4-performance-optimization)
5. [Security Best Practices](#5-security-best-practices)
6. [实战案例 (Practical Examples)](#6-实战案例-practical-examples)

---

## 1. Integration Development Basics

### 1.1 Understanding OpenClaw Architecture

OpenClaw uses a plugin-based architecture:

```
┌─────────────────────────────────────────┐
│           OpenClaw Gateway              │
├─────────────────────────────────────────┤
│  Channels  │  Tools  │  Skills  │  Plugins │
├─────────────────────────────────────────┤
│         External Integrations           │
│  (Discord, Feishu, Database, API...)    │
└─────────────────────────────────────────┘
```

### 1.2 Integration Types

| Type | Description | Example |
|------|-------------|---------|
| **Channel** | Communication platforms | Discord, Telegram, Feishu |
| **Tool** | Utility functions | Web search, Browser control |
| **Skill** | Task templates | Weather, Healthcheck |
| **Plugin** | Extended functionality | Feishu plugin, Custom integrations |

### 1.3 Getting Started

**Prerequisites:**

```bash
# Install OpenClaw
npm install -g openclaw

# Initialize workspace
openclaw init my-integration
cd my-integration

# Install dependencies
npm install @openclaw/sdk
```

**Basic Structure:**

```
my-integration/
├── src/
│   ├── index.js          # Main entry point
│   ├── config.js         # Configuration
│   └── handlers/         # Event handlers
├── skills/
│   └── SKILL.md          # Skill definition
├── openclaw.json         # OpenClaw configuration
└── package.json
```

---

## 2. Common Integration Patterns

### 2.1 Event-Driven Pattern

```javascript
// Example: Discord message handler
class DiscordIntegration {
  constructor(config) {
    this.client = new Discord.Client(config);
    this.setupListeners();
  }
  
  setupListeners() {
    this.client.on('messageCreate', async (message) => {
      if (message.author.bot) return;
      
      // Process message
      const response = await this.processMessage(message);
      await message.channel.send(response);
    });
  }
  
  async processMessage(message) {
    // Your logic here
    return 'Response';
  }
}
```

### 2.2 Request-Response Pattern

```javascript
// Example: REST API integration
class APIIntegration {
  constructor(config) {
    this.baseURL = config.baseURL;
    this.apiKey = config.apiKey;
  }
  
  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
  }
  
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }
  
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}
```

### 2.3 Polling Pattern

```javascript
// Example: Periodic data sync
class PollingIntegration {
  constructor(config) {
    this.interval = config.interval || 60000; // 1 minute
    this.active = false;
  }
  
  start() {
    this.active = true;
    this.poll();
  }
  
  stop() {
    this.active = false;
  }
  
  async poll() {
    while (this.active) {
      try {
        await this.sync();
      } catch (error) {
        console.error('Polling error:', error);
      }
      
      await this.sleep(this.interval);
    }
  }
  
  async sync() {
    // Your sync logic
  }
  
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### 2.4 Webhook Pattern

```javascript
// Example: Webhook receiver
const express = require('express');
const crypto = require('crypto');

class WebhookIntegration {
  constructor(config) {
    this.app = express();
    this.secret = config.webhookSecret;
    this.setupRoutes();
  }
  
  setupRoutes() {
    this.app.post('/webhook', express.raw({ type: 'application/json' }), 
      (req, res) => {
        const signature = req.headers['x-signature'];
        const body = req.body;
        
        // Verify signature
        if (!this.verifySignature(body, signature)) {
          return res.status(401).send('Invalid signature');
        }
        
        // Process webhook
        this.handleWebhook(JSON.parse(body));
        res.status(200).send('OK');
      }
    );
  }
  
  verifySignature(body, signature) {
    const expected = crypto
      .createHmac('sha256', this.secret)
      .update(body)
      .digest('hex');
    return signature === `sha256=${expected}`;
  }
  
  async handleWebhook(payload) {
    // Process webhook payload
  }
}
```

---

## 3. Debugging and Troubleshooting

### 3.1 Common Issues and Solutions

#### Issue 1: Authentication Failures

**Symptoms:**
- 401/403 errors
- "Invalid token" messages

**Solutions:**
```javascript
// Debug authentication
async function debugAuth(config) {
  console.log('Testing authentication...');
  
  try {
    const response = await testConnection(config);
    console.log('✅ Authentication successful');
    return true;
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
    console.log('Check:');
    console.log('  1. Token is correct and not expired');
    console.log('  2. Required permissions are granted');
    console.log('  3. IP whitelist (if applicable)');
    return false;
  }
}
```

#### Issue 2: Rate Limiting

**Symptoms:**
- 429 Too Many Requests
- Slow responses

**Solutions:**
```javascript
// Implement rate limiting with retry
class RateLimitedClient {
  constructor(config) {
    this.maxRetries = 3;
    this.baseDelay = 1000; // 1 second
  }
  
  async request(endpoint, options = {}) {
    for (let i = 0; i < this.maxRetries; i++) {
      try {
        return await this.makeRequest(endpoint, options);
      } catch (error) {
        if (error.status === 429) {
          const retryAfter = error.headers['retry-after'] || this.baseDelay * Math.pow(2, i);
          console.log(`Rate limited. Retrying after ${retryAfter}ms`);
          await this.sleep(retryAfter);
        } else {
          throw error;
        }
      }
    }
    throw new Error('Max retries exceeded');
  }
}
```

#### Issue 3: Connection Timeouts

**Symptoms:**
- ETIMEDOUT errors
- Connection refused

**Solutions:**
```javascript
// Configure timeouts properly
const client = new APIClient({
  baseURL: 'https://api.example.com',
  timeout: 30000, // 30 seconds
  retries: 3,
  retryDelay: 1000,
  keepAlive: true
});
```

### 3.2 Logging Best Practices

```javascript
// Structured logging
const logger = {
  info: (message, data) => {
    console.log(JSON.stringify({
      level: 'info',
      timestamp: new Date().toISOString(),
      message,
      data
    }));
  },
  
  error: (message, error) => {
    console.error(JSON.stringify({
      level: 'error',
      timestamp: new Date().toISOString(),
      message,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      }
    }));
  }
};

// Usage
logger.info('Integration started', { version: '1.0.0' });
logger.error('Connection failed', error);
```

### 3.3 Health Checks

```javascript
// Implement health check endpoint
class HealthCheck {
  constructor(integrations) {
    this.integrations = integrations;
  }
  
  async check() {
    const results = {};
    
    for (const [name, integration] of Object.entries(this.integrations)) {
      try {
        await integration.healthCheck();
        results[name] = { status: 'healthy' };
      } catch (error) {
        results[name] = { 
          status: 'unhealthy', 
          error: error.message 
        };
      }
    }
    
    const allHealthy = Object.values(results).every(r => r.status === 'healthy');
    
    return {
      status: allHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      integrations: results
    };
  }
}
```

---

## 4. Performance Optimization

### 4.1 Connection Pooling

```javascript
// Database connection pool
const { Pool } = require('pg');

const pool = new Pool({
  max: 20, // Maximum connections
  min: 2,  // Minimum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// Use pool instead of single connection
const result = await pool.query('SELECT * FROM users');
```

### 4.2 Caching Strategies

```javascript
// Redis caching example
class CachedIntegration {
  constructor(redisClient, ttl = 3600) {
    this.redis = redisClient;
    this.ttl = ttl;
  }
  
  async get(key) {
    const cached = await this.redis.get(`cache:${key}`);
    if (cached) {
      return JSON.parse(cached);
    }
    return null;
  }
  
  async set(key, value) {
    await this.redis.setex(
      `cache:${key}`,
      this.ttl,
      JSON.stringify(value)
    );
  }
  
  async fetch(key, fetcher) {
    let data = await this.get(key);
    if (!data) {
      data = await fetcher();
      await this.set(key, data);
    }
    return data;
  }
}
```

### 4.3 Batch Processing

```javascript
// Batch API requests
class BatchProcessor {
  constructor(batchSize = 100) {
    this.batchSize = batchSize;
  }
  
  async process(items, processor) {
    const results = [];
    
    for (let i = 0; i < items.length; i += this.batchSize) {
      const batch = items.slice(i, i + this.batchSize);
      const batchResults = await Promise.all(
        batch.map(item => processor(item))
      );
      results.push(...batchResults);
      
      // Rate limiting
      if (i + this.batchSize < items.length) {
        await this.sleep(100);
      }
    }
    
    return results;
  }
}
```

### 4.4 Async Operations

```javascript
// Parallel processing
async function processInParallel(items, concurrency = 5) {
  const results = [];
  const executing = [];
  
  for (const item of items) {
    const promise = processItem(item).then(result => {
      executing.splice(executing.indexOf(promise), 1);
      results.push(result);
      return result;
    });
    
    results.push(promise);
    executing.push(promise);
    
    if (executing.length >= concurrency) {
      await Promise.race(executing);
    }
  }
  
  return Promise.all(results);
}
```

---

## 5. Security Best Practices

### 5.1 Secret Management

```javascript
// ❌ Bad: Hardcoded secrets
const apiKey = 'sk-1234567890';

// ✅ Good: Environment variables
const apiKey = process.env.API_KEY;

// ✅ Better: Secret management service
const { SecretsManager } = require('@aws-sdk/client-secrets-manager');

async function getSecret(secretName) {
  const client = new SecretsManager();
  const response = await client.getSecretValue({ SecretId: secretName });
  return JSON.parse(response.SecretString);
}
```

### 5.2 Input Validation

```javascript
// Validate all inputs
const Joi = require('joi');

const schema = Joi.object({
  userId: Joi.string().required(),
  message: Joi.string().max(1000),
  timestamp: Joi.number().integer()
});

function validateInput(data) {
  const { error, value } = schema.validate(data);
  if (error) {
    throw new Error(`Validation error: ${error.message}`);
  }
  return value;
}
```

### 5.3 Rate Limiting

```javascript
// Implement rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

### 5.4 Error Handling

```javascript
// Secure error handling
function handleError(error, req, res, next) {
  // Log full error internally
  logger.error('Request failed', {
    error: error.message,
    stack: error.stack,
    path: req.path
  });
  
  // Send generic error to client
  res.status(500).json({
    error: 'Internal server error',
    requestId: req.id
  });
}
```

---

## 6. 实战案例 (Practical Examples)

### 6.1 如何搭建 Discord 机器人 (How to Setup Discord Bot)

**步骤 1: 创建 Discord 应用**

1. 访问 https://discord.com/developers/applications
2. 点击 "New Application"
3. 输入应用名称
4. 进入 "Bot" 页面，点击 "Add Bot"
5. 复制 Bot Token

**步骤 2: 配置权限**

```json
{
  "bot_permissions": [
    "Send Messages",
    "Read Message History",
    "Embed Links",
    "Add Reactions"
  ]
}
```

**步骤 3: 邀请机器人**

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot
```

**步骤 4: 代码实现**

```javascript
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.content === '!ping') {
    await message.channel.send('Pong! 🦞');
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
```

---

### 6.2 如何集成飞书日历 (How to Integrate Feishu Calendar)

**步骤 1: 创建飞书应用**

1. 访问 https://open.feishu.cn/app
2. 创建企业应用
3. 获取 App ID 和 App Secret

**步骤 2: 添加权限**

```json
{
  "permissions": [
    "calendar:calendar",
    "calendar:event",
    "contact:user"
  ]
}
```

**步骤 3: 代码实现**

```javascript
const { Client } = require('@larksuiteoapi/node-sdk');

const client = new Client({
  appId: process.env.FEISHU_APP_ID,
  appSecret: process.env.FEISHU_APP_SECRET
});

// 创建日程
async function createCalendarEvent(userId, eventData) {
  const response = await client.calendar.events.create({
    params: { user_id: userId },
    data: {
      summary: eventData.title,
      start_time: {
        timestamp: eventData.startTime,
        timezone: 'Asia/Shanghai'
      },
      end_time: {
        timestamp: eventData.endTime,
        timezone: 'Asia/Shanghai'
      }
    }
  });
  
  return response;
}

// 查询忙闲
async function checkFreeBusy(userIds, timeRange) {
  const response = await client.calendar.freebusy.get({
    data: {
      user_ids: userIds,
      time_min: timeRange.start,
      time_max: timeRange.end
    }
  });
  
  return response;
}
```

---

### 6.3 如何连接数据库 (How to Connect Database)

**PostgreSQL 示例:**

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: { rejectUnauthorized: false }
});

// 查询示例
async function getUsers() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users');
    return result.rows;
  } finally {
    client.release();
  }
}

// 插入示例
async function createUser(userData) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [userData.name, userData.email]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}
```

**MongoDB 示例:**

```javascript
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

async function connect() {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB);
  return db;
}

// 查询示例
async function findDocuments(collection, query) {
  const db = await connect();
  return db.collection(collection).find(query).toArray();
}
```

---

### 6.4 如何调用外部 API (How to Call External APIs)

**REST API 示例:**

```javascript
class APIClient {
  constructor(baseURL, apiKey) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    
    return response.json();
  }
  
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`${endpoint}?${queryString}`);
  }
  
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
  
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// 使用示例
const api = new APIClient('https://api.example.com', process.env.API_KEY);

// GET request
const users = await api.get('/users', { page: 1, limit: 10 });

// POST request
const newUser = await api.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});
```

---

## Appendix: Quick Reference

### A.1 Configuration Checklist

```markdown
## Before Deployment

- [ ] All secrets in environment variables
- [ ] Rate limiting implemented
- [ ] Error handling complete
- [ ] Logging configured
- [ ] Health checks working
- [ ] Documentation updated
- [ ] Tests passing
- [ ] Security review complete
```

### A.2 Common Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 400 | Bad Request | Check request format |
| 401 | Unauthorized | Verify credentials |
| 403 | Forbidden | Check permissions |
| 404 | Not Found | Verify endpoint |
| 429 | Too Many Requests | Implement rate limiting |
| 500 | Server Error | Check server logs |
| 503 | Service Unavailable | Retry later |

### A.3 Useful Tools

- **Postman** - API testing
- **ngrok** - Webhook testing
- **Redis Insight** - Redis GUI
- **MongoDB Compass** - MongoDB GUI
- **pgAdmin** - PostgreSQL GUI

---

<div align="center">

**Made with 🦞 by the OpenClaw Community**

[OpenClaw](https://github.com/openclaw-ai/openclaw) | [Documentation](https://docs.openclaw.ai) | [Discord](https://discord.gg/openclaw)

[⬆ Back to Top](#openclaw-integration-guide-)

</div>

---

> 📅 **Last Updated:** 2026-03-18  
> 📚 **Version:** 1.0.0  
> ✅ **Status:** Complete
