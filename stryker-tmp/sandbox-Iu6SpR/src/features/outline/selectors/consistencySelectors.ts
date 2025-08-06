// @ts-nocheck
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import {
  selectCharacters,
  selectTimelineEvents,
  selectChapterList,
  selectSubplots,
  selectSecondaryStories,
  selectIdeas,
} from '../slices/rootOutlineSlice';
import { ConsistencyReport } from './selectorTypes';
import {
  selectValidCharacterIds,
  selectValidChapterNumbers,
  selectValidChapterIds,
} from './characterSelectors';

// Cross-module consistency checks
export const selectDataConsistencyReport = createSelector(
  [
    selectCharacters,
    selectTimelineEvents,
    selectChapterList,
    selectSubplots,
    selectSecondaryStories,
    selectIdeas,
  ],
  (characters, events, chapters, subplots, stories, ideas): ConsistencyReport => {
    const validCharacterIds = new Set(characters.map(c => c.id));
    const validChapterNumbers = new Set(chapters.map(c => c.number));
    const validChapterIds = new Set(chapters.map(c => c.id));

    const issues: string[] = [];

    // Check timeline events for orphaned character references
    events.forEach(event => {
      const orphanedChars = event.characters.filter(charId => !validCharacterIds.has(charId));
      if (orphanedChars.length > 0) {
        issues.push(
          `Timeline event "${event.title}" references deleted characters: ${orphanedChars.join(', ')}`
        );
      }
    });

    // Check chapters for orphaned character references
    chapters.forEach(chapter => {
      chapter.keyScenes.forEach(scene => {
        const orphanedChars = scene.characters.filter(charId => !validCharacterIds.has(charId));
        if (orphanedChars.length > 0) {
          issues.push(
            `Scene "${scene.title}" in Chapter ${chapter.number} references deleted characters: ${orphanedChars.join(', ')}`
          );
        }
      });
    });

    // Check subplots for orphaned references
    subplots.forEach(subplot => {
      const orphanedChars = subplot.relatedCharacters.filter(
        charId => !validCharacterIds.has(charId)
      );
      if (orphanedChars.length > 0) {
        issues.push(
          `Subplot "${subplot.title}" references deleted characters: ${orphanedChars.join(', ')}`
        );
      }

      if (subplot.startChapter && !validChapterNumbers.has(subplot.startChapter)) {
        issues.push(
          `Subplot "${subplot.title}" references invalid start chapter: ${subplot.startChapter}`
        );
      }

      if (subplot.endChapter && !validChapterNumbers.has(subplot.endChapter)) {
        issues.push(
          `Subplot "${subplot.title}" references invalid end chapter: ${subplot.endChapter}`
        );
      }
    });

    // Check secondary stories for orphaned character references
    stories.forEach(story => {
      if (!validCharacterIds.has(story.characterId)) {
        issues.push(
          `Secondary story "${story.title}" references deleted character: ${story.characterId}`
        );
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
      timestamp: new Date().toISOString(),
    };
  }
);
