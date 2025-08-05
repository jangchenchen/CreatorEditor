import React from 'react';
import { Chip, Typography, Box, LinearProgress } from '@mui/material';

interface SynopsisHeaderProps {
  completionRate: number;
}

export const SynopsisHeader: React.FC<SynopsisHeaderProps> = ({ completionRate }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        故事梗概
      </Typography>
      <Chip 
        label={`完成度: ${completionRate}%`}
        color={completionRate >= 80 ? 'success' : completionRate >= 40 ? 'warning' : 'default'}
        size="small"
      />
    </Box>
  );
};