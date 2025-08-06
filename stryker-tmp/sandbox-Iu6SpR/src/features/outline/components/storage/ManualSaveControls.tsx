/**
 * Manual Save Controls
 * Component for manual save operations
 */
// @ts-nocheck


import React from 'react';
import { Box, Button, Typography, Tooltip } from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

interface ManualSaveControlsProps {
  onSave: () => Promise<void>;
  onForceSave: () => Promise<void>;
  disabled?: boolean;
  isLoading?: boolean;
}

export const ManualSaveControls: React.FC<ManualSaveControlsProps> = ({
  onSave,
  onForceSave,
  disabled = false,
  isLoading = false,
}) => {
  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Manual Save
      </Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant='contained'
          startIcon={<SaveIcon />}
          onClick={onSave}
          disabled={disabled || isLoading}
        >
          Save Now
        </Button>

        <Tooltip title='Force immediate save bypassing debounce'>
          <Button
            variant='outlined'
            startIcon={<SaveIcon />}
            onClick={onForceSave}
            disabled={disabled || isLoading}
          >
            Force Save
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};
