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
    historicalContext: ''
  },
  coreTheme: {
    theme: '',
    conflict: '',
    message: '',
    keywords: []
  },
  synopsis: {
    beginning: '',
    development: '',
    climax: '',
    ending: '',
    overallTone: ''
  },
  lastUpdated: new Date()
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

    resetStory: (state) => {
      return { ...initialState, id: state.id, lastUpdated: new Date() };
    }
  }
});

export const { 
  updateStoryBackground, 
  updateCoreTheme, 
  updateSynopsis, 
  resetStory 
} = storySlice.actions;

export default storySlice.reducer;

// Selectors
export const selectStory = (state: { story: StoryState }) => state.story;
export const selectStoryBackground = (state: { story: StoryState }) => state.story.background;
export const selectCoreTheme = (state: { story: StoryState }) => state.story.coreTheme;
export const selectSynopsis = (state: { story: StoryState }) => state.story.synopsis;

// Calculate story completion rate
export const selectStoryCompletion = (state: { story: StoryState }) => {
  const { background, coreTheme, synopsis } = state.story;
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