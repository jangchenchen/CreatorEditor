import React from 'react';
import { Card, CardContent, CardHeader, Grid, Typography, Chip, Box } from '@mui/material';

export const TimelineTemplates: React.FC = () => {
  return (
    <Card elevation={1}>
      <CardHeader title='时间线模板参考' />
      <CardContent>
        <Typography variant='body2' color='text.secondary' paragraph>
          根据不同类型的故事，可以参考以下时间线设计模式：
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Chip label='现实主义小说' color='primary' size='small' sx={{ mb: 1 }} />
              <Typography variant='body2'>
                使用具体的年月日，注意历史背景的准确性，时间跨度可以是几年到几十年。
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Chip label='奇幻/科幻小说' color='secondary' size='small' sx={{ mb: 1 }} />
              <Typography variant='body2'>
                可以创造独特的时间体系，使用虚构的纪年方式或特殊的时间概念。
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Chip label='悬疑推理小说' color='warning' size='small' sx={{ mb: 1 }} />
              <Typography variant='body2'>
                时间线要精确，注意事件的先后顺序，可能需要倒叙或插叙的处理。
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Chip label='历史小说' color='success' size='small' sx={{ mb: 1 }} />
              <Typography variant='body2'>
                严格遵循历史时间线，注意重大历史事件对故事情节的影响。
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
