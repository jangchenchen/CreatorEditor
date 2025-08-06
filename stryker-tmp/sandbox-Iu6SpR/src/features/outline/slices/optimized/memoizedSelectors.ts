/**
 * 优化的Redux选择器 - 使用reselect实现memoization
 * 
 * 这些选择器针对复杂计算和频繁使用场景进行了优化：
 * - 避免不必要的重新计算
 * - 缓存计算结果
 * - 减少组件不必要的重新渲染
 */
// @ts-nocheck


import { createSelector } from 'reselect';
import { OutlineState, Character, PlotEvent, Chapter, Subplot } from '../../types/outline.types';

// ====== 基础选择器 (输入选择器) ======
const selectOutlineState = (state: { outline: OutlineState }) => state.outline;
const selectStory = (state: { outline: OutlineState }) => state.outline.story;
const selectCharactersState = (state: { outline: OutlineState }) => state.outline.characters;
const selectTimelineState = (state: { outline: OutlineState }) => state.outline.timeline;
const selectChaptersState = (state: { outline: OutlineState }) => state.outline.chapters;
const selectSubplotsState = (state: { outline: OutlineState }) => state.outline.subplots;
const selectIdeasState = (state: { outline: OutlineState }) => state.outline.ideas;
const selectThemesState = (state: { outline: OutlineState }) => state.outline.themes;
const selectWorldState = (state: { outline: OutlineState }) => state.outline.world;

// ====== 角色相关的优化选择器 ======

// 角色列表 (直接访问，无需优化)
export const selectCharactersList = createSelector(
  [selectCharactersState],
  (charactersState) => charactersState.characters
);

// 关系列表
export const selectRelationshipsList = createSelector(
  [selectCharactersState],
  (charactersState) => charactersState.relationships
);

// 按角色类型分组的角色 (缓存分组结果)
export const selectCharactersByRole = createSelector(
  [selectCharactersList],
  (characters) => {
    return characters.reduce((acc, character) => {
      const role = character.role || 'other';
      if (!acc[role]) {
        acc[role] = [];
      }
      acc[role].push(character);
      return acc;
    }, {} as Record<string, Character[]>);
  }
);

// 角色统计信息 (复杂计算，需要缓存)
export const selectCharactersStats = createSelector(
  [selectCharactersList, selectRelationshipsList],
  (characters, relationships) => ({
    charactersCount: characters.length,
    relationshipsCount: relationships.length,
    protagonistCount: characters.filter(c => c.role === 'protagonist').length,
    antagonistCount: characters.filter(c => c.role === 'antagonist').length,
    supportingCount: characters.filter(c => c.role === 'supporting').length,
    minorCount: characters.filter(c => c.role === 'minor').length,
    averageRelationshipsPerCharacter: characters.length > 0 
      ? Math.round((relationships.length * 2) / characters.length * 100) / 100 
      : 0
  })
);

// 特定角色的关系 (参数化选择器)
export const makeSelectCharacterRelationships = () =>
  createSelector(
    [selectRelationshipsList, (_: any, characterId: string) => characterId],
    (relationships, characterId) =>
      relationships.filter(
        r => r.fromCharacter === characterId || r.toCharacter === characterId
      )
  );

// ====== 时间线相关的优化选择器 ======

// 事件列表
export const selectPlotEventsList = createSelector(
  [selectTimelineState],
  (timelineState) => timelineState.events
);

// 关键事件 (过滤操作缓存)
export const selectKeyEvents = createSelector(
  [selectPlotEventsList],
  (events) => events.filter(e => e.isKeyEvent)
);

// 按重要性分组的事件
export const selectEventsByImportance = createSelector(
  [selectPlotEventsList],
  (events) => {
    return events.reduce((acc, event) => {
      const importance = event.importance || 'minor';
      if (!acc[importance]) {
        acc[importance] = [];
      }
      acc[importance].push(event);
      return acc;
    }, {} as Record<string, PlotEvent[]>);
  }
);

// 时间线统计 (复杂统计计算)
export const selectTimelineStats = createSelector(
  [selectPlotEventsList],
  (events) => ({
    totalEvents: events.length,
    keyEvents: events.filter(e => e.isKeyEvent).length,
    criticalEvents: events.filter(e => e.importance === 'critical').length,
    importantEvents: events.filter(e => e.importance === 'important').length,
    minorEvents: events.filter(e => e.importance === 'minor').length,
    beginningEvents: events.filter(e => e.type === 'beginning').length,
    developmentEvents: events.filter(e => e.type === 'development').length,
    climaxEvents: events.filter(e => e.type === 'climax').length,
    resolutionEvents: events.filter(e => e.type === 'resolution').length,
    transitionEvents: events.filter(e => e.type === 'transition').length,
    averageEventsPerPhase: events.length > 0 ? Math.round(events.length / 4 * 100) / 100 : 0
  })
);

// ====== 章节相关的优化选择器 ======

// 章节列表
export const selectChaptersList = createSelector(
  [selectChaptersState],
  (chaptersState) => chaptersState.chapters
);

// 章节统计
export const selectChaptersStats = createSelector(
  [selectChaptersList],
  (chapters) => {
    const totalWords = chapters.reduce((sum, ch) => sum + (ch.estimatedWords || 0), 0);
    const completedChapters = chapters.filter(ch => ch.status === 'completed').length;
    const averageWords = chapters.length > 0 ? Math.round(totalWords / chapters.length) : 0;
    
    return {
      totalChapters: chapters.length,
      completedChapters,
      draftChapters: chapters.filter(ch => ch.status === 'draft').length,
      planningChapters: chapters.filter(ch => ch.status === 'planning').length,
      totalWords,
      averageWords,
      completionRate: chapters.length > 0 ? Math.round(completedChapters / chapters.length * 100) : 0
    };
  }
);

// ====== 故事完成度相关选择器 ======

// 故事基础信息完成度
export const selectStoryCompletion = createSelector(
  [selectStory],
  (story) => {
    const background = story.background;
    const coreTheme = story.coreTheme;
    const synopsis = story.synopsis;
    
    let completedFields = 0;
    let totalFields = 0;
    
    // 检查背景信息
    const backgroundFields = ['era', 'location', 'socialEnvironment', 'historicalContext'];
    backgroundFields.forEach(field => {
      totalFields++;
      if (background[field as keyof typeof background] && 
          String(background[field as keyof typeof background]).trim().length > 0) {
        completedFields++;
      }
    });
    
    // 检查核心主题
    const themeFields = ['theme', 'conflict', 'message'];
    themeFields.forEach(field => {
      totalFields++;
      if (coreTheme[field as keyof typeof coreTheme] && 
          String(coreTheme[field as keyof typeof coreTheme]).trim().length > 0) {
        completedFields++;
      }
    });
    
    // 检查大纲
    const synopsisFields = ['beginning', 'development', 'climax', 'ending'];
    synopsisFields.forEach(field => {
      totalFields++;
      if (synopsis[field as keyof typeof synopsis] && 
          String(synopsis[field as keyof typeof synopsis]).trim().length > 0) {
        completedFields++;
      }
    });
    
    const completionRate = totalFields > 0 ? Math.round(completedFields / totalFields * 100) : 0;
    
    return {
      completedFields,
      totalFields,
      completionRate,
      isComplete: completionRate === 100
    };
  }
);

// ====== 综合统计选择器 ======

// 项目整体统计 (最复杂的计算，多个数据源)
export const selectProjectOverallStats = createSelector(
  [
    selectCharactersStats,
    selectTimelineStats,
    selectChaptersStats,
    selectStoryCompletion,
    selectSubplotsState,
    selectIdeasState,
    selectThemesState
  ],
  (
    charactersStats,
    timelineStats,
    chaptersStats,
    storyCompletion,
    subplotsState,
    ideasState,
    themesState
  ) => ({
    // 角色数据
    totalCharacters: charactersStats.charactersCount,
    totalRelationships: charactersStats.relationshipsCount,
    
    // 时间线数据
    totalEvents: timelineStats.totalEvents,
    keyEvents: timelineStats.keyEvents,
    
    // 章节数据
    totalChapters: chaptersStats.totalChapters,
    completedChapters: chaptersStats.completedChapters,
    estimatedWords: chaptersStats.totalWords,
    
    // 故事完成度
    storyCompletionRate: storyCompletion.completionRate,
    
    // 副线情节
    totalSubplots: subplotsState.subplots.length,
    activeSubplots: subplotsState.subplots.filter(s => s.status === 'active').length,
    
    // 创意想法
    totalIdeas: ideasState.ideas.length,
    implementedIdeas: ideasState.ideas.filter(i => i.status === 'implemented').length,
    
    // 主题
    totalThemes: themesState.themes.secondary.length + 1, // +1 for primary theme
    
    // 综合完成度 (加权平均)
    overallCompletion: Math.round(
      (storyCompletion.completionRate * 0.3 + 
       chaptersStats.completionRate * 0.4 + 
       (charactersStats.charactersCount > 0 ? 20 : 0) * 0.15 + 
       (timelineStats.totalEvents > 0 ? 20 : 0) * 0.15) 
    )
  })
);

// ====== 模块完成率选择器 ======
export const selectModuleCompletionRates = createSelector(
  [
    selectStoryCompletion,
    selectCharactersList,
    selectPlotEventsList,
    selectChaptersList,
    selectSubplotsState,
    selectIdeasState,
    selectWorldState,
    selectThemesState
  ],
  (
    storyCompletion,
    characters,
    events,
    chapters,
    subplotsState,
    ideasState,
    worldState,
    themesState
  ) => ({
    story: storyCompletion.completionRate,
    characters: characters.length > 0 ? Math.min(100, characters.length * 25) : 0, // 4个角色 = 100%
    timeline: events.length > 0 ? Math.min(100, events.length * 10) : 0, // 10个事件 = 100%
    chapters: chapters.length > 0 ? 
      Math.round(chapters.filter(ch => ch.status === 'completed').length / chapters.length * 100) : 0,
    world: worldState.geography.regions.length > 0 || worldState.society.political ? 50 : 0,
    themes: themesState.themes.primary ? 60 : 0,
    subplots: subplotsState.subplots.length > 0 ? 40 : 0,
    ideas: ideasState.ideas.length > 0 ? 30 : 0
  })
);

// ====== 参数化选择器工厂 ======

// 创建按ID查找角色的选择器
export const makeSelectCharacterById = () =>
  createSelector(
    [selectCharactersList, (_: any, characterId: string) => characterId],
    (characters, characterId) => characters.find(c => c.id === characterId)
  );

// 创建按类型筛选事件的选择器
export const makeSelectEventsByType = () =>
  createSelector(
    [selectPlotEventsList, (_: any, eventType: string) => eventType],
    (events, eventType) => events.filter(e => e.type === eventType)
  );

// 创建按状态筛选章节的选择器
export const makeSelectChaptersByStatus = () =>
  createSelector(
    [selectChaptersList, (_: any, status: string) => status],
    (chapters, status) => chapters.filter(ch => ch.status === status)
  );

// ====== 性能调试选择器 ======
export const selectSelectorPerformanceInfo = createSelector(
  [selectOutlineState],
  (outline) => ({
    charactersCount: outline.characters.characters.length,
    eventsCount: outline.timeline.events.length,
    chaptersCount: outline.chapters.chapters.length,
    relationshipsCount: outline.characters.relationships.length,
    lastUpdate: new Date().toISOString(),
    cacheKey: `${outline.characters.characters.length}-${outline.timeline.events.length}-${outline.chapters.chapters.length}`
  })
);