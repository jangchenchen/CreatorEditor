/**
 * 集成测试工具函数
 * 为CreationEditor提供专门的集成测试工具和模拟
 */
// @ts-nocheck


import React, { ReactElement } from 'react';
import { render, RenderOptions, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore, Store, combineReducers } from '@reduxjs/toolkit';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Import reducers
import { outlineReducer } from '../../src/features/outline/slices/rootOutlineSlice';
import editorReducer from '../../src/features/editor/editorSlice';

// Import middleware
import { createAutoSaveMiddleware } from '../../src/features/outline/middleware/autoSave/createAutoSaveMiddleware';
import { syncMiddleware } from '../../src/features/outline/middleware/syncMiddleware';

// Import types
import { OutlineState } from '../../src/features/outline/types/outline.types';

// 默认主题
const defaultTheme = createTheme();

// 编辑器状态接口（匹配editorSlice）
export interface EditorState {
  content: string;
  filePath: string | null;
  fileName: string | null;
  isDirty: boolean;
  wordCount: number;
  lastSaved: Date | null;
  autoSaveEnabled: boolean;
}

// 应用状态类型
export interface AppState {
  outline: OutlineState;
  editor: EditorState;
}

// 模拟浏览器存储API
export const createMockStorageAPI = () => {
  const storage: Record<string, any> = {};

  return {
    // localStorage 模拟
    localStorage: {
      getItem: jest.fn((key: string) => {
        return JSON.stringify(storage[key]) || null;
      }),
      setItem: jest.fn((key: string, value: string) => {
        storage[key] = JSON.parse(value);
      }),
      removeItem: jest.fn((key: string) => {
        delete storage[key];
      }),
      clear: jest.fn(() => {
        Object.keys(storage).forEach(key => delete storage[key]);
      }),
    },

    // 获取存储的数据（用于测试断言）
    getStoredData: (key: string) => storage[key],

    // 设置初始数据（用于测试准备）
    setInitialData: (key: string, data: any) => {
      storage[key] = data;
    },

    // 清空所有数据
    clearAll: () => {
      Object.keys(storage).forEach(key => delete storage[key]);
    },
  };
};

// 模拟文件操作API（适用于浏览器环境）
export const createMockFileAPI = () => {
  const files: Record<string, string> = {};

  return {
    // 模拟文件选择
    openFile: jest.fn(() => Promise.resolve('test-file.md')),

    // 模拟文件读取
    readFile: jest.fn((filePath: string) => {
      return Promise.resolve(files[filePath] || '# 默认内容\n\n这是一个测试文档。');
    }),

    // 模拟文件写入
    writeFile: jest.fn((filePath: string, content: string) => {
      files[filePath] = content;
      return Promise.resolve(true);
    }),

    // 模拟文件保存对话框
    saveFile: jest.fn(() => Promise.resolve('test-file.md')),

    // 获取文件内容（用于测试断言）
    getFileContent: (filePath: string) => files[filePath],

    // 设置初始文件内容
    setInitialFile: (filePath: string, content: string) => {
      files[filePath] = content;
    },

    // 模拟用户取消文件选择
    mockUserCancelFileSelection: () => {
      return jest.fn(() => Promise.resolve(null));
    },
  };
};

// 创建集成测试Store
export const createIntegrationTestStore = (
  initialState?: Partial<AppState>,
  enableMiddleware: boolean = true
): Store => {
  const rootReducer = combineReducers({
    outline: outlineReducer,
    editor: editorReducer,
  });

  const middleware = [];

  if (enableMiddleware) {
    // 添加自动保存中间件（使用较短的延迟用于测试）
    middleware.push(
      createAutoSaveMiddleware({
        debounceTime: 100, // 100ms for testing
        maxRetries: 2,
      })
    );

    // 添加同步中间件
    middleware.push(syncMiddleware);
  }

  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      }).concat(middleware),
  });
};

// 集成测试渲染选项
interface IntegrationTestRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialState?: Partial<AppState>;
  store?: Store;
  enableMiddleware?: boolean;
  mockStorage?: ReturnType<typeof createMockStorageAPI>;
  mockFileAPI?: ReturnType<typeof createMockFileAPI>;
}

// 集成测试专用渲染函数
export const renderWithIntegrationProviders = (
  ui: ReactElement,
  {
    initialState,
    store,
    enableMiddleware = true,
    mockStorage,
    mockFileAPI,
    ...renderOptions
  }: IntegrationTestRenderOptions = {}
) => {
  // 创建或使用提供的store
  const testStore = store || createIntegrationTestStore(initialState, enableMiddleware);

  // 设置全局模拟
  if (mockStorage) {
    Object.defineProperty(global, 'localStorage', {
      value: mockStorage.localStorage,
      writable: true,
    });
  }

  if (mockFileAPI) {
    // 在浏览器环境中，可能需要模拟文件下载/上传API
    global.URL.createObjectURL = jest.fn(() => 'mock-url');
    global.URL.revokeObjectURL = jest.fn();

    // 模拟文件输入元素
    HTMLInputElement.prototype.click = jest.fn();
  }

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <Provider store={testStore}>
        <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
      </Provider>
    );
  };

  const renderResult = render(ui, { wrapper: Wrapper, ...renderOptions });

  return {
    store: testStore,
    mockStorage,
    mockFileAPI,
    ...renderResult,
  };
};

// 等待Redux中间件处理完成
export const waitForMiddlewareToProcess = async (ms: number = 200) => {
  await new Promise(resolve => setTimeout(resolve, ms));
};

// 等待自动保存完成
export const waitForAutoSaveToComplete = async (store: Store, timeout: number = 1000) => {
  const startTime = Date.now();

  return waitFor(
    () => {
      const state = store.getState() as AppState;
      const isDirty = (state.outline as any)?.isDirty || (state.editor as any)?.isDirty;

      if (!isDirty) {
        return; // 自动保存已完成
      }

      if (Date.now() - startTime > timeout) {
        throw new Error('Auto-save did not complete within timeout');
      }

      throw new Error('Still waiting for auto-save to complete');
    },
    { timeout }
  );
};

// 模拟用户交互工具
export class UserInteractionHelper {
  private user = userEvent.setup();

  // 模拟用户输入文本
  async typeText(element: HTMLElement, text: string) {
    await this.user.clear(element);
    await this.user.type(element, text);
  }

  // 模拟用户点击按钮
  async clickButton(buttonText: string | RegExp) {
    try {
      const button = screen.getByRole('button', { name: buttonText });
      await this.user.click(button);
    } catch (error) {
      // 如果找不到button，尝试找clickable element
      const clickable = screen.getByText(buttonText);
      await this.user.click(clickable);
    }
  }

  // 模拟用户选择标签
  async switchTab(tabName: string | RegExp) {
    const tab = screen.getByRole('tab', { name: tabName });
    await this.user.click(tab);
  }

  // 模拟用户在编辑器中输入
  async typeInEditor(text: string, selector: string = '[contenteditable="true"]') {
    const editor = document.querySelector(selector);
    if (!editor) {
      throw new Error(`Editor not found with selector: ${selector}`);
    }

    await this.user.clear(editor as HTMLElement);
    await this.user.type(editor as HTMLElement, text);
  }

  // 模拟用户填写表单
  async fillForm(formData: Record<string, string>) {
    for (const [fieldName, value] of Object.entries(formData)) {
      const field = screen.getByLabelText(new RegExp(fieldName, 'i'));
      await this.typeText(field, value);
    }
  }

  // 模拟用户提交表单
  async submitForm() {
    const submitButton = screen.getByRole('button', { name: /保存|提交|确定|添加/i });
    await this.user.click(submitButton);
  }
}

// 创建用户交互助手实例
export const createUserInteractionHelper = () => new UserInteractionHelper();

// 测试数据工厂
export const createTestData = {
  // 创建测试大纲状态
  outlineState: (overrides?: Partial<OutlineState>): OutlineState =>
    ({
      id: 'test-outline',
      project: {
        id: 'test-project',
        name: '测试小说项目',
        description: '用于集成测试的项目',
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
          socialEnvironment: '测试社会环境',
          historicalContext: '测试历史背景',
        },
        coreTheme: {
          theme: '测试主题',
          conflict: '测试冲突',
          message: '测试信息',
          keywords: ['测试', '集成'],
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
    }) as OutlineState,

  // 创建测试编辑器状态
  editorState: (overrides?: Partial<EditorState>): EditorState => ({
    content: '# 测试文档\n\n这是测试内容。',
    filePath: '/test/test-document.md',
    fileName: 'test-document.md',
    isDirty: false,
    wordCount: 8,
    lastSaved: new Date(),
    autoSaveEnabled: true,
    ...overrides,
  }),
};

// 导出所有testing-library工具
export * from '@testing-library/react';
export { renderWithIntegrationProviders as render };
