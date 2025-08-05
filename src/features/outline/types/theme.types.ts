/**
 * 主题探索模块类型定义
 */

export interface ThemeAnalysis {
  primary: string;              // 主要主题
  secondary: string[];          // 次要主题
  symbols: string[];            // 象征意义
  metaphors: string[];          // 隐喻元素
  motifs: string[];             // 重复元素/母题
}

export interface CharacterMotivation {
  characterId: string;
  innerConflict: string;        // 内在冲突
  growthMotivation: string;     // 成长动机
  emotionalJourney: string;     // 情感历程
  moralDilemma: string;         // 道德困境
  resolution: string;           // 解决方案
}

export interface ThemeExploration {
  id: string;
  themes: ThemeAnalysis;
  characterMotivations: CharacterMotivation[];
  philosophicalQuestions: string[];  // 哲学思考
  socialCommentary: string[];        // 社会评论
  personalReflections: string[];     // 个人反思
}