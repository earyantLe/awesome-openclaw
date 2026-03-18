# Beginner Example 1: Weather Checker 🌤️

> **Difficulty**: ⭐☆☆☆☆ (Beginner)  
> **Time to Complete**: 10 minutes  
> **Prerequisites**: None

---

## Overview

This example demonstrates how to create a simple skill that checks weather conditions using the wttr.in API. No API key required!

**本示例演示如何创建一个简单的技能，使用 wttr.in API 检查天气状况。无需 API 密钥！**

---

## Skill Structure

```
weather-checker/
├── SKILL.md
└── scripts/
    └── check_weather.sh
```

---

## Step 1: Create SKILL.md

```yaml
---
name: weather-checker
description: |
  Check current weather and forecasts for any city using wttr.in API.
  Use when: user asks about weather, temperature, rain forecast, or weather conditions for any location.
  使用 wttr.in API 检查任何城市的当前天气和预报。
  触发词："天气", "weather", "会下雨吗", "temperature", "forecast"
---

# Weather Checker Skill

## When to Use

✅ **USE this skill when:**
- "What's the weather in Beijing?"
- "Will it rain tomorrow?"
- "Temperature in Shanghai"
- "Weather forecast for the week"

❌ **DON'T use when:**
- Historical weather data (use weather archives)
- Climate analysis (use specialized data sources)
- Severe weather alerts (check official NWS)

## Commands

### Current Weather

```bash
# One-line summary
curl "wttr.in/Beijing?format=3"

# Detailed current conditions
curl "wttr.in/Beijing?0"
```

### Forecasts

```bash
# 3-day forecast
curl "wttr.in/Beijing"

# Week forecast
curl "wttr.in/Beijing?format=v2"

# Specific day (0=today, 1=tomorrow, 2=day after)
curl "wttr.in/Beijing?1"
```

### Format Options

```bash
# One-liner with custom format
curl "wttr.in/Beijing?format=%l:+%c+%t+%w"

# JSON output
curl "wttr.in/Beijing?format=j1"

# PNG image
curl "wttr.in/Beijing.png"
```

### Format Codes

- `%c` — Weather condition emoji
- `%t` — Temperature
- `%f` — "Feels like"
- `%w` — Wind
- `%h` — Humidity
- `%p` — Precipitation
- `%l` — Location

## Quick Responses

**"What's the weather?"**

```bash
curl -s "wttr.in/Beijing?format=%l:+%c+%t+(feels+like+%f),+%w+wind,+%h+humidity"
```

**"Will it rain?"**

```bash
curl -s "wttr.in/Beijing?format=%l:+%c+%p"
```

## Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| City not found | Invalid city name | Use airport code or full name |
| Rate limited | Too many requests | Wait a few seconds |
| No response | Network issue | Check internet connection |

## Notes

- No API key needed (uses wttr.in)
- Rate limited; don't spam requests
- Works for most global cities
- Supports airport codes: `curl wttr.in/PEK`
```

---

## Step 2: Create Helper Script

Create `scripts/check_weather.sh`:

```bash
#!/bin/bash

# Weather Checker Script
# Usage: ./check_weather.sh [city] [options]

CITY="${1:-Beijing}"
FORMAT="${2:-3}"

# Validate input
if [ -z "$CITY" ]; then
    echo "Usage: ./check_weather.sh [city] [format]"
    echo "  city: City name or airport code (default: Beijing)"
    echo "  format: wttr.in format code (default: 3)"
    exit 1
fi

# Replace spaces with +
CITY_ENCODED=$(echo "$CITY" | tr ' ' '+')

# Fetch weather
echo "🌤️  Weather for $CITY:"
echo ""
curl -s "wttr.in/${CITY_ENCODED}?format=${FORMAT}"
echo ""

# Check exit code
if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to fetch weather"
    exit 1
fi
```

Make it executable:

```bash
chmod +x scripts/check_weather.sh
```

---

## Step 3: Test the Skill

### Test 1: Basic Weather Check

```bash
./scripts/check_weather.sh Beijing
```

Expected output:
```
🌤️  Weather for Beijing:

Beijing: 🌤️ +25°C
```

### Test 2: Different City

```bash
./scripts/check_weather.sh "New York"
```

### Test 3: Custom Format

```bash
./scripts/check_weather.sh Shanghai 0
```

---

## Step 4: Package the Skill

```bash
# Navigate to skills directory
cd /path/to/skills

# Package the skill
python scripts/package_skill.py weather-checker

# Output: weather-checker.skill
```

---

## Usage Examples

### Example 1: Simple Query

**User**: "What's the weather in Beijing?"

**Agent Response**:
```bash
curl -s "wttr.in/Beijing?format=%l:+%c+%t"
```

Result: `Beijing: 🌤️ +25°C`

### Example 2: Rain Forecast

**User**: "Will it rain today?"

**Agent Response**:
```bash
curl -s "wttr.in/Beijing?format=%l:+%c+%p"
```

Result: `Beijing: 🌤️ 0%`

### Example 3: Week Forecast

**User**: "Weather forecast for the week"

**Agent Response**:
```bash
curl "wttr.in/Beijing?format=v2"
```

---

## Best Practices

1. **Always validate city names** - Handle spaces and special characters
2. **Use appropriate formats** - Choose format based on user query
3. **Handle errors gracefully** - Check curl exit codes
4. **Rate limiting** - Don't make too many requests quickly

---

## Common Mistakes

| Mistake | Correct Approach |
|---------|-----------------|
| Not encoding city names | Use `tr ' ' '+'` to replace spaces |
| Ignoring exit codes | Always check `$?` after curl |
| Too many requests | Add delays between requests |
| Hardcoding city | Use parameter with default value |

---

## Next Steps

After mastering this beginner example:

1. ✅ Try the **Intermediate** example (Image Processor)
2. ✅ Add more features (e.g., alerts, comparisons)
3. ✅ Create your own weather-related skill
4. ✅ Contribute to the community skills repository

---

## Resources

- [wttr.in Documentation](https://wttr.in/:help)
- [curl Manual](https://curl.se/docs/manpage.html)
- [OpenClaw Skills Guide](../SKILL_DEVELOPMENT_GUIDE.md)

---

**Last Updated**: 2026-03-18  
**Author**: OpenClaw Community 🦞
