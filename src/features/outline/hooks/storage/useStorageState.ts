/**
 * 存储状态管理Hook
 */

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { localStorageService } from '../../services/localStorageService';
import { autoSaveUtils } from '../../middleware/autoSaveMiddleware';

export const useStorageState = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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

  const clearError = () => {
    setError(null);
  };

  return {
    isInitialized,
    isLoading,
    error,
    currentState,
    autoSaveStatus,
    setIsLoading,
    setError,
    clearError
  };
};