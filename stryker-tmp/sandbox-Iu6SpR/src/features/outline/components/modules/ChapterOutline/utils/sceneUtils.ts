// @ts-nocheck
import { Scene, Character } from '../../../../types/outline.types';

export const initializeSceneFormData = (scene?: Scene) => {
  return scene
    ? { ...scene }
    : {
        title: '',
        description: '',
        location: '',
        characters: [],
        purpose: '',
        conflict: '',
        outcome: '',
      };
};

export const createSceneData = (formData: Partial<Scene>, editingScene?: Scene): Scene => {
  return {
    id: editingScene?.id || `scene-${Date.now()}`,
    title: formData.title || '',
    description: formData.description || '',
    location: formData.location || '',
    characters: formData.characters || [],
    purpose: formData.purpose || '',
    conflict: formData.conflict || '',
    outcome: formData.outcome || '',
  };
};

export const getCharacterName = (characterId: string, characters: Character[]) => {
  const character = characters.find(c => c.id === characterId);
  return character?.name || characterId;
};

export const updateChapterScenes = (
  currentScenes: Scene[],
  sceneData: Scene,
  editingScene?: Scene
): Scene[] => {
  if (editingScene) {
    const index = currentScenes.findIndex(s => s.id === editingScene.id);
    if (index !== -1) {
      const updatedScenes = [...currentScenes];
      updatedScenes[index] = sceneData;
      return updatedScenes;
    }
  }
  return [...currentScenes, sceneData];
};

export const removeSceneFromChapter = (currentScenes: Scene[], sceneId: string): Scene[] => {
  return currentScenes.filter(s => s.id !== sceneId);
};
