import React from 'react';
import { Card, CardContent, Typography, Chip, Divider, Box, LinearProgress } from '@mui/material';
import { TrendingUp as GrowthIcon, Psychology as MotivationIcon } from '@mui/icons-material';
import { Character } from '../../../../../../types/outline.types';
import { CharacterProgress, ROLE_LABELS, ROLE_COLORS } from './types';

interface CharacterInfoCardProps {
  character: Character;
  progress: CharacterProgress;
}

export const CharacterInfoCard: React.FC<CharacterInfoCardProps> = ({ character, progress }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {character.name}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Chip
            label={ROLE_LABELS[character.role] || character.role}
            color={(ROLE_COLORS[character.role] as any) || 'default'}
            size='small'
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* 成长方向 */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <GrowthIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant='subtitle2'>成长方向</Typography>
          </Box>
          <Typography variant='body2' color='text.secondary'>
            {character.arc.growthDirection}
          </Typography>
        </Box>

        {/* 核心动机 */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <MotivationIcon sx={{ mr: 1, color: 'secondary.main' }} />
            <Typography variant='subtitle2'>核心动机</Typography>
          </Box>
          <Typography variant='body2' color='text.secondary'>
            {character.motivation}
          </Typography>
        </Box>

        {/* 进度指示器 */}
        <Box sx={{ mt: 2 }}>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            发展进度 ({Math.round(progress.percentage)}%)
          </Typography>
          <LinearProgress
            variant='determinate'
            value={progress.percentage}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
