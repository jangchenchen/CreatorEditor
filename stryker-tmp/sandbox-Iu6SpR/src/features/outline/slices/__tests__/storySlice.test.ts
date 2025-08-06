/**
 * StorySlice 单元测试
 * 测试故事模块的Redux状态管理
 */
// @ts-nocheck


import { configureStore } from '@reduxjs/toolkit';
import {
  storySlice,
  updateStoryBackground,
  updateCoreTheme,
  updateSynopsis,
  selectStory,
} from '../storySlice';
import { createMockOutlineState } from '../../../../../tests/utils/testUtils';
import type { StoryBackground, CoreTheme, Synopsis } from '../../types/outline.types';

describe('storySlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        outline: (state = createMockOutlineState()) => state,
      },
    });
  });

  describe('actions', () => {
    it('should create updateStoryBackground action', () => {
      const background: StoryBackground = {
        era: '未来',
        location: '火星',
        socialEnvironment: '殖民地',
        historicalContext: '太空时代',
      };

      const action = updateStoryBackground(background);

      expect(action.type).toBe('story/updateStoryBackground');
      expect(action.payload).toEqual(background);
    });

    it('should create updateCoreTheme action', () => {
      const theme: CoreTheme = {
        theme: '科技与人性',
        conflict: '技术进步与道德伦理的冲突',
        message: '科技应该服务于人类',
        keywords: ['科技', '人性', '伦理'],
      };

      const action = updateCoreTheme(theme);

      expect(action.type).toBe('story/updateCoreTheme');
      expect(action.payload).toEqual(theme);
    });

    it('should create updateSynopsis action', () => {
      const synopsis: Synopsis = {
        beginning: '太空殖民开始',
        development: '发现外星生命',
        climax: '与外星人的冲突',
        ending: '达成和平协议',
        overallTone: '科幻冒险',
      };

      const action = updateSynopsis(synopsis);

      expect(action.type).toBe('story/updateSynopsis');
      expect(action.payload).toEqual(synopsis);
    });
  });

  describe('reducer', () => {
    it('should return initial state', () => {
      const state = storySlice.reducer(undefined, { type: '@@INIT' });

      expect(state).toBeDefined();
      expect(state.id).toBe('');
      expect(state.background.era).toBe('');
    });

    it('should handle updateStoryBackground', () => {
      const initialState = {
        id: 'test-story',
        background: {
          era: '现代',
          location: '城市',
          socialEnvironment: '和平',
          historicalContext: '现代社会',
        },
        coreTheme: {
          theme: '成长',
          conflict: '内心冲突',
          message: '勇敢面对',
          keywords: ['成长'],
        },
        synopsis: {
          beginning: '开始',
          development: '发展',
          climax: '高潮',
          ending: '结局',
          overallTone: '积极',
        },
        lastUpdated: new Date(),
      };

      const newBackground: StoryBackground = {
        era: '未来',
        location: '太空站',
        socialEnvironment: '科技社会',
        historicalContext: '太空殖民时代',
      };

      const action = updateStoryBackground(newBackground);
      const newState = storySlice.reducer(initialState, action);

      expect(newState.background).toEqual(newBackground);
      expect(newState.lastUpdated).toBeInstanceOf(Date);
    });

    it('should handle updateCoreTheme', () => {
      const initialState = {
        id: 'test-story',
        background: {
          era: '现代',
          location: '城市',
          socialEnvironment: '和平',
          historicalContext: '现代社会',
        },
        coreTheme: {
          theme: '成长',
          conflict: '内心冲突',
          message: '勇敢面对',
          keywords: ['成长'],
        },
        synopsis: {
          beginning: '开始',
          development: '发展',
          climax: '高潮',
          ending: '结局',
          overallTone: '积极',
        },
        lastUpdated: new Date(),
      };

      const newTheme: CoreTheme = {
        theme: '科技与伦理',
        conflict: '进步与道德的较量',
        message: '科技需要道德约束',
        keywords: ['科技', '伦理', '道德'],
      };

      const action = updateCoreTheme(newTheme);
      const newState = storySlice.reducer(initialState, action);

      expect(newState.coreTheme).toEqual(newTheme);
      expect(newState.lastUpdated).toBeInstanceOf(Date);
    });

    it('should handle updateSynopsis', () => {
      const initialState = {
        id: 'test-story',
        background: {
          era: '现代',
          location: '城市',
          socialEnvironment: '和平',
          historicalContext: '现代社会',
        },
        coreTheme: {
          theme: '成长',
          conflict: '内心冲突',
          message: '勇敢面对',
          keywords: ['成长'],
        },
        synopsis: {
          beginning: '开始',
          development: '发展',
          climax: '高潮',
          ending: '结局',
          overallTone: '积极',
        },
        lastUpdated: new Date(),
      };

      const newSynopsis: Synopsis = {
        beginning: '宇宙探索开始',
        development: '遭遇未知文明',
        climax: '星际战争爆发',
        ending: '建立和平联盟',
        overallTone: '史诗科幻',
      };

      const action = updateSynopsis(newSynopsis);
      const newState = storySlice.reducer(initialState, action);

      expect(newState.synopsis).toEqual(newSynopsis);
      expect(newState.lastUpdated).toBeInstanceOf(Date);
    });
  });

  describe('selectors', () => {
    it('should select story from state', () => {
      const mockState = {
        outline: createMockOutlineState(),
      };

      const story = selectStory(mockState as any);

      expect(story).toBeDefined();
      expect(story.id).toBe('test-story');
      expect(story.background).toBeDefined();
      expect(story.coreTheme).toBeDefined();
      expect(story.synopsis).toBeDefined();
    });
  });
});
