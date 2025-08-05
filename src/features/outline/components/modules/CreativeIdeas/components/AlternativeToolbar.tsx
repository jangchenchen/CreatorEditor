import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface AlternativeToolbarProps {
  onAddAlternative: () => void;
}

const AlternativeToolbar: React.FC<AlternativeToolbarProps> = ({ onAddAlternative }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h6">
        情节替代方案
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddAlternative}
      >
        添加替代方案
      </Button>
    </Box>
  );
};

export default AlternativeToolbar;