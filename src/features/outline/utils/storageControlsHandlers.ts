/**
 * Storage Controls Handlers
 * Handler functions for storage operations
 */

import { StorageControlsState, SnackbarSeverity } from '../types/storageControlsTypes';

/**
 * Creates storage operation handlers
 */
export const createStorageHandlers = (
  storage: any,
  state: StorageControlsState,
  updateState: (updates: Partial<StorageControlsState>) => void,
  currentProjectId?: string,
  onProjectLoad?: (projectId: string) => void
) => {
  const showSnackbar = (message: string, severity: SnackbarSeverity) => {
    updateState({ snackbar: { open: true, message, severity } });
  };

  const handleSave = async () => {
    try {
      await storage.saveProject();
      showSnackbar('Project saved successfully', 'success');
    } catch (error) {
      showSnackbar('Failed to save project', 'error');
    }
  };

  const handleForceSave = async () => {
    try {
      await storage.forceSave();
      showSnackbar('Force save completed', 'success');
    } catch (error) {
      showSnackbar('Force save failed', 'error');
    }
  };

  const handleFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await storage.importProject(file);

      if (result.success) {
        let message = `Project "${result.project?.projectName}" imported successfully`;
        if (result.migrationApplied) {
          message += ` (migrated from v${result.originalVersion})`;
        }
        showSnackbar(message, 'success');

        if (result.warnings.length > 0) {
          console.warn('Import warnings:', result.warnings);
        }
      } else {
        showSnackbar(`Import failed: ${result.errors.join(', ')}`, 'error');
      }
    } catch (error) {
      showSnackbar('Import failed', 'error');
    }

    // Reset file input
    event.target.value = '';
  };

  const handleExport = async () => {
    if (!currentProjectId || !state.exportPath) {
      showSnackbar('Project ID and export path are required', 'warning');
      return;
    }

    try {
      const result = await storage.exportProject(currentProjectId, state.exportPath);

      if (result.success) {
        showSnackbar(`Project exported to ${result.filePath}`, 'success');
        updateState({ showExportDialog: false, exportPath: '' });
      } else {
        showSnackbar(`Export failed: ${result.errors.join(', ')}`, 'error');
      }
    } catch (error) {
      showSnackbar('Export failed', 'error');
    }
  };

  const handleBackupExport = async () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `backup_${timestamp}.json`;

    try {
      const result = await storage.exportBackup(backupPath);

      if (result.success) {
        showSnackbar(`Backup exported to ${result.filePath}`, 'success');
      } else {
        showSnackbar(`Backup failed: ${result.errors.join(', ')}`, 'error');
      }
    } catch (error) {
      showSnackbar('Backup export failed', 'error');
    }
  };

  const handleShowStats = async () => {
    try {
      const stats = await storage.getStorageStats();
      updateState({ storageStats: stats, showStats: true });
    } catch (error) {
      showSnackbar('Failed to load storage statistics', 'error');
    }
  };

  const handleAutoSaveToggle = (enabled: boolean) => {
    if (enabled) {
      storage.enableAutoSave();
      showSnackbar('Auto-save enabled', 'info');
    } else {
      storage.disableAutoSave();
      showSnackbar('Auto-save disabled', 'info');
    }
  };

  return {
    handleSave,
    handleForceSave,
    handleFileSelected,
    handleExport,
    handleBackupExport,
    handleShowStats,
    handleAutoSaveToggle,
    showSnackbar,
  };
};
