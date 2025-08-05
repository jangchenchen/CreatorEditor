import React from 'react';
import { Grid, Autocomplete, FormControlLabel, Switch } from '@mui/material';

interface TagsAndKeyEventProps {
  tags: string[];
  isKeyEvent: boolean;
  onTagsChange: (event: any, newValue: string[]) => void;
  onKeyEventChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TagsAndKeyEvent: React.FC<TagsAndKeyEventProps> = ({
  tags,
  isKeyEvent,
  onTagsChange,
  onKeyEventChange
}) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={tags}
          onChange={onTagsChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="标签"
              placeholder="输入标签并按回车"
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={isKeyEvent}
              onChange={onKeyEventChange}
            />
          }
          label="标记为关键事件"
        />
      </Grid>
    </>
  );
};