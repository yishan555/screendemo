/**
 * 存储模块
 * 负责文件系统操作：创建目录、保存截图、保存元数据
 */

const { app } = require('electron');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const logger = require('./logger');

class Storage {
  constructor() {
    this.capturesDir = null;
  }

  /**
   * Initialize storage directory
   * @param {string} customPath - Custom save path (optional)
   */
  init(customPath = '') {
    try {
      // Use custom path if provided and valid, otherwise use default
      if (customPath && customPath.trim()) {
        this.capturesDir = path.resolve(customPath);
        logger.info('Using custom save path:', this.capturesDir);
      } else {
        const userDataPath = app.getPath('userData');
        this.capturesDir = path.join(userDataPath, config.CAPTURES_DIR_NAME);
        logger.info('Using default save path:', this.capturesDir);
      }

      // Create directory if not exists
      if (!fs.existsSync(this.capturesDir)) {
        fs.mkdirSync(this.capturesDir, { recursive: true });
        logger.info('Created captures directory:', this.capturesDir);
      } else {
        logger.info('Captures directory exists:', this.capturesDir);
      }

      return this.capturesDir;
    } catch (error) {
      logger.error('Failed to initialize storage directory:', error.message);
      // Fall back to default path
      const userDataPath = app.getPath('userData');
      this.capturesDir = path.join(userDataPath, config.CAPTURES_DIR_NAME);
      fs.mkdirSync(this.capturesDir, { recursive: true });
      logger.warn('Falling back to default path:', this.capturesDir);
      return this.capturesDir;
    }
  }

  /**
   * Generate unique filename (based on timestamp)
   */
  generateFileName() {
    const timestamp = Date.now();
    const dateStr = new Date(timestamp).toISOString().replace(/[:.]/g, '-');
    return `${config.SCREENSHOT_PREFIX}${dateStr}_${timestamp}`;
  }

  /**
   * Save screenshot file
   * @param {Buffer} imageBuffer - Image binary data
   * @returns {Promise<string>} Saved file path
   */
  async saveImage(imageBuffer) {
    try {
      const fileName = this.generateFileName();
      const imagePath = path.join(this.capturesDir, `${fileName}.${config.IMAGE_FORMAT}`);

      await fs.promises.writeFile(imagePath, imageBuffer);
      logger.info('Screenshot saved:', imagePath);

      return imagePath;
    } catch (error) {
      logger.error('Failed to save screenshot:', error.message);
      throw error;
    }
  }

  /**
   * Save metadata (legacy method, kept for backward compatibility)
   * @param {string} imagePath - Image path
   * @param {string} clipboardText - Clipboard text
   * @returns {Promise<string>} Metadata file path
   */
  async saveMetadata(imagePath, clipboardText = '') {
    try {
      const metadata = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        imagePath: imagePath,
        clipboardText: clipboardText || ''
      };

      const baseFileName = path.basename(imagePath, path.extname(imagePath));
      const metadataPath = path.join(this.capturesDir, `${baseFileName}${config.METADATA_SUFFIX}`);

      await fs.promises.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
      logger.info('Metadata saved:', metadataPath);

      return metadataPath;
    } catch (error) {
      logger.error('Failed to save metadata:', error.message);
      throw error;
    }
  }

  /**
   * Save a complete record (screenshot + clipboard data + metadata)
   * @param {string} imagePath - Screenshot image path
   * @param {Object} clipboardData - Clipboard data object with types, text, image
   * @returns {Promise<Object>} Object containing metadataPath and clipboardImagePath
   */
  async saveRecord(imagePath, clipboardData) {
    try {
      const recordId = Date.now();
      const baseFileName = path.basename(imagePath, path.extname(imagePath));

      // Save clipboard image if present
      let clipboardImagePath = null;
      if (clipboardData.image) {
        const clipboardFileName = `clipboard_${recordId}.png`;
        clipboardImagePath = path.join(this.capturesDir, clipboardFileName);
        await fs.promises.writeFile(clipboardImagePath, clipboardData.image);
        logger.info('Clipboard image saved:', clipboardImagePath);
      }

      // Prepare initial note content (start with clipboard text if available)
      const initialNoteText = clipboardData.text || '';

      // Create metadata with new structure
      const metadata = {
        id: recordId,
        createdAt: new Date().toISOString(),
        imagePath: imagePath,
        clipboard: {
          types: clipboardData.types,
          text: clipboardData.text || null,
          imagePath: clipboardImagePath || null
        },
        note: {
          text: initialNoteText,
          updatedAt: new Date().toISOString()
        }
      };

      const metadataPath = path.join(this.capturesDir, `${baseFileName}${config.METADATA_SUFFIX}`);
      await fs.promises.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
      logger.info('Record metadata saved:', metadataPath);

      return {
        metadataPath,
        clipboardImagePath
      };
    } catch (error) {
      logger.error('Failed to save record:', error.message);
      throw error;
    }
  }

  /**
   * Update note content in metadata
   * @param {string} metadataPath - Path to metadata file
   * @param {string} noteText - Updated note text
   * @returns {Promise<boolean>} Success status
   */
  async updateNote(metadataPath, noteText, isEditMode = false) {
    try {
      // Read existing metadata
      const metadataContent = await fs.promises.readFile(metadataPath, 'utf-8');
      const metadata = JSON.parse(metadataContent);

      // Update note field
      if (isEditMode) {
        // Edit mode: keep existing updatedAt to preserve order
        metadata.note = {
          text: noteText,
          updatedAt: metadata.note?.updatedAt || new Date().toISOString()
        };
        logger.info('Note updated (edit mode - preserving timestamp):', metadataPath);
      } else {
        // New capture mode: update timestamp
        metadata.note = {
          text: noteText,
          updatedAt: new Date().toISOString()
        };
        logger.info('Note updated (new capture):', metadataPath);
      }

      // Write back to file
      await fs.promises.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');

      return true;
    } catch (error) {
      logger.error('Failed to update note:', error.message);
      return false;
    }
  }

  /**
   * Load metadata from file
   * @param {string} metadataPath - Path to metadata file
   * @returns {Promise<Object>} Metadata object
   */
  async loadMetadata(metadataPath) {
    try {
      const metadataContent = await fs.promises.readFile(metadataPath, 'utf-8');
      const metadata = JSON.parse(metadataContent);
      logger.debug('Metadata loaded:', metadataPath);
      return metadata;
    } catch (error) {
      logger.error('Failed to load metadata:', error.message);
      throw error;
    }
  }

  /**
   * Get captures directory path
   */
  getCapturesDir() {
    return this.capturesDir;
  }

  /**
   * Migrate metadata to new structure (add missing fields with defaults)
   * @param {Object} metadata - Original metadata object
   * @returns {Object} Migrated metadata object
   */
  migrateMetadata(metadata) {
    // Add status field if missing (default: 'todo')
    if (!metadata.status) {
      metadata.status = 'todo';
    }

    // Add order field if missing (default: use id as order)
    if (!metadata.order) {
      metadata.order = metadata.id || Date.now();
    }

    // Ensure note structure exists (migrate old clipboardText field)
    if (!metadata.note) {
      metadata.note = {
        text: metadata.clipboardText || '',
        updatedAt: metadata.createdAt
      };
    }

    // Ensure clipboard structure exists
    if (!metadata.clipboard) {
      metadata.clipboard = {
        types: metadata.clipboardText ? ['text'] : [],
        text: metadata.clipboardText || null,
        imagePath: null
      };
    }

    return metadata;
  }

  /**
   * List all records with optional filtering by status
   * @param {string} filter - Filter by status: 'all', 'todo', or 'done'
   * @returns {Promise<Array>} Array of metadata objects sorted by order (desc)
   */
  async listAllRecords(filter = 'all') {
    try {
      // Scan captures directory for all .json files
      const files = await fs.promises.readdir(this.capturesDir);
      const jsonFiles = files.filter(file => file.endsWith(config.METADATA_SUFFIX));

      logger.info(`Found ${jsonFiles.length} metadata files`);

      // Load and migrate each metadata file
      const records = [];
      for (const fileName of jsonFiles) {
        try {
          const metadataPath = path.join(this.capturesDir, fileName);
          const metadataContent = await fs.promises.readFile(metadataPath, 'utf-8');
          let metadata = JSON.parse(metadataContent);

          // Migrate metadata to ensure all fields exist
          metadata = this.migrateMetadata(metadata);

          // Add metadataPath to the object for reference
          metadata.metadataPath = metadataPath;

          // Filter by status if needed
          if (filter === 'all' || metadata.status === filter) {
            records.push(metadata);
          }
        } catch (error) {
          logger.error(`Failed to load metadata file ${fileName}:`, error.message);
          // Continue with other files even if one fails
        }
      }

      // Sort by order DESC (higher order = more recent/top of list)
      // Fallback to createdAt DESC if order is same
      records.sort((a, b) => {
        if (b.order !== a.order) {
          return b.order - a.order;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      logger.info(`Loaded ${records.length} records (filter: ${filter})`);
      return records;
    } catch (error) {
      logger.error('Failed to list records:', error.message);
      throw error;
    }
  }

  /**
   * Update status field in metadata
   * @param {string} metadataPath - Path to metadata file
   * @param {string} status - New status: 'todo' or 'done'
   * @returns {Promise<boolean>} Success status
   */
  async updateStatus(metadataPath, status) {
    try {
      // Validate status value
      if (status !== 'todo' && status !== 'done') {
        throw new Error(`Invalid status: ${status}. Must be 'todo' or 'done'`);
      }

      // Read existing metadata
      const metadataContent = await fs.promises.readFile(metadataPath, 'utf-8');
      const metadata = JSON.parse(metadataContent);

      // Update status field
      metadata.status = status;

      // Write back to file
      await fs.promises.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
      logger.info(`Status updated to '${status}' in:`, metadataPath);

      return true;
    } catch (error) {
      logger.error('Failed to update status:', error.message);
      return false;
    }
  }

  /**
   * Update order field in metadata
   * @param {string} metadataPath - Path to metadata file
   * @param {number} order - New order value
   * @returns {Promise<boolean>} Success status
   */
  async updateOrder(metadataPath, order) {
    try {
      // Read existing metadata
      const metadataContent = await fs.promises.readFile(metadataPath, 'utf-8');
      const metadata = JSON.parse(metadataContent);

      // Update order field
      metadata.order = order;

      // Write back to file
      await fs.promises.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
      logger.debug(`Order updated to ${order} in:`, metadataPath);

      return true;
    } catch (error) {
      logger.error('Failed to update order:', error.message);
      return false;
    }
  }

  /**
   * Batch update order values for multiple records
   * @param {Array} updates - Array of {metadataPath, order} objects
   * @returns {Promise<Object>} Result with success count and errors
   */
  async batchUpdateOrder(updates) {
    let successCount = 0;
    const errors = [];

    try {
      for (const update of updates) {
        try {
          await this.updateOrder(update.metadataPath, update.order);
          successCount++;
        } catch (error) {
          errors.push({
            metadataPath: update.metadataPath,
            error: error.message
          });
        }
      }

      logger.info(`Batch order update completed: ${successCount}/${updates.length} successful`);

      return {
        success: successCount === updates.length,
        successCount,
        totalCount: updates.length,
        errors
      };
    } catch (error) {
      logger.error('Failed to batch update order:', error.message);
      throw error;
    }
  }

  /**
   * Delete a record (metadata + optional images)
   * @param {string} metadataPath - Path to metadata file
   * @param {Object} options - Options object with deleteImages flag
   * @returns {Promise<Object>} Result object with success status
   */
  async deleteRecord(metadataPath, options = { deleteImages: true }) {
    try {
      // Load metadata to get associated file paths
      const metadataContent = await fs.promises.readFile(metadataPath, 'utf-8');
      const metadata = JSON.parse(metadataContent);

      // Delete metadata file
      await fs.promises.unlink(metadataPath);
      logger.info('Deleted metadata:', metadataPath);

      // Delete associated images if option is true
      if (options.deleteImages) {
        // Delete screenshot image
        if (metadata.imagePath && fs.existsSync(metadata.imagePath)) {
          await fs.promises.unlink(metadata.imagePath);
          logger.info('Deleted screenshot:', metadata.imagePath);
        }

        // Delete clipboard image if exists
        if (metadata.clipboard?.imagePath && fs.existsSync(metadata.clipboard.imagePath)) {
          await fs.promises.unlink(metadata.clipboard.imagePath);
          logger.info('Deleted clipboard image:', metadata.clipboard.imagePath);
        }
      }

      return { success: true };
    } catch (error) {
      logger.error('Failed to delete record:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a note-only record without screenshot
   * @param {string} noteText - Note text content
   * @returns {Promise<Object>} Created metadata object with metadataPath
   */
  async createNoteOnlyRecord(noteText) {
    try {
      const recordId = Date.now();
      const createdAt = new Date().toISOString();

      // Create metadata without screenshot
      const metadata = {
        id: recordId,
        createdAt: createdAt,
        imagePath: null,  // No screenshot for note-only records
        clipboard: {
          types: [],
          text: null,
          imagePath: null
        },
        note: {
          text: noteText,
          updatedAt: createdAt
        },
        status: 'todo',
        order: recordId  // Use timestamp as order
      };

      // Generate filename for metadata
      const dateStr = new Date(recordId).toISOString().replace(/[:.]/g, '-');
      const fileName = `${config.SCREENSHOT_PREFIX}${dateStr}_${recordId}`;
      const metadataPath = path.join(this.capturesDir, `${fileName}${config.METADATA_SUFFIX}`);

      // Save metadata
      await fs.promises.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
      logger.info('Note-only record created:', metadataPath);

      // Add metadataPath to returned object
      metadata.metadataPath = metadataPath;

      return metadata;
    } catch (error) {
      logger.error('Failed to create note-only record:', error.message);
      throw error;
    }
  }

  /**
   * Create a record with note and optional clipboard image (no screenshot)
   * @param {string} noteText - Note text content
   * @param {Buffer} clipboardImageBuffer - Optional clipboard image buffer
   * @returns {Promise<Object>} Created metadata object with metadataPath
   */
  async createRecordWithClipboardImage(noteText, clipboardImageBuffer = null) {
    try {
      const recordId = Date.now();
      const createdAt = new Date().toISOString();

      // Save clipboard image if provided
      let clipboardImagePath = null;
      const clipboardTypes = [];

      if (clipboardImageBuffer) {
        const clipboardFileName = `clipboard_${recordId}.png`;
        clipboardImagePath = path.join(this.capturesDir, clipboardFileName);
        await fs.promises.writeFile(clipboardImagePath, clipboardImageBuffer);
        logger.info('Clipboard image saved:', clipboardImagePath);
        clipboardTypes.push('image');
      }

      if (noteText) {
        clipboardTypes.push('text');
      }

      // Create metadata without screenshot
      const metadata = {
        id: recordId,
        createdAt: createdAt,
        imagePath: null,  // No screenshot
        clipboard: {
          types: clipboardTypes,
          text: noteText || null,
          imagePath: clipboardImagePath
        },
        note: {
          text: noteText,
          updatedAt: createdAt
        },
        status: 'todo',
        order: recordId  // Use timestamp as order
      };

      // Generate filename for metadata
      const dateStr = new Date(recordId).toISOString().replace(/[:.]/g, '-');
      const fileName = `${config.SCREENSHOT_PREFIX}${dateStr}_${recordId}`;
      const metadataPath = path.join(this.capturesDir, `${fileName}${config.METADATA_SUFFIX}`);

      // Save metadata
      await fs.promises.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
      logger.info('Record with clipboard image created:', metadataPath);

      // Add metadataPath to returned object
      metadata.metadataPath = metadataPath;

      return metadata;
    } catch (error) {
      logger.error('Failed to create record with clipboard image:', error.message);
      throw error;
    }
  }
}

// 导出单例
module.exports = new Storage();
