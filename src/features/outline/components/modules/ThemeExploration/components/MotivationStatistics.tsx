import React from 'react';
import { Box, Grid, Paper, Typography, Chip } from '@mui/material';
import { Character, CharacterMotivation } from '../../../../types/outline.types';

interface MotivationStatisticsProps {
  characterMotivations: CharacterMotivation[];
  charactersWithoutMotivation: Character[];
}

const MotivationStatistics: React.FC<MotivationStatisticsProps> = ({
  characterMotivations,
  charactersWithoutMotivation,
}) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={6} sm={3}>
          <Typography variant='h4' color='primary'>
            {characterMotivations.length}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            已分析角色
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant='h4' color='warning.main'>
            {charactersWithoutMotivation.length}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            待分析角色
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {charactersWithoutMotivation.slice(0, 3).map(character => (
              <Chip
                key={character.id}
                label={character.name}
                size='small'
                variant='outlined'
                color='warning'
              />
            ))}
            {charactersWithoutMotivation.length > 3 && (
              <Chip
                label={`+${charactersWithoutMotivation.length - 3}`}
                size='small'
                variant='outlined'
                color='warning'
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MotivationStatistics;
