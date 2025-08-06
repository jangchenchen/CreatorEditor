// @ts-nocheck
import { useState } from 'react';
import { Subplot } from '../../../../types/outline.types';

export const useSubplotState = () => {
  const [editingSubplot, setEditingSubplot] = useState<Subplot | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Subplot>>({});

  const handleOpenDialog = (subplot?: Subplot) => {
    setEditingSubplot(subplot || null);
    setFormData(
      subplot
        ? { ...subplot }
        : {
            title: '',
            description: '',
            purpose: 'background',
            status: 'planned',
            relatedCharacters: [],
            startChapter: 1,
            endChapter: 1,
            connection: '',
            resolution: '',
            impact: '',
          }
    );
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingSubplot(null);
    setFormData({});
  };

  const handleFormChange =
    (field: keyof Subplot) => (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleCharactersChange = (event: any, newValue: string[]) => {
    setFormData(prev => ({
      ...prev,
      relatedCharacters: newValue,
    }));
  };

  return {
    editingSubplot,
    dialogOpen,
    formData,
    handleOpenDialog,
    handleCloseDialog,
    handleFormChange,
    handleCharactersChange,
  };
};
