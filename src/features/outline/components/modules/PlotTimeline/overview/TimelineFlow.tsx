import React from 'react';
import { Paper } from '@mui/material';
import ReactFlow, {
  Controls,
  Background,
  ConnectionMode,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { TimelineLayout } from './types';
import { TimelineEventNode } from './TimelineEventNode';

interface TimelineFlowProps {
  layout: TimelineLayout;
  onNodeClick?: (event: React.MouseEvent, node: any) => void;
}

const nodeTypes = {
  timelineEvent: TimelineEventNode,
};

export const TimelineFlow: React.FC<TimelineFlowProps> = ({ layout, onNodeClick }) => {
  const [nodesState, , onNodesChange] = useNodesState(layout.nodes);
  const [edgesState, , onEdgesChange] = useEdgesState(layout.edges);

  return (
    <Paper
      elevation={2}
      sx={{
        flex: 1,
        position: 'relative',
        minHeight: 400,
        overflow: 'hidden',
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
        attributionPosition='bottom-left'
      >
        <Controls />
        <Background gap={20} size={1} />
      </ReactFlow>
    </Paper>
  );
};
