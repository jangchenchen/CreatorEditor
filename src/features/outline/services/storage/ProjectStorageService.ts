// 重构后的项目存储服务
// 原文件: 215行 -> 拆分为5个模块化文件
//
// 新架构:
// - storageTypes.ts (17行) - 类型定义接口
// - ProjectStateManager.ts (75行) - 项目状态管理器
// - ProjectOperationsManager.ts (68行) - 项目操作管理器
// - ProjectImportExportManager.ts (77行) - 项目导入导出管理器
// - ProjectStorageServiceNew.ts (65行) - 主入口服务
// - ProjectStorageService.ts (19行) - 入口文件
//
// 总计: 321行 (原215行, 增加106行但完全模块化)
// 每个文件都 < 200行，符合架构要求

// 使用新的模块化服务
export { ProjectStorageServiceNew as ProjectStorageService } from './ProjectStorageServiceNew';