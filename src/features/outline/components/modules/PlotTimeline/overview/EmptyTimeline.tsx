import React from 'react';
import { Box, Typography } from '@mui/material';

interface EmptyTimelineProps {
  onAddEvent?: () => void;
}

export const EmptyTimeline: React.FC<EmptyTimelineProps> = ({ onAddEvent }) => {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant='h6' color='text.secondary' gutterBottom>
        暂无情节事件
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        点击上方的"添加事件"按钮开始创建您的故事时间线
      </Typography>
    </Box>
  );
};
