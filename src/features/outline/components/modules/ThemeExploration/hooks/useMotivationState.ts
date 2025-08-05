import { useState } from 'react';
import { CharacterMotivation } from '../../../../types/outline.types';

export const useMotivationState = () => {
  const [editingMotivation, setEditingMotivation] = useState<CharacterMotivation | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<CharacterMotivation>>({});
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('');

  const handleOpenDialog = (motivation?: CharacterMotivation) => {
    setEditingMotivation(motivation || null);
    setFormData(motivation ? { ...motivation } : {
      characterId: '',
      innerConflict: '',
      growthMotivation: '',
      emotionalJourney: '',
      moralDilemma: '',
      resolution: ''
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingMotivation(null);
    setFormData({});
  };

  const handleFormChange = (field: keyof CharacterMotivation) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  return {
    editingMotivation,
    dialogOpen,
    formData,
    selectedCharacterId,
    setSelectedCharacterId,
    handleOpenDialog,
    handleCloseDialog,
    handleFormChange
  };
};