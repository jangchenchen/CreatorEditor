// @ts-nocheck
import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const StoryDesignGuide: React.FC = () => {
  return (
    <Card elevation={1}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          配角故事线设计要点
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              服务主线
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              配角的故事线应该为主线服务，起到补充、对比或推动主线发展的作用。
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              独立完整
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              每个配角都应该有相对完整的故事弧线，有明确的目标、冲突和解决方案。
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              层次分明
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              重要配角的故事线可以更详细，次要角色保持简洁，避免喧宾夺主。
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              情感共鸣
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              配角的经历和成长应该能引起读者的情感共鸣，增加故事的感染力。
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StoryDesignGuide;
