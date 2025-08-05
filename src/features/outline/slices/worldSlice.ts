import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  WorldBuilding, 
  GeographySetting, 
  SocialSystem, 
  WorldHistory, 
  HistoricalEvent,
  Region 
} from '../types/outline.types';

export interface WorldState extends WorldBuilding {}

const initialState: WorldState = {
  id: 'world-1',
  geography: {
    regions: [],
    climate: '',
    landmarks: [],
    naturalFeatures: []
  },
  society: {
    political: '',
    economic: '',
    cultural: [],
    religious: '',
    technology: '',
    socialClasses: []
  },
  history: {
    timeline: [],
    legends: [],
    familySecrets: [],
    mysteries: []
  },
  customRules: [],
  inspirationSources: []
};

const worldSlice = createSlice({
  name: 'world',
  initialState,
  reducers: {
    // Geography management
    updateGeography: (state, action: PayloadAction<Partial<GeographySetting>>) => {
      state.geography = { ...state.geography, ...action.payload };
    },

    addRegion: (state, action: PayloadAction<Region>) => {
      state.geography.regions.push(action.payload);
    },

    updateRegion: (state, action: PayloadAction<Region>) => {
      const index = state.geography.regions.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.geography.regions[index] = action.payload;
      }
    },

    deleteRegion: (state, action: PayloadAction<string>) => {
      state.geography.regions = state.geography.regions.filter(r => r.id !== action.payload);
    },

    // Society management
    updateSociety: (state, action: PayloadAction<Partial<SocialSystem>>) => {
      state.society = { ...state.society, ...action.payload };
    },

    // History management
    updateHistory: (state, action: PayloadAction<Partial<WorldHistory>>) => {
      state.history = { ...state.history, ...action.payload };
    },

    addHistoricalEvent: (state, action: PayloadAction<HistoricalEvent>) => {
      state.history.timeline.push(action.payload);
      // Sort by period if needed
      state.history.timeline.sort((a, b) => a.period.localeCompare(b.period));
    },

    updateHistoricalEvent: (state, action: PayloadAction<HistoricalEvent>) => {
      const index = state.history.timeline.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.history.timeline[index] = action.payload;
        // Re-sort after update
        state.history.timeline.sort((a, b) => a.period.localeCompare(b.period));
      }
    },

    deleteHistoricalEvent: (state, action: PayloadAction<string>) => {
      state.history.timeline = state.history.timeline.filter(e => e.id !== action.payload);
    },

    // Custom rules and inspiration
    addCustomRule: (state, action: PayloadAction<string>) => {
      state.customRules.push(action.payload);
    },

    removeCustomRule: (state, action: PayloadAction<number>) => {
      state.customRules.splice(action.payload, 1);
    },

    updateCustomRule: (state, action: PayloadAction<{ index: number; rule: string }>) => {
      state.customRules[action.payload.index] = action.payload.rule;
    },

    addInspirationSource: (state, action: PayloadAction<string>) => {
      state.inspirationSources.push(action.payload);
    },

    removeInspirationSource: (state, action: PayloadAction<number>) => {
      state.inspirationSources.splice(action.payload, 1);
    },

    updateInspirationSource: (state, action: PayloadAction<{ index: number; source: string }>) => {
      state.inspirationSources[action.payload.index] = action.payload.source;
    },

    // Batch operations
    loadWorldData: (state, action: PayloadAction<WorldState>) => {
      return action.payload;
    },

    resetWorld: () => {
      return initialState;
    }
  }
});

export const {
  updateGeography,
  addRegion,
  updateRegion,
  deleteRegion,
  updateSociety,
  updateHistory,
  addHistoricalEvent,
  updateHistoricalEvent,
  deleteHistoricalEvent,
  addCustomRule,
  removeCustomRule,
  updateCustomRule,
  addInspirationSource,
  removeInspirationSource,
  updateInspirationSource,
  loadWorldData,
  resetWorld
} = worldSlice.actions;

export default worldSlice.reducer;

// Selectors
export const selectWorld = (state: { world: WorldState }) => state.world;
export const selectGeography = (state: { world: WorldState }) => state.world.geography;
export const selectSociety = (state: { world: WorldState }) => state.world.society;
export const selectWorldHistory = (state: { world: WorldState }) => state.world.history;
export const selectCustomRules = (state: { world: WorldState }) => state.world.customRules;
export const selectInspirationSources = (state: { world: WorldState }) => state.world.inspirationSources;

export const selectRegionById = (regionId: string) => 
  (state: { world: WorldState }) => 
    state.world.geography.regions.find(r => r.id === regionId);

export const selectHistoricalEventById = (eventId: string) => 
  (state: { world: WorldState }) => 
    state.world.history.timeline.find(e => e.id === eventId);

export const selectWorldStats = (state: { world: WorldState }) => ({
  regionsCount: state.world.geography.regions.length,
  historicalEventsCount: state.world.history.timeline.length,
  legendsCount: state.world.history.legends.length,
  customRulesCount: state.world.customRules.length,
  inspirationSourcesCount: state.world.inspirationSources.length
});