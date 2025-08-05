/**
 * 时间线事件模块类型定义
 */

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