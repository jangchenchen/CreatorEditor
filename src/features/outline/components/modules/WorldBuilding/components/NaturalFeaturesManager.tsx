/**
 * Natural Features Manager Component
 * Manages natural features list with add/remove functionality
 */

import React from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Chip } from '@mui/material';

interface NaturalFeaturesManagerProps {
  naturalFeatures: string[];
  newFeature: string;
  onNewFeatureChange: (value: string) => void;
  onAddFeature: () => void;
  onRemoveFeature: (index: number) => void;
}

export const NaturalFeaturesManager: React.FC<NaturalFeaturesManagerProps> = ({
  naturalFeatures,
  newFeature,
  onNewFeatureChange,
  onAddFeature,
  onRemoveFeature,
}) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          自然特征
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            size='small'
            label='添加自然特征'
            value={newFeature}
            onChange={e => onNewFeatureChange(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && onAddFeature()}
          />
          <Button variant='outlined' onClick={onAddFeature} disabled={!newFeature.trim()}>
            添加
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {naturalFeatures.map((feature, index) => (
            <Chip
              key={index}
              label={feature}
              onDelete={() => onRemoveFeature(index)}
              color='secondary'
              variant='outlined'
            />
          ))}
          {naturalFeatures.length === 0 && (
            <Typography variant='body2' color='text.secondary'>
              暂无自然特征信息
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
