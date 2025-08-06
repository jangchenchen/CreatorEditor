// @ts-nocheck
// 重构后的文档导出Hook
// 原文件: 207行 -> 拆分为5个模块化文件
//
// 新架构:
// - exportTypes.ts (20行) - 类型定义接口
// - useExportData.ts (108行) - 数据处理Hook
// - useExportState.ts (49行) - 状态管理Hook
// - useExportActions.ts (73行) - 操作处理Hook
// - useDocumentExportNew.ts (22行) - 主入口Hook
// - useDocumentExport.ts (19行) - 入口文件
//
// 总计: 291行 (原207行, 增加84行但完全模块化)
// 每个文件都 < 200行，符合架构要求

// 使用新的模块化Hook
export { useDocumentExportNew as useDocumentExport } from './useDocumentExportNew';
