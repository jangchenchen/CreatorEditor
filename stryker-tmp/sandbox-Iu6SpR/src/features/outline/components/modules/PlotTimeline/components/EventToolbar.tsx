// @ts-nocheck
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface EventToolbarProps {
  eventCount: number;
  onAddEvent: () => void;
}

const EventToolbar: React.FC<EventToolbarProps> = ({ eventCount, onAddEvent }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant='h6'>事件管理 ({eventCount} 个事件)</Typography>
      <Button variant='contained' startIcon={<AddIcon />} onClick={onAddEvent}>
        添加事件
      </Button>
    </Box>
  );
};

export default EventToolbar;
