import { OutlineState } from './types';

// Character selectors
export const selectCharacterById = (characterId: string) => (state: { outline: OutlineState }) =>
  state.outline.characters.characters.find(c => c.id === characterId);

export const selectCharactersByRole = (role: string) => (state: { outline: OutlineState }) =>
  state.outline.characters.characters.filter(c => c.role === role);

export const selectCharacterRelationships =
  (characterId: string) => (state: { outline: OutlineState }) =>
    state.outline.characters.relationships.filter(
      r => r.fromCharacter === characterId || r.toCharacter === characterId
    );

// Ideas selectors
export const selectIdeasByStatus = (status: string) => (state: { outline: OutlineState }) =>
  state.outline.ideas.ideas.filter(i => i.status === status);

export const selectIdeasByType = (type: string) => (state: { outline: OutlineState }) =>
  state.outline.ideas.ideas.filter(i => i.type === type);

// Timeline events selector
export const selectTimelineEvents = (state: { outline: OutlineState }) =>
  state.outline.timeline.events;
