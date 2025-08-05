/**
 * 核心数据结构类型定义
 */

import { StoryOverview } from './story.types';
import { Character, Relationship } from './character.types';
import { PlotTimeline } from './timeline.types';
import { WorldBuilding } from './world.types';
import { ChapterOutline } from './chapter.types';
import { ThemeExploration } from './theme.types';
import { SubplotManager } from './subplot.types';
import { CreativeIdeas } from './idea.types';

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