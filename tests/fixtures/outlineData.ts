/**
 * 测试数据 Fixtures
 * 提供标准的测试数据对象
 */

import { Character, Chapter, PlotEvent, OutlineData } from '../../src/features/outline/types/outline.types';

// 测试角色数据
export const mockCharacter: Character = {
  id: 'char-001',
  name: '张三',
  age: 25,
  gender: 'male',
  role: 'protagonist',
  background: '来自普通家庭的青年',
  personality: '勇敢、善良、有正义感',
  appearance: '中等身材，明亮的眼睛',
  goals: '保护家人和朋友',
  skills: ['武术', '策略'],
  relationships: [],
  development: {
    arc: '从普通人成长为英雄',
    keyMoments: ['初次遇险', '获得力量'],
    growth: '从软弱变得坚强',
    conflicts: ['内心恐惧', '道德选择']
  },
  lastUpdated: new Date('2024-01-01T00:00:00Z')
};

export const mockCharacters: Character[] = [
  mockCharacter,
  {
    ...mockCharacter,
    id: 'char-002',
    name: '李四',
    role: 'antagonist',
    personality: '聪明、狡猾'
  }
];

// 测试章节数据
export const mockChapter: Chapter = {
  id: 'chap-001',
  number: 1,
  title: '初遇',
  summary: '故事的开始',
  content: '这是第一章的内容...',
  scenes: [{
    id: 'scene-001',
    title: '开场',
    description: '故事开始的场景',
    location: '小镇',
    characters: ['char-001'],
    timeOfDay: 'morning',
    wordCount: 500,
    lastUpdated: new Date('2024-01-01T00:00:00Z')
  }],
  status: 'complete',
  wordCount: 2500,
  estimatedReadingTime: 10,
  lastUpdated: new Date('2024-01-01T00:00:00Z')
};

export const mockChapters: Chapter[] = [
  mockChapter,
  {
    ...mockChapter,
    id: 'chap-002',
    number: 2,
    title: '冲突',
    status: 'draft'
  }
];

// 测试时间线事件数据
export const mockPlotEvent: PlotEvent = {
  id: 'event-001',
  title: '主角登场',
  description: '主角首次出现',
  timestamp: '2024-01-01T08:00:00.000Z',
  type: 'beginning',
  importance: 'critical',
  location: '小镇',
  characters: ['char-001'],
  consequences: '引入主角',
  notes: '重要开场',
  isKeyEvent: true,
  lastUpdated: new Date('2024-01-01T00:00:00Z')
};

export const mockEvents: PlotEvent[] = [
  mockPlotEvent,
  {
    ...mockPlotEvent,
    id: 'event-002',
    title: '初次冲突',
    type: 'development',
    importance: 'important'
  }
];

// 完整的测试大纲数据
export const mockOutlineData: OutlineData = {
  id: 'test-outline-001',
  project: {
    id: 'proj-001',
    name: '测试小说',
    description: '用于单元测试的小说项目',
    author: '测试作者',
    genre: '奇幻',
    targetWordCount: 80000,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    lastUpdated: new Date('2024-01-01T00:00:00Z')
  },
  story: {
    id: 'story-001',
    background: {
      era: '现代',
      location: '虚构城市',
      socialEnvironment: '和平时期',
      historicalContext: '科技发达的现代社会'
    },
    coreTheme: {
      theme: '成长与友谊',
      conflict: '个人成长与现实压力的冲突',
      message: '真正的力量来自内心',
      keywords: ['成长', '友谊', '勇气']
    },
    synopsis: {
      beginning: '普通青年过着平凡生活',
      development: '意外卷入超自然事件',
      climax: '面对终极挑战',
      ending: '获得成长和友谊',
      overallTone: '积极向上'
    },
    lastUpdated: new Date('2024-01-01T00:00:00Z')
  },
  characters: {
    characters: mockCharacters,
    relationships: []
  },
  timeline: {
    id: 'timeline-001',
    events: mockEvents,
    startTime: '2024-01-01',
    endTime: '2024-12-31',
    timelineNotes: '故事跨越一年'
  },
  chapters: {
    id: 'chapters-001',
    chapters: mockChapters,
    totalChapters: 2,
    overallStructure: '三幕式结构'
  },
  world: {
    id: 'world-001',
    geography: {
      regions: [{
        id: 'region-001',
        name: '和平镇',
        description: '宁静的小镇',
        significance: '故事起点',
        connectedRegions: [],
        lastUpdated: new Date('2024-01-01T00:00:00Z')
      }],
      climate: '温带海洋性气候',
      landmarks: ['中央广场', '古老教堂'],
      naturalFeatures: ['小河', '山丘']
    },
    society: {
      political: '民主制度',
      economic: '混合经济',
      cultural: ['多元文化', '包容开放'],
      religious: '信仰自由',
      technology: '现代科技',
      socialClasses: ['平民', '精英']
    },
    history: {
      timeline: [],
      legends: ['古老传说'],
      familySecrets: [],
      mysteries: []
    },
    customRules: ['魔法存在但隐秘'],
    inspirationSources: ['现实世界', '奇幻文学']
  },
  subplots: {
    id: 'subplots-001',
    subplots: [],
    secondaryStories: [],
    weavingStrategy: '交织发展'
  },
  ideas: {
    id: 'ideas-001',
    ideas: [],
    alternatives: [],
    inspirationSources: [],
    brainstormingSessions: []
  },
  themes: {
    id: 'themes-001',
    themes: {
      primary: '成长',
      secondary: ['友谊', '勇气'],
      symbols: ['光明', '桥梁'],
      metaphors: ['成长之路'],
      motifs: ['重复的梦境']
    },
    characterMotivations: [],
    philosophicalQuestions: ['什么是真正的勇气？'],
    socialCommentary: ['现代社会的人际关系'],
    personalReflections: ['友谊的珍贵']
  }
};

// 空数据状态
export const emptyOutlineData: OutlineData = {
  id: '',
  project: {
    id: '',
    name: '',
    description: '',
    author: '',
    genre: '',
    targetWordCount: 0,
    createdAt: new Date(),
    lastUpdated: new Date()
  },
  story: {
    id: '',
    background: {
      era: '',
      location: '',
      socialEnvironment: '',
      historicalContext: ''
    },
    coreTheme: {
      theme: '',
      conflict: '',
      message: '',
      keywords: []
    },
    synopsis: {
      beginning: '',
      development: '',
      climax: '',
      ending: '',
      overallTone: ''
    },
    lastUpdated: new Date()
  },
  characters: { characters: [], relationships: [] },
  timeline: { id: '', events: [], startTime: '', endTime: '', timelineNotes: '' },
  chapters: { id: '', chapters: [], totalChapters: 0, overallStructure: '' },
  world: {
    id: '',
    geography: { regions: [], climate: '', landmarks: [], naturalFeatures: [] },
    society: { political: '', economic: '', cultural: [], religious: '', technology: '', socialClasses: [] },
    history: { timeline: [], legends: [], familySecrets: [], mysteries: [] },
    customRules: [],
    inspirationSources: []
  },
  subplots: { id: '', subplots: [], secondaryStories: [], weavingStrategy: '' },
  ideas: { id: '', ideas: [], alternatives: [], inspirationSources: [], brainstormingSessions: [] },
  themes: {
    id: '',
    themes: { primary: '', secondary: [], symbols: [], metaphors: [], motifs: [] },
    characterMotivations: [],
    philosophicalQuestions: [],
    socialCommentary: [],
    personalReflections: []
  }
};