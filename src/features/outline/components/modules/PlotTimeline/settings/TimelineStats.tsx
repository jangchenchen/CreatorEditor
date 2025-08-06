import React from 'react';
import { Card, CardContent, CardHeader, Grid, Paper, Typography } from '@mui/material';
import { Timeline as TimelineIcon } from '@mui/icons-material';

interface TimelineStatsProps {
  totalEvents: number;
  keyEvents: number;
}

export const TimelineStats: React.FC<TimelineStatsProps> = ({ totalEvents, keyEvents }) => {
  return (
    <Card elevation={2}>
      <CardHeader
        avatar={<TimelineIcon color='primary' />}
        title='时间线统计'
        subheader='当前时间线的基本信息'
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant='h3' color='primary'>
                {totalEvents}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                总事件数量
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant='h3' color='secondary'>
                {keyEvents}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                关键事件数量
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
