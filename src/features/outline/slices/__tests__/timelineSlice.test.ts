/**
 * TimelineSlice 单元测试
 * 测试时间线事件模块的Redux状态管理
 */

import { configureStore } from '@reduxjs/toolkit';
import {
  timelineSlice,
  addPlotEvent,
  updatePlotEvent,
  deletePlotEvent,
  updateTimelineSettings,
  selectTimelineEvents,
  selectTimelineSettings,
} from '../timelineSlice';
import { createMockOutlineState } from '../../../../../tests/utils/testUtils';
import { mockPlotEvent, mockEvents } from '../../../../../tests/fixtures/outlineData';
import type { PlotEvent } from '../../types/outline.types';

describe('timelineSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        outline: (state = createMockOutlineState()) => state,
      },
    });
  });

  describe('actions', () => {
    it('should create addPlotEvent action', () => {
      const action = addPlotEvent(mockPlotEvent);

      expect(action.type).toBe('timeline/addPlotEvent');
      expect(action.payload).toEqual(mockPlotEvent);
    });

    it('should create updatePlotEvent action', () => {
      const updates = { title: '更新的事件', importance: 'minor' as const };
      const action = updatePlotEvent({ id: 'event-001', updates });

      expect(action.type).toBe('timeline/updatePlotEvent');
      expect(action.payload).toEqual({ id: 'event-001', updates });
    });

    it('should create deletePlotEvent action', () => {
      const action = deletePlotEvent('event-001');

      expect(action.type).toBe('timeline/deletePlotEvent');
      expect(action.payload).toBe('event-001');
    });

    it('should create updateTimelineSettings action', () => {
      const settings = { startTime: '2025-01-01', endTime: '2025-12-31' };
      const action = updateTimelineSettings(settings);

      expect(action.type).toBe('timeline/updateTimelineSettings');
      expect(action.payload).toEqual(settings);
    });
  });

  describe('reducer', () => {
    const initialState = {
      id: '',
      events: [],
      startTime: '',
      endTime: '',
      timelineNotes: '',
    };

    it('should return initial state', () => {
      const state = timelineSlice.reducer(undefined, { type: '@@INIT' });

      expect(state.events).toEqual([]);
      expect(state.startTime).toBe('');
      expect(state.endTime).toBe('');
    });

    it('should handle addPlotEvent', () => {
      const action = addPlotEvent(mockPlotEvent);
      const newState = timelineSlice.reducer(initialState, action);

      expect(newState.events).toHaveLength(1);
      expect(newState.events[0]).toEqual(mockPlotEvent);
    });

    it('should handle updatePlotEvent', () => {
      const stateWithEvent = {
        ...initialState,
        events: [mockPlotEvent],
      };

      const updates = {
        title: '英雄崛起',
        importance: 'critical' as const,
        description: '主角觉醒力量',
      };
      const action = updatePlotEvent({ id: 'event-001', updates });
      const newState = timelineSlice.reducer(stateWithEvent, action);

      expect(newState.events).toHaveLength(1);
      expect(newState.events[0].title).toBe('英雄崛起');
      expect(newState.events[0].importance).toBe('critical');
      expect(newState.events[0].description).toBe('主角觉醒力量');
      expect(newState.events[0].lastUpdated).toBeInstanceOf(Date);
    });

    it('should handle deletePlotEvent', () => {
      const stateWithEvents = {
        ...initialState,
        events: mockEvents,
      };

      const action = deletePlotEvent('event-001');
      const newState = timelineSlice.reducer(stateWithEvents, action);

      expect(newState.events).toHaveLength(1);
      expect(newState.events[0].id).toBe('event-002');
    });

    it('should handle updateTimelineSettings', () => {
      const settings = {
        startTime: '2025-01-01',
        endTime: '2025-12-31',
        timelineNotes: '新的时间线设置',
      };
      const action = updateTimelineSettings(settings);
      const newState = timelineSlice.reducer(initialState, action);

      expect(newState.startTime).toBe('2025-01-01');
      expect(newState.endTime).toBe('2025-12-31');
      expect(newState.timelineNotes).toBe('新的时间线设置');
    });

    it('should not update non-existent event', () => {
      const updates = { title: '不存在的事件' };
      const action = updatePlotEvent({ id: 'nonexistent', updates });
      const newState = timelineSlice.reducer(initialState, action);

      expect(newState).toEqual(initialState);
    });

    it('should sort events by timestamp when adding', () => {
      const event1: PlotEvent = {
        ...mockPlotEvent,
        id: 'event-1',
        timestamp: '2024-01-02T00:00:00.000Z',
      };

      const event2: PlotEvent = {
        ...mockPlotEvent,
        id: 'event-2',
        timestamp: '2024-01-01T00:00:00.000Z',
      };

      let state = timelineSlice.reducer(initialState, addPlotEvent(event1));
      state = timelineSlice.reducer(state, addPlotEvent(event2));

      expect(state.events).toHaveLength(2);
      expect(state.events[0].id).toBe('event-2'); // 较早的时间应该排在前面
      expect(state.events[1].id).toBe('event-1');
    });
  });

  describe('selectors', () => {
    it('should select timeline events from state', () => {
      const mockState = {
        outline: createMockOutlineState({
          timeline: {
            id: 'test-timeline',
            events: mockEvents,
            startTime: '2024-01-01',
            endTime: '2024-12-31',
            timelineNotes: '测试时间线',
          },
        }),
      };

      const events = selectTimelineEvents(mockState as any);

      expect(events).toEqual(mockEvents);
    });

    it('should select timeline settings from state', () => {
      const mockState = {
        outline: createMockOutlineState({
          timeline: {
            id: 'test-timeline',
            events: [],
            startTime: '2024-01-01',
            endTime: '2024-12-31',
            timelineNotes: '测试时间线设置',
          },
        }),
      };

      const settings = selectTimelineSettings(mockState as any);

      expect(settings).toEqual({
        id: 'test-timeline',
        startTime: '2024-01-01',
        endTime: '2024-12-31',
        timelineNotes: '测试时间线设置',
      });
    });

    it('should filter events by type', () => {
      const criticalEvent: PlotEvent = {
        ...mockPlotEvent,
        id: 'critical-event',
        importance: 'critical',
      };

      const minorEvent: PlotEvent = {
        ...mockPlotEvent,
        id: 'minor-event',
        importance: 'minor',
      };

      const mockState = {
        outline: createMockOutlineState({
          timeline: {
            id: 'test-timeline',
            events: [criticalEvent, minorEvent],
            startTime: '2024-01-01',
            endTime: '2024-12-31',
            timelineNotes: '',
          },
        }),
      };

      const events = selectTimelineEvents(mockState as any);
      const criticalEvents = events.filter(e => e.importance === 'critical');

      expect(criticalEvents).toHaveLength(1);
      expect(criticalEvents[0].id).toBe('critical-event');
    });
  });
});
