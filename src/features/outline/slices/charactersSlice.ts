import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character, Relationship } from '../types/outline.types';

export interface CharactersState {
  characters: Character[];
  relationships: Relationship[];
}

const initialState: CharactersState = {
  characters: [],
  relationships: []
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    // Character management
    addCharacter: (state, action: PayloadAction<Character>) => {
      state.characters.push(action.payload);
    },

    updateCharacter: (state, action: PayloadAction<Character>) => {
      const index = state.characters.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.characters[index] = { ...action.payload, lastUpdated: new Date() };
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

    updateRelationship: (state, action: PayloadAction<Relationship>) => {
      const index = state.relationships.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.relationships[index] = action.payload;
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
    }
  }
});

export const {
  addCharacter,
  updateCharacter,
  deleteCharacter,
  addRelationship,
  updateRelationship,
  deleteRelationship,
  loadCharactersData,
  resetCharacters
} = charactersSlice.actions;

export default charactersSlice.reducer;

// Selectors
export const selectCharacters = (state: { characters: CharactersState }) => state.characters.characters;
export const selectRelationships = (state: { characters: CharactersState }) => state.characters.relationships;

export const selectCharacterById = (characterId: string) => 
  (state: { characters: CharactersState }) => 
    state.characters.characters.find(c => c.id === characterId);

export const selectCharactersByRole = (role: Character['role']) => 
  (state: { characters: CharactersState }) => 
    state.characters.characters.filter(c => c.role === role);

export const selectCharacterRelationships = (characterId: string) => 
  (state: { characters: CharactersState }) => 
    state.characters.relationships.filter(
      r => r.fromCharacter === characterId || r.toCharacter === characterId
    );

export const selectCharactersStats = (state: { characters: CharactersState }) => ({
  charactersCount: state.characters.characters.length,
  relationshipsCount: state.characters.relationships.length,
  protagonistCount: state.characters.characters.filter(c => c.role === 'protagonist').length,
  antagonistCount: state.characters.characters.filter(c => c.role === 'antagonist').length,
  supportingCount: state.characters.characters.filter(c => c.role === 'supporting').length,
  minorCount: state.characters.characters.filter(c => c.role === 'minor').length
});