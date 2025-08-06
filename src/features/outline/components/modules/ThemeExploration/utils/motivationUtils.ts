import { Character, CharacterMotivation } from '../../../../types/outline.types';

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
    minor: 'default',
  } as const;
  return colors[role] || 'default';
};

export const getRoleLabel = (role: Character['role']) => {
  const labels = {
    protagonist: '主角',
    antagonist: '反角',
    supporting: '配角',
    minor: '次要',
  };
  return labels[role] || role;
};

export const groupMotivationsByRole = (
  characterMotivations: CharacterMotivation[],
  characters: Character[]
) => {
  return characterMotivations.reduce(
    (acc, motivation) => {
      const character = characters.find(c => c.id === motivation.characterId);
      const role = character?.role || 'unknown';
      if (!acc[role]) {
        acc[role] = [];
      }
      acc[role].push(motivation);
      return acc;
    },
    {} as Record<string, CharacterMotivation[]>
  );
};

export const getCharactersWithoutMotivation = (
  characters: Character[],
  characterMotivations: CharacterMotivation[]
) => {
  return characters.filter(
    character => !characterMotivations.some(m => m.characterId === character.id)
  );
};
