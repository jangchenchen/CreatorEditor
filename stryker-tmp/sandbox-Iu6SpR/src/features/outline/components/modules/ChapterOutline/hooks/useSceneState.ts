// @ts-nocheck
import { useState, useMemo } from 'react';
import { Scene, Chapter } from '../../../../types/outline.types';
import { initializeSceneFormData } from '../utils/sceneUtils';

export const useSceneState = (chapters: Chapter[]) => {
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [editingScene, setEditingScene] = useState<Scene | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Scene>>({});

  // Get currently selected chapter
  const currentChapter = useMemo(() => {
    return chapters.find(c => c.id === selectedChapter);
  }, [chapters, selectedChapter]);

  const handleOpenDialog = (scene?: Scene) => {
    setEditingScene(scene || null);
    setFormData(initializeSceneFormData(scene));
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingScene(null);
    setFormData({});
  };

  const handleFormChange = (field: keyof Scene) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleCharactersChange = (event: any, newValue: string[]) => {
    setFormData(prev => ({
      ...prev,
      characters: newValue,
    }));
  };

  const handleChapterChange = (chapterId: string) => {
    setSelectedChapter(chapterId);
    // Close dialog if open when switching chapters
    if (dialogOpen) {
      handleCloseDialog();
    }
  };

  return {
    selectedChapter,
    currentChapter,
    editingScene,
    dialogOpen,
    formData,
    handleChapterChange,
    handleOpenDialog,
    handleCloseDialog,
    handleFormChange,
    handleCharactersChange,
    setFormData,
  };
};
