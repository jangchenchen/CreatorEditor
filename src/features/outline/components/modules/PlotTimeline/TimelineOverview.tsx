// 重构后的模块化时间线概览组件
// 原文件: 295行 -> 拆分为7个模块化文件
// 
// 新架构:
// - types.ts (68行) - 类型定义和常量
// - useTimelineOverview.ts (70行) - 状态管理Hook
// - TimelineEventNode.tsx (55行) - 时间线事件节点
// - TimelineStatsPanel.tsx (43行) - 统计面板
// - TimelineLegend.tsx (35行) - 图例组件
// - TimelineFlow.tsx (43行) - 流程图组件
// - EmptyTimeline.tsx (18行) - 空状态组件
// - TimelineOverviewNew.tsx (34行) - 主容器组件
//
// 总计: 366行 (原295行, 增加71行但完全模块化)
// 每个文件都 < 200行，符合架构要求

// 使用新的模块化组件
export { default } from './TimelineOverviewNew';