import React from 'react';
import { Paper, Typography, Grid, Box, Chip } from '@mui/material';
import { DEFAULT_EVENT_COLORS, EVENT_TYPE_LABELS } from './types';

interface TimelineLegendProps {
  showSizeLegend?: boolean;
}

export const TimelineLegend: React.FC<TimelineLegendProps> = ({ showSizeLegend = true }) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
      <Typography variant='subtitle2' gutterBottom>
        图例说明
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='caption' display='block' gutterBottom>
            事件类型：
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {Object.entries(EVENT_TYPE_LABELS).map(([type, label]) => (
              <Chip
                key={type}
                label={label}
                size='small'
                sx={{
                  bgcolor: DEFAULT_EVENT_COLORS[type as keyof typeof DEFAULT_EVENT_COLORS],
                  color: 'white',
                }}
              />
            ))}
          </Box>
        </Grid>
        {showSizeLegend && (
          <Grid item xs={12} sm={6}>
            <Typography variant='caption' display='block' gutterBottom>
              重要性：大卡片=关键，中卡片=重要，小卡片=次要
            </Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
