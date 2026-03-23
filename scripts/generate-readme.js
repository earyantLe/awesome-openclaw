#!/usr/bin/env node

/**
 * Awesome OpenClaw README Generator
 *
 * Generates README.md from JSON content files
 * Usage: node scripts/generate-readme.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');
const README_TEMPLATE = path.join(CONTENT_DIR, 'readme-template.md');
const README_OUTPUT = path.join(ROOT_DIR, 'README.md');

// Load JSON data
function loadJSON(filename) {
  const filepath = path.join(CONTENT_DIR, filename);
  if (!fs.existsSync(filepath)) {
    console.warn(`⚠️  Warning: ${filename} not found`);
    return null;
  }
  const content = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(content);
}

// Generate status badge
function getStatusBadge(status) {
  const statusMap = {
    'active': '✅ Active',
    'contact-author': '⚠️ Contact Author',
    'deprecated': '❌ Deprecated',
    'new': '🆕 New',
    'experimental': '🧪 Experimental'
  };
  return statusMap[status] || status;
}

// Generate difficulty stars
function getDifficultyStars(level) {
  const stars = ['☆☆☆☆☆', '⭐☆☆☆☆', '⭐⭐☆☆☆', '⭐⭐⭐☆☆', '⭐⭐⭐⭐☆', '⭐⭐⭐⭐⭐'];
  return stars[level] || stars[1];
}

// Generate skills table
function generateSkillsTable(skills, type) {
  if (!skills || skills.length === 0) return '';

  let table = '| Skill | Description | Status |\n|-------|-------------|--------|\n';

  skills.forEach(skill => {
    const emoji = skill.emoji || '📦';
    const name = skill.name || skill.id;
    const desc = skill.description || '';
    const status = getStatusBadge(skill.status || 'active');
    table += `| ${emoji} \`${name}\` | ${desc} | ${status} |\n`;
  });

  return table;
}

// Generate integrations table
function generateIntegrationsTable(integrations) {
  if (!integrations) return '';

  let table = '| Integration | Status | Difficulty |\n|-------------|--------|------------|\n';

  integrations.forEach(integration => {
    const status = getStatusBadge(integration.status);
    const difficulty = getDifficultyStars(integration.difficulty);
    table += `| ${integration.name} | ${status} | ${difficulty} |\n`;
  });

  return table;
}

// Get current date
function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

// Main generation function
function generateREADME() {
  console.log('🦞 Generating Awesome OpenClaw README...\n');

  // Load data
  const data = loadJSON('skills.json');
  if (!data) {
    console.error('❌ Error: Could not load skills.json');
    process.exit(1);
  }

  // Read template if exists, otherwise use default structure
  let template = '';
  if (fs.existsSync(README_TEMPLATE)) {
    template = fs.readFileSync(README_TEMPLATE, 'utf8');
  } else {
    console.log('ℹ️  No template found, using default structure');
  }

  // Generate sections
  const sections = {
    builtInSkills: generateSkillsTable(data.skills?.builtIn, 'builtIn'),
    communitySkills: generateSkillsTable(data.skills?.community, 'community'),
    feishuSkills: generateSkillsTable(data.skills?.feishu, 'feishu'),
    miaodaSkills: generateSkillsTable(data.skills?.miaoda, 'miaoda'),
    messagingIntegrations: generateIntegrationsTable(data.integrations?.messaging),
    stats: {
      totalSkills: data.meta?.totalSkills || 0,
      totalIntegrations: data.meta?.totalIntegrations || 0,
      lastUpdated: getCurrentDate()
    }
  };

  // If template exists, replace placeholders
  if (template) {
    let output = template;
    output = output.replace('{{BUILT_IN_SKILLS}}', sections.builtInSkills);
    output = output.replace('{{COMMUNITY_SKILLS}}', sections.communitySkills);
    output = output.replace('{{FEISHU_SKILLS}}', sections.feishuSkills);
    output = output.replace('{{MIAODA_SKILLS}}', sections.miaodaSkills);
    output = output.replace('{{LAST_UPDATED}}', sections.stats.lastUpdated);

    fs.writeFileSync(README_OUTPUT, output, 'utf8');
  } else {
    // Generate full README from scratch
    let readme = generateFullREADME(data, sections);
    fs.writeFileSync(README_OUTPUT, readme, 'utf8');
  }

  console.log('✅ README generated successfully!');
  console.log(`📁 Output: ${README_OUTPUT}`);
  console.log(`📅 Last Updated: ${sections.stats.lastUpdated}`);
  console.log(`\n📊 Statistics:`);
  console.log(`   - Total Skills: ${sections.stats.totalSkills}`);
  console.log(`   - Total Integrations: ${sections.stats.totalIntegrations}`);
}

// Generate full README (when no template exists)
function generateFullREADME(data, sections) {
  const today = getCurrentDate();

  return `# Awesome OpenClaw 🦞

> **A curated list of awesome OpenClaw resources, skills, extensions, and community projects.**

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| 📦 Total Skills | ${data.meta?.totalSkills || 0}+ |
| 🔌 Integrations | ${data.meta?.totalIntegrations || 0}+ |
| 📅 Last Update | ${today} |

---

## 🎯 Skills

### Built-in Skills

${sections.builtInSkills}

### Community Skills

${sections.communitySkills}

---

*Generated on ${today} by [generate-readme.js](scripts/generate-readme.js)*
`;
}

// Run generation
generateREADME();
