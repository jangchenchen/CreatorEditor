import React from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { Subplot } from '../../../../types/outline.types';

interface SubplotDetailsFieldsProps {
  formData: Partial<Subplot>;
  characters: any[];
  onFormChange: (
    field: keyof Subplot
  ) => (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => void;
  onCharactersChange: (event: any, newValue: string[]) => void;
}

const SubplotDetailsFields: React.FC<SubplotDetailsFieldsProps> = ({
  formData,
  characters,
  onFormChange,
  onCharactersChange,
}) => {
  return (
    <>
      {/* 章节范围 */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type='number'
          label='开始章节'
          value={formData.startChapter || ''}
          onChange={onFormChange('startChapter')}
          inputProps={{ min: 1 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type='number'
          label='结束章节'
          value={formData.endChapter || ''}
          onChange={onFormChange('endChapter')}
          inputProps={{ min: 1 }}
        />
      </Grid>

      {/* 相关角色 */}
      <Grid item xs={12}>
        <Autocomplete
          multiple
          options={characters.map(c => c.id)}
          getOptionLabel={option => characters.find(c => c.id === option)?.name || option}
          value={formData.relatedCharacters || []}
          onChange={onCharactersChange}
          renderInput={params => (
            <TextField {...params} label='相关角色' placeholder='选择参与这个副线的角色' />
          )}
        />
      </Grid>

      {/* 与主线的联系 */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={2}
          label='与主线的联系'
          value={formData.connection || ''}
          onChange={onFormChange('connection')}
          placeholder='描述这个副线如何与主线情节关联...'
        />
      </Grid>

      {/* 解决方案和影响 */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          multiline
          rows={2}
          label='解决方案'
          value={formData.resolution || ''}
          onChange={onFormChange('resolution')}
          placeholder='这个副线如何解决或结束...'
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          multiline
          rows={2}
          label='对主线的影响'
          value={formData.impact || ''}
          onChange={onFormChange('impact')}
          placeholder='这个副线对主线情节的影响...'
        />
      </Grid>
    </>
  );
};

export default SubplotDetailsFields;
