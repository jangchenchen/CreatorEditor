import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export const NoChapterSelectedState: React.FC = () => (
  <Card>
    <CardContent sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant='h6' color='text.secondary' gutterBottom>
        请先选择一个章节
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        选择章节后即可编辑该章节的场景内容
      </Typography>
    </CardContent>
  </Card>
);

export const ChapterNotFoundState: React.FC = () => (
  <Card>
    <CardContent sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant='h6' color='text.secondary'>
        章节不存在
      </Typography>
    </CardContent>
  </Card>
);
