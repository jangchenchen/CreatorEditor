import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { PlotEvent, PlotEventType, Character } from '../../../../types/outline.types';
import { getEventTypeColor, groupEventsByType } from '../utils/eventUtils';
import EventCard from './EventCard';

interface EventTimelineProps {
  plotEvents: PlotEvent[];
  characters: Character[];
  onEdit: (event: PlotEvent) => void;
  onDelete: (eventId: string) => void;
  onAddEvent: () => void;
}

const EventTimeline: React.FC<EventTimelineProps> = ({
  plotEvents,
  characters,
  onEdit,
  onDelete,
  onAddEvent
}) => {
  const eventsByType = groupEventsByType(plotEvents);

  if (Object.keys(eventsByType).length === 0) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            暂无情节事件
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            开始添加情节事件来构建您的故事时间线
          </Typography>
          <Button variant="outlined" onClick={onAddEvent}>
            添加第一个事件
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {Object.entries(eventsByType).map(([type, events]) => (
        <Accordion key={type} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              <Chip 
                label={type} 
                color={getEventTypeColor(type as PlotEventType)}
                size="small"
                sx={{ mr: 2 }}
              />
              ({events.length} 个事件)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {events.map((event) => (
                <Grid item xs={12} md={6} lg={4} key={event.id}>
                  <EventCard
                    event={event}
                    characters={characters}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default EventTimeline;