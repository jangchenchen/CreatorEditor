import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlotEvent } from '../types/outline.types';

export interface TimelineState {
  id: string;
  events: PlotEvent[];
  startTime: string;
  endTime: string;
  timelineNotes: string;
}

const initialState: TimelineState = {
  id: 'timeline-1',
  events: [],
  startTime: '',
  endTime: '',
  timelineNotes: ''
};

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    addPlotEvent: (state, action: PayloadAction<PlotEvent>) => {
      state.events.push(action.payload);
      // Sort by timestamp
      state.events.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    },

    updatePlotEvent: (state, action: PayloadAction<PlotEvent>) => {
      const index = state.events.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
        // Re-sort after update
        state.events.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
      }
    },

    deletePlotEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(e => e.id !== action.payload);
    },

    updateTimelineInfo: (state, action: PayloadAction<Partial<Pick<TimelineState, 'startTime' | 'endTime' | 'timelineNotes'>>>) => {
      Object.assign(state, action.payload);
    },

    reorderEvents: (state, action: PayloadAction<PlotEvent[]>) => {
      state.events = action.payload;
    },

    // Batch operations
    loadTimelineData: (state, action: PayloadAction<TimelineState>) => {
      return action.payload;
    },

    resetTimeline: (state) => {
      return { ...initialState, id: state.id };
    }
  }
});

export const {
  addPlotEvent,
  updatePlotEvent,
  deletePlotEvent,
  updateTimelineInfo,
  reorderEvents,
  loadTimelineData,
  resetTimeline
} = timelineSlice.actions;

export default timelineSlice.reducer;

// Selectors
export const selectTimeline = (state: { timeline: TimelineState }) => state.timeline;
export const selectPlotEvents = (state: { timeline: TimelineState }) => state.timeline.events;
export const selectKeyEvents = (state: { timeline: TimelineState }) => 
  state.timeline.events.filter(e => e.isKeyEvent);

export const selectEventsByType = (eventType: PlotEvent['type']) => 
  (state: { timeline: TimelineState }) => 
    state.timeline.events.filter(e => e.type === eventType);

export const selectEventsByImportance = (importance: PlotEvent['importance']) => 
  (state: { timeline: TimelineState }) => 
    state.timeline.events.filter(e => e.importance === importance);

export const selectEventsInvolvingCharacter = (characterId: string) => 
  (state: { timeline: TimelineState }) => 
    state.timeline.events.filter(e => e.characters.includes(characterId));

export const selectTimelineStats = (state: { timeline: TimelineState }) => ({
  totalEvents: state.timeline.events.length,
  keyEvents: state.timeline.events.filter(e => e.isKeyEvent).length,
  criticalEvents: state.timeline.events.filter(e => e.importance === 'critical').length,
  importantEvents: state.timeline.events.filter(e => e.importance === 'important').length,
  minorEvents: state.timeline.events.filter(e => e.importance === 'minor').length,
  beginningEvents: state.timeline.events.filter(e => e.type === 'beginning').length,
  developmentEvents: state.timeline.events.filter(e => e.type === 'development').length,
  climaxEvents: state.timeline.events.filter(e => e.type === 'climax').length,
  resolutionEvents: state.timeline.events.filter(e => e.type === 'resolution').length,
  transitionEvents: state.timeline.events.filter(e => e.type === 'transition').length
});