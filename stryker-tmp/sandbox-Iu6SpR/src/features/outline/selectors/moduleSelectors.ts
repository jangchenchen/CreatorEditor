// @ts-nocheck
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import {
  selectTimelineEvents,
  selectSubplots,
  selectSecondaryStories,
  selectIdeas,
} from '../slices/rootOutlineSlice';
import { TimelineEvent, Subplot, SecondaryStory, Idea } from '../types/outline.types';
import {
  selectValidCharacterIds,
  selectValidChapterNumbers,
  selectValidChapterIds,
} from './characterSelectors';

// Validated timeline selectors
export const selectValidTimelineEvents = createSelector(
  [selectTimelineEvents, selectValidCharacterIds],
  (events, validCharacterIds): TimelineEvent[] => {
    return events
      .map(event => ({
        ...event,
        characters: event.characters.filter(charId => validCharacterIds.has(charId)),
      }))
      .filter(
        event =>
          // Keep events that still have at least some valid data
          event.title && event.title.trim().length > 0
      );
  }
);

// Validated subplot selectors
export const selectValidSubplots = createSelector(
  [selectSubplots, selectValidCharacterIds, selectValidChapterNumbers],
  (subplots, validCharacterIds, validChapterNumbers): Subplot[] => {
    return subplots.map(subplot => ({
      ...subplot,
      relatedCharacters: subplot.relatedCharacters.filter(charId => validCharacterIds.has(charId)),
      // Validate chapter references
      startChapter:
        subplot.startChapter && validChapterNumbers.has(subplot.startChapter)
          ? subplot.startChapter
          : undefined,
      endChapter:
        subplot.endChapter && validChapterNumbers.has(subplot.endChapter)
          ? subplot.endChapter
          : undefined,
    }));
  }
);

// Validated secondary stories selectors
export const selectValidSecondaryStories = createSelector(
  [selectSecondaryStories, selectValidCharacterIds],
  (stories, validCharacterIds): SecondaryStory[] => {
    return stories.filter(story => story.characterId && validCharacterIds.has(story.characterId));
  }
);

// Validated ideas selectors
export const selectValidIdeas = createSelector(
  [selectIdeas, selectValidCharacterIds, selectValidChapterIds],
  (ideas, validCharacterIds, validChapterIds): Idea[] => {
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
      }),
    }));
  }
);
