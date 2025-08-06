import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CreativeIdea } from '../../../../types/outline.types';

interface IdeaBasicFieldsProps {
  formData: Partial<CreativeIdea>;
  onFormChange: (
    field: keyof CreativeIdea
  ) => (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => void;
}

const IdeaBasicFields: React.FC<IdeaBasicFieldsProps> = ({ formData, onFormChange }) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>创意类型</InputLabel>
          <Select
            value={formData.type || 'inspiration'}
            onChange={onFormChange('type')}
            label='创意类型'
          >
            <MenuItem value='inspiration'>灵感想法</MenuItem>
            <MenuItem value='plot-extension'>情节延展</MenuItem>
            <MenuItem value='alternative-ending'>结局替代</MenuItem>
            <MenuItem value='scene-idea'>场景创意</MenuItem>
            <MenuItem value='character-twist'>角色转折</MenuItem>
            <MenuItem value='dialogue'>对话创意</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>状态</InputLabel>
          <Select value={formData.status || 'draft'} onChange={onFormChange('status')} label='状态'>
            <MenuItem value='draft'>草稿</MenuItem>
            <MenuItem value='considering'>考虑中</MenuItem>
            <MenuItem value='adopted'>已采用</MenuItem>
            <MenuItem value='rejected'>已拒绝</MenuItem>
            <MenuItem value='archived'>已归档</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label='创意标题'
          value={formData.title || ''}
          onChange={onFormChange('title')}
          required
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label='创意内容'
          value={formData.content || ''}
          onChange={onFormChange('content')}
          placeholder='详细描述您的创意想法...'
        />
      </Grid>
    </>
  );
};

export default IdeaBasicFields;
