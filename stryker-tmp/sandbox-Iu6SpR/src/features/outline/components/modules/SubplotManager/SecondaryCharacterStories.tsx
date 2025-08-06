// @ts-nocheck
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider } from '@mui/material';
import { selectCharacters, selectOutline } from '../../../outlineSlice';
import { SecondaryCharacterStory } from '../../../types/outline.types';
import StoryStatistics from './components/StoryStatistics';
import PendingCharactersAlert from './components/PendingCharactersAlert';
import StoryToolbar from './components/StoryToolbar';
import StoryList from './components/StoryList';
import StoryEditDialog from './components/StoryEditDialog';
import StoryDesignGuide from './components/StoryDesignGuide';
import { useStoryState } from './hooks/useStoryState';
import { getCharactersWithoutStory } from './utils/storyUtils';

const SecondaryCharacterStories: React.FC = () => {
  const dispatch = useDispatch();
  const characters = useSelector(selectCharacters);
  const outline = useSelector(selectOutline);
  const secondaryStories = outline.subplots.secondaryStories;

  const {
    editingStory,
    dialogOpen,
    formData,
    handleOpenDialog,
    handleCloseDialog,
    handleFormChange,
    setFormDataField,
  } = useStoryState();

  const handleSaveStory = () => {
    const storyData: SecondaryCharacterStory = {
      characterId: formData.characterId || '',
      personalGoal: formData.personalGoal || '',
      backstory: formData.backstory || '',
      developmentArc: formData.developmentArc || '',
      resolutionMethod: formData.resolutionMethod || '',
    };

    // TODO: 使用 dispatch 更新 Redux state
    console.log('保存配角故事:', storyData);
    handleCloseDialog();
  };

  const handleDeleteStory = (characterId: string) => {
    if (window.confirm('确定要删除这个角色的故事线吗？')) {
      // TODO: 使用 dispatch 更新 Redux state
      console.log('删除配角故事:', characterId);
    }
  };

  const handleSelectCharacter = (characterId: string) => {
    setFormDataField('characterId', characterId);
    handleOpenDialog();
  };

  const charactersWithoutStory = getCharactersWithoutStory(characters, secondaryStories);

  return (
    <Box>
      <StoryStatistics secondaryStories={secondaryStories} characters={characters} />

      <PendingCharactersAlert
        charactersWithoutStory={charactersWithoutStory}
        onSelectCharacter={handleSelectCharacter}
      />

      <StoryToolbar onAddStory={() => handleOpenDialog()} />

      <StoryList
        secondaryStories={secondaryStories}
        characters={characters}
        onEdit={handleOpenDialog}
        onDelete={handleDeleteStory}
        onAddStory={() => handleOpenDialog()}
      />

      <StoryEditDialog
        open={dialogOpen}
        editingStory={editingStory}
        formData={formData}
        characters={characters}
        onClose={handleCloseDialog}
        onSave={handleSaveStory}
        onFormChange={handleFormChange}
      />

      <Divider sx={{ my: 3 }} />

      <StoryDesignGuide />
    </Box>
  );
};

export default SecondaryCharacterStories;
