#!/usr/bin/env node

/**
 * Automated LiUI Project Creator
 *
 * This script automates the interactive `fed new` command by pre-configuring
 * responses based on user inputs.
 */

const { spawn } = require('child_process');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const config = parseArgs(args);

function parseArgs(args) {
  const config = {
    name: '',
    dir: process.cwd(),
    framework: 'vue3',
    type: 'pc',
    layout: 'default',
    theme: '主题色', // 主题色 or 亮色
    idaas: true,
    permission: true, // 权限系统控制路由
    eiam: true,
    watermark: true // 默认启用水印
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--name':
      case '-n':
        config.name = args[++i];
        break;
      case '--dir':
      case '-d':
        config.dir = args[++i];
        break;
      case '--type':
      case '-t':
        config.type = args[++i]; // pc, mobile, component, blank
        break;
      case '--no-auth':
        config.idaas = false;
        config.permission = false;
        config.eiam = false;
        break;
      case '--no-eiam':
        config.eiam = false;
        break;
      case '--no-permission':
        config.permission = false;
        break;
      case '--no-watermark':
        config.watermark = false;
        break;
      case '--theme':
        config.theme = args[++i]; // 主题色 or 亮色
        break;
      case '--help':
      case '-h':
        showHelp();
        process.exit(0);
      default:
        if (!config.name && !arg.startsWith('-')) {
          config.name = arg;
        }
    }
  }

  if (!config.name) {
    console.error('❌ Error: Project name is required');
    showHelp();
    process.exit(1);
  }

  return config;
}

function showHelp() {
  console.log(`
🚀 LiUI Project Creator - Automated fed-cli wrapper

Usage:
  node create-project.js <project-name> [options]

Arguments:
  project-name              Name of the project to create

Options:
  -d, --dir <path>          Target directory (default: current directory)
  -t, --type <type>         Project type: pc, mobile, component, blank
                            (default: pc)
  --theme <theme>           Theme style: 主题色, 亮色
                            (default: 主题色)
  --no-auth                 Disable IDaaS login, permission system and EIAM
  --no-permission           Disable permission system (keep login)
  --no-eiam                 Disable EIAM permissions (keep login and permission)
  --no-watermark            Disable watermark system
  -h, --help                Show this help message

Examples:
  # Create a PC project with authentication
  node create-project.js my-project

  # Create a mobile project
  node create-project.js mobile-app --type mobile

  # Create in specific directory without auth
  node create-project.js test-app --dir ./examples --no-auth

  # Create without watermark
  node create-project.js secure-app --no-watermark

  # Create with custom theme
  node create-project.js themed-app --theme 亮色

Project Types:
  pc          - PC端项目 (Vite + LiUI + LiUI Pro)
  mobile      - 移动端项目 (Vite + LiUI Mobile)
  component   - 组件库项目 (with documentation)
  blank       - 空白模板 (minimal setup)
`);
}

async function createProject(config) {
  console.log('\n🚀 Creating LiUI project with configuration:');
  console.log(`   Name: ${config.name}`);
  console.log(`   Directory: ${config.dir}`);
  console.log(`   Type: ${config.type}`);
  console.log(`   Theme: ${config.theme}`);
  console.log(`   IDaaS Login: ${config.idaas ? 'Yes' : 'No'}`);
  console.log(`   Permission System: ${config.permission ? 'Yes' : 'No'}`);
  console.log(`   EIAM Permissions: ${config.eiam ? 'Yes' : 'No'}`);
  console.log(`   Watermark: ${config.watermark ? 'Yes' : 'No'}`);
  console.log('');

  // Build fed command
  const targetDir = path.join(config.dir, config.name);

  // Check if expect is available
  const hasExpect = await checkCommandExists('expect');

  if (hasExpect) {
    // Use expect script for automation
    await createWithExpect(config, targetDir);
  } else {
    console.log('\n⚠️  Warning: expect command not found');
    console.log('Installing expect will enable full automation.');
    console.log('\nOn macOS: brew install expect');
    console.log('On Ubuntu: apt-get install expect');
    console.log('\nFalling back to manual mode...\n');

    // Fallback: just run fed new and show instructions
    console.log('Please run the following command manually:');
    console.log(`\n  cd ${config.dir}`);
    console.log(`  fed new ${config.name}\n`);
    console.log('And select:');
    console.log(`  - Framework: vue3`);
    console.log(`  - Type: ${getTypeDisplay(config.type)}`);
    if (config.type === 'pc') {
      console.log(`  - Theme: ${config.theme}`);
      console.log(`  - IDaaS: ${config.idaas ? 'Yes' : 'No'}`);
      console.log(`  - Permission: ${config.permission ? 'Yes' : 'No'}`);
      console.log(`  - EIAM: ${config.eiam ? 'Yes' : 'No'}`);
      console.log(`  - Watermark: ${config.watermark ? 'Yes' : 'No'}`);
    }
  }
}

function checkCommandExists(command) {
  return new Promise((resolve) => {
    const proc = spawn('which', [command]);
    proc.on('close', (code) => {
      resolve(code === 0);
    });
  });
}

async function createWithExpect(config, targetDir) {
  // Create expect script
  const expectScript = generateExpectScript(config);
  const scriptPath = path.join(__dirname, '.create-project.exp');

  const fs = require('fs');
  fs.writeFileSync(scriptPath, expectScript);
  fs.chmodSync(scriptPath, '755');

  console.log('📝 Running automated creation...\n');

  return new Promise((resolve, reject) => {
    const proc = spawn('expect', [scriptPath], {
      cwd: config.dir,
      stdio: 'inherit'
    });

    proc.on('close', (code) => {
      // Clean up expect script
      try {
        fs.unlinkSync(scriptPath);
      } catch (e) { }

      if (code === 0) {
        console.log('\n✅ Project created successfully!');
        console.log(`\n📂 Next steps:`);
        console.log(`   cd ${targetDir}`);
        console.log(`   pnpm install`);
        console.log(`   pnpm dev\n`);
        resolve();
      } else {
        console.error('\n❌ Project creation failed');
        reject(new Error(`Process exited with code ${code}`));
      }
    });

    proc.on('error', (err) => {
      reject(err);
    });
  });
}

function generateExpectScript(config) {
  const typeKey = getTypeKey(config.type);

  return `#!/usr/bin/expect -f

set timeout 300

spawn fed new ${config.name}

# Select framework: vue3
expect "请选择要使用的框架"
send "\\r"

# Select project type
expect "请选择项目类型"
send "\\r"

${config.type === 'pc' ? `
# For PC projects: select layout
expect "请选择布局方式" {
  send "\\r"
}

# Select theme color
expect "请选择布局主题" {
  send "${getThemeKey(config.theme)}"
}

# IDaaS login
expect "是否使用 IDaaS 登录系统" {
  send "${config.idaas ? '' : 'n'}\\r"
}

# Permission system
expect "是否使用权限系统控制路由" {
  send "${config.permission ? '' : 'n'}\\r"
}

# Watermark
expect "是否添加水印" {
  send "${config.watermark ? '' : 'n'}\\r"
}
` : ''}

# Wait for completion or prompt to install dependencies
expect {
  "成功创建项目" {
    send_user "\\n✅ Project created\\n"
  }
  "是否立即安装依赖" {
    send "\\r"
    exp_continue
  }
  "项目创建成功" {
    send_user "\\n✅ Project created\\n"
  }
  timeout {
    send_user "\\n❌ Timeout waiting for completion\\n"
    exit 1
  }
  eof
}
`;
}

function getTypeKey(type) {
  const typeMap = {
    'pc': '\r',      // First option (default)
    'mobile': '\x1b[B\r',  // Down arrow + enter
    'component': '\x1b[B\x1b[B\r',  // Down down + enter
    'blank': '\x1b[B\x1b[B\x1b[B\r'  // Down down down + enter
  };
  return typeMap[type] || '\r';
}

function getThemeKey(theme) {
  // For expect script - returns the key sequence needed
  if (theme === '亮色') {
    return '\\033[B\\r';  // Down arrow + enter for 亮色
  }
  return '\\r';  // Default: 主题色
}

function getTypeDisplay(type) {
  const displayMap = {
    'pc': 'PC端',
    'mobile': '移动端',
    'component': '组件库',
    'blank': '空白模板'
  };
  return displayMap[type] || 'PC端';
}

// Run
createProject(config).catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
