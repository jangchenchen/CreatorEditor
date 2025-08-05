import React from 'react';
import { Box, Typography } from '@mui/material';

export const SynopsisTips: React.FC = () => {
  return (
    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
      <Typography variant="caption" color="text.secondary">
        💡 提示："起承转合"是经典的故事结构，确保每个阶段都有明确的目标和推进作用。整体基调将影响读者的情感体验。
      </Typography>
    </Box>
  );
};