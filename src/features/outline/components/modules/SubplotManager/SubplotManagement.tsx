import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import {
  selectOutline,
  selectCharacters
} from '../../../outlineSlice';
import { Subplot } from '../../../types/outline.types';
import { useSubplotState } from './hooks/useSubplotState';
import SubplotStatistics from './components/SubplotStatistics';
import SubplotToolbar from './components/SubplotToolbar';
import SubplotList from './components/SubplotList';
import SubplotEditDialog from './components/SubplotEditDialog';

const SubplotManagement: React.FC = () => {
  const dispatch = useDispatch();
  const outline = useSelector(selectOutline);
  const characters = useSelector(selectCharacters);
  const subplots = outline.subplots.subplots;
  
  const {
    editingSubplot,
    dialogOpen,
    formData,
    handleOpenDialog,
    handleCloseDialog,
    handleFormChange,
    handleCharactersChange
  } = useSubplotState();

  const handleSaveSubplot = () => {
    const subplotData: Subplot = {
      id: editingSubplot?.id || `subplot-${Date.now()}`,
      title: formData.title || '',
      description: formData.description || '',
      purpose: formData.purpose || 'background',
      status: formData.status || 'planned',
      relatedCharacters: formData.relatedCharacters || [],
      startChapter: formData.startChapter || 1,
      endChapter: formData.endChapter || 1,
      connection: formData.connection || '',
      resolution: formData.resolution || '',
      impact: formData.impact || ''
    };

    // TODO: 使用 dispatch 更新 Redux state
    console.log('保存副线情节:', subplotData);
    handleCloseDialog();
  };

  const handleDeleteSubplot = (subplotId: string) => {
    // TODO: 使用 dispatch 更新 Redux state
    console.log('删除副线情节:', subplotId);
  };

  return (
    <Box>
      <SubplotStatistics subplots={subplots} />
      
      <SubplotToolbar onAddSubplot={() => handleOpenDialog()} />

      <SubplotList
        subplots={subplots}
        characters={characters}
        onEdit={handleOpenDialog}
        onDelete={handleDeleteSubplot}
        onAddSubplot={() => handleOpenDialog()}
      />

      <SubplotEditDialog
        open={dialogOpen}
        editingSubplot={editingSubplot}
        formData={formData}
        characters={characters}
        onClose={handleCloseDialog}
        onSave={handleSaveSubplot}
        onFormChange={handleFormChange}
        onCharactersChange={handleCharactersChange}
      />
    </Box>
  );
};

export default SubplotManagement;