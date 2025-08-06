/**
 * Jest 测试环境设置
 * 配置全局测试环境和工具
 */

import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Enhanced localStorage mock for integration tests
const createStorageMock = () => {
  const storage: Record<string, string> = {};
  
  return {
    getItem: jest.fn((key: string) => storage[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      storage[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete storage[key];
    }),
    clear: jest.fn(() => {
      Object.keys(storage).forEach(key => delete storage[key]);
    }),
    key: jest.fn((index: number) => Object.keys(storage)[index] || null),
    get length() {
      return Object.keys(storage).length;
    },
    // Helper methods for testing
    _getStorage: () => storage,
    _setStorage: (newStorage: Record<string, string>) => {
      Object.keys(storage).forEach(key => delete storage[key]);
      Object.assign(storage, newStorage);
    }
  };
};

const localStorageMock = createStorageMock();
const sessionStorageMock = createStorageMock();

global.localStorage = localStorageMock as any;
global.sessionStorage = sessionStorageMock as any;

// Mock IndexedDB for browser storage tests
const mockIndexedDB = {
  open: jest.fn(),
  deleteDatabase: jest.fn(),
  cmp: jest.fn(),
};
global.indexedDB = mockIndexedDB as any;

// Mock File API for file operations
global.File = jest.fn().mockImplementation((content, filename, options) => ({
  name: filename,
  size: content.length,
  type: options?.type || 'text/plain',
  lastModified: Date.now(),
  arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(content.length)),
  text: jest.fn().mockResolvedValue(content.join ? content.join('') : content),
  stream: jest.fn(),
  slice: jest.fn()
})) as any;

// Mock FileReader for file reading operations
global.FileReader = jest.fn().mockImplementation(() => ({
  readAsText: jest.fn(),
  readAsArrayBuffer: jest.fn(),
  readAsDataURL: jest.fn(),
  onload: null,
  onerror: null,
  onabort: null,
  onloadstart: null,
  onloadend: null,
  onprogress: null,
  result: null,
  error: null,
  readyState: 0,
  abort: jest.fn()
})) as any;

// Mock Blob for file operations
global.Blob = jest.fn().mockImplementation((content, options) => ({
  size: content?.length || 0,
  type: options?.type || 'text/plain',
  arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(content?.length || 0)),
  text: jest.fn().mockResolvedValue(content?.join ? content.join('') : content || ''),
  stream: jest.fn(),
  slice: jest.fn()
})) as any;

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mocked-url');
global.URL.revokeObjectURL = jest.fn();

// Mock HTMLAnchorElement.click
HTMLAnchorElement.prototype.click = jest.fn();

// 增加 Jest 超时时间
jest.setTimeout(10000);

// 清理函数 - 每个测试后重置所有模拟
afterEach(() => {
  jest.clearAllMocks();
  localStorageMock.clear();
  sessionStorageMock.clear();
  
  // 清理文件操作模拟
  (global.URL.createObjectURL as jest.Mock).mockClear();
  (global.URL.revokeObjectURL as jest.Mock).mockClear();
  
  // 重置 timers（用于测试自动保存等定时功能）
  if (jest.isMockFunction(setTimeout)) {
    jest.clearAllTimers();
  }
});

// 在测试开始前设置模拟定时器
beforeEach(() => {
  // 为自动保存测试提供假时钟支持
  jest.useFakeTimers({ advanceTimers: true });
});

// 测试结束后恢复真实定时器
afterAll(() => {
  jest.useRealTimers();
});

// 全局错误处理
global.console = {
  ...console,
  // 在测试中减少噪音
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};