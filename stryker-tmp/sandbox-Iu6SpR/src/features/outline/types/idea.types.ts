/**
 * 创意想法模块类型定义
 */
// @ts-nocheck


export type IdeaType =
  | 'inspiration'
  | 'plot-extension'
  | 'alternative-ending'
  | 'scene-idea'
  | 'character-twist'
  | 'dialogue';
export type IdeaStatus = 'draft' | 'considering' | 'adopted' | 'rejected' | 'archived';

export interface CreativeIdea {
  id: string;
  type: IdeaType;
  title: string;
  content: string;
  relatedModule: string; // 关联的大纲模块
  relatedElements: string[]; // 相关元素ID
  priority: number; // 优先级 (1-5)
  status: IdeaStatus;
  tags: string[];
  inspiration: string; // 灵感来源
  potentialImpact: string; // 潜在影响
  createdAt: Date;
  lastUpdated: Date;
}

export interface PlotAlternative {
  id: string;
  originalElement: string; // 原始情节元素
  alternativeVersion: string; // 替代版本
  pros: string[]; // 优点
  cons: string[]; // 缺点
  impact: string; // 影响分析
}

export interface CreativeIdeas {
  id: string;
  ideas: CreativeIdea[];
  alternatives: PlotAlternative[];
  inspirationSources: string[];
  brainstormingSessions: string[];
}
