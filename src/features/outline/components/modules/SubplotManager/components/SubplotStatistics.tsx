import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Subplot } from '../../../../types/outline.types';

interface SubplotStatisticsProps {
  subplots: Subplot[];
}

const SubplotStatistics: React.FC<SubplotStatisticsProps> = ({ subplots }) => {
  const activeCount = subplots.filter(s => s.status === 'active').length;
  const resolvedCount = subplots.filter(s => s.status === 'resolved').length;
  const plannedCount = subplots.filter(s => s.status === 'planned').length;

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6} sm={3}>
          <Typography variant="h4" color="primary">
            {subplots.length}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            总副线数
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="h4" color="primary.main">
            {activeCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            进行中
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="h4" color="success.main">
            {resolvedCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            已完成
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="h4" color="text.secondary">
            {plannedCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            计划中
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SubplotStatistics;