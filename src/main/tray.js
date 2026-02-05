/**
 * 托盘模块
 * 负责创建系统托盘图标和菜单
 */

const { Tray, Menu, nativeImage, app } = require('electron');
const path = require('path');
const logger = require('./logger');

class TrayManager {
  constructor() {
    this.tray = null;
  }

  /**
   * Create tray icon
   */
  create() {
    try {
      // Load icon from assets
      const iconPath = path.join(__dirname, '../assets/icons/screendemo.ico');
      const icon = nativeImage.createFromPath(iconPath);

      this.tray = new Tray(icon);
      this.tray.setToolTip('Screenshot Tool - Ctrl+Shift+X to capture');

      // Create menu
      this.createMenu();

      logger.info('Tray icon created with screendemo.ico');
    } catch (error) {
      logger.error('Failed to create tray:', error.message);
      throw error;
    }
  }

  /**
   * Create tray menu
   */
  createMenu() {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Screenshot (Ctrl+Shift+X)',
        click: () => {
          // Trigger screenshot (handled by shortcut module)
          logger.info('Screenshot triggered via tray menu');
          // Call shortcut module's screenshot method
          // To avoid circular dependency, we inject callback in index.js
          if (this.onCaptureRequest) {
            this.onCaptureRequest();
          }
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Memo Window',
        click: () => {
          logger.info('Opening Memo Window via tray menu');
          const memoWindow = require('./windows/memo');
          memoWindow.show();
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Exit',
        click: () => {
          logger.info('Exit via tray menu');
          app.quit();
        }
      }
    ]);

    this.tray.setContextMenu(contextMenu);
  }

  /**
   * Set capture request callback
   * @param {Function} callback - Capture callback function
   */
  setOnCaptureRequest(callback) {
    this.onCaptureRequest = callback;
  }

  /**
   * Destroy tray
   */
  destroy() {
    if (this.tray) {
      this.tray.destroy();
      this.tray = null;
      logger.info('Tray destroyed');
    }
  }
}

// 导出单例
module.exports = new TrayManager();
