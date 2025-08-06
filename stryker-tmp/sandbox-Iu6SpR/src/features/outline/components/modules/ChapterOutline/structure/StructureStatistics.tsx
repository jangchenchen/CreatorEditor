// @ts-nocheck
import React from 'react';
import { Box, Grid, Paper, Typography, LinearProgress } from '@mui/material';
import { AccountTree as StructureIcon } from '@mui/icons-material';
import { StructureStatistics as StatisticsType } from './useStructureOverview';

interface StructureStatisticsProps {
  statistics: StatisticsType;
}

const StructureStatistics: React.FC<StructureStatisticsProps> = ({ statistics }) => {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant='h6' gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <StructureIcon sx={{ mr: 1 }} />
        小说结构统计
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h3' color='primary'>
              {statistics.totalChapters}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              总章节数
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h3' color='info.main'>
              {statistics.totalScenes}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              总场景数
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h3' color='secondary'>
              {statistics.totalTargetWords.toLocaleString()}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              目标字数
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h3' color='success.main'>
              {statistics.completionRate}%
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              完成度
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* 进度条 */}
      <Box sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant='body2' color='text.secondary'>
            整体进度
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {statistics.completedChapters}/{statistics.totalChapters} 章节完成
          </Typography>
        </Box>
        <LinearProgress
          variant='determinate'
          value={statistics.completionRate}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>
    </Paper>
  );
};

export default StructureStatistics;
