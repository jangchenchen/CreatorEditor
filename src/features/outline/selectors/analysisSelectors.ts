import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { CharacterUsage } from './selectorTypes';
import {
  selectValidCharacters,
  selectValidTimelineEvents,
  selectValidScenes,
  selectValidSecondaryStories,
} from './characterSelectors';
import { selectValidTimelineEvents as selectValidTimelineEventsFromModule } from './moduleSelectors';

// Character usage analysis
export const selectCharacterUsageAnalysis = createSelector(
  [
    selectValidCharacters,
    selectValidTimelineEventsFromModule,
    selectValidScenes,
    selectValidSecondaryStories,
  ],
  (characters, events, scenes, stories): CharacterUsage[] => {
    return characters.map(character => {
      const timelineAppearances = events.filter(event =>
        event.characters.includes(character.id)
      ).length;
      const sceneAppearances = scenes.filter(scene =>
        scene.characters.includes(character.id)
      ).length;
      const hasSecondaryStory = stories.some(story => story.characterId === character.id);

      return {
        character,
        timelineAppearances,
        sceneAppearances,
        hasSecondaryStory,
        totalAppearances: timelineAppearances + sceneAppearances,
        isUnused: timelineAppearances === 0 && sceneAppearances === 0 && !hasSecondaryStory,
      };
    });
  }
);

// Character name lookup utility selector
export const selectCharacterNameMap = createSelector(
  [selectValidCharacters],
  (characters): Map<string, string> => {
    return new Map(characters.map(char => [char.id, char.name]));
  }
);

// Unused characters selector
export const selectUnusedCharacters = createSelector(
  [selectCharacterUsageAnalysis],
  (usageAnalysis): Character[] => {
    return usageAnalysis.filter(usage => usage.isUnused).map(usage => usage.character);
  }
);

// Most used characters selector
export const selectMostUsedCharacters = createSelector(
  [selectCharacterUsageAnalysis],
  (usageAnalysis): CharacterUsage[] => {
    return usageAnalysis.sort((a, b) => b.totalAppearances - a.totalAppearances).slice(0, 10);
  }
);
