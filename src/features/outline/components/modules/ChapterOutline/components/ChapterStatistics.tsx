import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { Chapter } from '../../../../types/outline.types';

interface ChapterStatisticsProps {
  chapters: Chapter[];
}

const ChapterStatistics: React.FC<ChapterStatisticsProps> = ({ chapters }) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6} sm={3}>
          <Typography variant="h4" color="primary">
            {chapters.length}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            总章节数
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="h4" color="success.main">
            {chapters.filter(c => c.status === 'completed').length}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            已完成
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="h4" color="primary.main">
            {chapters.filter(c => c.status === 'writing').length}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            写作中
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="h4" color="text.secondary">
            {chapters.reduce((sum, c) => sum + c.wordCountTarget, 0).toLocaleString()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            目标字数
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChapterStatistics;