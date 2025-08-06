// @ts-nocheck
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character, Relationship } from '../types/outline.types';

export interface CharactersState {
  characters: Character[];
  relationships: Relationship[];
}

const initialState: CharactersState = {
  characters: [],
  relationships: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    // Character management
    addCharacter: (state, action: PayloadAction<Character>) => {
      state.characters.push(action.payload);
    },

    updateCharacter: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Character> }>
    ) => {
      const index = state.characters.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.characters[index] = {
          ...state.characters[index],
          ...action.payload.updates,
          lastUpdated: new Date(),
        };
      }
    },

    deleteCharacter: (state, action: PayloadAction<string>) => {
      state.characters = state.characters.filter(c => c.id !== action.payload);
      // Also remove related relationships
      state.relationships = state.relationships.filter(
        r => r.fromCharacter !== action.payload && r.toCharacter !== action.payload
      );
    },

    // Relationship management
    addRelationship: (state, action: PayloadAction<Relationship>) => {
      state.relationships.push(action.payload);
    },

    updateRelationship: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Relationship> }>
    ) => {
      const index = state.relationships.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.relationships[index] = {
          ...state.relationships[index],
          ...action.payload.updates,
          lastUpdated: new Date(),
        };
      }
    },

    deleteRelationship: (state, action: PayloadAction<string>) => {
      state.relationships = state.relationships.filter(r => r.id !== action.payload);
    },

    // Batch operations
    loadCharactersData: (state, action: PayloadAction<CharactersState>) => {
      return action.payload;
    },

    resetCharacters: () => {
      return initialState;
    },
  },
});

export const {
  addCharacter,
  updateCharacter,
  deleteCharacter,
  addRelationship,
  updateRelationship,
  deleteRelationship,
  loadCharactersData,
  resetCharacters,
} = charactersSlice.actions;

export { charactersSlice };
export default charactersSlice.reducer;

// Selectors
export const selectCharacters = (state: { outline: { characters: CharactersState } }) =>
  state.outline.characters.characters;
export const selectRelationships = (state: { outline: { characters: CharactersState } }) =>
  state.outline.characters.relationships;

export const selectCharacterById =
  (characterId: string) => (state: { outline: { characters: CharactersState } }) =>
    state.outline.characters.characters.find(c => c.id === characterId);

export const selectCharactersByRole =
  (role: Character['role']) => (state: { outline: { characters: CharactersState } }) =>
    state.outline.characters.characters.filter(c => c.role === role);

export const selectCharacterRelationships =
  (characterId: string) => (state: { outline: { characters: CharactersState } }) =>
    state.outline.characters.relationships.filter(
      r => r.fromCharacter === characterId || r.toCharacter === characterId
    );

export const selectCharactersStats = (state: { outline: { characters: CharactersState } }) => ({
  charactersCount: state.outline.characters.characters.length,
  relationshipsCount: state.outline.characters.relationships.length,
  protagonistCount: state.outline.characters.characters.filter(c => c.role === 'protagonist')
    .length,
  antagonistCount: state.outline.characters.characters.filter(c => c.role === 'antagonist').length,
  supportingCount: state.outline.characters.characters.filter(c => c.role === 'supporting').length,
  minorCount: state.outline.characters.characters.filter(c => c.role === 'minor').length,
});
