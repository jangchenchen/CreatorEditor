import React from 'react';
import { Box, Grid, Divider, Typography } from '@mui/material';
import { TimeRangeSettings } from './TimeRangeSettings';
import { TimelineNotes } from './TimelineNotes';
import { TimelineStats } from './TimelineStats';
import { TimelineTips } from './TimelineTips';
import { ActionButtons } from './ActionButtons';
import { TimelineTemplates } from './TimelineTemplates';
import { useTimelineSettings } from './useTimelineSettings';

export const TimelineSettingsNew: React.FC = () => {
  const {
    timeline,
    handleFieldChange,
    handleSave,
    handleReset
  } = useTimelineSettings();

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        时间线设置
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        配置故事时间线的基本参数和整体说明，为情节事件提供时间框架。
      </Typography>

      <Grid container spacing={3}>
        {/* 时间范围设置 */}
        <Grid item xs={12}>
          <TimeRangeSettings
            startTime={timeline.startTime}
            endTime={timeline.endTime}
            onStartTimeChange={handleFieldChange('startTime')}
            onEndTimeChange={handleFieldChange('endTime')}
          />
        </Grid>

        {/* 时间线说明 */}
        <Grid item xs={12}>
          <TimelineNotes
            timelineNotes={timeline.timelineNotes}
            onTimelineNotesChange={handleFieldChange('timelineNotes')}
          />
        </Grid>

        {/* 时间线统计信息 */}
        <Grid item xs={12}>
          <TimelineStats
            totalEvents={timeline.events.length}
            keyEvents={timeline.events.filter(e => e.isKeyEvent).length}
          />
        </Grid>

        {/* 使用指南 */}
        <Grid item xs={12}>
          <TimelineTips />
        </Grid>

        {/* 操作按钮 */}
        <Grid item xs={12}>
          <ActionButtons
            onSave={handleSave}
            onReset={handleReset}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* 时间线模板建议 */}
      <TimelineTemplates />
    </Box>
  );
};

export default TimelineSettingsNew;