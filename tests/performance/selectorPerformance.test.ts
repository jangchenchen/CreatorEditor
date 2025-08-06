/**
 * Redux选择器性能测试
 * 对比优化前后的选择器性能差异
 */

import { configureStore } from '@reduxjs/toolkit';
import { outlineReducer } from '../../src/features/outline/slices/rootOutlineSlice';
import {
  selectCharactersStats,
  selectTimelineStats,
  selectProjectOverallStats,
  selectModuleCompletionRates,
  makeSelectCharacterById,
  selectCharactersByRole,
} from '../../src/features/outline/slices/optimized/memoizedSelectors';
import { createMockOutlineState } from '../utils/testUtils';

describe('Redux选择器性能测试', () => {
  let store: ReturnType<typeof configureStore>;
  let mockState: any;

  beforeEach(() => {
    // 创建包含大量数据的测试状态
    const largeMockState = createMockOutlineState({
      characters: {
        characters: Array.from({ length: 100 }, (_, i) => ({
          id: `character-${i}`,
          name: `角色${i}`,
          description: `角色${i}的描述`,
          role: ['protagonist', 'antagonist', 'supporting', 'minor'][i % 4] as any,
          arcType: 'hero',
          motivation: `动机${i}`,
          personalityTraits: [`特征${i}`],
          background: `背景${i}`,
          relationships: [],
          characterArc: {
            startingPoint: `起点${i}`,
            endingPoint: `终点${i}`,
            keyMoments: [],
          },
          lastUpdated: new Date(),
        })),
        relationships: Array.from({ length: 150 }, (_, i) => ({
          id: `relationship-${i}`,
          fromCharacter: `character-${i % 50}`,
          toCharacter: `character-${(i + 1) % 50}`,
          type: ['family', 'friendship', 'romantic', 'conflict'][i % 4] as any,
          description: `关系${i}`,
          strength: (i % 5 + 1) as any,
          lastUpdated: new Date(),
        })),
      },
      timeline: {
        id: 'timeline-1',
        events: Array.from({ length: 200 }, (_, i) => ({
          id: `event-${i}`,
          title: `事件${i}`,
          description: `事件${i}的描述`,
          timestamp: `2024-01-${String(i % 30 + 1).padStart(2, '0')}`,
          type: ['beginning', 'development', 'climax', 'resolution', 'transition'][i % 5] as any,
          importance: ['critical', 'important', 'minor'][i % 3] as any,
          characters: [`character-${i % 10}`, `character-${(i + 1) % 10}`],
          location: `地点${i}`,
          isKeyEvent: i % 10 === 0,
          consequences: [`后果${i}`],
          notes: `注释${i}`,
        })),
        startTime: '2024-01-01',
        endTime: '2024-12-31',
        timelineNotes: '大型时间线测试',
      },
      chapters: {
        id: 'chapters-1',
        chapters: Array.from({ length: 50 }, (_, i) => ({
          id: `chapter-${i}`,
          title: `章节${i}`,
          summary: `章节${i}的摘要`,
          status: ['planning', 'draft', 'completed'][i % 3] as any,
          estimatedWords: 2000 + i * 100,
          scenes: [],
          keyEvents: [`event-${i * 4}`, `event-${i * 4 + 1}`],
          characterArcs: [],
          lastUpdated: new Date(),
        })),
        totalChapters: 50,
        overallStructure: '三幕结构测试',
      },
    });

    store = configureStore({
      reducer: {
        outline: outlineReducer,
      },
      preloadedState: {
        outline: largeMockState,
      },
    });

    mockState = { outline: largeMockState };
  });

  describe('选择器缓存效果测试', () => {
    it('应该缓存角色统计计算结果', () => {
      const startTime = performance.now();
      
      // 第一次调用 - 需要计算
      const result1 = selectCharactersStats(mockState);
      const firstCallTime = performance.now() - startTime;
      
      const secondStartTime = performance.now();
      // 第二次调用 - 应该使用缓存
      const result2 = selectCharactersStats(mockState);
      const secondCallTime = performance.now() - secondStartTime;
      
      // 验证结果一致
      expect(result1).toBe(result2); // reselect返回相同对象引用
      expect(result1.charactersCount).toBe(100);
      expect(result1.relationshipsCount).toBe(150);
      expect(result1.protagonistCount).toBe(25);
      expect(result1.antagonistCount).toBe(25);
      expect(result1.supportingCount).toBe(25);
      expect(result1.minorCount).toBe(25);
      
      // 第二次调用应该更快或相等（缓存效果）
      console.log(`角色统计 - 首次: ${firstCallTime.toFixed(3)}ms, 缓存: ${secondCallTime.toFixed(3)}ms`);
      expect(secondCallTime).toBeLessThanOrEqual(firstCallTime); // 缓存不应该更慢
    });

    it('应该缓存时间线统计计算结果', () => {
      const startTime = performance.now();
      
      // 第一次调用
      const result1 = selectTimelineStats(mockState);
      const firstCallTime = performance.now() - startTime;
      
      const secondStartTime = performance.now();
      // 第二次调用 - 缓存
      const result2 = selectTimelineStats(mockState);
      const secondCallTime = performance.now() - secondStartTime;
      
      // 验证统计结果正确
      expect(result1).toBe(result2);
      expect(result1.totalEvents).toBe(200);
      expect(result1.keyEvents).toBe(20); // 每10个事件中有1个key event
      expect(result1.criticalEvents).toBe(67); // 约1/3
      expect(result1.beginningEvents).toBe(40); // 1/5
      
      console.log(`时间线统计 - 首次: ${firstCallTime.toFixed(3)}ms, 缓存: ${secondCallTime.toFixed(3)}ms`);
      expect(secondCallTime).toBeLessThanOrEqual(firstCallTime); // 缓存不应该更慢
    });

    it('应该缓存项目整体统计', () => {
      const startTime = performance.now();
      
      const result1 = selectProjectOverallStats(mockState);
      const firstCallTime = performance.now() - startTime;
      
      const secondStartTime = performance.now();
      const result2 = selectProjectOverallStats(mockState);
      const secondCallTime = performance.now() - secondStartTime;
      
      expect(result1).toBe(result2);
      expect(result1.totalCharacters).toBe(100);
      expect(result1.totalEvents).toBe(200);
      expect(result1.totalChapters).toBe(50);
      expect(result1.overallCompletion).toBeGreaterThan(0);
      
      console.log(`项目统计 - 首次: ${firstCallTime.toFixed(3)}ms, 缓存: ${secondCallTime.toFixed(3)}ms`);
      expect(secondCallTime).toBeLessThanOrEqual(firstCallTime); // 缓存不应该更慢
    });

    it('应该缓存角色按类型分组结果', () => {
      const startTime = performance.now();
      
      const result1 = selectCharactersByRole(mockState);
      const firstCallTime = performance.now() - startTime;
      
      const secondStartTime = performance.now();
      const result2 = selectCharactersByRole(mockState);
      const secondCallTime = performance.now() - secondStartTime;
      
      expect(result1).toBe(result2);
      expect(result1.protagonist).toHaveLength(25);
      expect(result1.antagonist).toHaveLength(25);
      expect(result1.supporting).toHaveLength(25);
      expect(result1.minor).toHaveLength(25);
      
      console.log(`角色分组 - 首次: ${firstCallTime.toFixed(3)}ms, 缓存: ${secondCallTime.toFixed(3)}ms`);
    });
  });

  describe('选择器失效测试', () => {
    it('当角色数据改变时应该重新计算', () => {
      // 第一次计算
      const result1 = selectCharactersStats(mockState);
      expect(result1.charactersCount).toBe(100);
      
      // 修改角色数据
      const newState = {
        ...mockState,
        outline: {
          ...mockState.outline,
          characters: {
            ...mockState.outline.characters,
            characters: [...mockState.outline.characters.characters, {
              id: 'new-character',
              name: '新角色',
              description: '新角色描述',
              role: 'protagonist',
              arcType: 'hero',
              motivation: '新动机',
              personalityTraits: ['新特征'],
              background: '新背景',
              relationships: [],
              characterArc: {
                startingPoint: '新起点',
                endingPoint: '新终点',
                keyMoments: [],
              },
              lastUpdated: new Date(),
            }],
          },
        },
      };
      
      // 重新计算应该反映新数据
      const result2 = selectCharactersStats(newState);
      expect(result2).not.toBe(result1); // 不同的对象引用
      expect(result2.charactersCount).toBe(101);
      expect(result2.protagonistCount).toBe(26);
    });

    it('当无关数据改变时不应该重新计算', () => {
      // 第一次计算角色统计
      const result1 = selectCharactersStats(mockState);
      
      // 修改时间线数据（与角色统计无关）
      const newState = {
        ...mockState,
        outline: {
          ...mockState.outline,
          timeline: {
            ...mockState.outline.timeline,
            timelineNotes: '修改后的时间线注释',
          },
        },
      };
      
      // 角色统计应该返回相同的缓存结果
      const result2 = selectCharactersStats(newState);
      expect(result2).toBe(result1); // 相同的对象引用，证明使用了缓存
    });
  });

  describe('参数化选择器测试', () => {
    it('应该为不同参数创建独立的缓存', () => {
      const selectCharacterById = makeSelectCharacterById();
      
      const startTime = performance.now();
      
      // 查找第一个角色
      const char1_call1 = selectCharacterById(mockState, 'character-1');
      const firstCallTime = performance.now() - startTime;
      
      const secondStartTime = performance.now();
      // 再次查找同一个角色 - 应该使用缓存
      const char1_call2 = selectCharacterById(mockState, 'character-1');
      const secondCallTime = performance.now() - secondStartTime;
      
      expect(char1_call1).toBe(char1_call2);
      expect(char1_call1?.id).toBe('character-1');
      
      // 查找不同角色
      const char2 = selectCharacterById(mockState, 'character-2');
      expect(char2?.id).toBe('character-2');
      expect(char2).not.toBe(char1_call1);
      
      console.log(`参数化选择器 - 首次: ${firstCallTime.toFixed(3)}ms, 缓存: ${secondCallTime.toFixed(3)}ms`);
    });
  });

  describe('大数据集性能基准', () => {
    it('应该在合理时间内处理大数据集', () => {
      const benchmarks: Record<string, number> = {};
      
      // 测试各种选择器的性能
      const selectors = [
        { name: '角色统计', selector: () => selectCharactersStats(mockState) },
        { name: '时间线统计', selector: () => selectTimelineStats(mockState) },
        { name: '项目整体统计', selector: () => selectProjectOverallStats(mockState) },
        { name: '模块完成率', selector: () => selectModuleCompletionRates(mockState) },
        { name: '角色分组', selector: () => selectCharactersByRole(mockState) },
      ];
      
      selectors.forEach(({ name, selector }) => {
        const start = performance.now();
        const result = selector();
        const duration = performance.now() - start;
        
        benchmarks[name] = duration;
        console.log(`${name}: ${duration.toFixed(3)}ms`);
        
        // 所有选择器应该在10ms内完成
        expect(duration).toBeLessThan(10);
        expect(result).toBeDefined();
      });
      
      // 创建性能报告
      const report = {
        timestamp: new Date().toISOString(),
        dataSize: {
          characters: 100,
          relationships: 150,
          events: 200,
          chapters: 50,
        },
        benchmarks,
        totalTime: Object.values(benchmarks).reduce((sum, time) => sum + time, 0),
      };
      
      console.log('性能测试报告:', JSON.stringify(report, null, 2));
    });
  });

  describe('内存使用测试', () => {
    it('重复调用选择器不应该造成内存泄漏', () => {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;
      
      // 重复调用选择器多次
      for (let i = 0; i < 1000; i++) {
        selectCharactersStats(mockState);
        selectTimelineStats(mockState);
        selectProjectOverallStats(mockState);
        
        // 偶尔测试参数化选择器
        if (i % 100 === 0) {
          const selectCharacterById = makeSelectCharacterById();
          selectCharacterById(mockState, `character-${i % 10}`);
        }
      }
      
      // 强制垃圾回收 (如果支持)
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
      const memoryDiff = finalMemory - initialMemory;
      
      console.log(`内存使用变化: ${(memoryDiff / 1024 / 1024).toFixed(2)} MB`);
      
      // 内存增长应该在合理范围内（< 10MB）
      expect(memoryDiff).toBeLessThan(10 * 1024 * 1024); // 10MB
    });
  });
});