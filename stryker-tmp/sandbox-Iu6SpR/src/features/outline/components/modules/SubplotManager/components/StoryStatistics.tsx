// @ts-nocheck
import React from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import { Character, SecondaryCharacterStory } from '../../../../types/outline.types';
import { calculateCompletionRate, getSecondaryCharacters } from '../utils/storyUtils';

interface StoryStatisticsProps {
  secondaryStories: SecondaryCharacterStory[];
  characters: Character[];
}

const StoryStatistics: React.FC<StoryStatisticsProps> = ({ secondaryStories, characters }) => {
  const secondaryCharacters = getSecondaryCharacters(characters);
  const completionRate = calculateCompletionRate(secondaryStories, secondaryCharacters);

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={6} sm={3}>
          <Typography variant='h4' color='primary'>
            {secondaryStories.length}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            配角故事线
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant='h4' color='secondary'>
            {secondaryCharacters.length}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            配角总数
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant='h4' color='warning.main'>
            {secondaryCharacters.length - secondaryStories.length}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            待开发
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant='h4' color='success.main'>
            {completionRate}%
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            完成度
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StoryStatistics;
