// @ts-nocheck
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface SubplotToolbarProps {
  onAddSubplot: () => void;
}

const SubplotToolbar: React.FC<SubplotToolbarProps> = ({ onAddSubplot }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant='h6'>副线情节列表</Typography>
      <Button variant='contained' startIcon={<AddIcon />} onClick={onAddSubplot}>
        添加副线
      </Button>
    </Box>
  );
};

export default SubplotToolbar;
