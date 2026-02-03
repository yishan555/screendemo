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
      // Create a simple placeholder icon (16x16 white square)
      // Should be replaced with actual .ico file in production
      const icon = this.createPlaceholderIcon();

      this.tray = new Tray(icon);
      this.tray.setToolTip('Screenshot Tool - Ctrl+Shift+X to capture');

      // Create menu
      this.createMenu();

      logger.info('Tray icon created');
    } catch (error) {
      logger.error('Failed to create tray:', error.message);
      throw error;
    }
  }

  /**
   * Create placeholder icon (simple white square)
   * Should use actual .ico file in production
   */
  createPlaceholderIcon() {
    // Create a 16x16 white square as placeholder icon
    const iconSize = 16;
    const canvas = {
      width: iconSize,
      height: iconSize
    };

    // Use nativeImage to create a simple icon
    // Create a transparent icon and set tooltip so user knows it exists
    const image = nativeImage.createEmpty();

    // Alternative: if above method is not visible, use a simple base64 icon
    // This is a 16x16 blue square PNG
    const iconData = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABPSURBVDiN7ZLBDQAgCAPh/5+2E7iIO1QjGv0YE5oQUgLyPwBgZlYAMDNzzgEAM8M5h5kBAMwM7z3MDABgZnDOwTkHAGBmmBnee5gZAOABc88hDQ/KjBQAAAAASUVORK5CYII=';

    return nativeImage.createFromDataURL('data:image/png;base64,' + iconData);
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
