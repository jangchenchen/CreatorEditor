// @ts-nocheck
import React from 'react';
import { Grid, TextField } from '@mui/material';

interface BasicInfoFieldsProps {
  title: string;
  timestamp: string;
  onTitleChange: (value: string) => void;
  onTimestampChange: (value: string) => void;
}

export const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  title,
  timestamp,
  onTitleChange,
  onTimestampChange,
}) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='事件标题'
          value={title}
          onChange={e => onTitleChange(e.target.value)}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='时间点'
          value={timestamp}
          onChange={e => onTimestampChange(e.target.value)}
          placeholder='例如: 第三天晚上, 2023年春天'
          required
        />
      </Grid>
    </>
  );
};
