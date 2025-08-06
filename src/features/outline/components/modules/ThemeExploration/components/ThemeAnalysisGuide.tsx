/**
 * Theme Analysis Guide Component
 * Provides guidance for theme analysis
 */

import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';

export const ThemeAnalysisGuide: React.FC = () => {
  return (
    <Card elevation={1}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          主题分析要点
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              层次递进
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              从主要主题到次要主题，形成层次清晰的主题体系，避免主题过于分散。
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              表现手法
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              通过象征、隐喻、母题等文学手法来表现主题，增强作品的艺术性和感染力。
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              情节结合
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              主题要与情节发展和角色成长紧密结合，在故事推进中自然展现，避免生硬说教。
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              读者共鸣
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              选择能引起目标读者共鸣的主题，关注当代人关心的话题和价值观念。
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
