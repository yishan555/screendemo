/**
 * Memo window management module
 * Handles creation and management of memo window for record management
 */

const { BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const logger = require('../logger');
const storage = require('../storage');

class MemoWindow {
  constructor() {
    this.window = null;
  }

  /**
   * Create memo window
   */
  create() {
    if (this.window && !this.window.isDestroyed()) {
      this.window.show();
      return;
    }

    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      resizable: true,
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

    // Set always-on-top level (normal - below settings and float)
    this.window.setAlwaysOnTop(true, 'normal');

    // Load memo page
    const htmlPath = path.join(__dirname, '../../renderer/memo.html');
    this.window.loadFile(htmlPath);

    // Window closed event
    this.window.on('closed', () => {
      this.window = null;
    });

    logger.info('Memo window created');
  }

  /**
   * Show memo window
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
      // Ensure it stays on top
      this.window.setAlwaysOnTop(true, 'normal');
    }
  }

  /**
   * Hide memo window
   */
  hide() {
    if (this.window && !this.window.isDestroyed()) {
      this.window.hide();
      logger.info('Memo window hidden');
    }
  }

  /**
   * Close memo window (hides instead of destroying)
   */
  close() {
    this.hide();
  }

  /**
   * Minimize memo window
   */
  minimize() {
    if (this.window && !this.window.isDestroyed()) {
      this.window.minimize();
      logger.info('Memo window minimized');
    }
  }

  /**
   * Restore memo window
   */
  restore() {
    if (this.window && !this.window.isDestroyed()) {
      if (this.window.isMinimized()) {
        this.window.restore();
      }
      this.window.show();
      this.window.focus();
      // Ensure it stays on top after restore
      this.window.setAlwaysOnTop(true, 'normal');
      logger.info('Memo window restored');
    }
  }

  /**
   * Setup IPC listeners
   */
  setupIPC() {
    // List records with optional filter
    ipcMain.handle('memo:list-records', async (event, filter = 'all') => {
      try {
        logger.info(`Listing records with filter: ${filter}`);
        const records = await storage.listAllRecords(filter);
        return { success: true, records };
      } catch (error) {
        logger.error('Failed to list records:', error.message);
        return { success: false, error: error.message };
      }
    });

    // Update status
    ipcMain.handle('memo:update-status', async (event, { metadataPath, status }) => {
      try {
        logger.info(`Updating status to '${status}' for:`, metadataPath);
        const success = await storage.updateStatus(metadataPath, status);
        return { success };
      } catch (error) {
        logger.error('Failed to update status:', error.message);
        return { success: false, error: error.message };
      }
    });

    // Batch update order
    ipcMain.handle('memo:update-order', async (event, updates) => {
      try {
        logger.info(`Batch updating order for ${updates.length} records`);
        const result = await storage.batchUpdateOrder(updates);
        return result;
      } catch (error) {
        logger.error('Failed to batch update order:', error.message);
        return { success: false, error: error.message };
      }
    });

    // Delete record
    ipcMain.handle('memo:delete-record', async (event, metadataPath) => {
      try {
        logger.info('Deleting record:', metadataPath);
        const result = await storage.deleteRecord(metadataPath, { deleteImages: true });
        return result;
      } catch (error) {
        logger.error('Failed to delete record:', error.message);
        return { success: false, error: error.message };
      }
    });

    // Add note-only record
    ipcMain.handle('memo:add-record', async (event, noteText) => {
      try {
        logger.info('Creating note-only record');
        const metadata = await storage.createNoteOnlyRecord(noteText);
        return { success: true, metadata };
      } catch (error) {
        logger.error('Failed to create note-only record:', error.message);
        return { success: false, error: error.message };
      }
    });

    // Add record with note and optional clipboard image
    ipcMain.handle('memo:add-record-with-image', async (event, { noteText, imageBuffer }) => {
      try {
        logger.info('Creating record with note and clipboard image');
        const metadata = await storage.createRecordWithClipboardImage(noteText, imageBuffer);
        return { success: true, metadata };
      } catch (error) {
        logger.error('Failed to create record with clipboard image:', error.message);
        return { success: false, error: error.message };
      }
    });

    // Open screenshot in default viewer
    ipcMain.on('memo:open-screenshot', (event, imagePath) => {
      if (imagePath) {
        logger.info('Opening screenshot:', imagePath);
        shell.openPath(imagePath).then((error) => {
          if (error) {
            logger.error('Failed to open screenshot:', error);
          }
        });
      }
    });

    // Edit record - open float window with record data
    ipcMain.on('memo:edit-record', (event, record) => {
      logger.info('Opening record for editing:', record.metadataPath);
      const floatWindow = require('./float');
      floatWindow.showForEdit(record);
    });

    // Open memo window
    ipcMain.on('open-memo', () => {
      logger.info('Opening memo window');
      this.show();
    });

    // Close memo window
    ipcMain.on('close-memo', () => {
      logger.info('Closing memo window');
      this.close();
    });

    // Minimize memo window
    ipcMain.on('minimize-memo', () => {
      logger.info('Minimizing memo window');
      this.minimize();
    });

    logger.debug('Memo window IPC listeners setup');
  }
}

// Export singleton
module.exports = new MemoWindow();
