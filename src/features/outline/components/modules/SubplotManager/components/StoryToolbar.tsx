import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface StoryToolbarProps {
  onAddStory: () => void;
}

const StoryToolbar: React.FC<StoryToolbarProps> = ({ onAddStory }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant='h6'>配角故事线</Typography>
      <Button variant='contained' startIcon={<AddIcon />} onClick={onAddStory}>
        添加故事线
      </Button>
    </Box>
  );
};

export default StoryToolbar;
