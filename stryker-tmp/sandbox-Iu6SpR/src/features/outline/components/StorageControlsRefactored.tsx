/**
 * Storage Controls Component
 * Main component that orchestrates storage control functionality
 */
// @ts-nocheck


import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Alert,
  LinearProgress,
  Snackbar,
  Divider,
} from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { useStorageControls } from '../../hooks/useStorageControls';
import { StorageStatusIndicator } from './storage/StorageStatusIndicator';
import { AutoSaveControls } from './storage/AutoSaveControls';
import { ManualSaveControls } from './storage/ManualSaveControls';
import { ImportExportControls } from './storage/ImportExportControls';
import { StorageStatsDialog } from './storage/StorageStatsDialog';

interface StorageControlsProps {
  currentProjectId?: string;
  onProjectLoad?: (projectId: string) => void;
}

export const StorageControls: React.FC<StorageControlsProps> = ({
  currentProjectId,
  onProjectLoad,
}) => {
  const { storage, state, handlers, fileInputRef } = useStorageControls(
    currentProjectId,
    onProjectLoad
  );

  return (
    <Box>
      {/* Hidden file input for import */}
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept='.json'
        onChange={handlers.handleFileSelected}
      />

      {/* Main Storage Card */}
      <Card>
        <CardHeader
          title='Storage Controls'
          action={
            <StorageStatusIndicator
              isInitialized={storage.isInitialized}
              isLoading={storage.isLoading}
              error={storage.error}
              autoSaveEnabled={storage.autoSave.enabled}
              hasPendingChanges={storage.autoSave.hasPendingChanges}
            />
          }
          avatar={<SettingsIcon />}
        />
        <CardContent>
          {/* Error Display */}
          {storage.error && (
            <Alert severity='error' onClose={storage.clearError} sx={{ mb: 2 }}>
              {storage.error}
            </Alert>
          )}

          {/* Loading Indicator */}
          {storage.isLoading && <LinearProgress sx={{ mb: 2 }} />}

          {/* Auto-save Controls */}
          <Box sx={{ mb: 3 }}>
            <AutoSaveControls
              enabled={storage.autoSave.enabled}
              onToggle={handlers.handleAutoSaveToggle}
              lastSaveTime={storage.autoSave.lastSaveTime}
              hasPendingChanges={storage.autoSave.hasPendingChanges}
              disabled={!storage.isInitialized}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Manual Save Controls */}
          <Box sx={{ mb: 3 }}>
            <ManualSaveControls
              onSave={handlers.handleSave}
              onForceSave={handlers.handleForceSave}
              disabled={!storage.isInitialized}
              isLoading={storage.isLoading}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Import/Export Controls */}
          <Box sx={{ mb: 3 }}>
            <ImportExportControls
              onImportClick={handlers.handleImportClick}
              onExportClick={() => handlers.setShowExportDialog(true)}
              onBackupExport={handlers.handleBackupExport}
              onShowStats={handlers.handleShowStats}
              disabled={!storage.isInitialized}
              isLoading={storage.isLoading}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Storage Stats Dialog */}
      <StorageStatsDialog
        open={state.showStats}
        onClose={() => handlers.setShowStats(false)}
        storageStats={state.storageStats}
      />

      {/* Snackbar for notifications */}
      <Snackbar open={state.snackbar.open} autoHideDuration={6000} onClose={handlers.closeSnackbar}>
        <Alert onClose={handlers.closeSnackbar} severity={state.snackbar.severity}>
          {state.snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
