import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

interface SynopsisProgressBarProps {
  completionRate: number;
}

export const SynopsisProgressBar: React.FC<SynopsisProgressBarProps> = ({ completionRate }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <LinearProgress
        variant='determinate'
        value={completionRate}
        sx={{ height: 8, borderRadius: 4 }}
      />
    </Box>
  );
};
