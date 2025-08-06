/**
 * 测试工具函数
 * 提供常用的测试辅助函数和渲染工具
 */
// @ts-nocheck


import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, Store } from '@reduxjs/toolkit';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { outlineReducer } from '../../src/features/outline/slices/rootOutlineSlice';
import { OutlineState } from '../../src/features/outline/types/outline.types';

// 默认主题
const defaultTheme = createTheme();

// 默认状态
export const createMockOutlineState = (overrides: Partial<OutlineState> = {}): OutlineState => ({
  id: 'test-outline',
  project: {
    id: 'test-project',
    name: '测试项目',
    description: '测试用的项目',
    author: '测试作者',
    genre: '测试类型',
    targetWordCount: 50000,
    createdAt: new Date('2024-01-01'),
    lastUpdated: new Date('2024-01-01'),
  },
  story: {
    id: 'test-story',
    background: {
      era: '现代',
      location: '测试城市',
      socialEnvironment: '测试环境',
      historicalContext: '测试背景',
    },
    coreTheme: {
      theme: '测试主题',
      conflict: '测试冲突',
      message: '测试信息',
      keywords: ['测试'],
    },
    synopsis: {
      beginning: '测试开始',
      development: '测试发展',
      climax: '测试高潮',
      ending: '测试结局',
      overallTone: '测试基调',
    },
    lastUpdated: new Date('2024-01-01'),
  },
  characters: {
    characters: [],
    relationships: [],
  },
  timeline: {
    id: 'test-timeline',
    events: [],
    startTime: '2024-01-01',
    endTime: '2024-12-31',
    timelineNotes: '测试时间线',
  },
  chapters: {
    id: 'test-chapters',
    chapters: [],
    totalChapters: 0,
    overallStructure: '测试结构',
  },
  world: {
    id: 'test-world',
    geography: {
      regions: [],
      climate: '温带气候',
      landmarks: [],
      naturalFeatures: [],
    },
    society: {
      political: '民主制',
      economic: '市场经济',
      cultural: ['多元文化'],
      religious: '信仰自由',
      technology: '现代科技',
      socialClasses: ['平民'],
    },
    history: {
      timeline: [],
      legends: [],
      familySecrets: [],
      mysteries: [],
    },
    customRules: [],
    inspirationSources: [],
  },
  subplots: {
    id: 'test-subplots',
    subplots: [],
    secondaryStories: [],
    weavingStrategy: '并行发展',
  },
  ideas: {
    id: 'test-ideas',
    ideas: [],
    alternatives: [],
    inspirationSources: [],
    brainstormingSessions: [],
  },
  themes: {
    id: 'test-themes',
    themes: {
      primary: '测试主题',
      secondary: [],
      symbols: [],
      metaphors: [],
      motifs: [],
    },
    characterMotivations: [],
    philosophicalQuestions: [],
    socialCommentary: [],
    personalReflections: [],
  },
  ...overrides,
});

// 创建测试Store
export const createTestStore = (initialState?: Partial<OutlineState>): Store => {
  return configureStore({
    reducer: {
      outline: outlineReducer,
    },
    preloadedState: {
      outline: createMockOutlineState(initialState),
    },
  });
};

// 自定义渲染函数
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialState?: Partial<OutlineState>;
  store?: Store;
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    initialState,
    store = createTestStore(initialState),
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
      </Provider>
    );
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

// 等待异步操作完成
export const waitForAsync = (ms: number = 100) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// 模拟用户输入
export const createMockChangeEvent = (value: string) =>
  ({
    target: { value },
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  }) as any;

// 导出所有 testing-library 的工具
export * from '@testing-library/react';
export { renderWithProviders as render };
