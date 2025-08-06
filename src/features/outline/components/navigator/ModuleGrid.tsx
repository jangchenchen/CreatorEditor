import React from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Avatar,
  Divider,
  Box,
} from '@mui/material';
import { modules, getPriorityColor, getPriorityLabel } from './navigatorConstants';
import { OutlineModule } from '../../types/outline.types';

interface ModuleGridProps {
  completionRates: Record<string, number>;
  onModuleClick: (moduleId: OutlineModule) => void;
}

const ModuleGrid: React.FC<ModuleGridProps> = ({ completionRates, onModuleClick }) => {
  return (
    <Grid container spacing={3}>
      {modules.map(module => {
        const completionRate = completionRates[module.id] || 0;

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={module.id}>
            <Card sx={{ height: '100%', position: 'relative' }}>
              <CardActionArea
                onClick={() => onModuleClick(module.id)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                }}
              >
                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  {/* 优先级标签 */}
                  <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <Chip
                      label={getPriorityLabel(module.priority)}
                      color={getPriorityColor(module.priority) as any}
                      size='small'
                      variant='outlined'
                    />
                  </Box>

                  {/* 模块图标 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 1 }}>
                    <Avatar
                      sx={{
                        bgcolor: module.color,
                        mr: 2,
                        width: 48,
                        height: 48,
                      }}
                    >
                      {module.icon}
                    </Avatar>
                    <Typography variant='h6' component='h3' sx={{ flexGrow: 1 }}>
                      {module.title}
                    </Typography>
                  </Box>

                  {/* 模块描述 */}
                  <Typography variant='body2' color='text.secondary' sx={{ mb: 2, minHeight: 40 }}>
                    {module.description}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  {/* 完成度 */}
                  <Box sx={{ mt: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 0.5,
                      }}
                    >
                      <Typography variant='body2' color='text.secondary'>
                        完成度
                      </Typography>
                      <Typography variant='body2' fontWeight='bold'>
                        {completionRate}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant='determinate'
                      value={completionRate}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                      }}
                    />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ModuleGrid;
