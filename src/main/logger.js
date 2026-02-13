/**
 * 增强的日志模块
 * 支持控制台输出和文件持久化
 */

const fs = require('fs');
const path = require('path');
const { app } = require('electron');
const config = require('./config');

const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

const currentLevel = LOG_LEVELS[config.LOG_LEVEL] || LOG_LEVELS.info;

class Logger {
  constructor() {
    this.logDir = null;
    this.logFilePath = null;
    this.initialized = false;
  }

  /**
   * 初始化日志系统
   */
  init() {
    try {
      // Create logs folder in user data directory
      const userDataPath = app.getPath('userData');
      this.logDir = path.join(userDataPath, 'logs');

      if (!fs.existsSync(this.logDir)) {
        fs.mkdirSync(this.logDir, { recursive: true });
      }

      // Generate log file name (by date)
      const dateStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      this.logFilePath = path.join(this.logDir, `app-${dateStr}.log`);

      // Write startup marker
      const startupMessage = `\n${'='.repeat(80)}\n[${new Date().toISOString()}] Application Started\n${'='.repeat(80)}\n`;
      fs.appendFileSync(this.logFilePath, startupMessage, 'utf-8');

      this.initialized = true;
      console.info(`[${new Date().toISOString()}] [INFO] Logger initialized: ${this.logFilePath}`);
    } catch (error) {
      console.error('Logger initialization failed:', error.message);
      // Allow console output even if file logging fails
      this.initialized = false;
    }
  }

  /**
   * 写入日志到文件
   */
  writeToFile(level, message) {
    if (!this.initialized || !this.logFilePath) {
      return;
    }

    try {
      fs.appendFileSync(this.logFilePath, message + '\n', 'utf-8');
    } catch (error) {
      console.error('Failed to write log file:', error.message);
    }
  }

  /**
   * 判断是否应该记录该级别的日志
   */
  shouldLog(level) {
    return LOG_LEVELS[level] >= currentLevel;
  }

  /**
   * 格式化日志消息
   */
  formatMessage(level, ...args) {
    const timestamp = new Date().toISOString();
    const argsStr = args.map(arg => {
      if (typeof arg === 'object') {
        return JSON.stringify(arg);
      }
      return String(arg);
    }).join(' ');
    return `[${timestamp}] [${level.toUpperCase()}] ${argsStr}`;
  }

  debug(...args) {
    if (this.shouldLog('debug')) {
      const message = this.formatMessage('debug', ...args);
      console.debug(message);
      this.writeToFile('debug', message);
    }
  }

  info(...args) {
    if (this.shouldLog('info')) {
      const message = this.formatMessage('info', ...args);
      console.info(message);
      this.writeToFile('info', message);
    }
  }

  warn(...args) {
    if (this.shouldLog('warn')) {
      const message = this.formatMessage('warn', ...args);
      console.warn(message);
      this.writeToFile('warn', message);
    }
  }

  error(...args) {
    if (this.shouldLog('error')) {
      const message = this.formatMessage('error', ...args);
      console.error(message);
      this.writeToFile('error', message);
    }
  }

  /**
   * Log operation (for user action tracking)
   */
  logOperation(operation, details = {}) {
    const message = {
      operation,
      timestamp: new Date().toISOString(),
      ...details
    };
    this.info('Operation:', JSON.stringify(message, null, 2));
  }

  /**
   * Log screenshot event
   */
  logCapture(success, data = {}) {
    if (success) {
      this.logOperation('Screenshot Success', {
        imagePath: data.imagePath,
        clipboardLength: data.clipboardText ? data.clipboardText.length : 0,
        hasClipboard: !!data.clipboardText
      });
    } else {
      this.logOperation('Screenshot Failed', {
        error: data.error || 'Unknown error'
      });
    }
  }

  /**
   * Wrap async function with error handling
   */
  async safe(fn, context = 'Operation') {
    try {
      return await fn();
    } catch (error) {
      this.error(`${context} failed:`, error.message);
      this.debug(error.stack);
      return null;
    }
  }

  /**
   * Called on application shutdown
   */
  shutdown() {
    if (this.initialized && this.logFilePath) {
      const shutdownMessage = `[${new Date().toISOString()}] [INFO] Application Shutdown\n${'='.repeat(80)}\n`;
      try {
        fs.appendFileSync(this.logFilePath, shutdownMessage, 'utf-8');
      } catch (error) {
        console.error('Failed to write shutdown log:', error.message);
      }
    }
  }
}

// 导出单例
module.exports = new Logger();
