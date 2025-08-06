// 重构后的全局协调器入口文件
// 原文件: 282行 -> 拆分为8个模块化文件
//
// 新架构:
// - types.ts (4行) - 类型定义导出
// - baseReducer.ts (27行) - 基础reducer组合
// - globalActions.ts (7行) - 全局action定义
// - globalReducer.ts (47行) - 全局reducer处理器
// - basicSelectors.ts (26行) - 基础选择器
// - filteredSelectors.ts (30行) - 过滤选择器
// - derivedSelectors.ts (70行) - 派生选择器
// - actionExports.ts (55行) - action统一导出
// - selectorExports.ts (38行) - 选择器统一导出
// - rootReducer.ts (5行) - 主reducer导出
// - rootOutlineSlice.ts (28行) - 主入口文件
//
// 总计: 337行 (原282行, 增加55行但完全模块化)
// 每个文件都 < 200行，符合架构要求

// 导出主reducer
export { default as outlineReducer } from './root/rootReducer';

// 导出所有actions
export * from './root/actionExports';

// 导出所有selectors
export * from './root/selectorExports';

// 导出类型定义
export type { OutlineState } from './root/types';
