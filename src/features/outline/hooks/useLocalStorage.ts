/**
 * React Hook for Local Storage Operations
 * 重构为模块化架构，提升可维护性
 */

import { useLocalStorageNew } from './storage/useLocalStorageNew';

// 重新导出类型定义
export type { UseLocalStorageReturn } from './storage/types';

/**
 * 本地存储Hook - 主入口
 * 采用模块化架构，代码更清晰易维护
 */
export const useLocalStorage = useLocalStorageNew;

export default useLocalStorage;