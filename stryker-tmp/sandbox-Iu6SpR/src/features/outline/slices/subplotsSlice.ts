// @ts-nocheck
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subplot, SecondaryCharacterStory } from '../types/outline.types';

export interface SubplotsState {
  id: string;
  subplots: Subplot[];
  secondaryStories: SecondaryCharacterStory[];
  weavingStrategy: string;
}

const initialState: SubplotsState = {
  id: 'subplots-1',
  subplots: [],
  secondaryStories: [],
  weavingStrategy: '',
};

const subplotsSlice = createSlice({
  name: 'subplots',
  initialState,
  reducers: {
    // Subplot management
    addSubplot: (state, action: PayloadAction<Subplot>) => {
      state.subplots.push(action.payload);
    },

    updateSubplot: (state, action: PayloadAction<Subplot>) => {
      const index = state.subplots.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.subplots[index] = action.payload;
      }
    },

    deleteSubplot: (state, action: PayloadAction<string>) => {
      state.subplots = state.subplots.filter(s => s.id !== action.payload);
    },

    // Secondary character stories management
    addSecondaryStory: (state, action: PayloadAction<SecondaryCharacterStory>) => {
      state.secondaryStories.push(action.payload);
    },

    updateSecondaryStory: (state, action: PayloadAction<SecondaryCharacterStory>) => {
      const index = state.secondaryStories.findIndex(
        s => s.characterId === action.payload.characterId
      );
      if (index !== -1) {
        state.secondaryStories[index] = action.payload;
      }
    },

    deleteSecondaryStory: (state, action: PayloadAction<string>) => {
      state.secondaryStories = state.secondaryStories.filter(s => s.characterId !== action.payload);
    },

    updateWeavingStrategy: (state, action: PayloadAction<string>) => {
      state.weavingStrategy = action.payload;
    },

    // Batch operations
    loadSubplotsData: (state, action: PayloadAction<SubplotsState>) => {
      return action.payload;
    },

    resetSubplots: state => {
      return { ...initialState, id: state.id };
    },
  },
});

export const {
  addSubplot,
  updateSubplot,
  deleteSubplot,
  addSecondaryStory,
  updateSecondaryStory,
  deleteSecondaryStory,
  updateWeavingStrategy,
  loadSubplotsData,
  resetSubplots,
} = subplotsSlice.actions;

export default subplotsSlice.reducer;

// Selectors
export const selectSubplots = (state: { subplots: SubplotsState }) => state.subplots;
export const selectSubplotsList = (state: { subplots: SubplotsState }) => state.subplots.subplots;
export const selectSecondaryStories = (state: { subplots: SubplotsState }) =>
  state.subplots.secondaryStories;

export const selectActiveSubplots = (state: { subplots: SubplotsState }) =>
  state.subplots.subplots.filter(s => s.status === 'active');

export const selectSubplotsByStatus = (status: string) => (state: { subplots: SubplotsState }) =>
  state.subplots.subplots.filter(s => s.status === status);

export const selectSecondaryStoryByCharacter =
  (characterId: string) => (state: { subplots: SubplotsState }) =>
    state.subplots.secondaryStories.find(s => s.characterId === characterId);

export const selectSubplotsStats = (state: { subplots: SubplotsState }) => ({
  totalSubplots: state.subplots.subplots.length,
  activeSubplots: state.subplots.subplots.filter(s => s.status === 'active').length,
  completedSubplots: state.subplots.subplots.filter(s => s.status === 'completed').length,
  secondaryStories: state.subplots.secondaryStories.length,
  hasWeavingStrategy: !!state.subplots.weavingStrategy,
});
