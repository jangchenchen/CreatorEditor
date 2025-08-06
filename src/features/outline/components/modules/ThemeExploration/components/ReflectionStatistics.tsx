import React from 'react';
import { Paper, Grid, Typography } from '@mui/material';

interface ReflectionStatisticsProps {
  questionsCount: number;
  commentaryCount: number;
  reflectionsCount: number;
}

const ReflectionStatistics: React.FC<ReflectionStatisticsProps> = ({
  questionsCount,
  commentaryCount,
  reflectionsCount,
}) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={4}>
          <Typography variant='h4' color='primary'>
            {questionsCount}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            哲学问题
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h4' color='secondary'>
            {commentaryCount}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            社会评论
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h4' color='success.main'>
            {reflectionsCount}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            个人反思
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ReflectionStatistics;
