import { Character, Relationship, RelationshipType } from '../../../../types/outline.types';

export interface RelationshipMapState {
  relationships: Relationship[];
  dialogOpen: boolean;
  selectedRelationship: Relationship | null;
  viewMode: 'list' | 'visual';
}

export interface RelationshipMapActions {
  handleAddRelationship: () => void;
  handleEditRelationship: (relationship: Relationship) => void;
  handleDeleteRelationship: (relationshipId: string) => void;
  handleCloseDialog: () => void;
  handleSaveRelationship: () => void;
  setViewMode: (mode: 'list' | 'visual') => void;
}

export interface RelationshipMapUtils {
  getRelationshipIcon: (type: RelationshipType) => React.ReactNode;
  getRelationshipLabel: (type: RelationshipType) => string;
  getRelationshipColor: (type: RelationshipType) => "primary" | "secondary" | "error" | "warning" | "info" | "success";
  getCharacterName: (characterId: string) => string;
}

export interface UseRelationshipMapReturn extends RelationshipMapState, RelationshipMapActions, RelationshipMapUtils {
  characters: Character[];
}