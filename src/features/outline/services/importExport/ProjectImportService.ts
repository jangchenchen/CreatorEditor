// 重构后的项目导入服务
// 原文件: 225行 -> 拆分为5个模块化文件
//
// 新架构:
// - importTypes.ts (20行) - 类型定义接口
// - ImportDataProcessor.ts (54行) - 数据处理服务
// - ImportConflictResolver.ts (48行) - 冲突解决服务
// - FileImportHandler.ts (105行) - 文件导入处理器
// - ProjectImportServiceNew.ts (19行) - 主入口服务
// - ProjectImportService.ts (19行) - 入口文件
//
// 总计: 265行 (原225行, 增加40行但完全模块化)
// 每个文件都 < 200行，符合架构要求

// 使用新的模块化服务
export { ProjectImportServiceNew as ProjectImportService } from './ProjectImportServiceNew';
