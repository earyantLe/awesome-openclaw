# Example OpenClaw Skill Template

This is an example skill template to help you create your own OpenClaw skills.

## What is a Skill?

A skill is a markdown file that defines when and how the agent should perform a specific task. Skills use a simple YAML frontmatter format followed by markdown content.

## Template

```markdown
---
name: my-custom-skill
description: A brief description of what this skill does
triggers:
  - "keyword or phrase that triggers this skill"
  - "another trigger phrase"
model: default  # or a specific model override
thinking: on    # or off
---

# Skill Instructions

## When to Use

Describe when this skill should be activated.

## What to Do

Step-by-step instructions for the agent.

## Tools to Use

List any specific tools that should be used.

## Examples

Provide examples of expected behavior.
```

## Example: Weather Check Skill

```markdown
---
name: weather-check
description: Check weather for a location
triggers:
  - "what's the weather"
  - "weather forecast"
  - "is it raining"
model: default
thinking: off
---

# Weather Check Skill

## When to Use

Use this skill when the user asks about weather, temperature, or forecasts for any location.

## What to Do

1. Extract the location from the user's query
2. Use the weather tool to get current conditions and forecast
3. Present the information in a friendly, concise format
4. Include relevant details (temperature, precipitation, wind)

## Tools to Use

- `weather` - Built-in weather skill

## Examples

**User**: "What's the weather in Tokyo?"
**Agent**: "Currently in Tokyo: 22°C, partly cloudy, 30% chance of rain. High of 25°C, low of 19°C."
```

## Example: GitHub Helper Skill

```markdown
---
name: github-helper
description: Help with GitHub operations
triggers:
  - "create a repository"
  - "github issue"
  - "pull request"
model: default
thinking: on
---

# GitHub Helper Skill

## When to Use

Use this skill when the user needs help with GitHub operations like creating repos, managing issues, or pull requests.

## What to Do

1. Identify the GitHub operation needed
2. Gather required information (repo name, issue details, etc.)
3. Use appropriate GitHub API or CLI commands
4. Provide clear feedback on success/failure

## Tools to Use

- `exec` - For running git commands
- `web_fetch` - For checking GitHub pages
- `message` - For sending updates

## Examples

**User**: "Create a new repo called my-project"
**Agent**: "I'll help you create a new GitHub repository. Should it be public or private?"
```

## Tips for Writing Good Skills

1. **Be Specific**: Clear triggers prevent accidental activation
2. **Keep it Focused**: One skill = one responsibility
3. **Provide Context**: Help the agent understand when NOT to use the skill
4. **Test Thoroughly**: Try different trigger phrases
5. **Document Well**: Future you (and others) will thank you

## Where to Store Skills

Skills are typically stored in:
- `skills/` directory in your workspace
- `~/workspace/agent/skills/` for global skills
- Contributed to community repositories

## Next Steps

1. Copy this template
2. Modify for your use case
3. Test with different triggers
4. Share with the community! 🦞

---

**Need help?** Check out the [OpenClaw Documentation](https://docs.openclaw.ai/skills) or join our [Discord](https://discord.com/invite/clawd)!
