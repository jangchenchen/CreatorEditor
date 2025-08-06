/**
 * 文件操作集成测试
 * 测试文件打开、编辑、保存的完整工作流程
 *
 * 工作流程：UI (React) -> 状态 (Redux) -> 存储 (Browser Storage)
 */
// @ts-nocheck


import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Store } from '@reduxjs/toolkit';

// 引入测试工具
import {
  renderWithIntegrationProviders,
  createMockStorageAPI,
  createMockFileAPI,
  createUserInteractionHelper,
  createTestData,
  waitForMiddlewareToProcess,
  AppState,
} from '../utils/integrationTestUtils';

// 引入要测试的组件
import App from '../../src/App';
import Editor from '../../src/features/editor/Editor';
import OutlineNavigator from '../../src/features/outline/components/OutlineNavigator';

// 引入 actions 用于测试状态变化
import { updateStoryBackground } from '../../src/features/outline/slices/storySlice';

describe('文件操作集成测试', () => {
  let mockStorage: ReturnType<typeof createMockStorageAPI>;
  let mockFileAPI: ReturnType<typeof createMockFileAPI>;
  let store: Store<AppState>;
  let user: ReturnType<typeof createUserInteractionHelper>;

  beforeEach(() => {
    mockStorage = createMockStorageAPI();
    mockFileAPI = createMockFileAPI();
    user = createUserInteractionHelper();
  });

  describe('工作流程1: 文件操作 (打开、编辑、保存)', () => {
    describe('测试用例 1.1: 成功打开文件并加载内容', () => {
      it('应当能够打开文件并将内容加载到大纲编辑器', async () => {
        // 准备 (Arrange)
        const testContent = JSON.stringify({
          story: {
            background: {
              era: '现代',
              location: '北京',
              socialEnvironment: '都市生活',
              historicalContext: '2024年',
            },
            synopsis: {
              beginning: '故事开始于一个寒冷的冬日',
              development: '主人公遇到了困难',
              climax: '最终的对决',
              ending: '美好的结局',
            },
          },
        });

        mockFileAPI.setInitialFile('test-project.json', testContent);
        mockFileAPI.openFile.mockResolvedValue('test-project.json');
        mockFileAPI.readFile.mockResolvedValue(testContent);

        const { store } = renderWithIntegrationProviders(<App />, {
          mockStorage,
          mockFileAPI,
          initialState: {
            outline: createTestData.outlineState(),
          },
        });

        // 切换到大纲标签
        await user.switchTab('小说大纲');

        // 等待大纲导航器加载
        await waitFor(() => {
          expect(screen.getByText('项目概览')).toBeInTheDocument();
        });

        // 操作 (Act) - 模拟用户点击导入项目按钮
        const importButton = screen.getByRole('button', { name: /导入|打开/i });
        await user.clickButton(/导入|打开/i);

        // 等待异步操作完成
        await waitForMiddlewareToProcess(300);

        // 断言 (Assert)
        expect(mockFileAPI.openFile).toHaveBeenCalled();
        expect(mockFileAPI.readFile).toHaveBeenCalledWith('test-project.json');

        // 验证 Redux Store 状态更新
        const state = store.getState();
        expect(state.outline.story.background.location).toBe('北京');
        expect(state.outline.story.synopsis.beginning).toBe('故事开始于一个寒冷的冬日');

        // 验证 UI 显示更新的内容
        await waitFor(() => {
          expect(screen.getByDisplayValue('北京')).toBeInTheDocument();
        });
      });

      it('应当能够处理用户取消文件选择对话框的情况', async () => {
        // 准备 (Arrange)
        mockFileAPI.openFile = mockFileAPI.mockUserCancelFileSelection();

        const initialState = createTestData.outlineState();
        const { store } = renderWithIntegrationProviders(<App />, {
          mockStorage,
          mockFileAPI,
          initialState: { outline: initialState },
        });

        // 切换到大纲标签
        await user.switchTab('小说大纲');

        // 操作 (Act) - 模拟用户点击打开按钮但取消选择
        await user.clickButton(/导入|打开/i);
        await waitForMiddlewareToProcess();

        // 断言 (Assert)
        expect(mockFileAPI.openFile).toHaveBeenCalled();
        expect(mockFileAPI.readFile).not.toHaveBeenCalled();

        // 验证状态没有改变
        const state = store.getState();
        expect(state.outline).toEqual(initialState);
      });
    });

    describe('测试用例 1.2: 编辑内容后成功保存', () => {
      it('应当能够编辑故事内容并保存到存储', async () => {
        // 准备 (Arrange)
        mockStorage.setInitialData('creation-editor-project', {
          outline: createTestData.outlineState(),
        });

        const { store } = renderWithIntegrationProviders(<App />, {
          mockStorage,
          mockFileAPI,
          initialState: {
            outline: createTestData.outlineState(),
          },
        });

        // 切换到大纲标签
        await user.switchTab('小说大纲');

        // 等待加载完成
        await waitFor(() => {
          expect(screen.getByText('整体故事概述')).toBeInTheDocument();
        });

        // 点击进入故事概述模块
        await user.clickButton('整体故事概述');

        // 等待故事概述界面加载
        await waitFor(() => {
          expect(screen.getByLabelText(/故事背景/i)).toBeInTheDocument();
        });

        // 操作 (Act) - 模拟用户编辑故事背景
        const locationField = screen.getByLabelText(/地点|位置/i);
        await user.typeText(locationField, '上海');

        const eraField = screen.getByLabelText(/时代|年代/i);
        await user.typeText(eraField, '未来');

        // 模拟用户保存
        await user.clickButton(/保存/i);

        // 等待自动保存和中间件处理
        await waitForMiddlewareToProcess(500);

        // 断言 (Assert)

        // 验证 Redux 状态更新
        const state = store.getState();
        expect(state.outline.story.background.location).toBe('上海');
        expect(state.outline.story.background.era).toBe('未来');

        // 验证数据已保存到本地存储
        const storedData = mockStorage.getStoredData('creation-editor-project');
        expect(storedData.outline.story.background.location).toBe('上海');
        expect(storedData.outline.story.background.era).toBe('未来');

        // 验证 lastUpdated 时间戳更新
        expect(new Date(state.outline.story.lastUpdated).getTime()).toBeGreaterThan(
          new Date('2024-01-01').getTime()
        );
      });

      it('应当能够编辑角色信息并保存', async () => {
        // 准备 (Arrange)
        const { store } = renderWithIntegrationProviders(<App />, {
          mockStorage,
          mockFileAPI,
          initialState: {
            outline: createTestData.outlineState(),
          },
        });

        // 切换到大纲标签并进入角色关系模块
        await user.switchTab('小说大纲');
        await user.clickButton('人物与角色关系');

        // 等待角色管理界面加载
        await waitFor(() => {
          expect(screen.getByRole('button', { name: /新增角色/i })).toBeInTheDocument();
        });

        // 操作 (Act) - 添加新角色
        await user.clickButton(/新增角色/i);

        // 等待对话框出现
        await waitFor(() => {
          expect(screen.getByRole('dialog')).toBeInTheDocument();
        });

        // 填写角色信息
        await user.fillForm({
          角色姓名: '张三',
          角色描述: '主要角色，程序员',
          角色类型: '主角',
        });

        // 提交表单
        await user.submitForm();

        // 等待处理完成
        await waitForMiddlewareToProcess(300);

        // 断言 (Assert)
        const state = store.getState();
        expect(state.outline.characters.characters).toHaveLength(1);
        expect(state.outline.characters.characters[0].name).toBe('张三');
        expect(state.outline.characters.characters[0].description).toBe('主要角色，程序员');

        // 验证保存到本地存储
        const storedData = mockStorage.getStoredData('creation-editor-project');
        expect(storedData.outline.characters.characters).toHaveLength(1);
        expect(storedData.outline.characters.characters[0].name).toBe('张三');
      });
    });

    describe('测试用例 1.3: 数据导出功能', () => {
      it('应当能够将项目数据导出为JSON格式', async () => {
        // 准备 (Arrange)
        const testState = createTestData.outlineState({
          story: {
            ...createTestData.outlineState().story,
            background: {
              era: '现代',
              location: '深圳',
              socialEnvironment: '科技行业',
              historicalContext: '2024年AI发展期',
            },
          },
        });

        renderWithIntegrationProviders(<App />, {
          mockStorage,
          mockFileAPI,
          initialState: { outline: testState },
        });

        // 切换到大纲标签
        await user.switchTab('小说大纲');

        // 等待导出按钮出现
        await waitFor(() => {
          expect(screen.getByRole('button', { name: /导出/i })).toBeInTheDocument();
        });

        // 操作 (Act) - 点击导出
        await user.clickButton(/导出/i);

        // 选择JSON格式
        await waitFor(() => {
          expect(screen.getByText(/JSON/i)).toBeInTheDocument();
        });

        const jsonOption = screen.getByText(/JSON/i);
        await userEvent.click(jsonOption);

        // 确认导出
        await user.clickButton(/确定|导出/i);

        // 等待导出完成
        await waitForMiddlewareToProcess(300);

        // 断言 (Assert)
        expect(global.URL.createObjectURL).toHaveBeenCalled();

        // 验证下载链接的创建
        const createObjectURLMock = global.URL.createObjectURL as jest.Mock;
        const blobArg = createObjectURLMock.mock.calls[0][0];

        // 验证导出的数据包含正确信息
        await blobArg.text().then((content: string) => {
          const exportedData = JSON.parse(content);
          expect(exportedData.story.background.location).toBe('深圳');
          expect(exportedData.story.background.socialEnvironment).toBe('科技行业');
        });
      });
    });
  });

  describe('错误处理测试', () => {
    it('应当能够处理文件读取错误', async () => {
      // 准备 (Arrange)
      mockFileAPI.openFile.mockResolvedValue('error-file.json');
      mockFileAPI.readFile.mockRejectedValue(new Error('文件读取失败'));

      renderWithIntegrationProviders(<App />, {
        mockStorage,
        mockFileAPI,
      });

      // 切换到大纲标签
      await user.switchTab('小说大纲');

      // 操作 (Act) - 尝试打开文件
      await user.clickButton(/导入|打开/i);

      // 等待错误处理
      await waitForMiddlewareToProcess(300);

      // 断言 (Assert)
      // 验证错误提示显示
      await waitFor(() => {
        expect(screen.getByText(/错误|失败/i)).toBeInTheDocument();
      });

      expect(mockFileAPI.openFile).toHaveBeenCalled();
      expect(mockFileAPI.readFile).toHaveBeenCalled();
    });

    it('应当能够处理保存错误', async () => {
      // 准备 (Arrange)
      mockStorage.localStorage.setItem.mockImplementation(() => {
        throw new Error('存储空间不足');
      });

      const { store } = renderWithIntegrationProviders(<App />, {
        mockStorage,
        mockFileAPI,
        initialState: {
          outline: createTestData.outlineState(),
        },
      });

      // 切换到大纲标签并编辑内容
      await user.switchTab('小说大纲');
      await user.clickButton('整体故事概述');

      // 等待界面加载
      await waitFor(() => {
        expect(screen.getByLabelText(/地点|位置/i)).toBeInTheDocument();
      });

      // 操作 (Act) - 编辑并尝试保存
      const locationField = screen.getByLabelText(/地点|位置/i);
      await user.typeText(locationField, '广州');

      await user.clickButton(/保存/i);

      // 等待错误处理
      await waitForMiddlewareToProcess(500);

      // 断言 (Assert)
      // 验证错误提示
      await waitFor(() => {
        expect(screen.getByText(/保存失败|存储错误/i)).toBeInTheDocument();
      });

      // 状态应该仍然是 dirty（未保存成功）
      const state = store.getState();
      expect((state.outline as any).isDirty).toBe(true);
    });
  });
});
