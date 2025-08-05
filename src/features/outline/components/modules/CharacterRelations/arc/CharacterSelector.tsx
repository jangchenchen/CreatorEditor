import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material';
import { Character } from '../../../../../../types/outline.types';

interface CharacterSelectorProps {
  characters: Character[];
  selectedCharacter: Character | null;
  onCharacterChange: (characterId: string) => void;
}

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  characters,
  selectedCharacter,
  onCharacterChange
}) => {
  if (!selectedCharacter) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
        <Typography color="text.secondary">请选择要查看的角色</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 3 }}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>选择角色</InputLabel>
        <Select
          value={selectedCharacter.id}
          label="选择角色"
          onChange={(e) => onCharacterChange(e.target.value)}
        >
          {characters.map((character) => (
            <MenuItem key={character.id} value={character.id}>
              {character.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};