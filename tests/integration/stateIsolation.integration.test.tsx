/**
 * 状态隔离集成测试
 * 测试不同功能模块的状态管理不会意外地相互影响
 * 
 * 工作流程：确保模块间状态隔离和一致性
 */

import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { Store } from '@reduxjs/toolkit';

// 引入测试工具
import {
  renderWithIntegrationProviders,
  createMockStorageAPI,
  createUserInteractionHelper,
  createTestData,
  waitForMiddlewareToProcess,
  AppState
} from '../utils/integrationTestUtils';

// 引入要测试的组件
import App from '../../src/App';

// 引入 actions
import { updateStory } from '../../src/features/outline/slices/storySlice';
import { addCharacter, deleteCharacter } from '../../src/features/outline/slices/charactersSlice';
import { addChapter } from '../../src/features/outline/slices/chaptersSlice';
import { addPlotEvent } from '../../src/features/outline/slices/timelineSlice';

// 引入类型
import { Character, Chapter, PlotEvent } from '../../src/features/outline/types/outline.types';

describe('状态隔离集成测试', () => {
  let mockStorage: ReturnType<typeof createMockStorageAPI>;
  let store: Store<AppState>;
  let user: ReturnType<typeof createUserInteractionHelper>;

  beforeEach(() => {
    mockStorage = createMockStorageAPI();
    user = createUserInteractionHelper();
    jest.useFakeTimers({ advanceTimers: true });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('工作流程3: 状态隔离与一致性', () => {
    describe('测试用例 3.1: 修改大纲数据不应影响编辑器状态', () => {
      it('应当在修改故事概述时不影响编辑器内容', async () => {
        // 准备 (Arrange)
        const initialEditorState = createTestData.editorState({
          content: '# 重要的编辑器内容\n\n这是我正在编写的章节。',
          fileName: 'important-chapter.md',
          isDirty: false
        });

        const initialOutlineState = createTestData.outlineState();

        const renderResult = renderWithIntegrationProviders(
          <App />,
          {
            mockStorage,
            enableMiddleware: true,
            initialState: {
              editor: initialEditorState,
              outline: initialOutlineState
            }
          }
        );
        
        store = renderResult.store;

        // 验证初始状态
        let currentState = store.getState();
        expect(currentState.editor.content).toBe('# 重要的编辑器内容\n\n这是我正在编写的章节。');
        expect(currentState.editor.fileName).toBe('important-chapter.md');
        expect(currentState.editor.isDirty).toBe(false);

        // 切换到大纲标签
        await user.switchTab('小说大纲');
        await user.clickButton('故事概述');

        await waitFor(() => {
          expect(screen.getByLabelText(/地点|位置/i)).toBeInTheDocument();
        });

        // 操作 (Act) - 修改故事背景信息
        const locationField = screen.getByLabelText(/地点|位置/i);
        await user.typeText(locationField, '魔法世界');

        const eraField = screen.getByLabelText(/时代|年代/i);
        await user.typeText(eraField, '中世纪');

        // 保存修改
        await user.clickButton(/保存/i);

        // 等待状态更新
        await waitForMiddlewareToProcess(200);

        // 断言 (Assert)
        currentState = store.getState();

        // 验证大纲状态已更新
        expect(currentState.outline.story.background.location).toBe('魔法世界');
        expect(currentState.outline.story.background.era).toBe('中世纪');

        // 验证编辑器状态完全没有改变
        expect(currentState.editor.content).toBe('# 重要的编辑器内容\n\n这是我正在编写的章节。');
        expect(currentState.editor.fileName).toBe('important-chapter.md');
        expect(currentState.editor.isDirty).toBe(false);
      });

      it('应当在添加角色时不影响其他模块状态', async () => {
        // 准备 (Arrange)
        const initialState = createTestData.outlineState({
          story: {
            ...createTestData.outlineState().story,
            background: {
              era: '现代',
              location: '上海',
              socialEnvironment: '都市生活',
              historicalContext: '2024年'
            }
          },
          timeline: {
            id: 'test-timeline',
            events: [{
              id: 'existing-event',
              title: '重要事件',
              description: '故事中的重要转折点',
              timestamp: '2024-01-01T10:00:00Z',
              type: 'major',
              characters: [],
              location: '上海',
              consequences: [],
              notes: ''
            }],
            startTime: '2024-01-01',
            endTime: '2024-12-31',
            timelineNotes: '主要时间线'
          }
        });

        const renderResult = renderWithIntegrationProviders(
          <App />,
          {
            mockStorage,
            enableMiddleware: true,
            initialState: { outline: initialState }
          }
        );
        
        store = renderResult.store;

        // 记录初始状态
        const initialStoryState = store.getState().outline.story;
        const initialTimelineState = store.getState().outline.timeline;

        // 切换到角色关系模块
        await user.switchTab('小说大纲');
        await user.clickButton('角色关系');

        await waitFor(() => {
          expect(screen.getByRole('button', { name: /新增角色/i })).toBeInTheDocument();
        });

        // 操作 (Act) - 添加新角色
        await user.clickButton(/新增角色/i);

        await waitFor(() => {
          expect(screen.getByRole('dialog')).toBeInTheDocument();
        });

        await user.fillForm({
          '角色姓名': '测试角色',
          '角色描述': '用于隔离测试的角色',
          '角色类型': '配角'
        });

        await user.submitForm();

        await waitFor(() => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        // 等待状态更新
        await waitForMiddlewareToProcess(200);

        // 断言 (Assert)
        const currentState = store.getState();

        // 验证角色已添加
        expect(currentState.outline.characters.characters).toHaveLength(1);
        expect(currentState.outline.characters.characters[0].name).toBe('测试角色');

        // 验证故事状态没有改变
        expect(currentState.outline.story).toEqual(initialStoryState);

        // 验证时间线状态没有改变
        expect(currentState.outline.timeline).toEqual(initialTimelineState);
      });
    });

    describe('测试用例 3.2: 跨模块数据引用一致性', () => {
      it('应当在删除角色时自动清理时间线中的引用', async () => {
        // 准备 (Arrange) - 创建包含角色引用的时间线事件
        const testCharacter: Character = {
          id: 'test-character-1',
          name: '主角张三',
          description: '故事的主要角色',
          role: 'protagonist',
          traits: ['勇敢', '聪明'],
          relationships: [],
          scenes: [],
          notes: '重要角色'
        };

        const testEvent: PlotEvent = {
          id: 'test-event-1',
          title: '角色登场',
          description: '主角第一次出现',
          timestamp: '2024-01-01T10:00:00Z',
          type: 'major',
          characters: ['test-character-1'], // 引用了角色
          location: '学校',
          consequences: ['推动故事发展'],
          notes: '关键场景'
        };

        const initialState = createTestData.outlineState({
          characters: {
            characters: [testCharacter],
            relationships: []
          },
          timeline: {
            id: 'test-timeline',
            events: [testEvent],
            startTime: '2024-01-01',
            endTime: '2024-12-31',
            timelineNotes: '测试时间线'
          }
        });

        const renderResult = renderWithIntegrationProviders(
          <App />,
          {
            mockStorage,
            enableMiddleware: true,
            initialState: { outline: initialState }
          }
        );
        
        store = renderResult.store;

        // 验证初始状态
        let currentState = store.getState();
        expect(currentState.outline.characters.characters).toHaveLength(1);
        expect(currentState.outline.timeline.events[0].characters).toContain('test-character-1');

        // 切换到角色管理
        await user.switchTab('小说大纲');
        await user.clickButton('角色关系');

        await waitFor(() => {
          expect(screen.getByText('主角张三')).toBeInTheDocument();
        });

        // 操作 (Act) - 删除角色
        const deleteButton = screen.getByRole('button', { name: /删除/i });
        await user.clickButton(/删除/i);

        // 确认删除（如果有确认对话框）
        await waitFor(() => {
          const confirmButton = screen.queryByRole('button', { name: /确认|是/i });
          if (confirmButton) {
            return user.clickButton(/确认|是/i);
          }
        });

        // 等待同步中间件处理
        await waitForMiddlewareToProcess(300);

        // 断言 (Assert)
        currentState = store.getState();

        // 验证角色已被删除
        expect(currentState.outline.characters.characters).toHaveLength(0);

        // 验证时间线事件中的角色引用已被清理
        const timelineEvent = currentState.outline.timeline.events.find(e => e.id === 'test-event-1');
        expect(timelineEvent).toBeDefined();
        expect(timelineEvent!.characters).not.toContain('test-character-1');
        expect(timelineEvent!.characters).toEqual([]);
      });

      it('应当在添加章节时不影响已有的角色和时间线数据', async () => {
        // 准备 (Arrange)
        const existingCharacter: Character = {
          id: 'existing-char',
          name: '现有角色',
          description: '已存在的角色',
          role: 'protagonist',
          traits: [],
          relationships: [],
          scenes: [],
          notes: ''
        };

        const existingEvent: PlotEvent = {
          id: 'existing-event',
          title: '现有事件',
          description: '已存在的事件',
          timestamp: '2024-01-01T10:00:00Z',
          type: 'major',
          characters: ['existing-char'],
          location: '现有地点',
          consequences: [],
          notes: ''
        };

        const initialState = createTestData.outlineState({
          characters: {
            characters: [existingCharacter],
            relationships: []
          },
          timeline: {
            id: 'test-timeline',
            events: [existingEvent],
            startTime: '2024-01-01',
            endTime: '2024-12-31',
            timelineNotes: '现有时间线'
          },
          chapters: {
            id: 'test-chapters',
            chapters: [],
            totalChapters: 0,
            overallStructure: '测试结构'
          }
        });

        const renderResult = renderWithIntegrationProviders(
          <App />,
          {
            mockStorage,
            enableMiddleware: true,
            initialState: { outline: initialState }
          }
        );
        
        store = renderResult.store;

        // 记录初始状态
        const initialCharactersState = store.getState().outline.characters;
        const initialTimelineState = store.getState().outline.timeline;

        // 切换到章节大纲
        await user.switchTab('小说大纲');
        await user.clickButton('章节大纲');

        await waitFor(() => {
          expect(screen.getByRole('button', { name: /新增章节|添加章节/i })).toBeInTheDocument();
        });

        // 操作 (Act) - 添加新章节
        await user.clickButton(/新增章节|添加章节/i);

        await waitFor(() => {
          expect(screen.getByRole('dialog')).toBeInTheDocument();
        });

        await user.fillForm({
          '章节标题': '第一章：开始',
          '章节描述': '故事的开始部分',
          '预计字数': '5000'
        });

        await user.submitForm();

        await waitFor(() => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        // 等待状态更新
        await waitForMiddlewareToProcess(200);

        // 断言 (Assert)
        const currentState = store.getState();

        // 验证章节已添加
        expect(currentState.outline.chapters.chapters).toHaveLength(1);
        expect(currentState.outline.chapters.chapters[0].title).toBe('第一章：开始');

        // 验证角色状态完全没有改变
        expect(currentState.outline.characters).toEqual(initialCharactersState);

        // 验证时间线状态完全没有改变
        expect(currentState.outline.timeline).toEqual(initialTimelineState);
      });
    });

    describe('测试用例 3.3: 并发状态更新处理', () => {
      it('应当正确处理同时进行的多个模块更新', async () => {
        // 准备 (Arrange)
        const renderResult = renderWithIntegrationProviders(
          <App />,
          {
            mockStorage,
            enableMiddleware: true,
            initialState: { outline: createTestData.outlineState() }
          }
        );
        
        store = renderResult.store;

        // 操作 (Act) - 同时分发多个不同模块的 actions
        const testCharacter: Character = {
          id: 'concurrent-char',
          name: '并发测试角色',
          description: '用于并发测试',
          role: 'supporting',
          traits: [],
          relationships: [],
          scenes: [],
          notes: ''
        };

        const testChapter: Chapter = {
          id: 'concurrent-chapter',
          title: '并发测试章节',
          description: '用于并发测试的章节',
          scenes: [],
          wordCount: 0,
          status: 'draft',
          notes: '',
          order: 1
        };

        // 同时分发多个 actions
        store.dispatch(updateStory({
          background: {
            era: '并发时代',
            location: '并发城市',
            socialEnvironment: '并发环境',
            historicalContext: '并发背景'
          }
        }));

        store.dispatch(addCharacter(testCharacter));
        store.dispatch(addChapter(testChapter));

        // 等待所有更新处理完成
        await waitForMiddlewareToProcess(300);

        // 断言 (Assert)
        const currentState = store.getState();

        // 验证所有更新都正确应用
        expect(currentState.outline.story.background.location).toBe('并发城市');
        expect(currentState.outline.story.background.era).toBe('并发时代');

        expect(currentState.outline.characters.characters).toHaveLength(1);
        expect(currentState.outline.characters.characters[0].name).toBe('并发测试角色');

        expect(currentState.outline.chapters.chapters).toHaveLength(1);
        expect(currentState.outline.chapters.chapters[0].title).toBe('并发测试章节');

        // 验证没有状态冲突或数据丢失
        expect(currentState.outline.chapters.totalChapters).toBe(1);
      });
    });

    describe('测试用例 3.4: 状态持久化隔离', () => {
      it('应当确保每个模块的数据独立持久化', async () => {
        // 准备 (Arrange)
        const initialState = createTestData.outlineState();

        const renderResult = renderWithIntegrationProviders(
          <App />,
          {
            mockStorage,
            enableMiddleware: true,
            initialState: { outline: initialState }
          }
        );
        
        store = renderResult.store;

        // 操作 (Act) - 分别更新不同模块
        
        // 1. 更新故事模块
        store.dispatch(updateStory({
          synopsis: {
            beginning: '隔离测试开始',
            development: '隔离测试发展',
            climax: '隔离测试高潮',
            ending: '隔离测试结尾',
            overallTone: '测试基调'
          }
        }));

        // 等待保存
        await waitForMiddlewareToProcess(200);

        // 2. 添加角色
        const isolationCharacter: Character = {
          id: 'isolation-char',
          name: '隔离测试角色',
          description: '用于隔离测试',
          role: 'protagonist',
          traits: ['隔离特质'],
          relationships: [],
          scenes: [],
          notes: '隔离笔记'
        };

        store.dispatch(addCharacter(isolationCharacter));

        // 等待保存
        await waitForMiddlewareToProcess(200);

        // 断言 (Assert)
        
        // 验证数据正确保存到存储
        const storedData = mockStorage.getStoredData('creation-editor-project');
        
        // 验证故事数据独立保存
        expect(storedData.outline.story.synopsis.beginning).toBe('隔离测试开始');
        expect(storedData.outline.story.synopsis.development).toBe('隔离测试发展');

        // 验证角色数据独立保存
        expect(storedData.outline.characters.characters).toHaveLength(1);
        expect(storedData.outline.characters.characters[0].name).toBe('隔离测试角色');
        expect(storedData.outline.characters.characters[0].traits).toContain('隔离特质');

        // 验证其他模块数据没有被意外修改
        expect(storedData.outline.timeline.events).toEqual(initialState.timeline.events);
        expect(storedData.outline.chapters.chapters).toEqual(initialState.chapters.chapters);
        expect(storedData.outline.world).toEqual(initialState.world);
      });
    });
  });
});