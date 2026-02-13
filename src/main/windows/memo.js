/**
 * Memo window management module
 * Handles creation and management of memo window for record management
 */

const { BrowserWindow, ipcMain, shell, screen } = require('electron');
const path = require('path');
const logger = require('../logger');
const storage = require('../storage');
const configManager = require('../configManager');

class MemoWindow {
  constructor() {
    this.window = null;
    this.drawerState = null;  // 'collapsed' | 'expanded' | 'pinned'
    this.pinnedPosition = null;  // { x, y }
    this.autoCollapseTimer = null;
    this.hoverTimer = null;
    this.lastDockBounds = null;  // Cache for screen bounds
    this.isSticky = false;       // Whether expanded via click (doesn't auto-collapse on mouseout)
    this.animationTimer = null;
    this.isAnimating = false;    // Block events during animation
  }

  /**
   * Create memo window
   */
  create() {
    const drawerConfig = configManager.get('drawer');

    if (drawerConfig.enabled) {
      this.createDrawerWindow();
    } else {
      this.createNormalWindow();
    }
  }

  /**
   * Create memo window in drawer mode
   */
  createDrawerWindow() {
    // Get target screen and bounds
    const targetDisplay = this.getTargetDisplay();
    const bounds = targetDisplay.workAreaBounds;
    this.lastDockBounds = bounds;

    // Restore state from config
    const drawerConfig = configManager.get('drawer');
    this.drawerState = drawerConfig.state || 'collapsed';
    this.pinnedPosition = drawerConfig.position;

    // Create window with appropriate size
    const { x, y, width, height } = this.getWindowBounds(this.drawerState);

    this.window = new BrowserWindow({
      x, y, width, height,
      resizable: this.drawerState === 'pinned',
      frame: false,
      alwaysOnTop: true,
      skipTaskbar: this.drawerState === 'collapsed',  // Hide from taskbar when collapsed
      backgroundColor: '#f5f5f5',
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: false
      }
    });

    // Set appropriate layer
    const level = this.drawerState === 'collapsed' ? 'screen-saver' : 'normal';
    this.window.setAlwaysOnTop(true, level);

    // Load page
    const htmlPath = path.join(__dirname, '../../renderer/memo.html');
    this.window.loadFile(htmlPath);

    // Setup event listeners
    this.setupDrawerEvents();

    // Send initial state to renderer
    this.window.webContents.on('did-finish-load', () => {
      this.syncStateToRenderer();
    });

    // Window closed event
    this.window.on('closed', () => {
      this.window = null;
    });

    logger.info(`Memo window created in drawer mode: ${this.drawerState}`);
  }

  /**
   * Create memo window in normal mode
   */
  createNormalWindow() {
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
   * Get target display based on configuration
   */
  getTargetDisplay() {
    const drawerConfig = configManager.get('drawer');
    if (drawerConfig.dockScreen === 'primary') {
      return screen.getPrimaryDisplay();
    } else {
      const cursorPoint = screen.getCursorScreenPoint();
      return screen.getDisplayNearestPoint(cursorPoint);
    }
  }

  /**
   * Get window bounds for given state
   */
  getWindowBounds(state) {
    const drawerConfig = configManager.get('drawer');
    const handleHeight = 50;
    const handleWidth = 10;

    // Ensure lastDockBounds is initialized
    if (!this.lastDockBounds) {
      logger.warn('lastDockBounds is undefined, initializing...');
      const targetDisplay = this.getTargetDisplay();
      if (!targetDisplay || !targetDisplay.workAreaBounds) {
        logger.error('Failed to get target display or workAreaBounds, using fallback');
        // Fallback to a safe default to prevent infinite recursion
        this.lastDockBounds = { x: 0, y: 0, width: 1920, height: 1080 };
      } else {
        this.lastDockBounds = targetDisplay.workAreaBounds;
        logger.info('Initialized lastDockBounds:', this.lastDockBounds);
      }
    }

    const bounds = this.lastDockBounds;
    // Get last saved handle position or default to right edge center
    const lastDockX = drawerConfig.lastDockX !== null ? drawerConfig.lastDockX : (bounds.x + bounds.width - handleWidth);
    const lastDockY = drawerConfig.lastDockY !== null ? drawerConfig.lastDockY : (bounds.y + (bounds.height - handleHeight) / 2);

    // Get last saved expanded position or default to docking from handle
    const lastExpandedWidth = drawerConfig.expandedWidth || 420;
    const lastExpandedHeight = drawerConfig.expandedHeight || bounds.height;
    const lastExpandedX = drawerConfig.lastExpandedX !== null ? drawerConfig.lastExpandedX : (bounds.x + bounds.width - lastExpandedWidth);
    const lastExpandedY = drawerConfig.lastExpandedY !== null ? drawerConfig.lastExpandedY : bounds.y;

    switch (state) {
      case 'collapsed':
        return {
          x: Math.round(lastDockX),
          y: Math.round(lastDockY),
          width: handleWidth,
          height: handleHeight
        };

      case 'expanded':
        return {
          x: Math.round(lastExpandedX),
          y: Math.round(lastExpandedY),
          width: Math.round(lastExpandedWidth),
          height: Math.round(lastExpandedHeight)
        };

      case 'pinned':
        const pinnedPos = this.pinnedPosition || {
          x: bounds.x + (bounds.width - lastExpandedWidth) / 2,
          y: bounds.y + (bounds.height - 600) / 2
        };
        return {
          x: Math.round(pinnedPos.x),
          y: Math.round(pinnedPos.y),
          width: Math.round(lastExpandedWidth),
          height: 600
        };

      default:
        return {
          x: Math.round(lastDockX),
          y: Math.round(lastDockY),
          width: handleWidth,
          height: handleHeight
        };
    }
  }

  /**
   * Ensure window bounds are within valid screen area
   */
  ensureBoundsValid(bounds) {
    // Default safe fallback bounds
    const defaultBounds = { x: 0, y: 0, width: 420, height: 600 };
    if (!bounds) return defaultBounds;

    const displays = screen.getAllDisplays();
    let isValid = false;

    // Safely extract properties with fallback to current or default values
    const width = typeof bounds.width === 'number' ? Math.round(bounds.width) : defaultBounds.width;
    const height = typeof bounds.height === 'number' ? Math.round(bounds.height) : defaultBounds.height;
    const x = typeof bounds.x === 'number' ? Math.round(bounds.x) : defaultBounds.x;
    const y = typeof bounds.y === 'number' ? Math.round(bounds.y) : defaultBounds.y;

    for (const display of displays) {
      const area = display.workAreaBounds;
      // Allow for small floating point rounding errors in comparison
      if (x >= area.x - 1 && x + width <= area.x + area.width + 1 &&
          y >= area.y - 1 && y + height <= area.y + area.height + 1) {
        isValid = true;
        break;
      }
    }

    if (!isValid) {
      logger.warn('Bounds out of screen area, centering window:', { x, y, width, height });
      // Fallback to primary display center
      const primary = screen.getPrimaryDisplay();
      const area = primary.workAreaBounds;
      return {
        x: Math.round(area.x + (area.width - width) / 2),
        y: Math.round(area.y + (area.height - height) / 2),
        width: width,
        height: height
      };
    }

    return { x, y, width, height };
  }

  /**
   * Expand drawer with animation
   */
  expand() {
    if (this.drawerState === 'expanded' || !this.window) return;

    logger.info('Expanding drawer');
    this.drawerState = 'expanded';

    const targetBounds = this.getWindowBounds('expanded');
    const startBounds = this.window.getBounds();

    this.window.setResizable(false); // Disable resizing during animation
    this.window.setAlwaysOnTop(true, 'normal');
    this.window.setSkipTaskbar(false);

    this.animateTo(startBounds, targetBounds, 200, () => {
      this.window.setResizable(true); // Re-enable resizing
      this.syncStateToRenderer();
    });

    // Save state
    const drawerConfig = configManager.get('drawer');
    configManager.set('drawer', {
      ...drawerConfig,
      state: 'expanded'
    });
  }

  /**
   * Collapse drawer with animation
   */
  collapse() {
    if (this.drawerState === 'collapsed' || !this.window) return;

    logger.info('Collapsing drawer');
    this.drawerState = 'collapsed';
    this.isSticky = false; // Reset sticky flag

    const targetBounds = this.getWindowBounds('collapsed');
    const startBounds = this.window.getBounds();

    this.window.setResizable(false);

    this.animateTo(startBounds, targetBounds, 200, () => {
      this.window.setAlwaysOnTop(true, 'screen-saver');
      this.window.setSkipTaskbar(true);
      this.syncStateToRenderer();
    });

    // Clear timers
    if (this.autoCollapseTimer) {
      clearTimeout(this.autoCollapseTimer);
      this.autoCollapseTimer = null;
    }

    // Save state
    const drawerConfig = configManager.get('drawer');
    configManager.set('drawer', {
      ...drawerConfig,
      state: 'collapsed'
    });
  }

  /**
   * Helper for window animation
   */
  animateTo(start, target, duration, callback) {
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
    }

    this.isAnimating = true; // Block events during animation
    const startTime = Date.now();
    const endX = target.x;
    const endWidth = target.width;
    const endY = target.y;
    const endHeight = target.height;

    const startX = start.x;
    const startWidth = start.width;
    const startY = start.y;
    const startHeight = start.height;

    this.animationTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quad
      const easeProgress = progress * (2 - progress);

      const currentX = Math.round(startX + (endX - startX) * easeProgress);
      const currentWidth = Math.round(startWidth + (endWidth - startWidth) * easeProgress);
      const currentY = Math.round(startY + (endY - startY) * easeProgress);
      const currentHeight = Math.round(startHeight + (endHeight - startHeight) * easeProgress);

      if (this.window && !this.window.isDestroyed()) {
        this.window.setBounds({
          x: currentX,
          y: currentY,
          width: currentWidth,
          height: currentHeight
        });
      }

      if (progress >= 1) {
        clearInterval(this.animationTimer);
        this.animationTimer = null;
        this.isAnimating = false; // Allow events again
        if (callback) callback();
      }
    }, 16); // ~60fps
  }

  /**
   * Pin drawer at position
   */
  pin(x, y) {
    logger.info('Pinning drawer at:', x, y);
    this.drawerState = 'pinned';
    this.pinnedPosition = { x, y };

    const bounds = this.getWindowBounds('pinned');
    this.window.setBounds(this.ensureBoundsValid(bounds));
    this.window.setResizable(true);
    this.window.setAlwaysOnTop(true, 'normal');
    this.window.setSkipTaskbar(false);

    // Clear auto-collapse
    if (this.autoCollapseTimer) {
      clearTimeout(this.autoCollapseTimer);
      this.autoCollapseTimer = null;
    }

    // Save state
    const drawerConfig = configManager.get('drawer');
    configManager.set('drawer', {
      ...drawerConfig,
      state: 'pinned',
      position: this.pinnedPosition
    });

    this.syncStateToRenderer();
  }

  /**
   * Unpin drawer
   */
  unpin() {
    logger.info('Unpinning drawer');
    this.pinnedPosition = null;

    // Save state
    const drawerConfig = configManager.get('drawer');
    configManager.set('drawer', {
      ...drawerConfig,
      position: null
    });

    this.collapse();
  }

  /**
   * Toggle between collapsed and expanded
   */
  toggleExpandCollapse() {
    if (this.drawerState === 'collapsed') {
      this.isSticky = true; // Set sticky when clicked
      this.expand();
    } else if (this.drawerState === 'expanded') {
      this.collapse();
    }
    // If pinned, do nothing (handle click doesn't toggle)
  }

  /**
   * Sync drawer state to renderer process
   */
  syncStateToRenderer() {
    if (this.window && !this.window.isDestroyed()) {
      this.window.webContents.send('drawer:state-changed', {
        state: this.drawerState,
        isPinned: this.drawerState === 'pinned'
      });
    }
  }

  /**
   * Setup drawer event listeners
   */
  setupDrawerEvents() {
    const drawerConfig = configManager.get('drawer');

    // Auto-collapse on blur - immediate collapse (0ms delay) when in expanded mode
    this.window.on('blur', () => {
      if (this.drawerState === 'expanded' && drawerConfig.autoCollapse) {
        this.autoCollapseTimer = setTimeout(() => {
          this.collapse();
        }, 100); // Small delay to avoid immediate collapse when clicking inside
      }
    });

    this.window.on('focus', () => {
      if (this.autoCollapseTimer) {
        clearTimeout(this.autoCollapseTimer);
        this.autoCollapseTimer = null;
      }
    });

    // Drag detection and position persistence
    this.window.on('move', () => {
      if (this.drawerState === 'pinned' || this.isAnimating) return;

      const [x, y] = this.window.getPosition();
      const drawerConfig = configManager.get('drawer');

      if (this.drawerState === 'collapsed') {
        // Force strict handle size
        this.window.setSize(10, 50);

        // Persistence for handle X and Y position
        if (drawerConfig.lastDockX !== x || drawerConfig.lastDockY !== y) {
          logger.info('Updating handle position to:', x, y);
          configManager.set('drawer', {
            ...drawerConfig,
            lastDockX: x,
            lastDockY: y
          });
        }
      } else if (this.drawerState === 'expanded') {
        const expandedBounds = this.getWindowBounds('expanded');

        // Check if moved more than 10px from docked position to enter pinned mode
        const dx = Math.abs(x - expandedBounds.x);
        const dy = Math.abs(y - expandedBounds.y);

        if (dx > 10 || dy > 10) {
          this.pin(x, y);
        } else {
          // Persistence for expanded position (if slightly moved but still docked)
          if (drawerConfig.lastExpandedX !== x || drawerConfig.lastExpandedY !== y) {
            logger.info('Updating expanded position to:', x, y);
            configManager.set('drawer', {
              ...drawerConfig,
              lastExpandedX: x,
              lastExpandedY: y
            });
          }
        }
      }
    });

    // Resize detection for expanded mode
    this.window.on('resize', () => {
      if (this.drawerState !== 'expanded' || this.isAnimating) {
        if (this.drawerState === 'collapsed' && !this.isAnimating) {
          this.window.setSize(10, 50);
        }
        return;
      }

      const [width, height] = this.window.getSize();
      const drawerConfig = configManager.get('drawer');

      // Update config if width or height changed
      if (drawerConfig.expandedWidth !== width || drawerConfig.expandedHeight !== height) {
        logger.info('Updating expanded dimensions to:', width, 'x', height);
        configManager.set('drawer', {
          ...drawerConfig,
          expandedWidth: width,
          expandedHeight: height
        });
      }
    });

    // Window closed event
    this.window.on('closed', () => {
      if (this.autoCollapseTimer) clearTimeout(this.autoCollapseTimer);
      if (this.hoverTimer) clearTimeout(this.hoverTimer);
      this.window = null;
    });
  }

  /**
   * Show memo window
   */
  show() {
    if (!this.window || this.window.isDestroyed()) {
      this.create();
      return;
    }

    const drawerConfig = configManager.get('drawer');

    if (drawerConfig.enabled) {
      // Drawer mode: expand if collapsed, otherwise just focus
      if (this.drawerState === 'collapsed') {
        this.isSticky = true; // Manual show is sticky
        this.expand();
      } else {
        if (this.window.isMinimized()) {
          this.window.restore();
        }
        this.window.show();
        this.window.focus();
      }
    } else {
      // Normal mode: standard show behavior
      if (this.window.isMinimized()) {
        this.window.restore();
      }
      this.window.show();
      this.window.focus();
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
    // Get drawer configuration
    ipcMain.handle('memo:get-drawer-config', () => {
      const drawerConfig = configManager.get('drawer');
      logger.debug('Returning drawer config:', drawerConfig);
      return drawerConfig;
    });

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

    // Drawer control handlers
    ipcMain.handle('memo:get-window-pos', () => {
      if (this.window) {
        const pos = this.window.getPosition();
        return { x: pos[0], y: pos[1] };
      }
      return { x: 0, y: 0 };
    });

    ipcMain.on('drawer:update-pos', (event, { x, y }) => {
      if (this.window && this.drawerState === 'collapsed') {
        const bounds = this.window.getBounds();
        this.window.setBounds({
          x: Math.round(x),
          y: Math.round(y),
          width: bounds.width,
          height: bounds.height
        });
      }
    });

    ipcMain.on('drawer:toggle', () => {
      logger.info('Drawer toggle requested');
      this.toggleExpandCollapse();
    });

    ipcMain.on('drawer:pin', () => {
      logger.info('Drawer pin requested, current state:', this.drawerState);

      const drawerConfig = configManager.get('drawer');
      if (!drawerConfig.enabled) {
        logger.warn('Pin button clicked but drawer mode is not enabled');
        return;
      }

      if (this.drawerState === 'pinned') {
        this.unpin();
      } else if (this.drawerState === 'expanded') {
        // Clicking pin in expanded state should collapse back to handle
        this.collapse();
      } else {
        logger.warn('Pin button clicked in invalid state:', this.drawerState);
      }
    });

    ipcMain.on('drawer:unpin', () => {
      logger.info('Drawer unpin requested');
      this.unpin();
    });

    // Handle hover events - simplified (no hover expand)
    ipcMain.on('drawer:handle-hover-start', () => {
      // Hover expand disabled
    });

    ipcMain.on('drawer:handle-hover-end', () => {
      // Hover expand disabled
    });

    logger.debug('Memo window IPC listeners setup');
  }
}

// Export singleton
module.exports = new MemoWindow();
