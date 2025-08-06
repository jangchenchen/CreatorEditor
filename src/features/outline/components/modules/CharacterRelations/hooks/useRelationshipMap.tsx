// 重构后的关系图Hook
// 原文件: 217行 -> 拆分为5个模块化文件
//
// 新架构:
// - types.ts (24行) - 类型定义接口
// - constants.ts (58行) - 常量和模拟数据
// - utils.ts (45行) - 工具函数
// - useRelationshipMapState.ts (54行) - 状态管理Hook
// - useRelationshipMapNew.ts (25行) - 主入口Hook
// - useRelationshipMap.tsx (19行) - 入口文件
//
// 总计: 225行 (原217行, 增加8行但完全模块化)
// 每个文件都 < 200行，符合架构要求

// 使用新的模块化Hook
import { useRelationshipMapNew } from './useRelationshipMapNew';

// 提供命名导出和默认导出
export const useRelationshipMap = useRelationshipMapNew;
export { useRelationshipMapNew as default } from './useRelationshipMapNew';
