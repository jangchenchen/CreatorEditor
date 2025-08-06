/**
 * Weaving Strategy Guide Component
 * Provides guidance for subplot weaving
 */

import React from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';

export const WeavingStrategyGuide: React.FC = () => {
  return (
    <Card elevation={1}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          副线编织策略指南
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              整合方式
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <strong>平行发展：</strong>多条线同时推进，保持独立性
              <br />
              <strong>交叉穿插：</strong>在不同章节交替出现
              <br />
              <strong>嵌套式：</strong>一条线包含另一条线
              <br />
              <strong>汇聚式：</strong>最终汇聚到主线
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              节奏控制
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <strong>均匀分布：</strong>每章副线数量相近
              <br />
              <strong>交替突出：</strong>轮流强调不同副线
              <br />
              <strong>高潮集中：</strong>关键章节副线密集
              <br />
              <strong>波浪式：</strong>疏密相间分布
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              连接技巧
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              • 使用相同的人物或事件作为桥梁
              <br />
              • 通过场景转换自然过渡
              <br />
              • 利用时间跳跃制造悬念
              <br />• 设置伏笔增强关联性
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='primary' gutterBottom>
              避免问题
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              • 某些章节副线过于密集
              <br />
              • 副线长时间不出现
              <br />
              • 副线之间缺乏联系
              <br />• 副线喧宾夺主
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
