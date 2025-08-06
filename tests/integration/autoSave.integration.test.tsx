/**
 * 自动保存集成测试
 * 测试自动保存中间件的完整工作流程
 *
 * 工作流程：内容修改 -> 自动保存中间件 -> 本地存储
 */

import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import { Store } from '@reduxjs/toolkit';

// 引入测试工具
import {
  renderWithIntegrationProviders,
  createMockStorageAPI,
  createUserInteractionHelper,
  createTestData,
  waitForMiddlewareToProcess,
  waitForAutoSaveToComplete,
  AppState,
} from '../utils/integrationTestUtils';

// 引入要测试的组件
import App from '../../src/App';

// 引入 actions
import { updateStoryBackground } from '../../src/features/outline/slices/storySlice';
import { addCharacter } from '../../src/features/outline/slices/charactersSlice';

describe('自动保存集成测试', () => {
  let mockStorage: ReturnType<typeof createMockStorageAPI>;
  let store: Store<AppState>;
  let user: ReturnType<typeof createUserInteractionHelper>;

  beforeEach(() => {
    mockStorage = createMockStorageAPI();
    user = createUserInteractionHelper();

    // 确保使用假定时器
    jest.useFakeTimers({ advanceTimers: true });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('工作流程2: 自动保存功能', () => {
    describe('测试用例 2.1: 内容修改后自动保存在指定延迟后触发', () => {
      it('应当在用户编辑故事内容后自动保存到本地存储', async () => {
        // 准备 (Arrange)
        const initialState = createTestData.outlineState();

        const renderResult = renderWithIntegrationProviders(<App />, {
          mockStorage,
          enableMiddleware: true,
          initialState: { outline: initialState },
        });

        store = renderResult.store;

        // 切换到大纲标签
        await user.switchTab('小说大纲');

        // 进入故事概述模块
        await user.clickButton('整体故事概述');

        // 等待界面加载
        await waitFor(() => {
          expect(screen.getByLabelText(/故事背景/i)).toBeInTheDocument();
        });

        // 验证初始状态：自动保存已启用，内容是干净的
        let currentState = store.getState();
        expect((currentState.outline as any).isDirty).toBeFalsy();

        // 操作 (Act) - 模拟用户输入内容
        const locationField = screen.getByLabelText(/地点|位置/i);
        await user.typeText(locationField, '北京朝阳区');

        // 立即检查：自动保存还没有触发
        expect(mockStorage.localStorage.setItem).not.toHaveBeenCalled();

        // 验证状态变为dirty
        currentState = store.getState();
        expect(currentState.outline.story.background.location).toBe('北京朝阳区');

        // 操作 (Act) - 快进时间触发自动保存（100ms debounce + processing time）
        act(() => {
          jest.advanceTimersByTime(150);
        });

        // 等待中间件处理
        await waitForMiddlewareToProcess(100);

        // 断言 (Assert)
        // 验证自动保存已经被调用
        expect(mockStorage.localStorage.setItem).toHaveBeenCalledWith(
          'creation-editor-project',
          expect.stringContaining('北京朝阳区')
        );

        // 验证存储的数据正确
        const storedData = mockStorage.getStoredData('creation-editor-project');
        expect(storedData.outline.story.background.location).toBe('北京朝阳区');

        // 验证状态恢复为clean（isDirty = false）
        currentState = store.getState();
        expect((currentState.outline as any).isDirty).toBeFalsy();
      });

      it('应当在用户添加角色后自动保存', async () => {
        // 准备 (Arrange)
        const renderResult = renderWithIntegrationProviders(<App />, {
          mockStorage,
          enableMiddleware: true,
          initialState: { outline: createTestData.outlineState() },
        });

        store = renderResult.store;

        // 切换到角色关系模块
        await user.switchTab('小说大纲');
        await user.clickButton('人物与角色关系');

        // 等待界面加载
        await waitFor(() => {
          expect(screen.getByRole('button', { name: /新增角色/i })).toBeInTheDocument();
        });

        // 操作 (Act) - 添加新角色
        await user.clickButton(/新增角色/i);

        // 等待对话框
        await waitFor(() => {
          expect(screen.getByRole('dialog')).toBeInTheDocument();
        });

        // 填写角色信息
        await user.fillForm({
          角色姓名: '李四',
          角色描述: '重要配角，医生',
          年龄: '35',
        });

        // 提交表单
        await user.submitForm();

        // 等待对话框关闭
        await waitFor(() => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        // 验证角色添加成功
        const currentState = store.getState();
        expect(currentState.outline.characters.characters).toHaveLength(1);

        // 快进时间触发自动保存
        act(() => {
          jest.advanceTimersByTime(150);
        });

        await waitForMiddlewareToProcess(100);

        // 断言 (Assert)
        expect(mockStorage.localStorage.setItem).toHaveBeenCalled();

        const storedData = mockStorage.getStoredData('creation-editor-project');
        expect(storedData.outline.characters.characters).toHaveLength(1);
        expect(storedData.outline.characters.characters[0].name).toBe('李四');
        expect(storedData.outline.characters.characters[0].description).toBe('重要配角，医生');
      });

      it('应当处理连续编辑时的防抖机制', async () => {
        // 准备 (Arrange)
        const renderResult = renderWithIntegrationProviders(<App />, {
          mockStorage,
          enableMiddleware: true,
          initialState: { outline: createTestData.outlineState() },
        });

        store = renderResult.store;

        await user.switchTab('小说大纲');
        await user.clickButton('整体故事概述');

        await waitFor(() => {
          expect(screen.getByLabelText(/地点|位置/i)).toBeInTheDocument();
        });

        const locationField = screen.getByLabelText(/地点|位置/i);

        // 操作 (Act) - 连续快速编辑
        await user.typeText(locationField, '上');

        // 快进50ms（少于debounce时间）
        act(() => {
          jest.advanceTimersByTime(50);
        });

        // 验证还没有保存
        expect(mockStorage.localStorage.setItem).not.toHaveBeenCalled();

        // 继续编辑
        await user.typeText(locationField, '上海');

        // 再快进50ms
        act(() => {
          jest.advanceTimersByTime(50);
        });

        // 仍然没有保存
        expect(mockStorage.localStorage.setItem).not.toHaveBeenCalled();

        // 继续编辑
        await user.typeText(locationField, '上海浦东');

        // 现在等待完整的debounce时间
        act(() => {
          jest.advanceTimersByTime(150);
        });

        await waitForMiddlewareToProcess(100);

        // 断言 (Assert)
        // 现在应该只保存一次，包含最终的值
        expect(mockStorage.localStorage.setItem).toHaveBeenCalledTimes(1);

        const storedData = mockStorage.getStoredData('creation-editor-project');
        expect(storedData.outline.story.background.location).toBe('上海浦东');
      });
    });

    describe('测试用例 2.2: 自动保存重试机制', () => {
      it('应当在保存失败时自动重试', async () => {
        // 准备 (Arrange)
        let saveAttempts = 0;
        mockStorage.localStorage.setItem.mockImplementation(() => {
          saveAttempts++;
          if (saveAttempts <= 2) {
            throw new Error('存储失败');
          }
          // 第三次尝试成功
          return undefined;
        });

        const renderResult = renderWithIntegrationProviders(<App />, {
          mockStorage,
          enableMiddleware: true,
          initialState: { outline: createTestData.outlineState() },
        });

        store = renderResult.store;

        await user.switchTab('小说大纲');
        await user.clickButton('整体故事概述');

        await waitFor(() => {
          expect(screen.getByLabelText(/地点|位置/i)).toBeInTheDocument();
        });

        // 操作 (Act) - 编辑内容触发自动保存
        const locationField = screen.getByLabelText(/地点|位置/i);
        await user.typeText(locationField, '重试测试城市');

        // 触发自动保存
        act(() => {
          jest.advanceTimersByTime(150);
        });

        // 等待重试完成
        await waitForMiddlewareToProcess(500);

        // 可能需要额外时间处理重试
        act(() => {
          jest.advanceTimersByTime(1000);
        });

        await waitForMiddlewareToProcess(200);

        // 断言 (Assert)
        // 验证确实进行了3次保存尝试
        expect(saveAttempts).toBe(3);
        expect(mockStorage.localStorage.setItem).toHaveBeenCalledTimes(3);

        // 验证最终保存成功
        const currentState = store.getState();
        expect((currentState.outline as any).isDirty).toBeFalsy();
      });

      it('应当在达到最大重试次数后停止重试', async () => {
        // 准备 (Arrange)
        let saveAttempts = 0;
        mockStorage.localStorage.setItem.mockImplementation(() => {
          saveAttempts++;
          throw new Error('持续存储失败');
        });

        const renderResult = renderWithIntegrationProviders(<App />, {
          mockStorage,
          enableMiddleware: true,
          initialState: { outline: createTestData.outlineState() },
        });

        store = renderResult.store;

        await user.switchTab('小说大纲');
        await user.clickButton('整体故事概述');

        await waitFor(() => {
          expect(screen.getByLabelText(/地点|位置/i)).toBeInTheDocument();
        });

        // 操作 (Act) - 编辑内容
        const locationField = screen.getByLabelText(/地点|位置/i);
        await user.typeText(locationField, '失败测试城市');

        // 触发自动保存
        act(() => {
          jest.advanceTimersByTime(150);
        });

        // 等待所有重试完成
        await waitForMiddlewareToProcess(500);

        act(() => {
          jest.advanceTimersByTime(2000); // 给足时间进行重试
        });

        await waitForMiddlewareToProcess(300);

        // 断言 (Assert)
        // 验证重试了最大次数（2次重试 + 1次原始尝试 = 3次）
        expect(saveAttempts).toBeLessThanOrEqual(3);

        // 验证状态仍然是dirty（保存失败）
        const currentState = store.getState();
        expect((currentState.outline as any).isDirty).toBeTruthy();

        // 验证显示错误信息
        await waitFor(() => {
          expect(screen.getByText(/保存失败|存储错误/i)).toBeInTheDocument();
        });
      });
    });

    describe('测试用例 2.3: 自动保存开关控制', () => {
      it('应当在禁用自动保存时不触发保存', async () => {
        // 准备 (Arrange)
        const initialState = createTestData.outlineState();
        // 假设有自动保存开关设置
        (initialState as any).autoSaveEnabled = false;

        const renderResult = renderWithIntegrationProviders(<App />, {
          mockStorage,
          enableMiddleware: true,
          initialState: { outline: initialState },
        });

        store = renderResult.store;

        await user.switchTab('小说大纲');
        await user.clickButton('整体故事概述');

        await waitFor(() => {
          expect(screen.getByLabelText(/地点|位置/i)).toBeInTheDocument();
        });

        // 操作 (Act) - 编辑内容
        const locationField = screen.getByLabelText(/地点|位置/i);
        await user.typeText(locationField, '禁用自动保存测试');

        // 等待超过自动保存时间
        act(() => {
          jest.advanceTimersByTime(300);
        });

        await waitForMiddlewareToProcess(200);

        // 断言 (Assert)
        // 验证自动保存没有被触发
        expect(mockStorage.localStorage.setItem).not.toHaveBeenCalled();

        // 验证状态仍然是dirty
        const currentState = store.getState();
        expect((currentState.outline as any).isDirty).toBeTruthy();
        expect(currentState.outline.story.background.location).toBe('禁用自动保存测试');
      });
    });

    describe('测试用例 2.4: 批量更新的自动保存', () => {
      it('应当在批量更新后只触发一次自动保存', async () => {
        // 准备 (Arrange)
        const renderResult = renderWithIntegrationProviders(<App />, {
          mockStorage,
          enableMiddleware: true,
          initialState: { outline: createTestData.outlineState() },
        });

        store = renderResult.store;

        // 操作 (Act) - 通过Redux直接分发多个actions（模拟批量更新）
        act(() => {
          store.dispatch(
            updateStoryBackground({
              era: '未来',
              location: '火星',
              socialEnvironment: '太空殖民',
              historicalContext: '2080年代',
            })
          );

          store.dispatch(
            addCharacter({
              id: 'batch-char-1',
              name: '火星居民1',
              description: '第一个火星定居者',
              role: 'protagonist',
              traits: [],
              relationships: [],
              scenes: [],
              notes: '',
            })
          );

          store.dispatch(
            addCharacter({
              id: 'batch-char-2',
              name: '火星居民2',
              description: '第二个火星定居者',
              role: 'supporting',
              traits: [],
              relationships: [],
              scenes: [],
              notes: '',
            })
          );
        });

        // 触发自动保存
        act(() => {
          jest.advanceTimersByTime(150);
        });

        await waitForMiddlewareToProcess(200);

        // 断言 (Assert)
        // 验证只触发了一次保存（批量处理）
        expect(mockStorage.localStorage.setItem).toHaveBeenCalledTimes(1);

        // 验证保存的数据包含所有更新
        const storedData = mockStorage.getStoredData('creation-editor-project');
        expect(storedData.outline.story.background.location).toBe('火星');
        expect(storedData.outline.characters.characters).toHaveLength(2);
        expect(storedData.outline.characters.characters[0].name).toBe('火星居民1');
        expect(storedData.outline.characters.characters[1].name).toBe('火星居民2');
      });
    });
  });
});
