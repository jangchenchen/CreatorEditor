/**
 * 导入导出操作Hook
 */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ImportExportService, ImportResult, ExportResult } from '../../services/importExportService';
import { initializeProject } from '../../slices/rootOutlineSlice';

interface ImportExportState {
  isInitialized: boolean;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useImportExportOperations = ({ 
  isInitialized, 
  setIsLoading, 
  setError 
}: ImportExportState) => {
  const dispatch = useDispatch();

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
  }, [isInitialized, setIsLoading, setError]);

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
  }, [dispatch, isInitialized, setIsLoading, setError]);

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
  }, [isInitialized, setIsLoading, setError]);

  return {
    exportProject,
    importProject,
    exportBackup
  };
};