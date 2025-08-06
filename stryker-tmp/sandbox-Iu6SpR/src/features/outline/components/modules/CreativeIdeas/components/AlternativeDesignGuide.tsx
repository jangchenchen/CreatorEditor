// @ts-nocheck
import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const AlternativeDesignGuide: React.FC = () => {
  return (
    <Card elevation={1}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          情节替代方案设计指南
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              关键节点
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              重点为故事的关键转折点设计替代方案，这些地方的选择往往决定整个故事的走向。
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              全面分析
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              客观分析每个方案的优缺点，考虑对角色发展、主题表达、读者体验的不同影响。
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              逻辑一致
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              确保替代方案与已建立的世界观、角色设定、前期铺垫保持逻辑一致性。
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              读者预期
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              考虑不同方案对读者预期的影响，选择既能满足又能适度超越预期的发展。
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AlternativeDesignGuide;
