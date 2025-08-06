// @ts-nocheck
import React from 'react';
import { Box, Button } from '@mui/material';
import { Save as SaveIcon, Refresh as RefreshIcon } from '@mui/icons-material';

interface ActionButtonsProps {
  onSave: () => void;
  onReset: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onSave, onReset }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
      <Button variant='contained' startIcon={<SaveIcon />} onClick={onSave}>
        保存设置
      </Button>
      <Button variant='outlined' startIcon={<RefreshIcon />} onClick={onReset}>
        重置设置
      </Button>
    </Box>
  );
};
