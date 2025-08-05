import { Character, SecondaryCharacterStory } from '../../../../types/outline.types';

export const getCharacterName = (characterId: string, characters: Character[]) => {
  const character = characters.find(c => c.id === characterId);
  return character?.name || characterId;
};

export const getCharacterRole = (characterId: string, characters: Character[]) => {
  const character = characters.find(c => c.id === characterId);
  return character?.role || 'unknown';
};

export const getRoleColor = (role: Character['role']) => {
  const colors = {
    protagonist: 'primary',
    antagonist: 'error',
    supporting: 'secondary',
    minor: 'default'
  } as const;
  return colors[role] || 'default';
};

export const getRoleLabel = (role: Character['role']) => {
  const labels = {
    protagonist: '主角',
    antagonist: '反角',
    supporting: '配角',
    minor: '次要'
  };
  return labels[role] || role;
};

export const getSecondaryCharacters = (characters: Character[]) => {
  return characters.filter(c => c.role !== 'protagonist');
};

export const getCharactersWithoutStory = (
  characters: Character[],
  secondaryStories: SecondaryCharacterStory[]
) => {
  const secondaryCharacters = getSecondaryCharacters(characters);
  return secondaryCharacters.filter(
    character => !secondaryStories.some(s => s.characterId === character.id)
  );
};

export const calculateCompletionRate = (
  secondaryStories: SecondaryCharacterStory[],
  secondaryCharacters: Character[]
) => {
  return Math.round((secondaryStories.length / Math.max(secondaryCharacters.length, 1)) * 100);
};