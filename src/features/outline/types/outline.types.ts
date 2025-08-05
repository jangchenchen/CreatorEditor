/**
 * 大纲系统的核心类型定义
 * 基于小说创作方法论的8个核心模块
 */

// =========================
// 1️⃣ 整体故事概述模块
// =========================
export interface StoryBackground {
  era: string;                  // 时代背景
  location: string;             // 地点设定
  socialEnvironment: string;    // 社会环境
  historicalContext: string;    // 历史背景
}

export interface CoreTheme {
  theme: string;                // 核心主题
  conflict: string;             // 主要冲突
  message: string;              // 要表达的理念
  keywords: string[];           // 关键词标签
}

export interface StorySynopsis {
  beginning: string;            // 起
  development: string;          // 承
  climax: string;              // 转
  ending: string;              // 合
  overallTone: string;         // 整体基调
}

export interface StoryOverview {
  id: string;
  background: StoryBackground;
  coreTheme: CoreTheme;
  synopsis: StorySynopsis;
  lastUpdated: Date;
}

// =========================
// 2️⃣ 人物与角色关系模块
// =========================
export type CharacterRole = 'protagonist' | 'antagonist' | 'supporting' | 'minor';
export type RelationshipType = 'family' | 'friend' | 'enemy' | 'lover' | 'mentor' | 'rival' | 'colleague';

export interface CharacterArc {
  startState: string;           // 初始状态
  keyEvents: string[];          // 关键转折点
  endState: string;             // 最终状态
  growthDirection: string;      // 成长方向
}

export interface Character {
  id: string;
  name: string;
  role: CharacterRole;
  background: string;           // 角色背景
  personality: string[];        // 性格特征
  appearance: string;           // 外貌描述
  goals: string;                // 目标动机
  motivation: string;           // 行动驱力
  arc: CharacterArc;           // 发展弧线
  tags: string[];              // 标签分类
  createdAt: Date;
  lastUpdated: Date;
}

export interface Relationship {
  id: string;
  fromCharacter: string;        // 源角色ID
  toCharacter: string;          // 目标角色ID
  type: RelationshipType;       // 关系类型
  description: string;          // 关系描述
  intensity: number;            // 关系强度 (1-10)
  isReversible: boolean;        // 是否双向关系
  developmentStage: string;     // 关系发展阶段
}

// =========================
// 3️⃣ 情节时间线与关键事件模块
// =========================
export type PlotEventType = 'beginning' | 'development' | 'climax' | 'resolution' | 'transition';
export type EventImportance = 'critical' | 'important' | 'minor';

export interface PlotEvent {
  id: string;
  timestamp: string;            // 故事内时间点
  title: string;
  description: string;
  type: PlotEventType;
  importance: EventImportance;
  isKeyEvent: boolean;          // 是否为关键转折点
  characters: string[];         // 涉及角色ID列表
  locations: string[];          // 涉及地点
  impact: string;               // 对故事的影响
  consequences: string[];       // 后续影响
  relatedEvents: string[];      // 相关事件ID
  tags: string[];
}

export interface PlotTimeline {
  id: string;
  events: PlotEvent[];
  startTime: string;            // 故事开始时间
  endTime: string;              // 故事结束时间
  timelineNotes: string;        // 时间线说明
}

// =========================
// 4️⃣ 世界设定/背景构建模块
// =========================
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
  significance: string;          // 在故事中的重要性
  connectedRegions: string[];    // 相连地区
}

export interface SocialSystem {
  political: string;            // 政治制度
  economic: string;             // 经济体系
  cultural: string[];           // 文化习俗
  religious: string;            // 宗教信仰
  technology: string;           // 科技/魔法水平
  socialClasses: string[];      // 社会阶层
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
  legends: string[];            // 传说神话
  familySecrets: string[];      // 家族秘史
  mysteries: string[];          // 未解之谜
}

export interface WorldBuilding {
  id: string;
  geography: GeographySetting;
  society: SocialSystem;
  history: WorldHistory;
  customRules: string[];        // 特殊设定规则
  inspirationSources: string[]; // 灵感来源
}

// =========================
// 5️⃣ 章节大纲模块
// =========================
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

// =========================
// 6️⃣ 主题与内涵探索模块
// =========================
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

// =========================
// 7️⃣ 副线情节与支线任务模块
// =========================
export type SubplotPurpose = 'background' | 'contrast' | 'suspense' | 'character-development' | 'comic-relief';
export type SubplotStatus = 'planned' | 'active' | 'resolved' | 'abandoned';

export interface Subplot {
  id: string;
  title: string;
  description: string;
  purpose: SubplotPurpose;
  status: SubplotStatus;
  relatedCharacters: string[];   // 相关角色
  startChapter: number;          // 开始章节
  endChapter: number;            // 结束章节
  connection: string;            // 与主线的联系
  resolution: string;            // 解决方案
  impact: string;                // 对主线的影响
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
  weavingStrategy: string;       // 编织策略
}

// =========================
// 8️⃣ 创意与情节联想模块
// =========================
export type IdeaType = 'inspiration' | 'plot-extension' | 'alternative-ending' | 'scene-idea' | 'character-twist' | 'dialogue';
export type IdeaStatus = 'draft' | 'considering' | 'adopted' | 'rejected' | 'archived';

export interface CreativeIdea {
  id: string;
  type: IdeaType;
  title: string;
  content: string;
  relatedModule: string;         // 关联的大纲模块
  relatedElements: string[];     // 相关元素ID
  priority: number;              // 优先级 (1-5)
  status: IdeaStatus;
  tags: string[];
  inspiration: string;           // 灵感来源
  potentialImpact: string;       // 潜在影响
  createdAt: Date;
  lastUpdated: Date;
}

export interface PlotAlternative {
  id: string;
  originalElement: string;       // 原始情节元素
  alternativeVersion: string;    // 替代版本
  pros: string[];                // 优点
  cons: string[];                // 缺点
  impact: string;                // 影响分析
}

export interface CreativeIdeas {
  id: string;
  ideas: CreativeIdea[];
  alternatives: PlotAlternative[];
  inspirationSources: string[];
  brainstormingSessions: string[];
}

// =========================
// 大纲数据总体结构
// =========================
export interface OutlineData {
  id: string;
  projectName: string;
  story: StoryOverview;
  characters: Character[];
  relationships: Relationship[];
  timeline: PlotTimeline;
  world: WorldBuilding;
  chapters: ChapterOutline;
  themes: ThemeExploration;
  subplots: SubplotManager;
  ideas: CreativeIdeas;
  version: string;               // 数据版本
  createdAt: Date;
  lastUpdated: Date;
}

// =========================
// UI相关类型
// =========================
export type OutlineModule = 'story' | 'characters' | 'timeline' | 'world' | 'chapters' | 'themes' | 'subplots' | 'ideas';

export interface ModuleNavigationItem {
  id: OutlineModule;
  title: string;
  icon: string;
  description: string;
  isActive: boolean;
  completionRate: number;        // 完成度 (0-100)
}

// =========================
// 可视化相关类型 (ReactFlow)
// =========================
export interface VisualNode {
  id: string;
  type: string;
  position: { x: number; y: number; };
  data: any;
}

export interface VisualEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  data?: any;
}

export interface VisualizationData {
  nodes: VisualNode[];
  edges: VisualEdge[];
}