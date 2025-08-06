/**
 * Chapter Cross-Module Actions
 * Handles chapter-related operations across multiple modules
 */
// @ts-nocheck


import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../../../app/store';
import { reorderChapters, updateSubplot } from '../../slices/rootOutlineSlice';
import { ReferentialIntegrityService } from '../../services/referentialIntegrityService';
import { ChapterReorderPayload } from './types';

/**
 * Reorder chapters with automatic subplot reference updates
 */
export const reorderChaptersWithSync = createAsyncThunk<
  void,
  ChapterReorderPayload,
  { dispatch: AppDispatch; state: RootState }
>(
  'crossModule/reorderChaptersWithSync',
  async ({ newOrder, updateSubplotReferences = true }, { dispatch, getState }) => {
    const state = getState().outline;
    const currentChapters = state.chapters.chapters;

    // Create mapping of old to new chapter numbers
    const chapterMapping = createChapterMapping(newOrder, currentChapters);

    // Reorder chapters
    dispatch(reorderChapters(newOrder));

    if (updateSubplotReferences) {
      // Update subplot chapter references
      await updateSubplotChapterReferences(state, chapterMapping, dispatch);
    }

    // Validate state after reordering
    const newState = getState().outline;
    const validationResult = ReferentialIntegrityService.validateState(newState);

    if (!validationResult.isValid) {
      console.warn('Data integrity issues after chapter reordering:', validationResult.errors);
    }
  }
);

/**
 * Create mapping of old to new chapter numbers
 */
function createChapterMapping(newOrder: string[], currentChapters: any[]): Record<number, number> {
  const chapterMapping: Record<number, number> = {};

  newOrder.forEach((chapterId, newIndex) => {
    const chapter = currentChapters.find(c => c.id === chapterId);
    if (chapter) {
      chapterMapping[chapter.number] = newIndex + 1;
    }
  });

  return chapterMapping;
}

/**
 * Update subplot chapter references after reordering
 */
async function updateSubplotChapterReferences(
  state: any,
  chapterMapping: Record<number, number>,
  dispatch: AppDispatch
): Promise<void> {
  const updatedSubplots = state.subplots.subplots.map((subplot: any) => {
    const updatedSubplot = { ...subplot };

    if (subplot.startChapter && chapterMapping[subplot.startChapter]) {
      updatedSubplot.startChapter = chapterMapping[subplot.startChapter];
    }

    if (subplot.endChapter && chapterMapping[subplot.endChapter]) {
      updatedSubplot.endChapter = chapterMapping[subplot.endChapter];
    }

    return updatedSubplot;
  });

  // Dispatch updates for modified subplots
  updatedSubplots.forEach((subplot: any) => {
    const original = state.subplots.subplots.find((s: any) => s.id === subplot.id);
    if (original && hasChapterReferencesChanged(original, subplot)) {
      dispatch(updateSubplot(subplot));
    }
  });
}

/**
 * Check if chapter references have changed in subplot
 */
function hasChapterReferencesChanged(original: any, updated: any): boolean {
  return (
    original.startChapter !== updated.startChapter || original.endChapter !== updated.endChapter
  );
}
