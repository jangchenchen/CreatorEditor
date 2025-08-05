import React from 'react';
import { Paper, Grid, Typography } from '@mui/material';

interface AlternativeStatisticsProps {
  alternativeCount: number;
}

const AlternativeStatistics: React.FC<AlternativeStatisticsProps> = ({ alternativeCount }) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h4" color="primary">
            {alternativeCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            替代方案总数
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body2" color="text.secondary">
            通过比较不同的情节发展可能性，选择最适合故事整体结构的方案。
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AlternativeStatistics;