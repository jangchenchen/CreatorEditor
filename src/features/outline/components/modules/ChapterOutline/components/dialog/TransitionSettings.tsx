import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { ChapterTransitionField } from './types';

interface TransitionSettingsProps {
  transitions: any;
  onTransitionChange: (
    field: ChapterTransitionField
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TransitionSettings: React.FC<TransitionSettingsProps> = ({
  transitions,
  onTransitionChange,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant='subtitle2' gutterBottom sx={{ mt: 2 }}>
          章节过渡设置
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label='承接内容'
          value={transitions?.from || ''}
          onChange={onTransitionChange('from')}
          placeholder='从上一章承接什么...'
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label='引导内容'
          value={transitions?.to || ''}
          onChange={onTransitionChange('to')}
          placeholder='为下一章铺垫什么...'
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label='过渡方式'
          value={transitions?.method || ''}
          onChange={onTransitionChange('method')}
          placeholder='如何进行过渡...'
        />
      </Grid>
    </>
  );
};
