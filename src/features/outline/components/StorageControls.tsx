/**
 * Storage Controls Component
 * Provides UI controls for local storage operations including auto-save, import/export
 * 
 * @deprecated This component has been refactored. Use StorageControlsRefactored for new development.
 * This file maintains backward compatibility.
 */

import React from 'react';
import { StorageControls as RefactoredStorageControls } from './StorageControlsRefactored';

interface StorageControlsProps {
  currentProjectId?: string;
  onProjectLoad?: (projectId: string) => void;
}

/**
 * @deprecated Use the refactored StorageControls components for new development
 */
export const StorageControls: React.FC<StorageControlsProps> = (props) => {
  return <RefactoredStorageControls {...props} />;
};