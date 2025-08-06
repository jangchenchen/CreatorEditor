import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from '@mui/material';
import { Character } from '../../../../../../types/outline.types';
import { ChapterFormField, ChapterArrayField, CHAPTER_STATUS_OPTIONS } from './types';

interface BasicInfoFormProps {
  formData: any;
  characters: Character[];
  onFormChange: (
    field: ChapterFormField
  ) => (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => void;
  onArrayFieldChange: (field: ChapterArrayField) => (event: any, newValue: string[]) => void;
  errors: Record<string, string>;
}

export const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  formData,
  characters,
  onFormChange,
  onArrayFieldChange,
  errors,
}) => {
  return (
    <>
      {/* 基本信息 */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type='number'
          label='章节号'
          value={formData.number || ''}
          onChange={onFormChange('number')}
          required
          error={!!errors.number}
          helperText={errors.number}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='章节标题'
          value={formData.title || ''}
          onChange={onFormChange('title')}
          required
          error={!!errors.title}
          helperText={errors.title}
        />
      </Grid>

      {/* 状态和字数 */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>状态</InputLabel>
          <Select
            value={formData.status || 'planned'}
            onChange={onFormChange('status')}
            label='状态'
          >
            {CHAPTER_STATUS_OPTIONS.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type='number'
          label='目标字数'
          value={formData.wordCountTarget || ''}
          onChange={onFormChange('wordCountTarget')}
        />
      </Grid>

      {/* 章节概述 */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label='章节概述'
          value={formData.summary || ''}
          onChange={onFormChange('summary')}
        />
      </Grid>

      {/* 涉及角色 */}
      <Grid item xs={12}>
        <Autocomplete
          multiple
          options={characters.map(c => c.id)}
          getOptionLabel={option => characters.find(c => c.id === option)?.name || option}
          value={formData.characters || []}
          onChange={onArrayFieldChange('characters')}
          renderInput={params => (
            <TextField {...params} label='涉及角色' placeholder='选择相关角色' />
          )}
        />
      </Grid>

      {/* 情节要点 */}
      <Grid item xs={12}>
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={formData.plotPoints || []}
          onChange={onArrayFieldChange('plotPoints')}
          renderInput={params => (
            <TextField {...params} label='情节要点' placeholder='输入情节要点并按回车' />
          )}
        />
      </Grid>

      {/* 冲突和主题 */}
      <Grid item xs={12} sm={6}>
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={formData.conflicts || []}
          onChange={onArrayFieldChange('conflicts')}
          renderInput={params => (
            <TextField {...params} label='章节冲突' placeholder='输入冲突点并按回车' />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={formData.themes || []}
          onChange={onArrayFieldChange('themes')}
          renderInput={params => (
            <TextField {...params} label='涉及主题' placeholder='输入主题并按回车' />
          )}
        />
      </Grid>
    </>
  );
};
