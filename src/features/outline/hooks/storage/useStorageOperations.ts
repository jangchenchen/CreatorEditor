/**
 * 存储操作Hook
 */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { localStorageService } from '../../services/localStorageService';
import { OutlineData } from '../../types/outline.types';
import { initializeProject } from '../../slices/rootOutlineSlice';

interface StorageState {
  isInitialized: boolean;
  currentState: any;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStorageOperations = ({
  isInitialized,
  currentState,
  setIsLoading,
  setError,
}: StorageState) => {
  const dispatch = useDispatch();

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
  }, [currentState, isInitialized, setIsLoading, setError]);

  const loadProject = useCallback(
    async (projectId?: string): Promise<OutlineData | null> => {
      if (!isInitialized) {
        throw new Error('Storage not initialized');
      }

      try {
        setIsLoading(true);
        setError(null);
        const projectData = await localStorageService.loadProject(projectId);

        if (projectData) {
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
    },
    [dispatch, isInitialized, setIsLoading, setError]
  );

  const deleteProject = useCallback(
    async (projectId: string): Promise<void> => {
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
    },
    [isInitialized, setIsLoading, setError]
  );

  const getProjectList = useCallback(async (): Promise<
    Array<{ id: string; name: string; lastUpdated: Date }>
  > => {
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
  }, [isInitialized, setError]);

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
  }, [isInitialized, setError]);

  return {
    saveProject,
    loadProject,
    deleteProject,
    getProjectList,
    getStorageStats,
  };
};
