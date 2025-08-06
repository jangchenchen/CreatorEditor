// 重构后的模块化章节对话框组件
// 原文件: 324行 -> 拆分为6个模块化文件
//
// 新架构:
// - types.ts (45行) - 类型定义
// - useChapterDialog.ts (115行) - 状态管理Hook
// - BasicInfoForm.tsx (89行) - 基本信息表单
// - TransitionSettings.tsx (32行) - 过渡设置
// - DialogActions.tsx (41行) - 对话框操作
// - ChapterDialogNew.tsx (59行) - 主容器组件
//
// 总计: 381行 (原324行, 增加57行但完全模块化)
// 每个文件都 < 200行，符合架构要求

// 使用新的模块化组件
export { default } from './ChapterDialogNew';
