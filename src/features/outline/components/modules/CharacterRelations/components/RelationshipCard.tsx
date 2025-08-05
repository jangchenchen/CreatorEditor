/**
 * Relationship Card Component
 * Displays a single relationship in card format
 */

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Divider,
  IconButton
} from '@mui/material';
import {
  FamilyRestroom as FamilyIcon,
  Favorite as LoverIcon,
  Groups as FriendIcon,
  Dangerous as EnemyIcon,
  School as MentorIcon,
  Sports as RivalIcon,
  Work as ColleagueIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { Relationship } from '../../../../types/outline.types';
import { UseRelationshipMapReturn } from '../hooks/useRelationshipMap';

interface RelationshipCardProps {
  relationship: Relationship;
  onEdit: (relationship: Relationship) => void;
  onDelete: (relationshipId: string) => void;
  utils: Pick<UseRelationshipMapReturn, 
    'getRelationshipIcon' | 
    'getRelationshipLabel' | 
    'getRelationshipColor' | 
    'getCharacterName'
  >;
}

export const RelationshipCard: React.FC<RelationshipCardProps> = ({
  relationship,
  onEdit,
  onDelete,
  utils
}) => {
  const {
    getRelationshipIcon,
    getRelationshipLabel,
    getRelationshipColor,
    getCharacterName
  } = utils;

  return (
    <Card>
      <CardContent>
        {/* Relationship Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              bgcolor: getRelationshipColor(relationship.type) + '.main',
              color: 'white'
            }}
          >
            {getRelationshipIcon(relationship.type)}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h3">
              {getCharacterName(relationship.fromCharacter)} 
              {relationship.isReversible ? ' ↔ ' : ' → '}
              {getCharacterName(relationship.toCharacter)}
            </Typography>
            <Chip 
              label={getRelationshipLabel(relationship.type)}
              color={getRelationshipColor(relationship.type)}
              size="small"
            />
          </Box>
        </Box>

        {/* Relationship Description */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>关系：</strong>{relationship.description}
        </Typography>

        {/* Development Stage */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>阶段：</strong>{relationship.developmentStage}
        </Typography>

        {/* Intensity */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            <strong>强度：</strong>{relationship.intensity}/10
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {Array.from({ length: 10 }, (_, i) => (
              <Box
                key={i}
                sx={{
                  width: 16,
                  height: 4,
                  backgroundColor: i < relationship.intensity ? 
                    getRelationshipColor(relationship.type) + '.main' : 'grey.300',
                  borderRadius: 2
                }}
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <IconButton 
            size="small" 
            onClick={() => onEdit(relationship)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            color="error"
            onClick={() => onDelete(relationship.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};