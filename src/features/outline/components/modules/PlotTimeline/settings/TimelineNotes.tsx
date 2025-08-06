import React from 'react';
import { Card, CardContent, CardHeader, TextField } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

interface TimelineNotesProps {
  timelineNotes: string;
  onTimelineNotesChange: (value: string) => void;
}

export const TimelineNotes: React.FC<TimelineNotesProps> = ({
  timelineNotes,
  onTimelineNotesChange,
}) => {
  return (
    <Card elevation={2}>
      <CardHeader
        avatar={<InfoIcon color='primary' />}
        title='时间线说明'
        subheader='对整个时间线结构的详细说明'
      />
      <CardContent>
        <TextField
          fullWidth
          multiline
          rows={6}
          label='时间线说明'
          value={timelineNotes}
          onChange={e => onTimelineNotesChange(e.target.value)}
          placeholder='描述故事的时间线特点、重要的时间节点、时间流逝的特殊规律等...'
          variant='outlined'
          helperText='这里可以记录时间线的整体设计思路、特殊时间概念等重要信息'
        />
      </CardContent>
    </Card>
  );
};
