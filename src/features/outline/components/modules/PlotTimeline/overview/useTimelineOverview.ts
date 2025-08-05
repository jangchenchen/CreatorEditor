import { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Node, Edge, Position } from 'reactflow';
import { selectTimeline, selectPlotEvents } from '../../../../outlineSlice';
import { PlotEvent, PlotEventType, EventImportance } from '../../../../types/outline.types';
import { 
  TimelineStats, 
  TimelineLayout,
  EventPositionConfig,
  DEFAULT_TYPE_POSITIONS,
  DEFAULT_IMPORTANCE_OFFSETS
} from './types';

export const useTimelineOverview = () => {
  const timeline = useSelector(selectTimeline);
  const plotEvents = useSelector(selectPlotEvents);

  // 创建时间线布局
  const layout: TimelineLayout = useMemo(() => {
    if (plotEvents.length === 0) {
      return { nodes: [], edges: [] };
    }

    // 按时间戳排序事件
    const sortedEvents = [...plotEvents].sort((a, b) => 
      a.timestamp.localeCompare(b.timestamp)
    );

    // 创建节点
    const nodes: Node[] = sortedEvents.map((event, index) => ({
      id: event.id,
      type: 'timelineEvent',
      position: { 
        x: index * 200, // 水平排列
        y: getEventVerticalPosition(event.type, event.importance)
      },
      data: event,
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    }));

    // 创建连接边
    const edges: Edge[] = [];
    for (let i = 0; i < sortedEvents.length - 1; i++) {
      edges.push({
        id: `edge-${sortedEvents[i].id}-${sortedEvents[i + 1].id}`,
        source: sortedEvents[i].id,
        target: sortedEvents[i + 1].id,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#666', strokeWidth: 2 }
      });
    }

    return { nodes, edges };
  }, [plotEvents]);

  // 计算统计信息
  const stats: TimelineStats = useMemo(() => {
    const eventsByType = plotEvents.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {} as Record<PlotEventType, number>);

    const keyEventsCount = plotEvents.filter(e => e.isKeyEvent).length;
    
    return {
      total: plotEvents.length,
      keyEvents: keyEventsCount,
      byType: eventsByType
    };
  }, [plotEvents]);

  // 根据事件类型和重要性确定垂直位置
  const getEventVerticalPosition = useCallback((
    type: PlotEventType, 
    importance: EventImportance
  ): number => {
    const typePositions = DEFAULT_TYPE_POSITIONS;
    const importanceOffset = DEFAULT_IMPORTANCE_OFFSETS;

    return (typePositions[type] || 150) + (importanceOffset[importance] || 0);
  }, []);

  // 处理事件点击
  const handleEventClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('选中事件:', node.data);
    // TODO: 实现事件详情显示或编辑功能
  }, []);

  // 检查是否有事件
  const hasEvents = plotEvents.length > 0;

  return {
    timeline,
    plotEvents,
    layout,
    stats,
    hasEvents,
    handleEventClick,
    getEventVerticalPosition
  };
};