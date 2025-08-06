import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import {
  selectPlotEvents,
  selectCharacters,
  addPlotEvent,
  updatePlotEvent,
  deletePlotEvent,
} from '../../../outlineSlice';
import { PlotEvent } from '../../../types/outline.types';
import EventToolbar from './components/EventToolbar';
import EventTimeline from './components/EventTimeline';
import EventEditDialog from './components/EventEditDialog';
import { useEventState } from './hooks/useEventState';

const EventManagement: React.FC = () => {
  const dispatch = useDispatch();
  const plotEvents = useSelector(selectPlotEvents);
  const characters = useSelector(selectCharacters);

  const {
    editingEvent,
    dialogOpen,
    formData,
    handleOpenDialog,
    handleCloseDialog,
    handleFormChange,
    handleArrayFieldChange,
    handleSwitchChange,
  } = useEventState();

  const handleSaveEvent = () => {
    const eventData: PlotEvent = {
      id: editingEvent?.id || `event-${Date.now()}`,
      timestamp: formData.timestamp || '',
      title: formData.title || '',
      description: formData.description || '',
      type: formData.type || 'development',
      importance: formData.importance || 'important',
      isKeyEvent: formData.isKeyEvent || false,
      characters: formData.characters || [],
      locations: formData.locations || [],
      impact: formData.impact || '',
      consequences: formData.consequences || [],
      relatedEvents: formData.relatedEvents || [],
      tags: formData.tags || [],
    };

    if (editingEvent) {
      dispatch(updatePlotEvent(eventData));
    } else {
      dispatch(addPlotEvent(eventData));
    }

    handleCloseDialog();
  };

  const handleDeleteEvent = (eventId: string) => {
    dispatch(deletePlotEvent(eventId));
  };

  return (
    <Box sx={{ height: '100%' }}>
      <EventToolbar eventCount={plotEvents.length} onAddEvent={() => handleOpenDialog()} />

      <EventTimeline
        plotEvents={plotEvents}
        characters={characters}
        onEdit={handleOpenDialog}
        onDelete={handleDeleteEvent}
        onAddEvent={() => handleOpenDialog()}
      />

      <EventEditDialog
        open={dialogOpen}
        editingEvent={editingEvent}
        formData={formData}
        characters={characters}
        onClose={handleCloseDialog}
        onSave={handleSaveEvent}
        onFormChange={handleFormChange}
        onArrayFieldChange={handleArrayFieldChange}
        onSwitchChange={handleSwitchChange}
      />
    </Box>
  );
};

export default EventManagement;
