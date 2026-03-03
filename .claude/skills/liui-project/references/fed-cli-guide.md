# Fed-CLI Complete Guide

Complete reference for @chehejia/fed-cli scaffolding tool commands and features.

## Installation

### Requirements
- Node.js version ≥18.12
- Use `nvm` or `fnm` for Node version management

Check Node version:
```bash
node -v
```

Set default Node version with nvm:
```bash
nvm alias default 20
```

### Install Fed-CLI

```bash
npm install pnpm -g
npm install @chehejia/fed-cli -g --registry https://rnpm.chehejia.com
```

macOS with permission issues:
```bash
sudo npm install pnpm -g
sudo npm install @chehejia/fed-cli -g --registry https://rnpm.chehejia.com
```

## Commands

### Create New Project

```bash
fed new [projectName] [-d/--dir <path>]
```

**Options:**
- `projectName`: Name of the project (required)
- `-d, --dir <path>`: Target directory (optional, defaults to current directory)

**Examples:**
```bash
# Create in current directory
fed new my-project

# Create in specific directory
fed new my-project -d /Users/username/Documents/target
```

**Behavior:**
- Automatically checks if target folder has existing files
- Prompts to clear folder if files exist
- Warning: `.git` folder counts as existing file - verify before deleting

### Generate API from Apidoc

```bash
fed api [-i/--interactive] [-f/--force]
```

**Options:**
- `-i, --interactive`: Interactive mode to select specific API categories
- `-f, --force`: Force regeneration, bypass diff algorithm

**Examples:**
```bash
# Generate all APIs
fed api

# Select specific categories
fed api -i

# Force regenerate all
fed api -f
```

Requires configuration in `fed.cli.config.js` (see apidoc-config.md).

### Clone from Gerrit

```bash
fed clone <repoName> [destination]
```

**Note:** Only supports repositories under `gerrit.it.chehejia` domain.

**Examples:**
```bash
# Clone to current directory
fed clone fed/tools/fed-business-template

# Clone to specific directory
fed clone fed/tools/fed-business-template /Users/username/Documents/target
```

**Benefits:**
- Automatically sets up commit-id hooks for Gerrit
- Solves macOS commit-id generation issues

## Project Types

### PC端项目 (PC Web Application)

**Features:**
- Vite build system (fast startup)
- Built-in LiUI and LiUI Pro components
- Unified layout system with company standard
- Integrated company authentication
- Multiple layout modes and theme colors

**Use cases:**
- Enterprise management systems
- Dashboard applications
- B2B/B2C web platforms

**Post-creation:**
- Configure layout in project setup
- Select theme color
- Enable IDaaS/EIAM if needed

### 移动端项目 (Mobile Web Application)

**Features:**
- Vite build system
- LiUI Mobile components
- Company authentication integration
- Mobile-optimized layout

**Use cases:**
- H5 mobile pages
- Mobile-first web applications
- Hybrid app web views

### 组件库 (Component Library)

**Features:**
- Vite build system
- Markdown-to-HTML documentation
- Component development environment
- Documentation site generation

**Use cases:**
- Shared component libraries
- Design system implementation
- Reusable UI component packages

### 空白模板 (Blank Template)

**Features:**
- Standard project structure
- No pre-configured components
- Unified coding conventions
- Basic routing and state setup

**Use cases:**
- Custom projects with specific requirements
- Minimal setup preferred
- Non-standard UI library usage

### 工具库 (Utility Library)

**Features:**
- Pure JavaScript/TypeScript project
- No web framework dependencies
- Optional documentation site

**Use cases:**
- Script tools
- Non-web utilities
- Shared utility functions

**Types:**
- Standard utility library
- Utility library with documentation site

### 微前端项目 (Micro Frontend)

**Two types:**
1. **主应用 (Main Application/Base)**: Vite-based micro frontend host that supports Vue 2/3, React sub-applications
2. **子应用 (Sub Application)**: Any PC web project from fed-cli supports micro frontend integration

**Note:** Sub-applications cannot directly use login redirect - must receive login info from main application.

### LiUI-Press 文档站点

Documentation site system that converts Markdown to LiUI-styled websites.

**Use cases:**
- Project documentation
- Component API documentation
- User guides and manuals

## Project Templates Selection Guide

| Project Type | Framework | Build Tool | UI Library | Authentication | Use Case |
|--------------|-----------|------------|------------|----------------|----------|
| PC端 | Vue 3 | Vite | LiUI + LiUI Pro | ✓ | Enterprise web apps |
| 移动端 | Vue 3 | Vite | LiUI Mobile | ✓ | Mobile H5 pages |
| 组件库 | Vue 3 | Vite | Custom | ✗ | Component libraries |
| 空白模板 | Vue 3 | Vite | None | ✗ | Custom projects |
| 工具库 | - | Vite | None | ✗ | Utility scripts |
| 微前端主应用 | Vue 3 | Vite | LiUI | ✓ | Micro frontend host |

## Important Notes

1. **Vue 3 Strongly Recommended**: Vue 2 support has officially ended. Use Vue 3 templates for all new projects.

2. **Folder Cleanup Warning**: When creating in existing folders, carefully verify files before clearing. Hidden `.git` folders trigger warnings.

3. **Node Version**: Projects require Node ≥18.12. Use nvm/fnm for version management.

4. **Package Manager**: pnpm is recommended for better dependency management and disk space efficiency.

5. **Registry Configuration**: Fed-cli uses internal npm registry at `https://rnpm.chehejia.com`.

## Advanced Features

### Micro Frontend Integration

For Vite sub-projects integrating with QianKun:
- Refer to "Vite 子项目接入 QianKun 微前端" documentation
- Configure during or after project creation
- Ensure sub-application domain configuration is correct

### Documentation Sites

LiUI Press creates documentation sites similar to LiUI's official documentation:
- Markdown-based content
- Automatic navigation generation
- LiUI component styling
- Code playground integration

Refer to "LiUI Press 文档站点" manual for complete setup.

## Workflow Summary

1. **Install prerequisites**: Node ≥18.12, pnpm, fed-cli
2. **Create project**: `fed new project-name`
3. **Select framework and type**: Vue 3 + appropriate template
4. **Configure authentication**: IDaaS/EIAM or user center
5. **Install dependencies**: `pnpm install`
6. **Configure APIs**: Set up apidoc integration
7. **Start development**: `pnpm dev`
