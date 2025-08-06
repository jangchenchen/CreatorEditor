// @ts-nocheck
import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Chapter } from '../../../../types/outline.types';

interface ChapterInfoPanelProps {
  chapter: Chapter;
  onAddScene: () => void;
}

const ChapterInfoPanel: React.FC<ChapterInfoPanelProps> = ({ chapter, onAddScene }) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <Typography variant='h6' gutterBottom>
        第{chapter.number}章: {chapter.title}
      </Typography>
      <Typography variant='body2' color='text.secondary' paragraph>
        {chapter.summary || '暂无概述'}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='body2'>当前场景数: {chapter.keyScenes.length}</Typography>
        <Button variant='contained' startIcon={<AddIcon />} onClick={onAddScene} size='small'>
          添加场景
        </Button>
      </Box>
    </Paper>
  );
};

export default ChapterInfoPanel;
