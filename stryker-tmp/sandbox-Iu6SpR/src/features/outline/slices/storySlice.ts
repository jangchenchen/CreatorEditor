// @ts-nocheck
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StoryBackground {
  era: string;
  location: string;
  socialEnvironment: string;
  historicalContext: string;
}

export interface CoreTheme {
  theme: string;
  conflict: string;
  message: string;
  keywords: string[];
}

export interface Synopsis {
  beginning: string;
  development: string;
  climax: string;
  ending: string;
  overallTone: string;
}

export interface StoryState {
  id: string;
  background: StoryBackground;
  coreTheme: CoreTheme;
  synopsis: Synopsis;
  lastUpdated: Date;
}

const initialState: StoryState = {
  id: 'story-1',
  background: {
    era: '',
    location: '',
    socialEnvironment: '',
    historicalContext: '',
  },
  coreTheme: {
    theme: '',
    conflict: '',
    message: '',
    keywords: [],
  },
  synopsis: {
    beginning: '',
    development: '',
    climax: '',
    ending: '',
    overallTone: '',
  },
  lastUpdated: new Date(),
};

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    updateStoryBackground: (state, action: PayloadAction<Partial<StoryBackground>>) => {
      state.background = { ...state.background, ...action.payload };
      state.lastUpdated = new Date();
    },

    updateCoreTheme: (state, action: PayloadAction<Partial<CoreTheme>>) => {
      state.coreTheme = { ...state.coreTheme, ...action.payload };
      state.lastUpdated = new Date();
    },

    updateSynopsis: (state, action: PayloadAction<Partial<Synopsis>>) => {
      state.synopsis = { ...state.synopsis, ...action.payload };
      state.lastUpdated = new Date();
    },

    resetStory: state => {
      return { ...initialState, id: state.id, lastUpdated: new Date() };
    },
  },
});

export const { updateStoryBackground, updateCoreTheme, updateSynopsis, resetStory } =
  storySlice.actions;

export { storySlice };
export default storySlice.reducer;

// Selectors
export const selectStory = (state: { outline: { story: StoryState } }) => state.outline.story;
export const selectStoryBackground = (state: { outline: { story: StoryState } }) =>
  state.outline.story.background;
export const selectCoreTheme = (state: { outline: { story: StoryState } }) =>
  state.outline.story.coreTheme;
export const selectSynopsis = (state: { outline: { story: StoryState } }) =>
  state.outline.story.synopsis;

// Calculate story completion rate
export const selectStoryCompletion = (state: { outline: { story: StoryState } }) => {
  const { background, coreTheme, synopsis } = state.outline.story;
  let completed = 0;
  const total = 10;

  if (background.era) completed++;
  if (background.location) completed++;
  if (background.socialEnvironment) completed++;
  if (background.historicalContext) completed++;
  if (coreTheme.theme) completed++;
  if (coreTheme.conflict) completed++;
  if (synopsis.beginning) completed++;
  if (synopsis.development) completed++;
  if (synopsis.climax) completed++;
  if (synopsis.ending) completed++;

  return Math.round((completed / total) * 100);
};
