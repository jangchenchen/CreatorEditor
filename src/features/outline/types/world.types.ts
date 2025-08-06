/**
 * 世界构建模块类型定义
 */

export interface GeographySetting {
  regions: Region[];
  climate: string;
  landmarks: string[];
  naturalFeatures: string[];
}

export interface Region {
  id: string;
  name: string;
  description: string;
  significance: string; // 在故事中的重要性
  connectedRegions: string[]; // 相连地区
}

export interface SocialSystem {
  political: string; // 政治制度
  economic: string; // 经济体系
  cultural: string[]; // 文化习俗
  religious: string; // 宗教信仰
  technology: string; // 科技/魔法水平
  socialClasses: string[]; // 社会阶层
}

export interface HistoricalEvent {
  id: string;
  name: string;
  period: string;
  description: string;
  impact: string;
}

export interface WorldHistory {
  timeline: HistoricalEvent[];
  legends: string[]; // 传说神话
  familySecrets: string[]; // 家族秘史
  mysteries: string[]; // 未解之谜
}

export interface WorldBuilding {
  id: string;
  geography: GeographySetting;
  society: SocialSystem;
  history: WorldHistory;
  customRules: string[]; // 特殊设定规则
  inspirationSources: string[]; // 灵感来源
}
