import React from 'react';
import { Grid, TextField, Rating, Typography } from '@mui/material';
import { CreativeIdea } from '../../../../types/outline.types';

interface IdeaDetailsFieldsProps {
  formData: Partial<CreativeIdea>;
  onFormChange: (
    field: keyof CreativeIdea
  ) => (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => void;
  onPriorityChange: (priority: number) => void;
}

const IdeaDetailsFields: React.FC<IdeaDetailsFieldsProps> = ({
  formData,
  onFormChange,
  onPriorityChange,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <Typography component='legend'>优先级</Typography>
        <Rating
          value={formData.priority || 3}
          onChange={(event, newValue) => onPriorityChange(newValue || 3)}
          max={5}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='相关模块'
          value={formData.relatedModule || ''}
          onChange={onFormChange('relatedModule')}
          placeholder='例如: 角色发展, 情节设计...'
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='灵感来源'
          value={formData.inspiration || ''}
          onChange={onFormChange('inspiration')}
          placeholder='这个创意的灵感来源...'
        />
      </Grid>
    </>
  );
};

export default IdeaDetailsFields;
