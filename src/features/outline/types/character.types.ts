/**
 * 角色关系模块类型定义
 */

export type CharacterRole = 'protagonist' | 'antagonist' | 'supporting' | 'minor';
export type RelationshipType =
  | 'family'
  | 'friend'
  | 'enemy'
  | 'lover'
  | 'mentor'
  | 'rival'
  | 'colleague';

export interface CharacterArc {
  startState: string; // 初始状态
  keyEvents: string[]; // 关键转折点
  endState: string; // 最终状态
  growthDirection: string; // 成长方向
}

export interface Character {
  id: string;
  name: string;
  role: CharacterRole;
  background: string; // 角色背景
  personality: string[]; // 性格特征
  appearance: string; // 外貌描述
  goals: string; // 目标动机
  motivation: string; // 行动驱力
  arc: CharacterArc; // 发展弧线
  tags: string[]; // 标签分类
  createdAt: Date;
  lastUpdated: Date;
}

export interface Relationship {
  id: string;
  fromCharacter: string; // 源角色ID
  toCharacter: string; // 目标角色ID
  type: RelationshipType; // 关系类型
  description: string; // 关系描述
  intensity: number; // 关系强度 (1-10)
  isReversible: boolean; // 是否双向关系
  developmentStage: string; // 关系发展阶段
}
