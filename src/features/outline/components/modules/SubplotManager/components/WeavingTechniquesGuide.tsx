/**
 * Weaving Techniques Guide Component
 * Provides guidance for subplot weaving techniques
 */

import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Speed as PaceIcon,
  Balance as BalanceIcon,
  Layers as IntegrationIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

export const WeavingTechniquesGuide: React.FC = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box component='span' sx={{ display: 'flex', alignItems: 'center' }}>
          <IntegrationIcon sx={{ mr: 1, color: 'success.main' }} />
          编织技巧指南
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card variant='outlined' sx={{ height: '100%' }}>
              <CardContent>
                <Typography
                  variant='subtitle1'
                  color='primary'
                  gutterBottom
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <PaceIcon sx={{ mr: 1 }} />
                  节奏控制
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary='交替发展'
                      secondary='主线和副线交替推进，避免某条线索停滞太久'
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary='张弛有度'
                      secondary='在主线高潮时适当缓解，用副线提供喘息空间'
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary='逐步升级'
                      secondary='副线的冲突强度要与主线形成合理的层次关系'
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card variant='outlined' sx={{ height: '100%' }}>
              <CardContent>
                <Typography
                  variant='subtitle1'
                  color='secondary'
                  gutterBottom
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <BalanceIcon sx={{ mr: 1 }} />
                  平衡技巧
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary='权重分配' secondary='主线占60-70%，副线合计占30-40%' />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary='角色轮换'
                      secondary='让不同角色轮流成为焦点，保持读者兴趣'
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary='情感层次' secondary='用副线丰富情感色彩和主题深度' />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card variant='outlined' sx={{ height: '100%' }}>
              <CardContent>
                <Typography
                  variant='subtitle1'
                  color='success.main'
                  gutterBottom
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <IntegrationIcon sx={{ mr: 1 }} />
                  融合策略
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary='共同角色' secondary='通过共同的角色将不同线索连接起来' />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary='事件关联'
                      secondary='让副线事件对主线产生直接或间接影响'
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary='主题呼应' secondary='副线应该呼应或深化主线的核心主题' />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card variant='outlined' sx={{ height: '100%' }}>
              <CardContent>
                <Typography
                  variant='subtitle1'
                  color='warning.main'
                  gutterBottom
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <WarningIcon sx={{ mr: 1 }} />
                  常见问题
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary='喧宾夺主' secondary='副线过于精彩而抢夺主线风头' />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary='脱节断裂' secondary='副线与主线缺乏有机联系，显得突兀' />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary='草草收尾' secondary='副线的解决过于匆忙，缺乏说服力' />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
