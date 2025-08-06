// @ts-nocheck
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreativeIdea, PlotAlternative } from '../types/outline.types';

export interface IdeasState {
  id: string;
  ideas: CreativeIdea[];
  alternatives: PlotAlternative[];
  inspirationSources: string[];
  brainstormingSessions: string[];
}

const initialState: IdeasState = {
  id: 'ideas-1',
  ideas: [],
  alternatives: [],
  inspirationSources: [],
  brainstormingSessions: [],
};

const ideasSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {
    // Creative ideas management
    addCreativeIdea: (state, action: PayloadAction<CreativeIdea>) => {
      state.ideas.push(action.payload);
    },

    updateCreativeIdea: (state, action: PayloadAction<CreativeIdea>) => {
      const index = state.ideas.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        state.ideas[index] = { ...action.payload, lastUpdated: new Date() };
      }
    },

    deleteCreativeIdea: (state, action: PayloadAction<string>) => {
      state.ideas = state.ideas.filter(i => i.id !== action.payload);
    },

    updateIdeaStatus: (
      state,
      action: PayloadAction<{ id: string; status: CreativeIdea['status'] }>
    ) => {
      const idea = state.ideas.find(i => i.id === action.payload.id);
      if (idea) {
        idea.status = action.payload.status;
        idea.lastUpdated = new Date();
      }
    },

    // Plot alternatives management
    addPlotAlternative: (state, action: PayloadAction<PlotAlternative>) => {
      state.alternatives.push(action.payload);
    },

    updatePlotAlternative: (state, action: PayloadAction<PlotAlternative>) => {
      const index = state.alternatives.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.alternatives[index] = action.payload;
      }
    },

    deletePlotAlternative: (state, action: PayloadAction<string>) => {
      state.alternatives = state.alternatives.filter(a => a.id !== action.payload);
    },

    // Inspiration sources management
    addInspirationSource: (state, action: PayloadAction<string>) => {
      if (!state.inspirationSources.includes(action.payload)) {
        state.inspirationSources.push(action.payload);
      }
    },

    removeInspirationSource: (state, action: PayloadAction<string>) => {
      state.inspirationSources = state.inspirationSources.filter(s => s !== action.payload);
    },

    // Brainstorming sessions management
    addBrainstormingSession: (state, action: PayloadAction<string>) => {
      state.brainstormingSessions.push(action.payload);
    },

    removeBrainstormingSession: (state, action: PayloadAction<number>) => {
      state.brainstormingSessions.splice(action.payload, 1);
    },

    // Batch operations
    loadIdeasData: (state, action: PayloadAction<IdeasState>) => {
      return action.payload;
    },

    resetIdeas: state => {
      return { ...initialState, id: state.id };
    },
  },
});

export const {
  addCreativeIdea,
  updateCreativeIdea,
  deleteCreativeIdea,
  updateIdeaStatus,
  addPlotAlternative,
  updatePlotAlternative,
  deletePlotAlternative,
  addInspirationSource,
  removeInspirationSource,
  addBrainstormingSession,
  removeBrainstormingSession,
  loadIdeasData,
  resetIdeas,
} = ideasSlice.actions;

export default ideasSlice.reducer;

// Selectors
export const selectIdeas = (state: { ideas: IdeasState }) => state.ideas;
export const selectCreativeIdeas = (state: { ideas: IdeasState }) => state.ideas.ideas;
export const selectPlotAlternatives = (state: { ideas: IdeasState }) => state.ideas.alternatives;
export const selectInspirationSources = (state: { ideas: IdeasState }) =>
  state.ideas.inspirationSources;

export const selectIdeasByStatus =
  (status: CreativeIdea['status']) => (state: { ideas: IdeasState }) =>
    state.ideas.ideas.filter(i => i.status === status);

export const selectIdeasByType = (type: CreativeIdea['type']) => (state: { ideas: IdeasState }) =>
  state.ideas.ideas.filter(i => i.type === type);

export const selectIdeasStats = (state: { ideas: IdeasState }) => ({
  totalIdeas: state.ideas.ideas.length,
  brainstormingIdeas: state.ideas.ideas.filter(i => i.status === 'brainstorming').length,
  developingIdeas: state.ideas.ideas.filter(i => i.status === 'developing').length,
  implementedIdeas: state.ideas.ideas.filter(i => i.status === 'implemented').length,
  rejectedIdeas: state.ideas.ideas.filter(i => i.status === 'rejected').length,
  totalAlternatives: state.ideas.alternatives.length,
  inspirationSourcesCount: state.ideas.inspirationSources.length,
  brainstormingSessionsCount: state.ideas.brainstormingSessions.length,
});
