/**
 * 故事概述模块类型定义
 */

export interface StoryBackground {
  era: string; // 时代背景
  location: string; // 地点设定
  socialEnvironment: string; // 社会环境
  historicalContext: string; // 历史背景
}

export interface CoreTheme {
  theme: string; // 核心主题
  conflict: string; // 主要冲突
  message: string; // 要表达的理念
  keywords: string[]; // 关键词标签
}

export interface StorySynopsis {
  beginning: string; // 起
  development: string; // 承
  climax: string; // 转
  ending: string; // 合
  overallTone: string; // 整体基调
}

export interface StoryOverview {
  id: string;
  background: StoryBackground;
  coreTheme: CoreTheme;
  synopsis: StorySynopsis;
  lastUpdated: Date;
}
