/**
 * Storage Controls Utilities
 * Utility functions for storage controls
 */

/**
 * Format last save time for display
 */
export const formatLastSaveTime = (timestamp: string | Date | null | undefined): string => {
  if (!timestamp) return 'Never';

  try {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString();
  } catch (error) {
    return 'Invalid date';
  }
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * Generate backup filename with timestamp
 */
export const generateBackupFilename = (projectName?: string): string => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const safeName = projectName ? projectName.replace(/[^a-zA-Z0-9]/g, '_') : 'project';
  return `${safeName}_backup_${timestamp}.json`;
};

/**
 * Validate export path
 */
export const validateExportPath = (path: string): { valid: boolean; error?: string } => {
  if (!path.trim()) {
    return { valid: false, error: 'Export path is required' };
  }

  if (!path.endsWith('.json')) {
    return { valid: false, error: 'Export path must end with .json' };
  }

  // Basic path validation (more comprehensive validation would be platform-specific)
  const invalidChars = /[<>:"|?*]/;
  if (invalidChars.test(path)) {
    return { valid: false, error: 'Export path contains invalid characters' };
  }

  return { valid: true };
};
