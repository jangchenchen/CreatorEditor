import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { selectChapterList, selectCharacters, updateChapter } from '../../../outlineSlice';
import { useSceneState } from './hooks/useSceneState';
import { createSceneData, updateChapterScenes, removeSceneFromChapter } from './utils/sceneUtils';
import ChapterSelector from './components/ChapterSelector';
import ChapterInfoPanel from './components/ChapterInfoPanel';
import SceneList from './components/SceneList';
import SceneEditDialog from './components/SceneEditDialog';
import { NoChapterSelectedState, ChapterNotFoundState } from './components/EmptyStates';

const SceneEditor: React.FC = () => {
  const dispatch = useDispatch();
  const chapters = useSelector(selectChapterList);
  const characters = useSelector(selectCharacters);

  const {
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
  } = useSceneState(chapters);

  const handleSaveScene = () => {
    if (!currentChapter) return;

    const sceneData = createSceneData(formData, editingScene);
    const updatedScenes = updateChapterScenes(currentChapter.keyScenes, sceneData, editingScene);

    dispatch(
      updateChapter({
        ...currentChapter,
        keyScenes: updatedScenes,
      })
    );

    handleCloseDialog();
  };

  const handleDeleteScene = (sceneId: string) => {
    if (!currentChapter) return;

    const updatedScenes = removeSceneFromChapter(currentChapter.keyScenes, sceneId);
    dispatch(
      updateChapter({
        ...currentChapter,
        keyScenes: updatedScenes,
      })
    );
  };

  return (
    <Box>
      <ChapterSelector
        chapters={chapters}
        selectedChapter={selectedChapter}
        onChapterChange={handleChapterChange}
      />

      {!selectedChapter ? (
        <NoChapterSelectedState />
      ) : !currentChapter ? (
        <ChapterNotFoundState />
      ) : (
        <Box>
          <ChapterInfoPanel chapter={currentChapter} onAddScene={() => handleOpenDialog()} />

          <SceneList
            scenes={currentChapter.keyScenes}
            characters={characters}
            onEdit={handleOpenDialog}
            onDelete={handleDeleteScene}
            onAddScene={() => handleOpenDialog()}
          />
        </Box>
      )}

      <SceneEditDialog
        open={dialogOpen}
        editingScene={editingScene}
        formData={formData}
        characters={characters}
        onClose={handleCloseDialog}
        onSave={handleSaveScene}
        onFormChange={handleFormChange}
        onCharactersChange={handleCharactersChange}
      />
    </Box>
  );
};

export default SceneEditor;
