import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider
} from '@mui/material';
import { brainstormingTechniques } from './constants';

export const BrainstormingTechniquesGuide: React.FC = () => {
  return (
    <Card elevation={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          头脑风暴技巧指南
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          有效的头脑风暴能够激发创意思维，以下技巧可以帮助您获得更多灵感：
        </Typography>
        
        <Grid container spacing={2}>
          {brainstormingTechniques.map((technique, index) => {
            const [title, description] = technique.split('：');
            return (
              <Grid item xs={12} sm={6} key={index}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent sx={{ py: 2 }}>
                    <Typography variant="body2">
                      <strong>{title}：</strong>
                      {description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" color="primary" gutterBottom>
          💡 创意管理建议
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          • 定期回顾和整理灵感来源，发现创作偏好和灵感模式<br/>
          • 保持开放的心态，从各种媒介和日常生活中寻找灵感<br/>
          • 及时记录灵感闪现，不要依赖记忆保存重要想法<br/>
          • 建立个人的创意素材库，分类管理不同类型的灵感<br/>
          • 定期进行头脑风暴练习，保持创意思维的活跃状态
        </Typography>
      </CardContent>
    </Card>
  );
};