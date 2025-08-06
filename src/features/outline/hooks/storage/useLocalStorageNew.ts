/**
 * 重构后的本地存储Hook - 主入口
 */

import { UseLocalStorageReturn } from './types';
import { useStorageState } from './useStorageState';
import { useStorageOperations } from './useStorageOperations';
import { useAutoSaveControls } from './useAutoSaveControls';
import { useImportExportOperations } from './useImportExportOperations';

/**
 * 模块化的本地存储Hook
 */
export const useLocalStorageNew = (): UseLocalStorageReturn => {
  // 基础状态管理
  const {
    isInitialized,
    isLoading,
    error,
    currentState,
    autoSaveStatus,
    setIsLoading,
    setError,
    clearError,
  } = useStorageState();

  // 存储操作
  const { saveProject, loadProject, deleteProject, getProjectList, getStorageStats } =
    useStorageOperations({
      isInitialized,
      currentState,
      setIsLoading,
      setError,
    });

  // 自动保存控制
  const { enableAutoSave, disableAutoSave, forceSave } = useAutoSaveControls({
    isInitialized,
    currentState,
    setError,
  });

  // 导入导出操作
  const { exportProject, importProject, exportBackup } = useImportExportOperations({
    isInitialized,
    setIsLoading,
    setError,
  });

  return {
    // Status
    isInitialized,
    isLoading,
    error,

    // Auto-save status
    autoSave: autoSaveStatus,

    // Storage operations
    saveProject,
    loadProject,
    deleteProject,
    getProjectList,

    // Auto-save controls
    enableAutoSave,
    disableAutoSave,
    forceSave,

    // Import/Export operations
    exportProject,
    importProject,
    exportBackup,

    // Storage statistics
    getStorageStats,

    // Utility functions
    clearError,
  };
};
