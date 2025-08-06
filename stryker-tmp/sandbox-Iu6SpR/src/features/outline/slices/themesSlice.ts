// @ts-nocheck
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeExploration, ThemeAnalysis, CharacterMotivation } from '../types/theme.types';

export interface ThemesState extends ThemeExploration {}

const initialState: ThemesState = {
  id: 'themes-1',
  themes: {
    primary: '',
    secondary: [],
    symbols: [],
    metaphors: [],
    motifs: [],
  },
  characterMotivations: [],
  philosophicalQuestions: [],
  socialCommentary: [],
  personalReflections: [],
};

const themesSlice = createSlice({
  name: 'themes',
  initialState,
  reducers: {
    // Theme analysis management
    updateThemeAnalysis: (state, action: PayloadAction<Partial<ThemeAnalysis>>) => {
      state.themes = { ...state.themes, ...action.payload };
    },

    addSecondaryTheme: (state, action: PayloadAction<string>) => {
      if (!state.themes.secondary.includes(action.payload)) {
        state.themes.secondary.push(action.payload);
      }
    },

    removeSecondaryTheme: (state, action: PayloadAction<string>) => {
      state.themes.secondary = state.themes.secondary.filter(theme => theme !== action.payload);
    },

    addSymbol: (state, action: PayloadAction<string>) => {
      if (!state.themes.symbols.includes(action.payload)) {
        state.themes.symbols.push(action.payload);
      }
    },

    removeSymbol: (state, action: PayloadAction<string>) => {
      state.themes.symbols = state.themes.symbols.filter(symbol => symbol !== action.payload);
    },

    addMetaphor: (state, action: PayloadAction<string>) => {
      if (!state.themes.metaphors.includes(action.payload)) {
        state.themes.metaphors.push(action.payload);
      }
    },

    removeMetaphor: (state, action: PayloadAction<string>) => {
      state.themes.metaphors = state.themes.metaphors.filter(
        metaphor => metaphor !== action.payload
      );
    },

    addMotif: (state, action: PayloadAction<string>) => {
      if (!state.themes.motifs.includes(action.payload)) {
        state.themes.motifs.push(action.payload);
      }
    },

    removeMotif: (state, action: PayloadAction<string>) => {
      state.themes.motifs = state.themes.motifs.filter(motif => motif !== action.payload);
    },

    // Character motivation management
    addCharacterMotivation: (state, action: PayloadAction<CharacterMotivation>) => {
      const existingIndex = state.characterMotivations.findIndex(
        m => m.characterId === action.payload.characterId
      );
      if (existingIndex !== -1) {
        state.characterMotivations[existingIndex] = action.payload;
      } else {
        state.characterMotivations.push(action.payload);
      }
    },

    updateCharacterMotivation: (state, action: PayloadAction<CharacterMotivation>) => {
      const index = state.characterMotivations.findIndex(
        m => m.characterId === action.payload.characterId
      );
      if (index !== -1) {
        state.characterMotivations[index] = action.payload;
      }
    },

    removeCharacterMotivation: (state, action: PayloadAction<string>) => {
      state.characterMotivations = state.characterMotivations.filter(
        m => m.characterId !== action.payload
      );
    },

    // Philosophical questions
    addPhilosophicalQuestion: (state, action: PayloadAction<string>) => {
      if (!state.philosophicalQuestions.includes(action.payload)) {
        state.philosophicalQuestions.push(action.payload);
      }
    },

    removePhilosophicalQuestion: (state, action: PayloadAction<string>) => {
      state.philosophicalQuestions = state.philosophicalQuestions.filter(
        question => question !== action.payload
      );
    },

    updatePhilosophicalQuestion: (
      state,
      action: PayloadAction<{ index: number; question: string }>
    ) => {
      if (state.philosophicalQuestions[action.payload.index]) {
        state.philosophicalQuestions[action.payload.index] = action.payload.question;
      }
    },

    // Social commentary
    addSocialCommentary: (state, action: PayloadAction<string>) => {
      if (!state.socialCommentary.includes(action.payload)) {
        state.socialCommentary.push(action.payload);
      }
    },

    removeSocialCommentary: (state, action: PayloadAction<string>) => {
      state.socialCommentary = state.socialCommentary.filter(
        commentary => commentary !== action.payload
      );
    },

    updateSocialCommentary: (
      state,
      action: PayloadAction<{ index: number; commentary: string }>
    ) => {
      if (state.socialCommentary[action.payload.index]) {
        state.socialCommentary[action.payload.index] = action.payload.commentary;
      }
    },

    // Personal reflections
    addPersonalReflection: (state, action: PayloadAction<string>) => {
      if (!state.personalReflections.includes(action.payload)) {
        state.personalReflections.push(action.payload);
      }
    },

    removePersonalReflection: (state, action: PayloadAction<string>) => {
      state.personalReflections = state.personalReflections.filter(
        reflection => reflection !== action.payload
      );
    },

    updatePersonalReflection: (
      state,
      action: PayloadAction<{ index: number; reflection: string }>
    ) => {
      if (state.personalReflections[action.payload.index]) {
        state.personalReflections[action.payload.index] = action.payload.reflection;
      }
    },

    // Batch operations
    loadThemesData: (state, action: PayloadAction<ThemesState>) => {
      return action.payload;
    },

    resetThemes: () => {
      return initialState;
    },
  },
});

export const {
  updateThemeAnalysis,
  addSecondaryTheme,
  removeSecondaryTheme,
  addSymbol,
  removeSymbol,
  addMetaphor,
  removeMetaphor,
  addMotif,
  removeMotif,
  addCharacterMotivation,
  updateCharacterMotivation,
  removeCharacterMotivation,
  addPhilosophicalQuestion,
  removePhilosophicalQuestion,
  updatePhilosophicalQuestion,
  addSocialCommentary,
  removeSocialCommentary,
  updateSocialCommentary,
  addPersonalReflection,
  removePersonalReflection,
  updatePersonalReflection,
  loadThemesData,
  resetThemes,
} = themesSlice.actions;

export default themesSlice.reducer;

// Selectors
export const selectThemes = (state: { themes: ThemesState }) => state.themes;
export const selectThemeAnalysis = (state: { themes: ThemesState }) => state.themes.themes;
export const selectCharacterMotivations = (state: { themes: ThemesState }) =>
  state.themes.characterMotivations;
export const selectPhilosophicalQuestions = (state: { themes: ThemesState }) =>
  state.themes.philosophicalQuestions;
export const selectSocialCommentary = (state: { themes: ThemesState }) =>
  state.themes.socialCommentary;
export const selectPersonalReflections = (state: { themes: ThemesState }) =>
  state.themes.personalReflections;

export const selectCharacterMotivationById =
  (characterId: string) => (state: { themes: ThemesState }) =>
    state.themes.characterMotivations.find(m => m.characterId === characterId);

export const selectThemeStats = (state: { themes: ThemesState }) => ({
  primaryTheme: !!state.themes.themes.primary,
  secondaryThemesCount: state.themes.themes.secondary.length,
  symbolsCount: state.themes.themes.symbols.length,
  metaphorsCount: state.themes.themes.metaphors.length,
  motifsCount: state.themes.themes.motifs.length,
  characterMotivationsCount: state.themes.characterMotivations.length,
  philosophicalQuestionsCount: state.themes.philosophicalQuestions.length,
  socialCommentaryCount: state.themes.socialCommentary.length,
  personalReflectionsCount: state.themes.personalReflections.length,
});
