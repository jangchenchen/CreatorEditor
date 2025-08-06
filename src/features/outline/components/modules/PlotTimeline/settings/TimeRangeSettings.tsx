import React from 'react';
import { Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import { AccessTime as TimeIcon } from '@mui/icons-material';

interface TimeRangeSettingsProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
}

export const TimeRangeSettings: React.FC<TimeRangeSettingsProps> = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}) => {
  return (
    <Card elevation={2}>
      <CardHeader
        avatar={<TimeIcon color='primary' />}
        title='时间范围设置'
        subheader='定义故事发生的时间跨度'
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='故事开始时间'
              value={startTime}
              onChange={e => onStartTimeChange(e.target.value)}
              placeholder='例如: 2023年春天, 古代某朝, 未来世界...'
              variant='outlined'
              helperText='可以是具体日期，也可以是相对时间描述'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='故事结束时间'
              value={endTime}
              onChange={e => onEndTimeChange(e.target.value)}
              placeholder='例如: 2024年冬天, 三年后, 故事结局...'
              variant='outlined'
              helperText='故事预计的结束时间点'
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
