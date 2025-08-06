import { useState } from 'react';
import { Relationship } from '../../../../types/outline.types';
import { mockRelationships } from './constants';
import { RelationshipMapState, RelationshipMapActions, UseRelationshipMapReturn } from './types';

export const useRelationshipMapState = (): RelationshipMapState & RelationshipMapActions => {
  const [relationships] = useState(mockRelationships);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRelationship, setSelectedRelationship] = useState<Relationship | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'visual'>('list');

  const handleAddRelationship = () => {
    setSelectedRelationship(null);
    setDialogOpen(true);
  };

  const handleEditRelationship = (relationship: Relationship) => {
    setSelectedRelationship(relationship);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedRelationship(null);
  };

  const handleSaveRelationship = () => {
    // TODO: Implement save logic with Redux
    console.log('保存关系:', selectedRelationship);
    handleCloseDialog();
  };

  const handleDeleteRelationship = (relationshipId: string) => {
    // TODO: Implement delete logic with Redux
    console.log('删除关系:', relationshipId);
  };

  return {
    relationships,
    dialogOpen,
    selectedRelationship,
    viewMode,
    handleAddRelationship,
    handleEditRelationship,
    handleDeleteRelationship,
    handleCloseDialog,
    handleSaveRelationship,
    setViewMode,
  };
};
