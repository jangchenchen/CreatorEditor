/**
 * Auto Save Controls
 * Component for managing auto-save settings and status
 */

import React from 'react';
import { Box, Typography, FormControlLabel, Switch } from '@mui/material';
import { formatLastSaveTime } from '../../utils/storageControlsUtils';

interface AutoSaveControlsProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  lastSaveTime?: string | Date | null;
  hasPendingChanges: boolean;
  disabled?: boolean;
}

export const AutoSaveControls: React.FC<AutoSaveControlsProps> = ({
  enabled,
  onToggle,
  lastSaveTime,
  hasPendingChanges,
  disabled = false,
}) => {
  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Auto-save
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={enabled}
            onChange={e => onToggle(e.target.checked)}
            disabled={disabled}
          />
        }
        label='Enable automatic saving'
      />

      {enabled && (
        <Box sx={{ mt: 1 }}>
          <Typography variant='body2' color='text.secondary'>
            Last saved: {formatLastSaveTime(lastSaveTime)}
          </Typography>
          {hasPendingChanges && (
            <Typography variant='body2' color='warning.main'>
              Unsaved changes pending
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
