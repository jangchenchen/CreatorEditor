/**
 * React Hook for Local Storage Operations
 * Provides easy-to-use interface for storage operations in React components
 */

import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { localStorageService } from '../services/localStorageService';
import { ImportExportService, ImportResult, ExportResult } from '../services/importExportService';
import { autoSaveUtils } from '../middleware/autoSaveMiddleware';
import { OutlineData } from '../types/outline.types';
import { initializeProject } from '../slices/rootOutlineSlice';

// Hook return interface
export interface UseLocalStorageReturn {
  // Storage status
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Auto-save status
  autoSave: {
    enabled: boolean;
    saving: boolean;
    lastSaveTime: number;
    hasPendingChanges: boolean;
  };
  
  // Storage operations
  saveProject: () => Promise<void>;
  loadProject: (projectId?: string) => Promise<OutlineData | null>;
  deleteProject: (projectId: string) => Promise<void>;
  getProjectList: () => Promise<Array<{ id: string; name: string; lastUpdated: Date }>>;
  
  // Auto-save controls
  enableAutoSave: () => void;
  disableAutoSave: () => void;
  forceSave: () => Promise<void>;
  
  // Import/Export operations
  exportProject: (projectId: string, filePath: string) => Promise<ExportResult>;
  importProject: (file: File) => Promise<ImportResult>;
  exportBackup: (filePath: string) => Promise<ExportResult>;
  
  // Storage statistics
  getStorageStats: () => Promise<any>;
  
  // Utility functions
  clearError: () => void;
}

/**
 * Custom hook for local storage operations
 */
export const useLocalStorage = (): UseLocalStorageReturn => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const dispatch = useDispatch();
  const currentState = useSelector((state: RootState) => state);
  
  // Initialize storage service on mount
  useEffect(() => {
    const initializeStorage = async () => {
      try {
        setIsLoading(true);
        await localStorageService.initialize();
        setIsInitialized(true);
        console.log('Storage initialized successfully');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Storage initialization failed';
        setError(errorMessage);
        console.error('Storage initialization failed:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeStorage();
  }, []);

  // Listen for auto-save events
  useEffect(() => {
    const handleAutoSaveEvent = (event: CustomEvent) => {
      const { type, data } = event.detail;
      
      if (type === 'error') {
        setError(`Auto-save failed: ${data.error}`);
      } else if (type === 'success') {
        // Clear any previous errors on successful save
        setError(null);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('autosave', handleAutoSaveEvent as EventListener);
      
      return () => {
        window.removeEventListener('autosave', handleAutoSaveEvent as EventListener);
      };
    }
  }, []);

  // Get auto-save status
  const autoSaveStatus = autoSaveUtils.getStatus();

  // Storage operations
  const saveProject = useCallback(async (): Promise<void> => {
    if (!isInitialized) {
      throw new Error('Storage not initialized');
    }

    try {
      setIsLoading(true);
      setError(null);
      await localStorageService.saveState(currentState);
      console.log('Project saved successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Save failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentState, isInitialized]);

  const loadProject = useCallback(async (projectId?: string): Promise<OutlineData | null> => {
    if (!isInitialized) {
      throw new Error('Storage not initialized');
    }

    try {
      setIsLoading(true);
      setError(null);
      const projectData = await localStorageService.loadProject(projectId);
      
      if (projectData) {
        // Dispatch action to load project into Redux state
        dispatch(initializeProject(projectData));
        console.log(`Project loaded: ${projectData.projectName}`);
      }
      
      return projectData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Load failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, isInitialized]);

  const deleteProject = useCallback(async (projectId: string): Promise<void> => {
    if (!isInitialized) {
      throw new Error('Storage not initialized');
    }

    try {
      setIsLoading(true);
      setError(null);
      await localStorageService.deleteProject(projectId);
      console.log(`Project deleted: ${projectId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Delete failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  const getProjectList = useCallback(async (): Promise<Array<{ id: string; name: string; lastUpdated: Date }>> => {
    if (!isInitialized) {
      throw new Error('Storage not initialized');
    }

    try {
      setError(null);
      return await localStorageService.getProjectList();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get project list';
      setError(errorMessage);
      throw err;
    }
  }, [isInitialized]);

  // Auto-save controls
  const enableAutoSave = useCallback(() => {
    autoSaveUtils.enable();
  }, []);

  const disableAutoSave = useCallback(() => {
    autoSaveUtils.disable();
  }, []);

  const forceSave = useCallback(async (): Promise<void> => {
    if (!isInitialized) {
      throw new Error('Storage not initialized');
    }

    try {
      setError(null);
      await autoSaveUtils.forceSave(currentState);
      console.log('Force save completed');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Force save failed';
      setError(errorMessage);
      throw err;
    }
  }, [currentState, isInitialized]);

  // Import/Export operations
  const exportProject = useCallback(async (projectId: string, filePath: string): Promise<ExportResult> => {
    if (!isInitialized) {
      throw new Error('Storage not initialized');
    }

    try {
      setIsLoading(true);
      setError(null);
      const result = await ImportExportService.exportProject(projectId, filePath);
      
      if (result.errors.length > 0) {
        setError(result.errors.join(', '));
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Export failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  const importProject = useCallback(async (file: File): Promise<ImportResult> => {
    if (!isInitialized) {
      throw new Error('Storage not initialized');
    }

    try {
      setIsLoading(true);
      setError(null);
      const result = await ImportExportService.handleFileImport(file);
      
      if (result.errors.length > 0) {
        setError(result.errors.join(', '));
      }
      
      if (result.success && result.project) {
        // Automatically load the imported project
        dispatch(initializeProject(result.project));
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Import failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, isInitialized]);

  const exportBackup = useCallback(async (filePath: string): Promise<ExportResult> => {
    if (!isInitialized) {
      throw new Error('Storage not initialized');
    }

    try {
      setIsLoading(true);
      setError(null);
      const result = await ImportExportService.exportBackup(filePath);
      
      if (result.errors.length > 0) {
        setError(result.errors.join(', '));
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Backup export failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  const getStorageStats = useCallback(async (): Promise<any> => {
    if (!isInitialized) {
      throw new Error('Storage not initialized');
    }

    try {
      setError(null);
      return await localStorageService.getStorageStats();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get storage stats';
      setError(errorMessage);
      throw err;
    }
  }, [isInitialized]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

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
    clearError
  };
};

export default useLocalStorage;