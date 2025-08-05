import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { CreativeIdea } from '../../../../types/outline.types';

interface IdeasStatisticsProps {
  ideas: CreativeIdea[];
}

const IdeasStatistics: React.FC<IdeasStatisticsProps> = ({ ideas }) => {
  const adoptedCount = ideas.filter(i => i.status === 'adopted').length;
  const consideringCount = ideas.filter(i => i.status === 'considering').length;
  const highPriorityCount = ideas.filter(i => i.priority >= 4).length;

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6} sm={3}>
          <Typography variant="h4" color="primary">
            {ideas.length}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            总创意数
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="h4" color="success.main">
            {adoptedCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            已采用
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="h4" color="warning.main">
            {consideringCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            考虑中
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="h4" color="secondary.main">
            {highPriorityCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            高优先级
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default IdeasStatistics;