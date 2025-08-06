/**
 * Climate Settings Component
 * Displays and edits climate information
 */
// @ts-nocheck


import React from 'react';
import { Card, CardContent, Typography, TextField } from '@mui/material';
import { Terrain as TerrainIcon } from '@mui/icons-material';

interface ClimateSettingsProps {
  climate: string;
  onChange: (value: string) => void;
}

export const ClimateSettings: React.FC<ClimateSettingsProps> = ({ climate, onChange }) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant='h6' gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <TerrainIcon sx={{ mr: 1 }} />
          气候环境
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          label='气候描述'
          value={climate}
          onChange={e => onChange(e.target.value)}
          placeholder='描述故事世界的气候特点、季节变化、天气模式...'
          variant='outlined'
        />
      </CardContent>
    </Card>
  );
};
