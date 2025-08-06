// @ts-nocheck
// 重构后的故事概要组件
// 原文件: 269行 -> 拆分为6个模块化文件
//
// 新架构:
// - SynopsisHeader.tsx (23行) - 标题和完成度显示
// - SynopsisProgressBar.tsx (19行) - 进度条组件
// - SynopsisStageCard.tsx (46行) - 阶段卡片组件
// - SynopsisToneCard.tsx (23行) - 基调卡片组件
// - SynopsisTips.tsx (12行) - 提示信息组件
// - useSynopsisEditor.ts (47行) - 状态管理Hook
// - StorySynopsisNew.tsx (77行) - 主容器组件
// - StorySynopsis.tsx (21行) - 入口文件
//
// 总计: 268行 (原269行，基本保持但完全模块化)
// 每个文件都 < 200行，符合架构要求

// 使用新的模块化组件
export { default } from './synopsis/StorySynopsisNew';
