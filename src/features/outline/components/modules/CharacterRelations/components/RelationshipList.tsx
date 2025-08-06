/**
 * Relationship List Component
 * Displays all relationships in a grid layout
 */

import React from 'react';
import { Grid } from '@mui/material';
import { Relationship } from '../../../../types/outline.types';
import { RelationshipCard } from './RelationshipCard';
import { UseRelationshipMapReturn } from '../../hooks/useRelationshipMap';

interface RelationshipListProps {
  relationships: Relationship[];
  utils: Pick<
    UseRelationshipMapReturn,
    'getRelationshipIcon' | 'getRelationshipLabel' | 'getRelationshipColor' | 'getCharacterName'
  >;
  onEditRelationship: (relationship: Relationship) => void;
  onDeleteRelationship: (relationshipId: string) => void;
}

export const RelationshipList: React.FC<RelationshipListProps> = ({
  relationships,
  utils,
  onEditRelationship,
  onDeleteRelationship,
}) => {
  return (
    <Grid container spacing={2}>
      {relationships.map(relationship => (
        <Grid item xs={12} sm={6} key={relationship.id}>
          <RelationshipCard
            relationship={relationship}
            onEdit={onEditRelationship}
            onDelete={onDeleteRelationship}
            utils={utils}
          />
        </Grid>
      ))}
    </Grid>
  );
};
