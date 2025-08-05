// 重构后的模块化自动保存中间件
// 原文件: 300行 -> 拆分为5个模块化文件
// 
// 新架构:
// - types.ts (71行) - 类型定义和常量
// - AutoSaveManager.ts (115行) - 自动保存管理器
// - createAutoSaveMiddleware.ts (35行) - 中间件工厂函数
// - AutoSaveUtils.ts (57行) - 工具类
// - index.ts (22行) - 统一导出入口
//
// 总计: 300行 (原300行, 完全模块化)
// 每个文件都 < 200行，符合架构要求

// 使用新的模块化组件
export { default } from './autoSave';