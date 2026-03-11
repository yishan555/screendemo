/**
 * Configuration management module
 * Handles loading, saving, and managing user settings
 */

const { app } = require('electron');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

class ConfigManager {
  constructor() {
    this.configPath = null;
    this.config = null;
    this.defaultConfig = {
      shortcut: 'CommandOrControl+Shift+X',
      captureScreen: false,
      captureClipboard: false,
      customSavePath: '',
      logLevel: 'info',
      // Sidebar drawer settings
      drawer: {
        enabled: true,  // Whether sidebar drawer mode is enabled
        handleWidth: 10,  // Width of the collapsed handle in pixels
        handleHeight: 50, // Height of the collapsed handle in pixels
        expandedWidth: 420,  // Width when expanded
        expandedHeight: 600, // Height when expanded
        autoCollapse: true,  // Auto-collapse when window loses focus
        autoCollapseDelay: 1000,  // Delay before auto-collapse (ms)
        hoverToExpand: true,  // Auto-expand on hover
        hoverDelay: 500,  // Hover delay before expanding (ms)
        dockScreen: 'cursor',  // 'primary' or 'cursor' - which screen to dock to
        state: 'collapsed',  // Last state: 'collapsed', 'expanded', or 'pinned'
        position: null,  // Pinned position { x, y }, null if not pinned
        lastDockX: null, // Last saved X for handle
        lastDockY: null, // Last saved Y for handle
        lastExpandedX: null, // Last saved X for expanded
        lastExpandedY: null  // Last saved Y for expanded
      },
      // Feishu integration settings
      feishu: {
        enabled: false,  // Master switch for Feishu integration
        appId: '',  // Feishu App ID
        appSecret: '',  // Feishu App Secret
        targetUserId: '',  // Target user_id for private chat (easiest method)
        targetOpenId: '',  // Alternative: use open_id
        targetChatId: '',  // Alternative: use chat_id
        enableReceiveMessages: true,  // Enable WebSocket message receiving
        enableAutoReply: true,  // Auto-reply when message received
        enableScheduledPush: true,  // Enable scheduled push based on due time
        scheduledPushTimes: ['09:00', '18:00'],  // Daily push times (HH:mm format)
        // pushScope options: 'today_undo' | 'all_undo' | 'today_all_records'
        // default is 'today_all_records'
        pushScope: 'today_all_records'
      }
    };
  }

  /**
   * Initialize config manager
   */
  init() {
    try {
      const userDataPath = app.getPath('userData');
      this.configPath = path.join(userDataPath, 'config.json');

      // Load existing config or create default
      if (fs.existsSync(this.configPath)) {
        this.load();
        logger.info('Configuration loaded from:', this.configPath);
      } else {
        this.config = { ...this.defaultConfig };
        this.save();
        logger.info('Created default configuration:', this.configPath);
      }

      return this.config;
    } catch (error) {
      logger.error('Failed to initialize config manager:', error.message);
      this.config = { ...this.defaultConfig };
      return this.config;
    }
  }

  /**
   * Deep merge helper - properly merges nested objects
   */
  deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  /**
   * Load config from file
   */
  load() {
    try {
      const data = fs.readFileSync(this.configPath, 'utf-8');
      const loadedConfig = JSON.parse(data);

      // Deep merge with default config to ensure all keys exist (including nested objects)
      this.config = this.deepMerge(this.defaultConfig, loadedConfig);

      return this.config;
    } catch (error) {
      logger.error('Failed to load config:', error.message);
      this.config = { ...this.defaultConfig };
      return this.config;
    }
  }

  /**
   * Save config to file
   */
  save() {
    try {
      const data = JSON.stringify(this.config, null, 2);
      fs.writeFileSync(this.configPath, data, 'utf-8');
      logger.info('Configuration saved');
      return true;
    } catch (error) {
      logger.error('Failed to save config:', error.message);
      return false;
    }
  }

  /**
   * Get config value
   */
  get(key) {
    return this.config[key];
  }

  /**
   * Set config value
   */
  set(key, value) {
    this.config[key] = value;
    return this.save();
  }

  /**
   * Update multiple config values
   */
  update(updates) {
    this.config = { ...this.config, ...updates };
    return this.save();
  }

  /**
   * Reset to default config
   */
  reset() {
    this.config = { ...this.defaultConfig };
    return this.save();
  }

  /**
   * Get all config
   */
  getAll() {
    return { ...this.config };
  }
}

// Export singleton
module.exports = new ConfigManager();
