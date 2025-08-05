/**
 * Import Export Controls
 * Component for import/export operations
 */

import React from 'react';
import {
  Box,
  Button,
  Typography
} from '@mui/material';
import {
  CloudDownload as ImportIcon,
  CloudUpload as ExportIcon,
  Backup as BackupIcon,
  Info as InfoIcon
} from '@mui/icons-material';

interface ImportExportControlsProps {
  onImportClick: () => void;
  onExportClick: () => void;
  onBackupExport: () => void;
  onShowStats: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const ImportExportControls: React.FC<ImportExportControlsProps> = ({
  onImportClick,
  onExportClick,
  onBackupExport,
  onShowStats,
  disabled = false,
  isLoading = false
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Import/Export
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          startIcon={<ImportIcon />}
          onClick={onImportClick}
          disabled={disabled || isLoading}
        >
          Import Project
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<ExportIcon />}
          onClick={onExportClick}
          disabled={disabled || isLoading}
        >
          Export Project
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<BackupIcon />}
          onClick={onBackupExport}
          disabled={disabled || isLoading}
        >
          Create Backup
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<InfoIcon />}
          onClick={onShowStats}
          disabled={disabled || isLoading}
        >
          Storage Info
        </Button>
      </Box>
    </Box>
  );
};