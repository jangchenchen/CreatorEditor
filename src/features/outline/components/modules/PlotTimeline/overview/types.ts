import { PlotEvent, PlotEventType, EventImportance } from '../../../../types/outline.types';
import { Node, Edge, Position } from 'reactflow';

export interface TimelineOverviewProps {
  onEventClick?: (event: PlotEvent) => void;
  onEventEdit?: (event: PlotEvent) => void;
}

export interface TimelineStats {
  total: number;
  keyEvents: number;
  byType: Record<PlotEventType, number>;
}

export interface TimelineLayout {
  nodes: Node[];
  edges: Edge[];
}

export interface EventPositionConfig {
  typePositions: Record<PlotEventType, number>;
  importanceOffset: Record<EventImportance, number>;
  horizontalSpacing: number;
}

export interface EventStyleConfig {
  colors: Record<PlotEventType, string>;
  sizes: Record<EventImportance, string>;
  borderColors: Record<PlotEventType, string>;
}

export interface TimelineNodeData {
  event: PlotEvent;
  onEventClick?: (event: PlotEvent) => void;
}

export interface TimelineEventNodeProps {
  data: PlotEvent;
  onEventClick?: (event: PlotEvent) => void;
}

export const DEFAULT_EVENT_COLORS: Record<PlotEventType, string> = {
  beginning: '#2196f3',
  development: '#4caf50',
  climax: '#ff9800',
  resolution: '#9c27b0',
  transition: '#607d8b',
};

export const DEFAULT_EVENT_SIZES: Record<EventImportance, string> = {
  critical: '120px',
  important: '100px',
  minor: '80px',
};

export const DEFAULT_TYPE_POSITIONS: Record<PlotEventType, number> = {
  beginning: 50,
  development: 150,
  climax: 100,
  resolution: 200,
  transition: 250,
};

export const DEFAULT_IMPORTANCE_OFFSETS: Record<EventImportance, number> = {
  critical: -20,
  important: 0,
  minor: 20,
};

export const EVENT_TYPE_LABELS = {
  beginning: '开端',
  development: '发展',
  climax: '高潮',
  resolution: '结局',
  transition: '过渡',
} as const;
