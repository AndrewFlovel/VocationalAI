---
name: build-skills
description: Guides the agent on how to create, format, and structure new Antigravity SKILLs within the current workspace according to official documentation rules.
---

# Build Skills

## When to use this skill
Use this skill when the user asks you to create, generate, or build a new Antigravity SKILL, or when they want to define reusable instructions, workflows, or patterns for the agent to follow.

## How to use it
When constructing a new SKILL for the user, you must follow these strict guidelines based on Antigravity's official documentation:

### 1. Folder Structure
Every skill MUST reside in its own dedicated folder. For project-specific skills, you must use the following workspace directory structure:
`.agent/skills/<skill-folder-name>/`
*(Ensure `<skill-folder-name>` is lowercase and uses hyphens for spaces.)*

Inside this directory, you MUST create a `SKILL.md` file. This is the core instruction file.

You may optionally create the following subdirectories depending on the skill's complexity:
- `scripts/`: Helper scripts and toolkits for the skill.
- `examples/`: Reference implementations or usage patterns.
- `resources/`: Templates, assets, or datasets.

### 2. Metadata and Frontmatter (`SKILL.md`)
The `SKILL.md` file MUST begin with YAML frontmatter containing the following properties:
- `name`: (Optional) A unique identifier for the skill (lowercase, hyphens). If omitted, it defaults to the folder name, but it is best practice to define it.
- `description`: (**Required**) A clear explanation of what the skill does and its usage scenarios. 
  - **CRITICAL RULE**: The description MUST be written in the **third person**.
  - **CRITICAL RULE**: Include relevant **keywords** in the description to improve the agent's ability to recognize when the skill is relevant.

**Example Frontmatter:**
```yaml
---
name: example-skill
description: Explains how the agent should structure data and provides formatting utilities for user reports.
---
```

### 3. Format and Markdown Content
The body of `SKILL.md` uses standard Markdown. It is highly recommended to include standard sections to guide the agent:
- `# <Skill Name>`: The main title of the skill.
- `## When to use this skill`: Specific triggers or situations where the skill is applicable.
- `## How to use it`: Step-by-step guidance, conventions, and patterns for the agent to follow.
- **Decision Trees / Flowcharts**: If the logic is complex, include sections that guide the agent through choosing different approaches based on the context.

### 4. Best Practices
- **Focused Scope:** Each skill should do one single thing well rather than attempting to be a "do everything" tool. Break down large tasks into multiple skills if necessary.
- **Clarity in Descriptions:** The agent decides when to use a skill based almost entirely on the description. Make sure it is highly specific and unambiguously clear.
- **Explicit Decision Logic:** Use Markdown headers and lists to explicitly guide the agent's decision-making process. Leave no room for ambiguity.
- **Scripted Automation:** If the skill involves repetitive or complex setup, instruct the agent to use scripts placed in the `scripts/` directory.
