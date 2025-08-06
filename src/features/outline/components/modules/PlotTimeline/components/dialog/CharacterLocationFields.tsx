import React from 'react';
import { Grid, Autocomplete } from '@mui/material';
import { Character } from '../../../../types/outline.types';

interface CharacterLocationFieldsProps {
  characters: Character[];
  selectedCharacters: string[];
  locations: string[];
  onCharactersChange: (event: any, newValue: string[]) => void;
  onLocationsChange: (event: any, newValue: string[]) => void;
}

export const CharacterLocationFields: React.FC<CharacterLocationFieldsProps> = ({
  characters,
  selectedCharacters,
  locations,
  onCharactersChange,
  onLocationsChange,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          options={characters.map(c => c.id)}
          getOptionLabel={option => characters.find(c => c.id === option)?.name || option}
          value={selectedCharacters}
          onChange={onCharactersChange}
          renderInput={params => (
            <TextField {...params} label='涉及角色' placeholder='选择相关角色' />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={locations}
          onChange={onLocationsChange}
          renderInput={params => (
            <TextField {...params} label='发生地点' placeholder='输入地点并按回车' />
          )}
        />
      </Grid>
    </>
  );
};
