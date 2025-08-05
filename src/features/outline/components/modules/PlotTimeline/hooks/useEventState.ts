import { useState } from 'react';
import { PlotEvent } from '../../../../types/outline.types';
import { initializeEventFormData } from '../utils/eventUtils';

export const useEventState = () => {
  const [editingEvent, setEditingEvent] = useState<PlotEvent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<PlotEvent>>({});

  const handleOpenDialog = (event?: PlotEvent) => {
    setEditingEvent(event || null);
    setFormData(initializeEventFormData(event));
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingEvent(null);
    setFormData({});
  };

  const handleFormChange = (field: keyof PlotEvent) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleArrayFieldChange = (field: keyof Pick<PlotEvent, 'characters' | 'locations' | 'consequences' | 'relatedEvents' | 'tags'>) => (
    event: any,
    newValue: string[]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: newValue
    }));
  };

  const handleSwitchChange = (field: keyof PlotEvent) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked
    }));
  };

  return {
    editingEvent,
    dialogOpen,
    formData,
    setFormData,
    handleOpenDialog,
    handleCloseDialog,
    handleFormChange,
    handleArrayFieldChange,
    handleSwitchChange
  };
};