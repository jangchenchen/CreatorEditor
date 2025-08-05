import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Divider
} from '@mui/material';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Position,
  ConnectionMode
} from 'reactflow';
import 'reactflow/dist/style.css';
import { selectTimeline, selectPlotEvents } from '../../../outlineSlice';
import { PlotEvent, PlotEventType, EventImportance } from '../../../types/outline.types';

// 自定义节点类型
const TimelineEventNode: React.FC<{ data: PlotEvent }> = ({ data }) => {
  const getEventColor = (type: PlotEventType) => {
    const colors = {
      beginning: '#2196f3',
      development: '#4caf50', 
      climax: '#ff9800',
      resolution: '#9c27b0',
      transition: '#607d8b'
    };
    return colors[type] || '#757575';
  };

  const getImportanceSize = (importance: EventImportance) => {
    const sizes = {
      critical: '120px',
      important: '100px', 
      minor: '80px'
    };
    return sizes[importance] || '80px';
  };

  return (
    <Card 
      elevation={3}
      sx={{ 
        width: getImportanceSize(data.importance),
        border: `3px solid ${getEventColor(data.type)}`,
        borderRadius: 2,
        cursor: 'pointer',
        '&:hover': {
          elevation: 6,
          transform: 'scale(1.02)'
        }
      }}
    >
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Typography variant="subtitle2" fontWeight="bold" noWrap>
          {data.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          {data.timestamp}
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          <Chip 
            label={data.type} 
            size="small" 
            sx={{ 
              bgcolor: getEventColor(data.type),
              color: 'white',
              fontSize: '0.6rem',
              height: 18
            }}
          />
          {data.isKeyEvent && (
            <Chip 
              label="关键" 
              size="small" 
              color="secondary"
              sx={{ fontSize: '0.6rem', height: 18 }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const nodeTypes = {
  timelineEvent: TimelineEventNode,
};

const TimelineOverview: React.FC = () => {
  const timeline = useSelector(selectTimeline);
  const plotEvents = useSelector(selectPlotEvents);

  // 创建时间线节点和边
  const { nodes, edges } = useMemo(() => {
    if (plotEvents.length === 0) {
      return { nodes: [], edges: [] };
    }

    // 按时间戳排序事件
    const sortedEvents = [...plotEvents].sort((a, b) => 
      a.timestamp.localeCompare(b.timestamp)
    );

    // 创建节点
    const timelineNodes: Node[] = sortedEvents.map((event, index) => ({
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
    const timelineEdges: Edge[] = [];
    for (let i = 0; i < sortedEvents.length - 1; i++) {
      timelineEdges.push({
        id: `edge-${sortedEvents[i].id}-${sortedEvents[i + 1].id}`,
        source: sortedEvents[i].id,
        target: sortedEvents[i + 1].id,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#666', strokeWidth: 2 }
      });
    }

    return { nodes: timelineNodes, edges: timelineEdges };
  }, [plotEvents]);

  const [nodesState, , onNodesChange] = useNodesState(nodes);
  const [edgesState, , onEdgesChange] = useEdgesState(edges);

  // 根据事件类型和重要性确定垂直位置
  function getEventVerticalPosition(type: PlotEventType, importance: EventImportance): number {
    const typePositions = {
      beginning: 50,
      development: 150,
      climax: 100,
      resolution: 200,
      transition: 250
    };
    
    const importanceOffset = {
      critical: -20,
      important: 0,
      minor: 20
    };

    return (typePositions[type] || 150) + (importanceOffset[importance] || 0);
  }

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('选中事件:', node.data);
    // TODO: 实现事件详情显示或编辑功能
  }, []);

  // 统计信息
  const stats = useMemo(() => {
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

  if (plotEvents.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          暂无情节事件
        </Typography>
        <Typography variant="body2" color="text.secondary">
          点击上方的"添加事件"按钮开始创建您的故事时间线
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 统计信息面板 */}
      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          时间线统计
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Typography variant="h4" color="primary">
              {stats.total}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              总事件数
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h4" color="secondary">
              {stats.keyEvents}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              关键事件
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {Object.entries(stats.byType).map(([type, count]) => (
                <Chip 
                  key={type}
                  label={`${type}: ${count}`}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Divider sx={{ mb: 2 }} />

      {/* 时间线可视化 */}
      <Paper 
        elevation={2} 
        sx={{ 
          flex: 1, 
          position: 'relative',
          minHeight: 400,
          overflow: 'hidden'
        }}
      >
        <ReactFlow
          nodes={nodesState}
          edges={edgesState}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Strict}
          fitView
          fitViewOptions={{ padding: 50 }}
          attributionPosition="bottom-left"
        >
          <Controls />
          <Background gap={20} size={1} />
        </ReactFlow>
      </Paper>

      {/* 图例 */}
      <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          图例说明
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" display="block" gutterBottom>
              事件类型：
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip label="开端" size="small" sx={{ bgcolor: '#2196f3', color: 'white' }} />
              <Chip label="发展" size="small" sx={{ bgcolor: '#4caf50', color: 'white' }} />
              <Chip label="高潮" size="small" sx={{ bgcolor: '#ff9800', color: 'white' }} />
              <Chip label="结局" size="small" sx={{ bgcolor: '#9c27b0', color: 'white' }} />
              <Chip label="过渡" size="small" sx={{ bgcolor: '#607d8b', color: 'white' }} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" display="block" gutterBottom>
              重要性：大卡片=关键，中卡片=重要，小卡片=次要
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default TimelineOverview;