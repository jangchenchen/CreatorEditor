// @ts-nocheck
import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const AnalysisGuide: React.FC = () => {
  return (
    <Card elevation={1}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          角色动机分析要点
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              内在逻辑
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              角色的行为应该有内在的心理逻辑支撑，动机要合理且符合角色性格。
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              成长弧线
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              设计完整的角色成长轨迹，从初始状态到最终变化要有清晰的发展过程。
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              冲突推动
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              内在冲突是角色发展的动力，也是创造戏剧张力的重要来源。
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              层次丰富
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              避免角色过于单一，给予复杂的内心世界和多层次的动机。
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AnalysisGuide;
