/**
 * UI相关类型定义
 */
// @ts-nocheck


export type OutlineModule =
  | 'story'
  | 'characters'
  | 'timeline'
  | 'world'
  | 'chapters'
  | 'themes'
  | 'subplots'
  | 'ideas';

export interface ModuleNavigationItem {
  id: OutlineModule;
  title: string;
  icon: string;
  description: string;
  isActive: boolean;
  completionRate: number; // 完成度 (0-100)
}
