// @ts-nocheck
import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { PlotEvent, PlotEventType, EventImportance } from '../../../../../../types/outline.types';
import { TimelineEventNodeProps, DEFAULT_EVENT_COLORS, DEFAULT_EVENT_SIZES } from './types';

export const TimelineEventNode: React.FC<TimelineEventNodeProps> = ({ data, onEventClick }) => {
  const getEventColor = (type: PlotEventType) => {
    return DEFAULT_EVENT_COLORS[type] || '#757575';
  };

  const getImportanceSize = (importance: EventImportance) => {
    return DEFAULT_EVENT_SIZES[importance] || '80px';
  };

  const handleClick = () => {
    if (onEventClick) {
      onEventClick(data);
    }
  };

  return (
    <Card
      elevation={3}
      onClick={handleClick}
      sx={{
        width: getImportanceSize(data.importance),
        border: `3px solid ${getEventColor(data.type)}`,
        borderRadius: 2,
        cursor: 'pointer',
        '&:hover': {
          elevation: 6,
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Typography variant='subtitle2' fontWeight='bold' noWrap>
          {data.title}
        </Typography>
        <Typography variant='caption' color='text.secondary' display='block'>
          {data.timestamp}
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          <Chip
            label={data.type}
            size='small'
            sx={{
              bgcolor: getEventColor(data.type),
              color: 'white',
              fontSize: '0.6rem',
              height: 18,
            }}
          />
          {data.isKeyEvent && (
            <Chip
              label='关键'
              size='small'
              color='secondary'
              sx={{ fontSize: '0.6rem', height: 18 }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
