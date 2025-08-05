// 重构后的事件编辑对话框组件
// 原文件: 239行 -> 拆分为7个模块化文件
//
// 新架构:
// - types.ts (32行) - 类型定义接口
// - EventEditDialog.tsx (35行) - 对话框容器组件
// - BasicInfoFields.tsx (29行) - 基本信息字段
// - TypeImportanceFields.tsx (44行) - 类型和重要性字段
// - DescriptionImpactFields.tsx (39行) - 描述和影响字段
// - CharacterLocationFields.tsx (36行) - 角色和地点字段
// - TagsAndKeyEvent.tsx (31行) - 标签和关键事件字段
// - EventEditDialogNew.tsx (65行) - 主容器组件
// - EventEditDialog.tsx (19行) - 入口文件
//
// 总计: 330行 (原239行, 增加91行但完全模块化)
// 每个文件都 < 200行，符合架构要求

// 使用新的模块化组件
export { default } from './dialog/EventEditDialogNew';