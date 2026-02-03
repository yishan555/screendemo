/**
 * 快捷键模块
 * 负责注册全局快捷键并触发截图
 */

const { globalShortcut } = require('electron');
const config = require('./config');
const logger = require('./logger');
const capture = require('./capture');
const floatWindow = require('./windows/float');

class ShortcutManager {
  constructor() {
    this.isCapturing = false; // 防止重复触发
    this.currentShortcut = null;
  }

  /**
   * Register global shortcut
   * @param {string} shortcut - Shortcut key combination (optional, uses config if not provided)
   */
  register(shortcut = null) {
    try {
      const shortcutKey = shortcut || config.GLOBAL_SHORTCUT;
      this.currentShortcut = shortcutKey;

      const ret = globalShortcut.register(shortcutKey, () => {
        this.handleCaptureShortcut();
      });

      if (!ret) {
        logger.error('Shortcut registration failed, may already be in use:', shortcutKey);
        return false;
      }

      logger.info('Global shortcut registered:', shortcutKey);
      return true;
    } catch (error) {
      logger.error('Error registering shortcut:', error.message);
      return false;
    }
  }

  /**
   * Re-register shortcut with new key combination
   * @param {string} newShortcut - New shortcut key combination
   */
  reregister(newShortcut) {
    logger.info('Re-registering shortcut:', newShortcut);

    // Unregister old shortcut
    if (this.currentShortcut) {
      globalShortcut.unregister(this.currentShortcut);
      logger.info('Unregistered old shortcut:', this.currentShortcut);
    }

    // Register new shortcut
    return this.register(newShortcut);
  }

  /**
   * Handle capture shortcut
   */
  async handleCaptureShortcut() {
    // Prevent duplicate triggers
    if (this.isCapturing) {
      logger.warn('Screenshot in progress, ignoring duplicate trigger');
      return;
    }

    this.isCapturing = true;

    try {
      logger.info('Screenshot shortcut triggered');
      logger.logOperation('User Triggered Screenshot', { trigger: 'shortcut' });

      // Execute screenshot
      const result = await capture.execute();

      if (result) {
        // Show float window and pass data
        floatWindow.show(result);
        logger.logCapture(true, result);
      } else {
        logger.error('Screenshot failed: No result returned');
        logger.logCapture(false, { error: 'No result returned' });
      }
    } catch (error) {
      logger.error('Error handling screenshot shortcut:', error.message);
      logger.logCapture(false, { error: error.message });
    } finally {
      // Delay reset flag to prevent rapid repeat triggers
      setTimeout(() => {
        this.isCapturing = false;
      }, 500);
    }
  }

  /**
   * Unregister all global shortcuts
   */
  unregisterAll() {
    globalShortcut.unregisterAll();
    logger.info('All global shortcuts unregistered');
  }

  /**
   * Check if shortcut is registered
   */
  isRegistered(shortcut = null) {
    const key = shortcut || this.currentShortcut || config.GLOBAL_SHORTCUT;
    return globalShortcut.isRegistered(key);
  }
}

// 导出单例
module.exports = new ShortcutManager();
