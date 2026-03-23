# GitHub Pages 构建说明

## 概述

本项目配置了自动化的 GitHub Pages 部署流程。你只需要维护 Markdown 文件，HTML 会自动生成。

## 工作原理

1. **本地文件结构**: 所有文档以 Markdown (`.md`) 格式编写
2. **自动转换**: GitHub Actions 在每次提交后自动将 Markdown 转换为 HTML
3. **部署**: 生成的 HTML 文件部署到 GitHub Pages

## 目录结构

```
awesome-openclaw/
├── *.md                    # 你的 Markdown 源文件
├── docs/
│   ├── styles.css          # 共享样式
│   ├── script.js           # JavaScript 功能
│   └── pages.css           # Pages 专用样式
├── scripts/
│   ├── generate-readme.js  # README 生成器
│   └── build-pages.js      # Markdown → HTML 转换器
├── dist/                   # (构建输出，不提交)
│   ├── index.html
│   ├── docs/
│   ├── tutorials/
│   └── ...
└── .github/workflows/
    └── deploy-pages.yml    # CI/CD 配置
```

## 如何添加新文档

1. 在任何目录下创建新的 `.md` 文件
2. 提交并推送到 `main` 分支
3. GitHub Actions 会自动转换并部署

示例:
```bash
# 创建新教程
echo "# 新教程

这是一个新教程的内容..." > tutorials/new-tutorial.md

# 提交
git add tutorials/new-tutorial.md
git commit -m "docs: 添加新教程"
git push origin main
```

## 本地预览

在本地测试构建:

```bash
# 安装依赖 (仅首次)
npm install

# 运行构建
npm run build:pages

# 查看生成的文件
ls dist/

# 使用任意 HTTP 服务器预览
npx serve dist
```

## 自定义样式

- `docs/styles.css` - 主样式 (Hero、导航、组件)
- `docs/pages.css` - Markdown 内容样式 (排版、代码块、表格)

## 导航结构

自动生成的导航包括:
- 🏠 Home (index.html)
- 📚 Tutorials
- 🦞 Skills
- 🔌 Integrations
- 💡 Examples

## 排除的文件

以下目录不会被转换为 HTML:
- `.github/` - GitHub 配置
- `.claude/`, `.qwen/` - AI 配置
- `node_modules/` - 依赖
- `dist/` - 构建输出
- `content/` - JSON 数据
- `.agents/` - 内部技能

## 故障排查

### 构建失败

检查 GitHub Actions 日志:
1. 访问仓库的 Actions 标签
2. 查看 "Deploy to GitHub Pages" 工作流
3. 查看具体错误信息

### 样式问题

确保:
- `docs/pages.css` 和 `docs/styles.css` 存在
- 路径引用正确 (使用相对路径)

### 链接问题

- 内部链接使用 `.md` 扩展名 (构建时会自动转换)
- 图片使用相对路径

## 配置选项

在 `package.json` 中:
- `npm run generate` - 从 JSON 生成 README
- `npm run build:pages` - 构建 Pages HTML

在 `.github/workflows/deploy-pages.yml` 中:
- 修改触发条件
- 添加额外的构建步骤
