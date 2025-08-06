/**
 * 角色档案组件类型定义
 */
// @ts-nocheck


import { Character } from '../../../../types/outline.types';

export interface CharacterProfileState {
  characters: Character[];
  selectedCharacter: Character | null;
  dialogOpen: boolean;
  editMode: boolean;
}

export interface CharacterProfileActions {
  handleEditCharacter: (character: Character) => void;
  handleAddCharacter: () => void;
  handleCloseDialog: () => void;
  handleSaveCharacter: () => void;
  handleDeleteCharacter: (characterId: string) => void;
  setSelectedCharacter: React.Dispatch<React.SetStateAction<Character | null>>;
}
