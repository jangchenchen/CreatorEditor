/**
 * 副线情节模块类型定义
 */
// @ts-nocheck


export type SubplotPurpose =
  | 'background'
  | 'contrast'
  | 'suspense'
  | 'character-development'
  | 'comic-relief';
export type SubplotStatus = 'planned' | 'active' | 'resolved' | 'abandoned';

export interface Subplot {
  id: string;
  title: string;
  description: string;
  purpose: SubplotPurpose;
  status: SubplotStatus;
  relatedCharacters: string[]; // 相关角色
  startChapter: number; // 开始章节
  endChapter: number; // 结束章节
  connection: string; // 与主线的联系
  resolution: string; // 解决方案
  impact: string; // 对主线的影响
}

export interface SecondaryCharacterStory {
  characterId: string;
  personalGoal: string;
  backstory: string;
  developmentArc: string;
  resolutionMethod: string;
}

export interface SubplotManager {
  id: string;
  subplots: Subplot[];
  secondaryStories: SecondaryCharacterStory[];
  weavingStrategy: string; // 编织策略
}
