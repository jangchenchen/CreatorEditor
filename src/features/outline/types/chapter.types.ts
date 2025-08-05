/**
 * 章节大纲模块类型定义
 */

export interface Scene {
  id: string;
  title: string;
  description: string;
  location: string;
  characters: string[];         // 出场角色ID
  purpose: string;              // 场景目的
  conflict: string;             // 场景冲突
  outcome: string;              // 场景结果
}

export interface ChapterTransition {
  from: string;                 // 承接内容
  to: string;                   // 引导内容
  method: string;               // 过渡方式
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  summary: string;              // 章节概述
  keyScenes: Scene[];           // 关键场景
  characters: string[];         // 主要出场角色
  plotPoints: string[];         // 情节要点
  conflicts: string[];          // 章节内冲突
  themes: string[];             // 涉及主题
  wordCountTarget: number;      // 目标字数
  status: 'planned' | 'writing' | 'completed' | 'revision';
  transitions: ChapterTransition;
  notes: string;
}

export interface ChapterOutline {
  id: string;
  chapters: Chapter[];
  totalChapters: number;
  overallStructure: string;     // 整体结构说明
}