import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import {
  selectChapterList,
  selectCharacters,
  selectTimelineEvents,
  selectSubplots,
  selectSecondaryStories,
  selectIdeas
} from '../slices/rootOutlineSlice';
import {
  Character,
  Chapter,
  Scene,
  TimelineEvent,
  Subplot,
  SecondaryStory,
  Idea
} from '../types/outline.types';

// Validated character selectors
export const selectValidCharacters = createSelector(
  [selectCharacters],
  (characters): Character[] => {
    // Ensure characters have required fields and valid data
    return characters.filter(character => 
      character.id && 
      character.name && 
      character.name.trim().length > 0
    );
  }
);

export const selectValidCharacterIds = createSelector(
  [selectValidCharacters],
  (characters): Set<string> => {
    return new Set(characters.map(c => c.id));
  }
);

// Validated timeline selectors
export const selectValidTimelineEvents = createSelector(
  [selectTimelineEvents, selectValidCharacterIds],
  (events, validCharacterIds): TimelineEvent[] => {
    return events.map(event => ({
      ...event,
      characters: event.characters.filter(charId => validCharacterIds.has(charId))
    })).filter(event => 
      // Keep events that still have at least some valid data
      event.title && event.title.trim().length > 0
    );
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
        characters: scene.characters.filter(charId => validCharacterIds.has(charId))
      }))
    }));
  }
);

export const selectValidScenes = createSelector(
  [selectValidChapters],
  (chapters): Scene[] => {
    return chapters.flatMap(chapter => chapter.keyScenes);
  }
);

// Validated subplot selectors
export const selectValidSubplots = createSelector(
  [selectSubplots, selectValidCharacterIds, selectChapterList],
  (subplots, validCharacterIds, chapters): Subplot[] => {
    const validChapterNumbers = new Set(chapters.map(c => c.number));
    
    return subplots.map(subplot => ({
      ...subplot,
      relatedCharacters: subplot.relatedCharacters.filter(charId => 
        validCharacterIds.has(charId)
      ),
      // Validate chapter references
      startChapter: subplot.startChapter && validChapterNumbers.has(subplot.startChapter) 
        ? subplot.startChapter 
        : undefined,
      endChapter: subplot.endChapter && validChapterNumbers.has(subplot.endChapter) 
        ? subplot.endChapter 
        : undefined
    }));
  }
);

// Validated secondary stories selectors
export const selectValidSecondaryStories = createSelector(
  [selectSecondaryStories, selectValidCharacterIds],
  (stories, validCharacterIds): SecondaryStory[] => {
    return stories.filter(story => 
      story.characterId && validCharacterIds.has(story.characterId)
    );
  }
);

// Validated ideas selectors
export const selectValidIdeas = createSelector(
  [selectIdeas, selectValidCharacterIds, selectChapterList],
  (ideas, validCharacterIds, chapters): Idea[] => {
    const validChapterIds = new Set(chapters.map(c => c.id));
    
    return ideas.map(idea => ({
      ...idea,
      relatedElements: idea.relatedElements.filter(element => {
        switch (element.type) {
          case 'character':
            return validCharacterIds.has(element.id);
          case 'chapter':
            return validChapterIds.has(element.id);
          case 'subplot':
            // Could add subplot validation here
            return true;
          default:
            return true;
        }
      })
    }));
  }
);

// Cross-module consistency checks
export const selectDataConsistencyReport = createSelector(
  [
    selectCharacters,
    selectTimelineEvents,
    selectChapterList,
    selectSubplots,
    selectSecondaryStories,
    selectIdeas
  ],
  (characters, events, chapters, subplots, stories, ideas) => {
    const validCharacterIds = new Set(characters.map(c => c.id));
    const validChapterNumbers = new Set(chapters.map(c => c.number));
    const validChapterIds = new Set(chapters.map(c => c.id));
    
    const issues: string[] = [];
    
    // Check timeline events for orphaned character references
    events.forEach(event => {
      const orphanedChars = event.characters.filter(charId => !validCharacterIds.has(charId));
      if (orphanedChars.length > 0) {
        issues.push(`Timeline event "${event.title}" references deleted characters: ${orphanedChars.join(', ')}`);
      }
    });
    
    // Check chapters for orphaned character references
    chapters.forEach(chapter => {
      chapter.keyScenes.forEach(scene => {
        const orphanedChars = scene.characters.filter(charId => !validCharacterIds.has(charId));
        if (orphanedChars.length > 0) {
          issues.push(`Scene "${scene.title}" in Chapter ${chapter.number} references deleted characters: ${orphanedChars.join(', ')}`);
        }
      });
    });
    
    // Check subplots for orphaned references
    subplots.forEach(subplot => {
      const orphanedChars = subplot.relatedCharacters.filter(charId => !validCharacterIds.has(charId));
      if (orphanedChars.length > 0) {
        issues.push(`Subplot "${subplot.title}" references deleted characters: ${orphanedChars.join(', ')}`);
      }
      
      if (subplot.startChapter && !validChapterNumbers.has(subplot.startChapter)) {
        issues.push(`Subplot "${subplot.title}" references invalid start chapter: ${subplot.startChapter}`);
      }
      
      if (subplot.endChapter && !validChapterNumbers.has(subplot.endChapter)) {
        issues.push(`Subplot "${subplot.title}" references invalid end chapter: ${subplot.endChapter}`);
      }
    });
    
    // Check secondary stories for orphaned character references
    stories.forEach(story => {
      if (!validCharacterIds.has(story.characterId)) {
        issues.push(`Secondary story "${story.title}" references deleted character: ${story.characterId}`);
      }
    });
    
    // Check ideas for orphaned references
    ideas.forEach(idea => {
      idea.relatedElements.forEach(element => {
        if (element.type === 'character' && !validCharacterIds.has(element.id)) {
          issues.push(`Idea "${idea.title}" references deleted character: ${element.id}`);
        }
        if (element.type === 'chapter' && !validChapterIds.has(element.id)) {
          issues.push(`Idea "${idea.title}" references deleted chapter: ${element.id}`);
        }
      });
    });
    
    return {
      isConsistent: issues.length === 0,
      issues,
      totalIssues: issues.length,
      timestamp: new Date().toISOString()
    };
  }
);

// Character usage analysis
export const selectCharacterUsageAnalysis = createSelector(
  [selectValidCharacters, selectValidTimelineEvents, selectValidScenes, selectValidSecondaryStories],
  (characters, events, scenes, stories) => {
    return characters.map(character => {
      const timelineAppearances = events.filter(event => event.characters.includes(character.id)).length;
      const sceneAppearances = scenes.filter(scene => scene.characters.includes(character.id)).length;
      const hasSecondaryStory = stories.some(story => story.characterId === character.id);
      
      return {
        character,
        timelineAppearances,
        sceneAppearances,
        hasSecondaryStory,
        totalAppearances: timelineAppearances + sceneAppearances,
        isUnused: timelineAppearances === 0 && sceneAppearances === 0 && !hasSecondaryStory
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