# LiUI Project Creator - Automated Workflow

This document explains how to use the liui-project skill with AI assistance to create projects automatically.

## Overview

The liui-project skill provides an automated way to create LiUI projects by:
1. Asking the user for project configuration
2. Running `fed new` with the provided configuration
3. Handling all interactive prompts automatically

## Workflow for AI

When a user requests to create a LiUI project, follow these steps:

### Step 1: Gather Configuration

Use `AskUserQuestion` to collect the following information:

```typescript
AskUserQuestion({
  questions: [
    {
      question: "What type of LiUI project do you want to create?",
      header: "Project Type",
      options: [
        { label: "PC端项目 (Recommended)", description: "Vite + LiUI + LiUI Pro with full layout and auth" },
        { label: "移动端项目", description: "Vite + LiUI Mobile for H5 mobile pages" },
        { label: "空白模板", description: "Minimal Vue 3 setup with maximum flexibility" },
        { label: "组件库", description: "Component library with documentation system" }
      ]
    },
    {
      question: "Do you need IDaaS login and EIAM permission system?",
      header: "Authentication",
      options: [
        { label: "Need (Recommended)", description: "Enterprise-grade login and permission control" },
        { label: "Simple login only", description: "User center login without permissions" },
        { label: "No authentication", description: "Pure frontend project" }
      ]
    },
    {
      question: "Do you want to add watermark system?",
      header: "Watermark",
      options: [
        { label: "Yes", description: "Add user info watermark to prevent leaks" },
        { label: "No", description: "No watermark" }
      ]
    }
  ]
})
```

### Step 2: Create Automation Script

Based on the user's answers, create a temporary expect script that automates the fed-cli interaction:

```bash
#!/usr/bin/expect -f
set timeout 300

spawn fed new {PROJECT_NAME}

# Framework selection
expect "请选择要使用的框架"
send "\\r"

# Project type
expect "请选择项目类型"
send "{TYPE_SELECTION}\\r"

# For PC projects
expect "请选择布局方式"
send "\\r"

expect "请选择布局主题"
send "\\r"

# Authentication
expect "是否使用 IDaaS 登录系统"
send "{IDaaS_ANSWER}\\r"

expect "是否使用 EIAM 权限系统"
send "{EIAM_ANSWER}\\r"

# Watermark
expect "是否添加水印系统"
send "{WATERMARK_ANSWER}\\r"

# Wait for completion
expect eof
```

### Step 3: Execute the Script

1. Create the expect script in a temporary file
2. Make it executable (`chmod +x`)
3. Run it: `expect script.exp`
4. Clean up the temporary file

### Step 4: Post-Creation

After successful creation:
1. Confirm project was created
2. Show next steps to the user:
   ```
   cd {PROJECT_DIR}
   pnpm install
   pnpm dev
   ```

## Example Interaction

**User**: "Create a new LiUI project called 'test' in the examples folder"

**AI**:
1. Uses `AskUserQuestion` to get configuration
2. User selects: PC端, with IDaaS/EIAM, no watermark
3. AI creates and runs expect script
4. AI confirms: "✅ Project created at examples/test"
5. AI shows next steps

## Answer Mappings

### Project Type
- "PC端项目" → `\r` (first option)
- "移动端项目" → `\x1b[B\r` (down + enter)
- "组件库" → `\x1b[B\x1b[B\r`
- "空白模板" → `\x1b[B\x1b[B\x1b[B\r`

### Authentication
- "Need (Recommended)" → IDaaS: `\r`, EIAM: `\r`
- "Simple login only" → IDaaS: `\r`, EIAM: `n\r`
- "No authentication" → IDaaS: `n\r`, skip EIAM

### Watermark
- "Yes" → `\r` or `Y\r`
- "No" → `n\r`

## Troubleshooting

### expect Not Installed

If `expect` is not available:
```bash
# macOS
brew install expect

# Ubuntu
apt-get install expect
```

### Script Times Out

- Increase timeout in expect script
- Check network connection (template download)
- Verify fed-cli is up to date

### Wrong Selections

- Check expect pattern matching
- Verify prompt text hasn't changed in fed-cli
- Add debug output: `exp_internal 1`

## Alternative: Manual Guidance

If automation fails, provide step-by-step instructions:

```
Please run manually:
  cd examples
  fed new test

Then select:
  1. Framework: vue3
  2. Project Type: PC端
  3. Layout: 侧边多级导航布局 (default)
  4. Theme: 主题色 (default)
  5. IDaaS: Yes
  6. EIAM: Yes
  7. Watermark: No
```

## Integration with Other Skills

After project creation:
- Direct users to `liui` skill for component development
- Direct users to `vue` skill for Vue 3 patterns
- Refer to `liui-project/references/` for configuration help
