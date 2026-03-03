# Fed-CLI Troubleshooting Guide

Common issues and solutions when using @chehejia/fed-cli.

## Installation Issues

### 1. Git Clone Failed with Status 128

**Symptom:**
```
git clone failed with status 128
```

**Cause:** Not logged into company GitLab yet.

**Solution:**

1. Ensure you have a GitLab account
2. Manually clone the template repository to trigger login:
   ```bash
   git clone https://gitlab.chehejia.com/fed-internal/fed-template.git
   ```
3. Enter your company GitLab username and password
4. After successful login, fed-cli commands will work

**Verification:** You should see a login prompt and successfully clone the repo.

---

### 2. Windows: Cannot Recognize "fed" Command

**Symptom:**
```
无法将"fed"项识别为 cmdlet、函数、脚本文件或可运行程序的名称
(Cannot recognize 'fed' as a cmdlet, function, script file or executable program)
```

**Cause:** PowerShell execution policy prevents running npm global scripts.

**Solution:**

1. Open PowerShell as Administrator:
   - Press `Win + Q`
   - Type "Powershell"
   - Click "Run as Administrator"

2. Run the following command:
   ```powershell
   set-executionpolicy remotesigned
   ```

3. When prompted, type `A` (Yes to All) and press Enter

4. Restart all PowerShell windows

**Verification:** Run `fed --version` to confirm the command is recognized.

---

### 3. Windows: Console Encoding Issues (Garbled Text)

**Symptom:** Chinese characters or output appears garbled in Windows terminal.

**Cause:** Console is using default encoding (CP936) instead of UTF-8.

**Solution:**

1. Check current encoding:
   ```cmd
   chcp
   ```
   Output shows `936` (default Windows encoding)

2. Change to UTF-8:
   ```cmd
   chcp 65001
   ```

**Permanent solution:** Add to system environment variables or create a batch script to run before starting development.

**Verification:** Chinese characters display correctly in terminal output.

---

### 4. macOS: Permission Denied After sudo Install

**Symptom:** After using `sudo` to install fed-cli, cannot modify project files with current user.

**Cause:** Files created with `sudo` are owned by root, not current user.

**Solution:**

Change file ownership to current user:
```bash
sudo chown -R $(whoami) /path/to/project
```

**Example:**
```bash
# If project is at /Users/username/Documents/my-project
sudo chown -R $(whoami) /Users/username/Documents/my-project
```

**Before:**
```
drwxr-xr-x  5 root  staff  160 Jan 19 10:00 my-project
```

**After:**
```
drwxr-xr-x  5 username  staff  160 Jan 19 10:00 my-project
```

**Prevention:** Avoid using `sudo` for project creation. Only use `sudo` for global package installation if necessary.

---

## Runtime Issues

### 5. Error: Cannot Find Module 'node:path'

**Symptom:**
```
Error: Cannot find module 'node:path'
```

**Cause:** Node.js version too old. `node:` protocol requires Node ≥14.18, preferably 16+ or 18+.

**Solution:**

1. Check current Node version:
   ```bash
   node -v
   ```

2. If version is below 14.18, upgrade using nvm:
   ```bash
   # Install Node 20 (recommended)
   nvm install 20

   # Use Node 20
   nvm use 20

   # Set as default
   nvm alias default 20
   ```

3. Alternative for Windows: Use fnm (faster and better Windows support)
   ```bash
   fnm install 20
   fnm use 20
   fnm default 20
   ```

**Verification:** Run `node -v` and confirm version is 18.12 or higher.

---

### 6. JSX Support Not Working

**Symptom:** JSX/TSX syntax causes errors in Vue components.

**Cause:** JSX support not enabled for the component.

**Solution:**

Enable JSX by setting `lang` attribute on `<script>` tag:

**JavaScript:**
```vue
<script lang="jsx">
export default {
  render() {
    return <div>Hello JSX</div>
  }
}
</script>
```

**TypeScript:**
```vue
<script lang="tsx">
export default {
  render() {
    return <div>Hello TSX</div>
  }
}
</script>
```

**Vue 3 Composition API:**
```vue
<script setup lang="tsx">
const content = <div>Hello TSX</div>
</script>
```

**Verification:** JSX syntax compiles without errors.

---

### 7. LiProForm Error: "Cannot Convert Undefined to Object"

**Symptom:**
```
TypeError: Cannot convert undefined or null to object
    at Function.assign
```

**Cause:** Incompatible version of `vite-plugin-chunk-split` causing build issues with LiProForm.

**Solution:**

Lock `vite-plugin-chunk-split` to version 0.2.7 in `package.json`:

```json
{
  "devDependencies": {
    "vite-plugin-chunk-split": "0.2.7"
  }
}
```

Then reinstall dependencies:
```bash
pnpm install
```

**Verification:** LiProForm components render without errors.

---

### 8. Commit Failed: Eslint Validation Errors / Lost Code

**Symptom:**
- Commit fails due to ESLint errors
- Code appears to be lost
- Working directory shows no uncommitted changes

**Cause:** `lint-staged` stashes changes when pre-commit hooks fail, making code appear lost.

**Solution:**

Recover stashed code:

1. List stashed changes:
   ```bash
   git stash list
   ```

   You should see your changes at the top:
   ```
   stash@{0}: On main: lint-staged automatic backup
   ```

2. Apply the stash:
   ```bash
   git stash apply stash@{0}
   ```

3. Fix ESLint errors:
   ```bash
   npm run lint:fix
   # or
   pnpm lint:fix
   ```

4. Try committing again:
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

**Prevention:** Run `pnpm lint:fix` before committing to catch errors early.

**Verification:** Code is restored and visible in working directory.

---

## Project Creation Issues

### 9. Warning About Existing Files in Directory

**Symptom:** Fed-cli warns about existing files when creating project.

**Cause:** Target directory contains files (including hidden files like `.git`).

**Solution:**

1. Check directory contents including hidden files:
   ```bash
   ls -la /path/to/directory
   ```

2. If safe to clear:
   - Fed-cli will prompt to clear directory
   - Type `Y` to confirm

3. If directory contains important files:
   - Create project in a different directory
   - Or manually backup important files first

**Important:** Be especially careful with `.git` folders. If you're in a cloned repository, files will be deleted if you confirm.

**Verification:** Project creates successfully without overwriting important data.

---

### 10. Dependency Installation Fails

**Symptom:** `pnpm install` fails after project creation.

**Cause:** Multiple possible causes:
- Network issues
- Registry access problems
- Corrupted package cache

**Solution:**

1. Check Node version (≥18.12):
   ```bash
   node -v
   ```

2. Clear pnpm cache:
   ```bash
   pnpm store prune
   ```

3. Try with registry specified:
   ```bash
   pnpm install --registry https://rnpm.chehejia.com
   ```

4. If still failing, try npm:
   ```bash
   npm install --registry https://rnpm.chehejia.com
   ```

5. Check network connection to `rnpm.chehejia.com`

**Verification:** Dependencies install successfully and `node_modules` directory is created.

---

## Development Server Issues

### 11. Port Already in Use

**Symptom:**
```
Error: Port 3000 is already in use
```

**Cause:** Another process is using the default port.

**Solution:**

**Option 1 - Use different port:**
```bash
pnpm dev --port 3001
```

**Option 2 - Kill existing process:**

macOS/Linux:
```bash
lsof -ti:3000 | xargs kill -9
```

Windows:
```cmd
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Verification:** Development server starts successfully.

---

### 12. Hot Reload Not Working

**Symptom:** Changes to code don't reflect in browser automatically.

**Cause:** Multiple possible causes:
- File watcher limits (Linux)
- Browser cache
- Vite config issues

**Solution:**

1. Hard refresh browser: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (macOS)

2. Increase file watcher limit (Linux):
   ```bash
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

3. Check Vite config for HMR settings:
   ```typescript
   // vite.config.ts
   export default {
     server: {
       hmr: true,
     }
   }
   ```

**Verification:** File changes trigger browser updates automatically.

---

## Build Issues

### 13. Build Memory Errors

**Symptom:**
```
FATAL ERROR: Reached heap limit
```

**Cause:** Node.js default memory limit exceeded during build.

**Solution:**

Increase Node memory limit:

```bash
# In package.json scripts
{
  "scripts": {
    "build": "NODE_OPTIONS=--max_old_space_size=4096 vite build"
  }
}
```

Or set environment variable:
```bash
export NODE_OPTIONS=--max_old_space_size=4096
pnpm build
```

**Verification:** Build completes successfully without memory errors.

---

### 14. TypeScript Build Errors

**Symptom:** Build fails with TypeScript errors that don't appear in IDE.

**Cause:** Different TypeScript versions or configuration between build and IDE.

**Solution:**

1. Check TypeScript version:
   ```bash
   pnpm list typescript
   ```

2. Ensure IDE uses workspace TypeScript:
   - VSCode: Check bottom-right status bar
   - Select "Use Workspace Version"

3. Clear TypeScript cache:
   ```bash
   rm -rf node_modules/.vite
   rm -rf dist
   ```

4. Rebuild:
   ```bash
   pnpm build
   ```

**Verification:** Build succeeds and errors match IDE.

---

## General Debugging

### Getting Help

1. **Check version:** `fed --version`
2. **Update fed-cli:** `npm update @chehejia/fed-cli -g`
3. **Enable debug mode:** Set `DEBUG=fed:*` environment variable
4. **Contact support:** 飞书联系 @陈尚书

### Useful Commands

```bash
# Check fed-cli version
fed --version

# Check Node version
node -v

# Check pnpm version
pnpm -v

# Clear all caches
pnpm store prune
rm -rf node_modules
rm -rf dist
rm -rf .vite

# Reinstall everything
pnpm install
```

### Best Practices to Avoid Issues

1. Keep Node.js version ≥18.12
2. Keep fed-cli updated to latest version
3. Use pnpm as package manager
4. Run `pnpm lint:fix` before committing
5. Clear caches when switching branches
6. Don't use `sudo` for project creation
7. Use proper encoding (UTF-8) in terminal
