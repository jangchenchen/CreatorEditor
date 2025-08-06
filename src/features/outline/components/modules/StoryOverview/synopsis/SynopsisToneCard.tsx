import React from 'react';
import { TextField, Typography } from '@mui/material';

interface SynopsisToneCardProps {
  value: string;
  onChange: (value: string) => void;
}

export const SynopsisToneCard: React.FC<SynopsisToneCardProps> = ({ value, onChange }) => {
  return (
    <div>
      <Typography variant='subtitle1' gutterBottom>
        整体基调
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={2}
        placeholder='描述故事的整体风格、情感基调和阅读感受...'
        value={value}
        onChange={e => onChange(e.target.value)}
        variant='outlined'
        size='small'
      />
    </div>
  );
};
