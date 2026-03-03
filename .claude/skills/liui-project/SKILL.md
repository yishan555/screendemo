---
name: liui-project
description: Initialize and set up new LiUI projects using fed-cli scaffolding tool. Use when the user wants to create a new LiUI-based project (PC/mobile/component library), configure project structure, set up authentication (IDaaS/EIAM), or generate API code from apidoc. Covers project initialization workflow, fed-cli usage patterns, and common configurations.
---

# LiUI Project Initialization

Guide for creating and configuring new LiUI projects using the @chehejia/fed-cli scaffolding tool.

## When AI Creates Projects (For Claude Code)

When the user requests to create a LiUI project, follow this automated workflow:

### 1. Gather User Configuration (Optional)

If the user hasn't specified all options, use `AskUserQuestion` to collect:
- Project name (required)
- Target directory (optional, defaults to current directory)
- Project type: PC/mobile/component/blank (optional, defaults to pc)
- Theme: 主题色/亮色 (optional, defaults to 主题色)
- Authentication options (optional, defaults to enabled)
- Watermark requirement (optional, defaults to enabled)

### 2. Run create-project.js Script

Use the automated script to create the project:

```bash
node skills/liui-project/scripts/create-project.js <project-name> [options]
```

**Available options:**
- `--dir <path>`: Target directory
- `--type <type>`: Project type (pc/mobile/component/blank)
- `--theme <theme>`: Theme style (主题色/亮色)
- `--no-auth`: Disable all authentication features
- `--no-permission`: Disable permission system only
- `--no-eiam`: Disable EIAM only
- `--no-watermark`: Disable watermark system

**Examples:**
```bash
# Create with defaults (all features enabled)
node skills/liui-project/scripts/create-project.js my-app --dir /path/to/target

# Create with custom options
node skills/liui-project/scripts/create-project.js my-app --theme 亮色 --no-watermark
```

### 3. Replace Style Files

After project creation, replace the default styles with optimized versions:

```bash
# Copy custom style files to the new project
cp -r skills/liui-project/scripts/styles/* <target-dir>/<project-name>/src/styles/
```

This will copy the following optimized style files:
- `index.scss` - Main style entry point
- `liui-fix.scss` - LiUI component fixes
- `liui-improve.scss` - LiUI component improvements
- `utils.scss` - Utility classes
- `components.scss` - Custom component styles

### 4. Verify and Show Next Steps

After creation:
- Confirm project was created successfully
- Verify style files were copied successfully
- Show next steps to the user:
  ```bash
  cd <project-name>
  pnpm install
  pnpm dev
  ```

**Note**: The script requires `expect` command to be installed. On macOS: `brew install expect`

## When to Use This Skill

Use this skill when:
- Initializing a new LiUI-based project (PC端/移动端/组件库)
- Setting up project authentication with IDaaS/EIAM
- Configuring API code generation from apidoc
- User asks about "fed-cli", "fed new", or creating a new LiUI project
- Troubleshooting common fed-cli setup issues

**After project creation**: Use the `liui` skill for component development and the `vue` skill for general Vue 3 patterns.

## Prerequisites

Ensure the following are installed:
- Node.js version ≥18.12 (check with `node -v`)
- pnpm package manager (recommended)
- @chehejia/fed-cli global package

**Installation commands:**
```bash
npm install pnpm -g
npm install @chehejia/fed-cli -g --registry https://rnpm.chehejia.com
```

For macOS, use `sudo` if needed:
```bash
sudo npm install pnpm -g
sudo npm install @chehejia/fed-cli -g --registry https://rnpm.chehejia.com
```

## Quick Start Workflow

### Two Ways to Create Projects

#### Option 1: Automated Creation (Recommended for AI)

Use the automation script for non-interactive creation:

```bash
# Navigate to skill directory
cd skills/liui-project

# Create PC project with authentication
node scripts/create-project.js my-project --dir /path/to/target

# Create mobile project
node scripts/create-project.js mobile-app --type mobile --dir /path/to/target

# Create without authentication
node scripts/create-project.js test-app --no-auth --dir /path/to/target

# Create with light theme and no watermark
node scripts/create-project.js secure-app --theme 亮色 --no-watermark --dir /path/to/target
```

**Script Options:**
- `-d, --dir <path>`: Target directory (default: current directory)
- `-t, --type <type>`: Project type - `pc`, `mobile`, `component`, `blank` (default: pc)
- `--theme <theme>`: Theme style - `主题色`, `亮色` (default: 主题色)
- `--no-auth`: Disable IDaaS login, permission system and EIAM
- `--no-permission`: Disable permission system (keep login)
- `--no-eiam`: Disable EIAM permissions (keep login and permission)
- `--no-watermark`: Disable watermark system
- `-h, --help`: Show help

**Requirements:**
- `expect` command must be installed for full automation
- macOS: `brew install expect`
- Ubuntu: `apt-get install expect`
- Without `expect`, the script shows manual instructions

#### Option 2: Manual Interactive Creation

```bash
fed new <projectName> [-d/--dir <path>]
```

**Examples:**
- Create project in current directory: `fed new my-liui-app`
- Create in specific directory: `fed new my-liui-app -d /path/to/target`

### 2. Select Project Type

Follow the interactive prompts:

1. **Choose framework**: Select `vue3` (strongly recommended) or `vue2`
2. **Choose project type**:
   - **PC端**: Vite + LiUI + LiUI Pro with built-in layout and authentication
   - **移动端**: Vite + LiUI Mobile with authentication
   - **组件库**: Vite + markdown-to-html for component documentation
   - **空白模板**: Blank Vue application template with standard conventions
   - **工厂模板(旧)**: Legacy qiankun micro-frontend template (not recommended for new projects)

3. **For PC projects**: Select layout mode and theme color
4. **Authentication options**:
   - IDaaS login system + EIAM permissions (recommended for enterprise apps)
   - User center login (simpler option)
   - Watermark system

### 3. Initial Setup After Creation

```bash
cd <projectName>
pnpm install
pnpm dev
```

## Core Configuration Files

After project creation, key files to configure:

| File | Purpose |
|------|---------|
| `fed.cli.config.js` | Fed-cli project settings and apidoc configuration |
| `config/idaas.ts` | IDaaS/EIAM authentication and permissions setup |
| `config/common.ts` | General project configuration (enable auth, etc.) |

## Common Tasks

### Generate API Code from Apidoc

See [references/apidoc-config.md](references/apidoc-config.md) for detailed configuration.

**Quick steps:**
1. Configure `fed.cli.config.js` with apidoc token and settings
2. Run `fed api` to generate all APIs or `fed api -i` for interactive selection
3. Use `fed api -f` to force regeneration

### Configure IDaaS/EIAM Authentication

See [references/idaas-auth.md](references/idaas-auth.md) for complete setup guide.

**Quick steps:**
1. Enable auth in `config/common.ts`: `config.auth = true`
2. Add application ID, service ID, and auth prefix to `config/idaas.ts`
3. Configure CORS domains in IDaaS/EIAM platform
4. Set route permissions via `meta.authTag` in route configuration

### Add Internationalization (i18n)

Install vue-i18n:
```bash
# Vue 3
pnpm add vue-i18n

# Vue 2
pnpm add vue-i18n@8
```

Refer to:
- LiUI Next i18n documentation for component internationalization
- LiUI Pro Next i18n documentation for layout internationalization
- vue-i18n official docs for implementation patterns

## Reference Files

| Topic | Reference File |
|-------|---------------|
| Complete fed-cli guide | [references/fed-cli-guide.md](references/fed-cli-guide.md) |
| Apidoc API generation | [references/apidoc-config.md](references/apidoc-config.md) |
| IDaaS/EIAM auth setup | [references/idaas-auth.md](references/idaas-auth.md) |
| Common issues & solutions | [references/troubleshooting.md](references/troubleshooting.md) |

## Key Principles

When initializing LiUI projects:

1. **Always use Vue 3** - Vue 2 support has ended, use Vue 3 templates for better performance and maintainability
2. **Enable authentication early** - Configure IDaaS/EIAM during project creation to avoid retrofitting
3. **Generate API code** - Use apidoc integration to generate TypeScript API methods and types
4. **Follow project structure** - Keep standard directories (src/views, src/apis, src/components)
5. **Use pnpm** - Recommended package manager for better dependency management

## Next Steps After Initialization

Once the project is created:
- Use the **`liui` skill** for developing LiUI components
- Use the **`vue` skill** for Vue 3 Composition API patterns
- Refer to **references/** files in this skill for configuration help
