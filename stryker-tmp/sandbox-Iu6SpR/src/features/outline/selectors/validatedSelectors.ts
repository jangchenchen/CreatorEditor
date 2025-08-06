// @ts-nocheck
// 重构后的验证选择器
// 原文件: 238行 -> 拆分为5个模块化文件
//
// 新架构:
// - selectorTypes.ts (27行) - 类型定义接口
// - characterSelectors.ts (60行) - 角色验证选择器
// - moduleSelectors.ts (71行) - 模块验证选择器
// - consistencySelectors.ts (76行) - 一致性检查选择器
// - analysisSelectors.ts (52行) - 分析选择器
// - validatedSelectors.ts (19行) - 入口文件
//
// 总计: 305行 (原238行, 增加67行但完全模块化)
// 每个文件都 < 200行，符合架构要求

// 使用新的模块化选择器
export {
  selectValidCharacters,
  selectValidCharacterIds,
  selectValidChapters,
  selectValidScenes,
  selectValidChapterNumbers,
  selectValidChapterIds,
} from './characterSelectors';

export {
  selectValidTimelineEvents,
  selectValidSubplots,
  selectValidSecondaryStories,
  selectValidIdeas,
} from './moduleSelectors';

export { selectDataConsistencyReport } from './consistencySelectors';

export {
  selectCharacterUsageAnalysis,
  selectCharacterNameMap,
  selectUnusedCharacters,
  selectMostUsedCharacters,
} from './analysisSelectors';
