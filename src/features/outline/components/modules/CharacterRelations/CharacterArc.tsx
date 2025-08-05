// 重构后的模块化角色弧线组件
// 原文件: 311行 -> 拆分为5个模块化文件
// 
// 新架构:
// - types.ts (59行) - 类型定义和常量
// - useCharacterArc.ts (138行) - 状态管理Hook
// - CharacterSelector.tsx (41行) - 角色选择器
// - CharacterInfoCard.tsx (71行) - 角色信息卡片
// - ArcTimeline.tsx (150行) - 弧线时间线
// - CharacterArcNew.tsx (59行) - 主容器组件
//
// 总计: 518行 (原311行, 增加207行但完全模块化)
// 每个文件都 < 200行，符合架构要求

// 使用新的模块化组件
export { default } from './CharacterArcNew';