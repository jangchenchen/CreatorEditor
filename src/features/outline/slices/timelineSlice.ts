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
  timelineNotes: '',
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

    updatePlotEvent: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<PlotEvent> }>
    ) => {
      const index = state.events.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = { ...state.events[index], ...action.payload.updates };
        // Re-sort after update
        state.events.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
      }
    },

    deletePlotEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(e => e.id !== action.payload);
    },

    updateTimelineInfo: (
      state,
      action: PayloadAction<Partial<Pick<TimelineState, 'startTime' | 'endTime' | 'timelineNotes'>>>
    ) => {
      Object.assign(state, action.payload);
    },

    updateTimelineSettings: (
      state,
      action: PayloadAction<Partial<Pick<TimelineState, 'startTime' | 'endTime' | 'timelineNotes'>>>
    ) => {
      Object.assign(state, action.payload);
    },

    reorderEvents: (state, action: PayloadAction<PlotEvent[]>) => {
      state.events = action.payload;
    },

    // Batch operations
    loadTimelineData: (state, action: PayloadAction<TimelineState>) => {
      return action.payload;
    },

    resetTimeline: state => {
      return { ...initialState, id: state.id };
    },
  },
});

export const {
  addPlotEvent,
  updatePlotEvent,
  deletePlotEvent,
  updateTimelineInfo,
  updateTimelineSettings,
  reorderEvents,
  loadTimelineData,
  resetTimeline,
} = timelineSlice.actions;

export { timelineSlice };
export default timelineSlice.reducer;

// Selectors
export const selectTimeline = (state: { outline: { timeline: TimelineState } }) =>
  state.outline.timeline;
export const selectPlotEvents = (state: { outline: { timeline: TimelineState } }) =>
  state.outline.timeline.events;
export const selectTimelineEvents = (state: { outline: { timeline: TimelineState } }) =>
  state.outline.timeline.events;
export const selectTimelineSettings = (state: { outline: { timeline: TimelineState } }) => ({
  id: state.outline.timeline.id,
  startTime: state.outline.timeline.startTime,
  endTime: state.outline.timeline.endTime,
  timelineNotes: state.outline.timeline.timelineNotes,
});
export const selectKeyEvents = (state: { outline: { timeline: TimelineState } }) =>
  state.outline.timeline.events.filter(e => e.isKeyEvent);

export const selectEventsByType =
  (eventType: PlotEvent['type']) => (state: { outline: { timeline: TimelineState } }) =>
    state.outline.timeline.events.filter(e => e.type === eventType);

export const selectEventsByImportance =
  (importance: PlotEvent['importance']) => (state: { outline: { timeline: TimelineState } }) =>
    state.outline.timeline.events.filter(e => e.importance === importance);

export const selectEventsInvolvingCharacter =
  (characterId: string) => (state: { outline: { timeline: TimelineState } }) =>
    state.outline.timeline.events.filter(e => e.characters.includes(characterId));

export const selectTimelineStats = (state: { outline: { timeline: TimelineState } }) => ({
  totalEvents: state.outline.timeline.events.length,
  keyEvents: state.outline.timeline.events.filter(e => e.isKeyEvent).length,
  criticalEvents: state.outline.timeline.events.filter(e => e.importance === 'critical').length,
  importantEvents: state.outline.timeline.events.filter(e => e.importance === 'important').length,
  minorEvents: state.outline.timeline.events.filter(e => e.importance === 'minor').length,
  beginningEvents: state.outline.timeline.events.filter(e => e.type === 'beginning').length,
  developmentEvents: state.outline.timeline.events.filter(e => e.type === 'development').length,
  climaxEvents: state.outline.timeline.events.filter(e => e.type === 'climax').length,
  resolutionEvents: state.outline.timeline.events.filter(e => e.type === 'resolution').length,
  transitionEvents: state.outline.timeline.events.filter(e => e.type === 'transition').length,
});
