import { useState } from 'react';
import { CreativeIdea } from '../../../../types/outline.types';

export const useIdeaDialog = () => {
  const [editingIdea, setEditingIdea] = useState<CreativeIdea | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<CreativeIdea>>({});

  const handleOpenDialog = (idea?: CreativeIdea) => {
    setEditingIdea(idea || null);
    setFormData(
      idea
        ? { ...idea }
        : {
            type: 'inspiration',
            title: '',
            content: '',
            relatedModule: '',
            relatedElements: [],
            priority: 3,
            status: 'draft',
            tags: [],
            inspiration: '',
            potentialImpact: '',
          }
    );
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingIdea(null);
    setFormData({});
  };

  const handleFormChange =
    (field: keyof CreativeIdea) =>
    (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleArrayFieldChange =
    (field: keyof Pick<CreativeIdea, 'relatedElements' | 'tags'>) =>
    (event: any, newValue: string[]) => {
      setFormData(prev => ({
        ...prev,
        [field]: newValue,
      }));
    };

  const handlePriorityChange = (priority: number) => {
    setFormData(prev => ({ ...prev, priority }));
  };

  return {
    editingIdea,
    dialogOpen,
    formData,
    handleOpenDialog,
    handleCloseDialog,
    handleFormChange,
    handleArrayFieldChange,
    handlePriorityChange,
  };
};
