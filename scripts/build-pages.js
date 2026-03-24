#!/usr/bin/env node

/**
 * Awesome OpenClaw Pages Builder
 *
 * Converts all Markdown files to HTML with consistent styling
 * Usage: node scripts/build-pages.js
 */

const fs = require('fs');
const path = require('path');

// Simple Markdown to HTML converter
function parseMarkdown(md) {
  let html = md;

  // Store code blocks to prevent internal processing
  const codeBlocks = [];
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    codeBlocks.push({ lang, code });
    return `%%CODEBLOCK${codeBlocks.length - 1}%%`;
  });

  // Store inline code to prevent internal processing
  const inlineCodes = [];
  html = html.replace(/`([^`]+)`/g, (match, code) => {
    inlineCodes.push(code);
    return `%%INLINECODE${inlineCodes.length - 1}%%`;
  });

  // Store blockquotes to prevent internal processing
  const blockquotes = [];
  html = html.replace(/^>>> ([\s\S]*?)<<<$/gm, (match, content) => {
    blockquotes.push(content);
    return `%%BLOCKQUOTE${blockquotes.length - 1}%%`;
  });

  // Headers (must be processed before other elements)
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Horizontal rule (before list processing)
  html = html.replace(/^---$/gm, '<hr>');
  html = html.replace(/^\*\*\*$/gm, '<hr>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links with images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Blockquotes (simple line-by-line)
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  html = html.replace(/<\/blockquote>\n<blockquote>/g, '\n');

  // Unordered lists - handle various bullet styles
  html = html.replace(/^[\-\*\+] (.+)$/gm, '<li>$1</li>');

  // Wrap consecutive li elements in ul
  html = html.replace(/(<li>.*<\/li>(\n|$))+/g, (match) => {
    return '<ul>\n' + match + '</ul>\n';
  });

  // Ordered lists
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<oli>$1</oli>');

  // Wrap consecutive oli elements in ol
  html = html.replace(/(<oli>.*<\/oli>(\n|$))+/g, (match) => {
    let oliList = match;
    oliList = oliList.replace(/<\/oli>/g, '</li>');
    oliList = oliList.replace(/<oli>/g, '<li>');
    return '<ol>\n' + oliList + '</ol>\n';
  });

  // Checkbox items
  html = html.replace(/^- \[([ x])\] (.+)$/gm, '<li class="task-list-item"><input type="checkbox" disabled $1="$1"> $2</li>');

  // Process line breaks and paragraphs
  // Split by double newlines for paragraphs
  const paragraphs = html.split(/\n\n+/);

  html = paragraphs.map(para => {
    para = para.trim();
    if (!para) return '';

    // Skip if already wrapped in block-level elements
    if (para.startsWith('<h') ||
        para.startsWith('<ul') ||
        para.startsWith('<ol') ||
        para.startsWith('<li') ||
        para.startsWith('<blockquote') ||
        para.startsWith('<pre') ||
        para.startsWith('<hr') ||
        para.startsWith('%%')) {
      // Convert single newlines to <br> within these elements
      return para.replace(/\n/g, ' ');
    }

    // Wrap in paragraph
    return '<p>' + para.replace(/\n/g, ' ') + '</p>';
  }).join('\n');

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>\s*(<h[1-4]>)/g, '$1');
  html = html.replace(/(<\/h[1-4]>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<ol>)/g, '$1');
  html = html.replace(/(<\/ol>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<blockquote>)/g, '$1');
  html = html.replace(/(<\/blockquote>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<hr>)/g, '$1');
  html = html.replace(/(<hr>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<pre>)/g, '$1');
  html = html.replace(/(<\/pre>)\s*<\/p>/g, '$1');

  // Restore code blocks
  html = html.replace(/%%CODEBLOCK(\d+)%%/g, (match, index) => {
    const { lang, code } = codeBlocks[index];
    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<pre><code class="language-${lang}">${escapedCode}</code></pre>`;
  });

  // Restore inline codes
  html = html.replace(/%%INLINECODE(\d+)%%/g, (match, index) => {
    const code = inlineCodes[index]
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<code>${code}</code>`;
  });

  // Restore blockquotes
  html = html.replace(/%%BLOCKQUOTE(\d+)%%/g, (match, index) => {
    const content = blockquotes[index];
    return `<blockquote>${content}</blockquote>`;
  });

  return html;
}

// Generate navigation from file structure
function generateNavigation(currentFile) {
  const navItems = [
    { href: 'index.html', text: '🏠 Home' },
    { href: 'tutorials/index.html', text: '📚 Tutorials' },
    { href: 'skills/index.html', text: '🦞 Skills' },
    { href: 'integrations/index.html', text: '🔌 Integrations' },
    { href: 'examples/index.html', text: '💡 Examples' }
  ];

  return `
    <nav class="site-nav">
      <div class="container">
        <ul>
          ${navItems.map(item =>
            `<li><a href="${item.href}"${currentFile === item.href ? ' class="active"' : ''}>${item.text}</a></li>`
          ).join('\n          ')}
        </ul>
      </div>
    </nav>
  `;
}

// Generate table of contents from HTML
function generateTOC(html) {
  const headings = [];
  const regex = /<h([1-3])>(.*?)<\/h\1>/g;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]+>/g, '');
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    headings.push({ level, text, id });
  }

  if (headings.length === 0) return '';

  return `
    <aside class="toc">
      <h3>📑 Contents</h3>
      <ul>
        ${headings.map(h =>
          `<li class="level-${h.level}"><a href="#${h.id}">${h.text}</a></li>`
        ).join('\n        ')}
      </ul>
    </aside>
  `;
}

// Add anchor links to headings
function addAnchorLinks(html) {
  return html.replace(/<h([1-3])>(.*?)<\/h\1>/g, (match, level, content) => {
    const text = content.replace(/<[^>]+>/g, '');
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `<h${level} id="${id}"><a href="#${id}" class="heading-link">${content}</a></h${level}>`;
  });
}

// HTML Template
function getHTMLTemplate(title, content, toc, relPath = '.') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Awesome OpenClaw</title>
    <meta name="description" content="Awesome OpenClaw - A curated list of OpenClaw resources, skills, and community projects">
    <link rel="stylesheet" href="${relPath}/docs/styles.css">
    <link rel="stylesheet" href="${relPath}/docs/pages.css">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦞</text></svg>">
</head>
<body>
    <header class="site-header">
        <div class="container">
            <a href="${relPath}/index.html" class="logo">🦞 Awesome OpenClaw</a>
            ${generateNavigation(relPath === '.' ? 'index.html' : relPath + '/index.html')}
        </div>
    </header>

    <main class="content">
        <div class="container">
            ${toc}
            <article class="markdown-body">
                ${content}
            </article>
        </div>
    </main>

    <footer class="site-footer">
        <div class="container">
            <p>🦞 Awesome OpenClaw - A community-driven resource list</p>
            <p>Licensed under MIT | <a href="${relPath}/CONTRIBUTING.html">Contributing</a> | <a href="${relPath}/CODE_OF_CONDUCT.html">Code of Conduct</a></p>
        </div>
    </footer>

    <script src="${relPath}/docs/script.js"></script>
</body>
</html>`;
}

// Get relative path for assets
function getRelativePath(depth) {
  if (depth === 0) return '.';
  return '../'.repeat(depth).replace(/\/$/, '');
}

// Calculate path depth
function getPathDepth(filePath) {
  const parts = filePath.split('/');
  return parts.length - 1;
}

// Process a single markdown file
function processFile(inputPath, outputPath, relPath = '.') {
  console.log(`  Processing: ${inputPath} → ${outputPath}`);

  let md = fs.readFileSync(inputPath, 'utf8');

  // Extract title from first heading
  const titleMatch = md.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1] : path.basename(inputPath, '.md');

  // Convert to HTML
  let html = parseMarkdown(md);
  html = addAnchorLinks(html);

  // Generate TOC
  const toc = generateTOC(html);

  // Wrap in template
  const fullHTML = getHTMLTemplate(title, html, toc, relPath);

  fs.writeFileSync(outputPath, fullHTML, 'utf8');
}

// Create directory if not exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Main build function
function build() {
  console.log('🦞 Building Awesome OpenClaw Pages...\n');

  const rootDir = path.join(__dirname, '..');
  const docsDir = path.join(rootDir, 'docs');
  const buildDir = path.join(rootDir, 'dist');

  // Files to process (exclude certain patterns)
  const excludePatterns = [
    'node_modules',
    '.git',
    'dist',
    '.github',
    '.claude',
    '.qwen',
    '.openclaw_backups',
    'content',
    'skills-lock.json',
    'package-lock.json',
    '.agents'
  ];

  // Find all markdown files
  const markdownFiles = [];

  function findMarkdownFiles(dir, relativePath = '') {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const relPath = path.join(relativePath, file);

      // Skip excluded patterns
      if (excludePatterns.some(pattern => relPath.includes(pattern))) {
        continue;
      }

      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        findMarkdownFiles(fullPath, relPath);
      } else if (file.endsWith('.md')) {
        markdownFiles.push({
          input: fullPath,
          relative: relPath,
          output: path.join(buildDir, relPath.replace('.md', '.html'))
        });
      }
    }
  }

  findMarkdownFiles(rootDir);

  console.log(`📁 Found ${markdownFiles.length} markdown files\n`);

  // Ensure output directories exist
  for (const file of markdownFiles) {
    const outputDir = path.dirname(file.output);
    ensureDir(outputDir);
  }

  // Copy docs assets (styles, scripts)
  console.log('📦 Copying assets...');
  const docsAssets = ['styles.css', 'script.js', 'pages.css'];
  for (const asset of docsAssets) {
    const src = path.join(docsDir, asset);
    const dest = path.join(buildDir, 'docs', asset);
    if (fs.existsSync(src)) {
      ensureDir(path.join(buildDir, 'docs'));
      fs.copyFileSync(src, dest);
      console.log(`  Copied: ${asset}`);
    }
  }

  // Process markdown files
  console.log('\n📝 Converting markdown files...\n');
  for (const file of markdownFiles) {
    // Calculate relative path for assets
    const depth = getPathDepth(file.relative);
    const relPath = getRelativePath(depth);

    let outputPath = file.output;

    // README.md at root becomes index.html
    if (file.relative === 'README.md') {
      outputPath = path.join(buildDir, 'index.html');
    } else if (file.relative.endsWith('/README.md')) {
      // Other README.md files become index.html in their directory
      outputPath = path.join(path.dirname(file.output), 'index.html');
    }

    try {
      processFile(file.input, outputPath, relPath);
    } catch (error) {
      console.error(`  Error processing ${file.input}: ${error.message}`);
    }
  }

  // Copy other static files (images, etc.)
  console.log('\n📦 Copying static files...');
  function copyStaticFiles(srcDir, destDir, relativePath = '') {
    if (!fs.existsSync(srcDir)) return;

    const files = fs.readdirSync(srcDir);
    for (const file of files) {
      const fullPath = path.join(srcDir, file);
      const relPath = path.join(relativePath, file);

      if (excludePatterns.some(pattern => relPath.includes(pattern))) {
        continue;
      }

      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        copyStaticFiles(fullPath, path.join(destDir, file), relPath);
      } else if (file.match(/\.(html|css|js|png|jpg|jpeg|gif|svg|webp|json)$/)) {
        const destPath = path.join(destDir, file);
        ensureDir(destDir);
        fs.copyFileSync(fullPath, destPath);
        console.log(`  Copied: ${relPath}`);
      }
    }
  }

  // Copy docs HTML files
  copyStaticFiles(docsDir, path.join(buildDir, 'docs'));

  console.log('\n✅ Build complete!\n');
  console.log(`📁 Output directory: ${buildDir}`);
  console.log(`📊 Files generated: ${markdownFiles.length} HTML files`);
}

// Run build
build();
