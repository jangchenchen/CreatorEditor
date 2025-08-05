import { useState } from 'react';
import { SecondaryCharacterStory } from '../../../../types/outline.types';

export const useStoryState = () => {
  const [editingStory, setEditingStory] = useState<SecondaryCharacterStory | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<SecondaryCharacterStory>>({});

  const handleOpenDialog = (story?: SecondaryCharacterStory) => {
    setEditingStory(story || null);
    setFormData(story ? { ...story } : {
      characterId: '',
      personalGoal: '',
      backstory: '',
      developmentArc: '',
      resolutionMethod: ''
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingStory(null);
    setFormData({});
  };

  const handleFormChange = (field: keyof SecondaryCharacterStory) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const setFormDataField = (field: keyof SecondaryCharacterStory, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    editingStory,
    dialogOpen,
    formData,
    handleOpenDialog,
    handleCloseDialog,
    handleFormChange,
    setFormDataField
  };
};