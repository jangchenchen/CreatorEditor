import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Divider } from '@mui/material';
import {
  selectCharacters,
  selectOutline
} from '../../../outlineSlice';
import { CharacterMotivation } from '../../../types/outline.types';
import MotivationStatistics from './components/MotivationStatistics';
import MotivationToolbar from './components/MotivationToolbar';
import MotivationList from './components/MotivationList';
import MotivationEditDialog from './components/MotivationEditDialog';
import AnalysisGuide from './components/AnalysisGuide';
import { useMotivationState } from './hooks/useMotivationState';
import { getCharactersWithoutMotivation } from './utils/motivationUtils';

const CharacterMotivations: React.FC = () => {
  const dispatch = useDispatch();
  const characters = useSelector(selectCharacters);
  const outline = useSelector(selectOutline);
  const characterMotivations = outline.themes.characterMotivations;
  
  const {
    editingMotivation,
    dialogOpen,
    formData,
    handleOpenDialog,
    handleCloseDialog,
    handleFormChange
  } = useMotivationState();

  const handleSaveMotivation = () => {
    const motivationData: CharacterMotivation = {
      characterId: formData.characterId || '',
      innerConflict: formData.innerConflict || '',
      growthMotivation: formData.growthMotivation || '',
      emotionalJourney: formData.emotionalJourney || '',
      moralDilemma: formData.moralDilemma || '',
      resolution: formData.resolution || ''
    };

    // TODO: 使用 dispatch 更新 Redux state
    console.log('保存角色动机:', motivationData);
    handleCloseDialog();
  };

  const handleDeleteMotivation = (characterId: string) => {
    if (window.confirm('确定要删除这个角色的动机分析吗？')) {
      // TODO: 使用 dispatch 更新 Redux state
      console.log('删除角色动机:', characterId);
    }
  };

  const charactersWithoutMotivation = getCharactersWithoutMotivation(
    characters,
    characterMotivations
  );

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        角色动机分析
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        深入分析每个重要角色的内在动机、情感历程和成长轨迹，挖掘角色的心理深度。
      </Typography>

      <MotivationStatistics
        characterMotivations={characterMotivations}
        charactersWithoutMotivation={charactersWithoutMotivation}
      />

      <MotivationToolbar
        onAddMotivation={() => handleOpenDialog()}
      />

      <MotivationList
        characterMotivations={characterMotivations}
        characters={characters}
        onEdit={handleOpenDialog}
        onDelete={handleDeleteMotivation}
        onAddMotivation={() => handleOpenDialog()}
      />

      <MotivationEditDialog
        open={dialogOpen}
        editingMotivation={editingMotivation}
        formData={formData}
        characters={characters}
        onClose={handleCloseDialog}
        onSave={handleSaveMotivation}
        onFormChange={handleFormChange}
      />

      <Divider sx={{ my: 3 }} />

      <AnalysisGuide />
    </Box>
  );
};

export default CharacterMotivations;