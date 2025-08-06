import React from 'react';
import {
  MenuBook as StoryIcon,
  People as CharacterIcon,
  Timeline as TimelineIcon,
  Public as WorldIcon,
  List as ChapterIcon,
  Psychology as ThemeIcon,
  AccountTree as SubplotIcon,
  Lightbulb as IdeaIcon,
} from '@mui/icons-material';
import { OutlineModule } from '../../types/outline.types';

export interface ModuleInfo {
  id: OutlineModule;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  priority: 'high' | 'medium' | 'low';
}

export const modules: ModuleInfo[] = [
  {
    id: 'story',
    title: '整体故事概述',
    description: '故事背景、核心主题与冲突、故事梗概',
    icon: <StoryIcon />,
    color: '#1976d2',
    priority: 'high',
  },
  {
    id: 'characters',
    title: '人物与角色关系',
    description: '角色档案、发展弧线、关系图谱',
    icon: <CharacterIcon />,
    color: '#9c27b0',
    priority: 'high',
  },
  {
    id: 'timeline',
    title: '情节时间线',
    description: '关键事件、情节转折点、时间线管理',
    icon: <TimelineIcon />,
    color: '#f57c00',
    priority: 'medium',
  },
  {
    id: 'world',
    title: '世界设定构建',
    description: '地理环境、社会制度、历史传承',
    icon: <WorldIcon />,
    color: '#388e3c',
    priority: 'medium',
  },
  {
    id: 'chapters',
    title: '章节大纲',
    description: '分章设计、情节安排、章节衔接',
    icon: <ChapterIcon />,
    color: '#d32f2f',
    priority: 'high',
  },
  {
    id: 'themes',
    title: '主题内涵探索',
    description: '主题深化、角色动机、情感转变',
    icon: <ThemeIcon />,
    color: '#7b1fa2',
    priority: 'low',
  },
  {
    id: 'subplots',
    title: '副线情节管理',
    description: '补充情节、次要角色故事、支线任务',
    icon: <SubplotIcon />,
    color: '#1976d2',
    priority: 'low',
  },
  {
    id: 'ideas',
    title: '创意情节联想',
    description: '灵感记录、情节备选、创意改进',
    icon: <IdeaIcon />,
    color: '#f57c00',
    priority: 'medium',
  },
];

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'info';
    default:
      return 'default';
  }
};

export const getPriorityLabel = (priority: string) => {
  switch (priority) {
    case 'high':
      return '高优先级';
    case 'medium':
      return '中优先级';
    case 'low':
      return '低优先级';
    default:
      return '';
  }
};
