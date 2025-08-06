// @ts-nocheck
import React from 'react';
import { Grid, Typography, Card, CardContent, Divider } from '@mui/material';

const DesignTips: React.FC = () => {
  return (
    <>
      <Divider sx={{ my: 3 }} />

      <Card elevation={1}>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            世界历史设计建议
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2' color='primary' gutterBottom>
                故事关联性
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                历史设定应该与当前故事情节有关联，可以作为背景解释、伏笔铺垫或冲突根源。
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2' color='primary' gutterBottom>
                层次丰富
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                结合真实历史事件、传说故事和神秘元素，创造有深度的世界背景。
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2' color='primary' gutterBottom>
                适度神秘
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                保留一些未解之谜和模糊地带，给读者想象空间，也为后续情节发展留下可能。
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2' color='primary' gutterBottom>
                时间跨度
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                历史事件的时间跨度要合理，考虑文明发展的自然规律和逻辑性。
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default DesignTips;
