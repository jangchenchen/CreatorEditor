import { useState } from 'react';
import { PlotAlternative } from '../../../../types/outline.types';
import {
  initializeAlternativeFormData,
  updateListField,
  addListItem,
  removeListItem,
} from '../utils/alternativeUtils';

export const useAlternativeState = () => {
  const [editingAlternative, setEditingAlternative] = useState<PlotAlternative | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<PlotAlternative>>({});

  const handleOpenDialog = (alternative?: PlotAlternative) => {
    setEditingAlternative(alternative || null);
    setFormData(initializeAlternativeFormData(alternative));
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingAlternative(null);
    setFormData({});
  };

  const handleFormChange =
    (field: keyof PlotAlternative) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleListFieldChange = (field: 'pros' | 'cons', index: number, value: string) => {
    setFormData(prev => updateListField(prev, field, index, value));
  };

  const handleAddListItem = (field: 'pros' | 'cons') => {
    setFormData(prev => addListItem(prev, field));
  };

  const handleRemoveListItem = (field: 'pros' | 'cons', index: number) => {
    setFormData(prev => removeListItem(prev, field, index));
  };

  return {
    editingAlternative,
    dialogOpen,
    formData,
    handleOpenDialog,
    handleCloseDialog,
    handleFormChange,
    handleListFieldChange,
    handleAddListItem,
    handleRemoveListItem,
  };
};
