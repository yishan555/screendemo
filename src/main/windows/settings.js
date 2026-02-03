/**
 * Settings window management module
 * Handles creation and management of settings window
 */

const { BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const logger = require('../logger');
const configManager = require('../configManager');
const shortcut = require('../shortcut');
const storage = require('../storage');

class SettingsWindow {
  constructor() {
    this.window = null;
  }

  /**
   * Create settings window
   */
  create() {
    if (this.window && !this.window.isDestroyed()) {
      this.window.show();
      this.window.focus();
      return;
    }

    this.window = new BrowserWindow({
      width: 600,
      height: 500,
      resizable: false,
      frame: false,
      alwaysOnTop: true,
      skipTaskbar: false,
      backgroundColor: '#f5f5f5',
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: false
      }
    });

    // Keep window always on top with pop-up-menu level (higher than float window)
    this.window.setAlwaysOnTop(true, 'pop-up-menu');

    // Load settings page
    const htmlPath = path.join(__dirname, '../../renderer/settings.html');
    this.window.loadFile(htmlPath);

    // Window closed event
    this.window.on('closed', () => {
      this.window = null;
    });

    logger.info('Settings window created');
  }

  /**
   * Show settings window
   */
  show() {
    if (!this.window || this.window.isDestroyed()) {
      this.create();
    } else {
      // Restore if minimized
      if (this.window.isMinimized()) {
        this.window.restore();
      }
      this.window.show();
      this.window.focus();
      // Ensure it stays on top with highest priority
      this.window.setAlwaysOnTop(true, 'pop-up-menu');
    }
  }

  /**
   * Close settings window
   */
  close() {
    if (this.window && !this.window.isDestroyed()) {
      this.window.close();
    }
  }

  /**
   * Minimize settings window
   */
  minimize() {
    if (this.window && !this.window.isDestroyed()) {
      this.window.minimize();
      logger.info('Settings window minimized');
    }
  }

  /**
   * Restore settings window
   */
  restore() {
    if (this.window && !this.window.isDestroyed()) {
      if (this.window.isMinimized()) {
        this.window.restore();
      }
      this.window.show();
      this.window.focus();
      // Ensure it stays on top after restore with highest priority
      this.window.setAlwaysOnTop(true, 'pop-up-menu');
      logger.info('Settings window restored');
    }
  }

  /**
   * Setup IPC listeners
   */
  setupIPC() {
    // Get current settings
    ipcMain.handle('get-settings', async () => {
      const config = configManager.getAll();
      logger.debug('Settings requested:', config);
      return {
        shortcut: config.shortcut,
        customSavePath: config.customSavePath
      };
    });

    // Save settings
    ipcMain.handle('save-settings', async (event, newSettings) => {
      try {
        logger.info('Saving new settings:', newSettings);

        const oldConfig = configManager.getAll();

        const success = configManager.update({
          shortcut: newSettings.shortcut,
          customSavePath: newSettings.customSavePath
        });

        if (success) {
          logger.info('Settings saved successfully');

          // Re-register shortcut if changed
          if (oldConfig.shortcut !== newSettings.shortcut) {
            const shortcutSuccess = shortcut.reregister(newSettings.shortcut);
            if (shortcutSuccess) {
              logger.info('Shortcut re-registered successfully');
            } else {
              logger.warn('Failed to re-register shortcut, using old one');
              // Revert config
              configManager.set('shortcut', oldConfig.shortcut);
            }
          }

          // Re-initialize storage if path changed
          if (oldConfig.customSavePath !== newSettings.customSavePath) {
            storage.init(newSettings.customSavePath);
            logger.info('Storage path updated');
          }

          return true;
        } else {
          logger.error('Failed to save settings');
          return false;
        }
      } catch (error) {
        logger.error('Error saving settings:', error.message);
        return false;
      }
    });

    // Select directory
    ipcMain.handle('select-directory', async () => {
      const result = await dialog.showOpenDialog({
        properties: ['openDirectory', 'createDirectory'],
        title: 'Select Screenshot Save Directory'
      });

      if (!result.canceled && result.filePaths.length > 0) {
        logger.info('Directory selected:', result.filePaths[0]);
        return result.filePaths[0];
      }

      return null;
    });

    // Close settings window
    ipcMain.on('close-settings', () => {
      logger.info('Closing settings window');
      this.close();
    });

    // Minimize settings window
    ipcMain.on('minimize-settings', () => {
      logger.info('Minimizing settings window');
      this.minimize();
    });

    // Open settings window
    ipcMain.on('open-settings', () => {
      logger.info('Opening settings window');
      this.show();
    });

    logger.debug('Settings window IPC listeners setup');
  }
}

// Export singleton
module.exports = new SettingsWindow();
