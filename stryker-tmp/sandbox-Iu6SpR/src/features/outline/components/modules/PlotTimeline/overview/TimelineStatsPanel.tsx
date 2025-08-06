// @ts-nocheck
import React from 'react';
import { Paper, Typography, Grid, Chip, Box } from '@mui/material';
import { TimelineStats } from './types';
import { EVENT_TYPE_LABELS } from './types';

interface TimelineStatsPanelProps {
  stats: TimelineStats;
}

export const TimelineStatsPanel: React.FC<TimelineStatsPanelProps> = ({ stats }) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      <Typography variant='h6' gutterBottom>
        时间线统计
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <Typography variant='h4' color='primary'>
            {stats.total}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            总事件数
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant='h4' color='secondary'>
            {stats.keyEvents}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            关键事件
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {Object.entries(stats.byType).map(([type, count]) => (
              <Chip
                key={type}
                label={`${EVENT_TYPE_LABELS[type as keyof typeof EVENT_TYPE_LABELS] || type}: ${count}`}
                size='small'
                variant='outlined'
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
