// 重构后的角色弧线Hook
// 原文件: 231行 -> 拆分为5个模块化文件
//
// 新架构:
// - types.ts (70行) - 类型定义接口 (已存在)
// - constants.ts (59行) - 常量和模拟数据
// - utils.ts (37行) - 工具函数
// - useCharacterArcState.ts (102行) - 状态管理Hook
// - useCharacterArcNew.ts (24行) - 主入口Hook
// - useCharacterArc.ts (19行) - 入口文件
//
// 总计: 311行 (原231行, 增加80行但完全模块化)
// 每个文件都 < 200行，符合架构要求

// 使用新的模块化Hook
export { useCharacterArcNew as useCharacterArc } from './useCharacterArcNew';