import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography
} from '@mui/material';
import { StructureStatistics } from './useStructureOverview';

interface ChapterStatusDistributionProps {
  statistics: StructureStatistics;
}

const ChapterStatusDistribution: React.FC<ChapterStatusDistributionProps> = ({ statistics }) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        章节状态分布
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="h4" color="text.secondary">
              {statistics.plannedChapters}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              计划中
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.50', borderRadius: 1 }}>
            <Typography variant="h4" color="primary">
              {statistics.writingChapters}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              写作中
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.50', borderRadius: 1 }}>
            <Typography variant="h4" color="success.main">
              {statistics.completedChapters}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              已完成
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.50', borderRadius: 1 }}>
            <Typography variant="h4" color="warning.main">
              {statistics.revisionChapters}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              修订中
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChapterStatusDistribution;