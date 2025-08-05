import React from 'react';
import { Box, Divider } from '@mui/material';
import { TimelineOverviewProps } from './overview/types';
import { useTimelineOverview } from './overview/useTimelineOverview';
import { TimelineStatsPanel } from './overview/TimelineStatsPanel';
import { TimelineFlow } from './overview/TimelineFlow';
import { TimelineLegend } from './overview/TimelineLegend';
import { EmptyTimeline } from './overview/EmptyTimeline';

const TimelineOverview: React.FC<TimelineOverviewProps> = (props) => {
  const {
    plotEvents,
    layout,
    stats,
    hasEvents,
    handleEventClick
  } = useTimelineOverview();

  if (!hasEvents) {
    return <EmptyTimeline />;
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 统计信息面板 */}
      <TimelineStatsPanel stats={stats} />

      <Divider sx={{ mb: 2 }} />

      {/* 时间线可视化 */}
      <TimelineFlow 
        layout={layout} 
        onNodeClick={handleEventClick}
      />

      {/* 图例 */}
      <TimelineLegend />
    </Box>
  );
};

export default TimelineOverview;