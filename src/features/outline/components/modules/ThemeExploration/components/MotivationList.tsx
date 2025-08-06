import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Psychology as PsychologyIcon } from '@mui/icons-material';
import { Character, CharacterMotivation } from '../../../../types/outline.types';
import MotivationCard from './MotivationCard';

interface MotivationListProps {
  characterMotivations: CharacterMotivation[];
  characters: Character[];
  onEdit: (motivation: CharacterMotivation) => void;
  onDelete: (characterId: string) => void;
  onAddMotivation: () => void;
}

const MotivationList: React.FC<MotivationListProps> = ({
  characterMotivations,
  characters,
  onEdit,
  onDelete,
  onAddMotivation,
}) => {
  if (characterMotivations.length === 0) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <PsychologyIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant='h6' color='text.secondary' gutterBottom>
            暂无角色动机分析
          </Typography>
          <Typography variant='body2' color='text.secondary' paragraph>
            开始分析主要角色的内在动机和情感历程
          </Typography>
          <Button variant='outlined' onClick={onAddMotivation}>
            添加第一个角色分析
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container spacing={2}>
      {characterMotivations.map(motivation => (
        <Grid item xs={12} md={6} key={motivation.characterId}>
          <MotivationCard
            motivation={motivation}
            characters={characters}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MotivationList;
