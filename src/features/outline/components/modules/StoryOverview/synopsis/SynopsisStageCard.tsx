import React from 'react';
import { TextField, Typography } from '@mui/material';

interface SynopsisStageCardProps {
  title: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  color: 'primary' | 'info' | 'warning' | 'success';
  label: string;
}

export const SynopsisStageCard: React.FC<SynopsisStageCardProps> = ({
  title,
  description,
  value,
  onChange,
  color,
  label,
}) => {
  return (
    <div style={{ height: '100%' }}>
      <Typography variant='subtitle1' gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            bgcolor: `${color}.main`,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            mr: 1,
          }}
        >
          {label}
        </Box>
        {title}
      </Typography>
      <Typography variant='caption' color='text.secondary' paragraph>
        {description}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder={`描述${title}...`}
        value={value}
        onChange={e => onChange(e.target.value)}
        variant='outlined'
        size='small'
      />
    </div>
  );
};
