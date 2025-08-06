// @ts-nocheck
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  History as HistoryIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';
import { HistoricalEvent } from '../../../../types/outline.types';

interface HistoricalTimelineProps {
  timeline: HistoricalEvent[];
  onAddEvent: () => void;
  onEditEvent: (event: HistoricalEvent) => void;
  onDeleteEvent: (eventId: string) => void;
}

const HistoricalTimeline: React.FC<HistoricalTimelineProps> = ({
  timeline,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) => {
  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm('确定要删除这个历史事件吗？')) {
      onDeleteEvent(eventId);
    }
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
          <HistoryIcon sx={{ mr: 1, color: 'primary.main' }} />
          历史时间线 ({timeline.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant='body2' color='text.secondary'>
            按时间顺序记录重要的历史事件
          </Typography>
          <Button variant='contained' startIcon={<AddIcon />} onClick={onAddEvent} size='small'>
            添加事件
          </Button>
        </Box>

        {timeline.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
            <Typography variant='body2' color='text.secondary'>
              暂无历史事件，点击上方按钮添加第一个事件
            </Typography>
          </Paper>
        ) : (
          <Timeline>
            {timeline.map((event, index) => (
              <TimelineItem key={event.id}>
                <TimelineSeparator>
                  <TimelineDot color='primary'>
                    <CircleIcon />
                  </TimelineDot>
                  {index < timeline.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Card variant='outlined' sx={{ mb: 1 }}>
                    <CardContent>
                      <Typography variant='h6' gutterBottom>
                        {event.name}
                      </Typography>
                      <Typography variant='caption' color='primary' display='block' gutterBottom>
                        {event.period}
                      </Typography>
                      <Typography variant='body2' paragraph>
                        {event.description}
                      </Typography>
                      {event.impact && (
                        <Typography variant='body2' color='text.secondary'>
                          影响: {event.impact}
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions>
                      <IconButton size='small' onClick={() => onEditEvent(event)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size='small'
                        color='error'
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default HistoricalTimeline;
