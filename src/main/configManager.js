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
      customSavePath: '',
      logLevel: 'info'
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
   * Load config from file
   */
  load() {
    try {
      const data = fs.readFileSync(this.configPath, 'utf-8');
      const loadedConfig = JSON.parse(data);

      // Merge with default config to ensure all keys exist
      this.config = { ...this.defaultConfig, ...loadedConfig };

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
