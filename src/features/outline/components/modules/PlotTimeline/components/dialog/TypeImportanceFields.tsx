import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface TypeImportanceFieldsProps {
  type: string;
  importance: string;
  onTypeChange: (value: string) => void;
  onImportanceChange: (value: string) => void;
}

export const TypeImportanceFields: React.FC<TypeImportanceFieldsProps> = ({
  type,
  importance,
  onTypeChange,
  onImportanceChange
}) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>事件类型</InputLabel>
          <Select
            value={type}
            onChange={(e) => onTypeChange(e.target.value)}
            label="事件类型"
          >
            <MenuItem value="beginning">开端</MenuItem>
            <MenuItem value="development">发展</MenuItem>
            <MenuItem value="climax">高潮</MenuItem>
            <MenuItem value="resolution">结局</MenuItem>
            <MenuItem value="transition">过渡</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>重要性</InputLabel>
          <Select
            value={importance}
            onChange={(e) => onImportanceChange(e.target.value)}
            label="重要性"
          >
            <MenuItem value="critical">关键</MenuItem>
            <MenuItem value="important">重要</MenuItem>
            <MenuItem value="minor">次要</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};