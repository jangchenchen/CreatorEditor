import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chapter } from '../types/outline.types';

export interface ChaptersState {
  id: string;
  chapters: Chapter[];
  totalChapters: number;
  overallStructure: string;
}

const initialState: ChaptersState = {
  id: 'chapters-1',
  chapters: [],
  totalChapters: 0,
  overallStructure: '',
};

const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    addChapter: (state, action: PayloadAction<Chapter>) => {
      state.chapters.push(action.payload);
      state.totalChapters = state.chapters.length;
      // Sort by chapter number
      state.chapters.sort((a, b) => a.number - b.number);
    },

    updateChapter: (state, action: PayloadAction<Chapter>) => {
      const index = state.chapters.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.chapters[index] = action.payload;
        // Re-sort after update
        state.chapters.sort((a, b) => a.number - b.number);
      }
    },

    deleteChapter: (state, action: PayloadAction<string>) => {
      state.chapters = state.chapters.filter(c => c.id !== action.payload);
      state.totalChapters = state.chapters.length;
    },

    updateChapterStructure: (state, action: PayloadAction<string>) => {
      state.overallStructure = action.payload;
    },

    reorderChapters: (state, action: PayloadAction<Chapter[]>) => {
      state.chapters = action.payload;
      state.totalChapters = action.payload.length;
    },

    // Batch operations
    loadChaptersData: (state, action: PayloadAction<ChaptersState>) => {
      return action.payload;
    },

    resetChapters: state => {
      return { ...initialState, id: state.id };
    },
  },
});

export const {
  addChapter,
  updateChapter,
  deleteChapter,
  updateChapterStructure,
  reorderChapters,
  loadChaptersData,
  resetChapters,
} = chaptersSlice.actions;

export default chaptersSlice.reducer;

// Selectors
export const selectChapters = (state: { chapters: ChaptersState }) => state.chapters;
export const selectChapterList = (state: { chapters: ChaptersState }) => state.chapters.chapters;
export const selectChapterById = (chapterId: string) => (state: { chapters: ChaptersState }) =>
  state.chapters.chapters.find(c => c.id === chapterId);

export const selectChaptersByStatus = (status: string) => (state: { chapters: ChaptersState }) =>
  state.chapters.chapters.filter(c => c.status === status);

export const selectChaptersStats = (state: { chapters: ChaptersState }) => {
  const chapters = state.chapters.chapters;
  const totalWordCount = chapters.reduce((sum, chapter) => sum + (chapter.wordCount || 0), 0);
  const avgWordCount = chapters.length > 0 ? Math.round(totalWordCount / chapters.length) : 0;

  return {
    totalChapters: state.chapters.totalChapters,
    draftChapters: chapters.filter(c => c.status === 'draft').length,
    reviewChapters: chapters.filter(c => c.status === 'review').length,
    completeChapters: chapters.filter(c => c.status === 'complete').length,
    totalWordCount,
    avgWordCount,
    hasStructure: !!state.chapters.overallStructure,
  };
};
