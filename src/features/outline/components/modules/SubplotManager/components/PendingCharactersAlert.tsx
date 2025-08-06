import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { Character } from '../../../../types/outline.types';

interface PendingCharactersAlertProps {
  charactersWithoutStory: Character[];
  onSelectCharacter: (characterId: string) => void;
}

const PendingCharactersAlert: React.FC<PendingCharactersAlertProps> = ({
  charactersWithoutStory,
  onSelectCharacter,
}) => {
  if (charactersWithoutStory.length === 0) {
    return null;
  }

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3, bgcolor: 'warning.50' }}>
      <Typography variant='subtitle2' color='warning.main' gutterBottom>
        待开发角色故事线：
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {charactersWithoutStory.map(character => (
          <Button
            key={character.id}
            size='small'
            variant='outlined'
            color='warning'
            onClick={() => onSelectCharacter(character.id)}
            startIcon={<PersonIcon />}
          >
            {character.name}
          </Button>
        ))}
      </Box>
    </Paper>
  );
};

export default PendingCharactersAlert;
