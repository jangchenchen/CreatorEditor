import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { selectCharacters, selectChapterList } from '../slices/rootOutlineSlice';
import { Character, Chapter, Scene } from '../types/outline.types';

// Validated character selectors
export const selectValidCharacters = createSelector(
  [selectCharacters],
  (characters): Character[] => {
    // Ensure characters have required fields and valid data
    return characters.filter(
      character => character.id && character.name && character.name.trim().length > 0
    );
  }
);

export const selectValidCharacterIds = createSelector(
  [selectValidCharacters],
  (characters): Set<string> => {
    return new Set(characters.map(c => c.id));
  }
);

// Validated chapter selectors
export const selectValidChapters = createSelector(
  [selectChapterList, selectValidCharacterIds],
  (chapters, validCharacterIds): Chapter[] => {
    return chapters.map(chapter => ({
      ...chapter,
      keyScenes: chapter.keyScenes.map(scene => ({
        ...scene,
        characters: scene.characters.filter(charId => validCharacterIds.has(charId)),
      })),
    }));
  }
);

export const selectValidScenes = createSelector([selectValidChapters], (chapters): Scene[] => {
  return chapters.flatMap(chapter => chapter.keyScenes);
});

export const selectValidChapterNumbers = createSelector(
  [selectValidChapters],
  (chapters): Set<number> => {
    return new Set(chapters.map(c => c.number));
  }
);

export const selectValidChapterIds = createSelector(
  [selectValidChapters],
  (chapters): Set<string> => {
    return new Set(chapters.map(c => c.id));
  }
);
