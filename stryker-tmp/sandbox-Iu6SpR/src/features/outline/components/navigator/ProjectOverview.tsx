// @ts-nocheck
import React from 'react';
import { Box, Paper, Grid, Typography } from '@mui/material';

interface ProjectOverviewProps {
  stats: {
    charactersCount: number;
    relationshipsCount: number;
    chaptersCount: number;
    ideasCount: number;
  };
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ stats }) => {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant='h6' gutterBottom>
        项目概览
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h4' color='primary'>
              {stats.charactersCount}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              角色
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h4' color='secondary'>
              {stats.relationshipsCount}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              关系
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h4' color='success.main'>
              {stats.chaptersCount}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              章节
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h4' color='warning.main'>
              {stats.ideasCount}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              创意
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProjectOverview;
