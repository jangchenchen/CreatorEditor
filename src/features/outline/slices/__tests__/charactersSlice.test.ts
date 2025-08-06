/**
 * CharactersSlice 单元测试
 * 测试角色管理模块的Redux状态管理
 */

import { configureStore } from '@reduxjs/toolkit';
import {
  charactersSlice,
  addCharacter,
  updateCharacter,
  deleteCharacter,
  addRelationship,
  updateRelationship,
  deleteRelationship,
  selectCharacters,
  selectRelationships,
} from '../charactersSlice';
import { createMockOutlineState } from '../../../../../tests/utils/testUtils';
import { mockCharacter, mockCharacters } from '../../../../../tests/fixtures/outlineData';
import type { Character, Relationship } from '../../types/outline.types';

describe('charactersSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        outline: (state = createMockOutlineState()) => state,
      },
    });
  });

  describe('character actions', () => {
    it('should create addCharacter action', () => {
      const action = addCharacter(mockCharacter);

      expect(action.type).toBe('characters/addCharacter');
      expect(action.payload).toEqual(mockCharacter);
    });

    it('should create updateCharacter action', () => {
      const updates = { name: '王五', age: 30 };
      const action = updateCharacter({ id: 'char-001', updates });

      expect(action.type).toBe('characters/updateCharacter');
      expect(action.payload).toEqual({ id: 'char-001', updates });
    });

    it('should create deleteCharacter action', () => {
      const action = deleteCharacter('char-001');

      expect(action.type).toBe('characters/deleteCharacter');
      expect(action.payload).toBe('char-001');
    });
  });

  describe('relationship actions', () => {
    const mockRelationship: Relationship = {
      id: 'rel-001',
      from: 'char-001',
      to: 'char-002',
      type: 'friendship',
      description: '密友关系',
      strength: 'strong',
      status: 'positive',
      developmentNotes: '从小一起长大',
      keyEvents: ['初次相遇'],
      lastUpdated: new Date(),
    };

    it('should create addRelationship action', () => {
      const action = addRelationship(mockRelationship);

      expect(action.type).toBe('characters/addRelationship');
      expect(action.payload).toEqual(mockRelationship);
    });

    it('should create updateRelationship action', () => {
      const updates = { strength: 'medium' as const };
      const action = updateRelationship({ id: 'rel-001', updates });

      expect(action.type).toBe('characters/updateRelationship');
      expect(action.payload).toEqual({ id: 'rel-001', updates });
    });

    it('should create deleteRelationship action', () => {
      const action = deleteRelationship('rel-001');

      expect(action.type).toBe('characters/deleteRelationship');
      expect(action.payload).toBe('rel-001');
    });
  });

  describe('character reducer', () => {
    const initialState = {
      characters: [],
      relationships: [],
    };

    it('should return initial state', () => {
      const state = charactersSlice.reducer(undefined, { type: '@@INIT' });

      expect(state.characters).toEqual([]);
      expect(state.relationships).toEqual([]);
    });

    it('should handle addCharacter', () => {
      const action = addCharacter(mockCharacter);
      const newState = charactersSlice.reducer(initialState, action);

      expect(newState.characters).toHaveLength(1);
      expect(newState.characters[0]).toEqual(mockCharacter);
    });

    it('should handle updateCharacter', () => {
      const stateWithCharacter = {
        characters: [mockCharacter],
        relationships: [],
      };

      const updates = { name: '张小三', age: 26 };
      const action = updateCharacter({ id: 'char-001', updates });
      const newState = charactersSlice.reducer(stateWithCharacter, action);

      expect(newState.characters).toHaveLength(1);
      expect(newState.characters[0].name).toBe('张小三');
      expect(newState.characters[0].age).toBe(26);
      expect(newState.characters[0].lastUpdated).toBeInstanceOf(Date);
    });

    it('should handle deleteCharacter', () => {
      const stateWithCharacters = {
        characters: mockCharacters,
        relationships: [],
      };

      const action = deleteCharacter('char-001');
      const newState = charactersSlice.reducer(stateWithCharacters, action);

      expect(newState.characters).toHaveLength(1);
      expect(newState.characters[0].id).toBe('char-002');
    });

    it('should not update non-existent character', () => {
      const updates = { name: '不存在' };
      const action = updateCharacter({ id: 'nonexistent', updates });
      const newState = charactersSlice.reducer(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });

  describe('relationship reducer', () => {
    const mockRelationship: Relationship = {
      id: 'rel-001',
      from: 'char-001',
      to: 'char-002',
      type: 'friendship',
      description: '好朋友',
      strength: 'strong',
      status: 'positive',
      developmentNotes: '从小认识',
      keyEvents: [],
      lastUpdated: new Date(),
    };

    const initialState = {
      characters: [],
      relationships: [],
    };

    it('should handle addRelationship', () => {
      const action = addRelationship(mockRelationship);
      const newState = charactersSlice.reducer(initialState, action);

      expect(newState.relationships).toHaveLength(1);
      expect(newState.relationships[0]).toEqual(mockRelationship);
    });

    it('should handle updateRelationship', () => {
      const stateWithRelationship = {
        characters: [],
        relationships: [mockRelationship],
      };

      const updates = { strength: 'weak' as const, status: 'negative' as const };
      const action = updateRelationship({ id: 'rel-001', updates });
      const newState = charactersSlice.reducer(stateWithRelationship, action);

      expect(newState.relationships[0].strength).toBe('weak');
      expect(newState.relationships[0].status).toBe('negative');
      expect(newState.relationships[0].lastUpdated).toBeInstanceOf(Date);
    });

    it('should handle deleteRelationship', () => {
      const stateWithRelationship = {
        characters: [],
        relationships: [mockRelationship],
      };

      const action = deleteRelationship('rel-001');
      const newState = charactersSlice.reducer(stateWithRelationship, action);

      expect(newState.relationships).toHaveLength(0);
    });
  });

  describe('selectors', () => {
    it('should select characters from state', () => {
      const mockState = {
        outline: createMockOutlineState({
          characters: { characters: mockCharacters, relationships: [] },
        }),
      };

      const characters = selectCharacters(mockState as any);

      expect(characters).toEqual(mockCharacters);
    });

    it('should select relationships from state', () => {
      const mockRelationship: Relationship = {
        id: 'rel-001',
        from: 'char-001',
        to: 'char-002',
        type: 'friendship',
        description: '朋友',
        strength: 'strong',
        status: 'positive',
        developmentNotes: '',
        keyEvents: [],
        lastUpdated: new Date(),
      };

      const mockState = {
        outline: createMockOutlineState({
          characters: { characters: [], relationships: [mockRelationship] },
        }),
      };

      const relationships = selectRelationships(mockState as any);

      expect(relationships).toEqual([mockRelationship]);
    });
  });
});
