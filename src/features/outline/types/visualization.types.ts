/**
 * 可视化相关类型定义 (ReactFlow)
 */

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