/**
 * Strategy Templates Component
 * Shows reference templates for weaving strategies
 */

import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material';

export const StrategyTemplates: React.FC = () => {
  return (
    <Card elevation={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          编织策略模板参考
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              并行推进型
            </Typography>
            <Typography variant="body2" color="text.secondary">
              主副线同时推进，定期交汇互动。适合情节复杂、角色众多的长篇作品。
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              穿插调节型
            </Typography>
            <Typography variant="body2" color="text.secondary">
              在主线紧张时插入副线缓解，在主线平缓时用副线增加波澜。
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              层层揭示型
            </Typography>
            <Typography variant="body2" color="text.secondary">
              副线逐步揭示主线的深层背景，最终汇合形成完整真相。
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              对比映衬型
            </Typography>
            <Typography variant="body2" color="text.secondary">
              副线通过对比或映衬来突出主线的主题和角色特征。
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};