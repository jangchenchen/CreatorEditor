// @ts-nocheck
import React from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { CreativeIdea } from '../../../../types/outline.types';

interface IdeaTagsFieldsProps {
  formData: Partial<CreativeIdea>;
  onFormChange: (
    field: keyof CreativeIdea
  ) => (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => void;
  onArrayFieldChange: (
    field: keyof Pick<CreativeIdea, 'relatedElements' | 'tags'>
  ) => (event: any, newValue: string[]) => void;
}

const IdeaTagsFields: React.FC<IdeaTagsFieldsProps> = ({
  formData,
  onFormChange,
  onArrayFieldChange,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={formData.relatedElements || []}
          onChange={onArrayFieldChange('relatedElements')}
          renderInput={params => (
            <TextField {...params} label='相关元素' placeholder='输入相关的角色、地点、情节等' />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={formData.tags || []}
          onChange={onArrayFieldChange('tags')}
          renderInput={params => (
            <TextField {...params} label='标签' placeholder='输入标签便于分类' />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={2}
          label='潜在影响'
          value={formData.potentialImpact || ''}
          onChange={onFormChange('potentialImpact')}
          placeholder='这个创意可能对故事产生什么影响...'
        />
      </Grid>
    </>
  );
};

export default IdeaTagsFields;
