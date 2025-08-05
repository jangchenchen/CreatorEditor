import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface MotivationToolbarProps {
  onAddMotivation: () => void;
}

const MotivationToolbar: React.FC<MotivationToolbarProps> = ({ onAddMotivation }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h6">
        角色动机列表
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddMotivation}
      >
        添加角色动机
      </Button>
    </Box>
  );
};

export default MotivationToolbar;