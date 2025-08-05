/**
 * Social Systems Tips Component
 * Component that provides writing tips for social systems design
 */

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box
} from '@mui/material';

export const SocialSystemsTips: React.FC = () => {
  return (
    <Card sx={{ mt: 3, bgcolor: 'primary.50' }}>
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          💡 社会体系设定提示
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              内在逻辑
            </Typography>
            <Typography variant="body2" color="text.secondary">
              确保各个社会要素之间有合理的内在联系，政治、经济、文化应该相互影响、相互支撑。
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              故事服务
            </Typography>
            <Typography variant="body2" color="text.secondary">
              社会设定应该为故事情节和角色发展服务，重点关注对主线剧情有影响的社会要素。
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              冲突源泉
            </Typography>
            <Typography variant="body2" color="text.secondary">
              社会体系中的矛盾和冲突往往是故事张力的重要来源，可以设计一些不完美或有问题的制度。
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              适度复杂
            </Typography>
            <Typography variant="body2" color="text.secondary">
              避免过度复杂的社会设定，读者需要能够理解和记住这些设定，简洁明了更有效。
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};