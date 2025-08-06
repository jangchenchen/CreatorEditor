import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Avatar,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Person as PersonIcon } from '@mui/icons-material';
import { Character, CharacterMotivation } from '../../../../types/outline.types';
import {
  getCharacterName,
  getCharacterRole,
  getRoleColor,
  getRoleLabel,
} from '../utils/motivationUtils';

interface MotivationCardProps {
  motivation: CharacterMotivation;
  characters: Character[];
  onEdit: (motivation: CharacterMotivation) => void;
  onDelete: (characterId: string) => void;
}

const MotivationCard: React.FC<MotivationCardProps> = ({
  motivation,
  characters,
  onEdit,
  onDelete,
}) => {
  const characterName = getCharacterName(motivation.characterId, characters);
  const characterRole = getCharacterRole(motivation.characterId, characters);

  const handleDelete = () => {
    if (window.confirm('确定要删除这个角色的动机分析吗？')) {
      onDelete(motivation.characterId);
    }
  };

  return (
    <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{ mr: 2, bgcolor: `${getRoleColor(characterRole as Character['role'])}.main` }}
          >
            <PersonIcon />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='h6'>{characterName}</Typography>
            <Chip
              label={getRoleLabel(characterRole as Character['role'])}
              size='small'
              color={getRoleColor(characterRole as Character['role'])}
            />
          </Box>
        </Box>

        {/* 内在冲突 */}
        {motivation.innerConflict && (
          <Box sx={{ mb: 2 }}>
            <Typography variant='subtitle2' color='error.main' gutterBottom>
              内在冲突
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {motivation.innerConflict}
            </Typography>
          </Box>
        )}

        {/* 成长动机 */}
        {motivation.growthMotivation && (
          <Box sx={{ mb: 2 }}>
            <Typography variant='subtitle2' color='success.main' gutterBottom>
              成长动机
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {motivation.growthMotivation}
            </Typography>
          </Box>
        )}

        {/* 情感历程 */}
        {motivation.emotionalJourney && (
          <Box sx={{ mb: 2 }}>
            <Typography variant='subtitle2' color='info.main' gutterBottom>
              情感历程
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {motivation.emotionalJourney}
            </Typography>
          </Box>
        )}

        {/* 道德困境 */}
        {motivation.moralDilemma && (
          <Box sx={{ mb: 2 }}>
            <Typography variant='subtitle2' color='warning.main' gutterBottom>
              道德困境
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {motivation.moralDilemma}
            </Typography>
          </Box>
        )}

        {/* 解决方案 */}
        {motivation.resolution && (
          <Box>
            <Typography variant='subtitle2' color='primary.main' gutterBottom>
              解决方案
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {motivation.resolution}
            </Typography>
          </Box>
        )}
      </CardContent>

      <CardActions>
        <IconButton size='small' onClick={() => onEdit(motivation)}>
          <EditIcon />
        </IconButton>
        <IconButton size='small' color='error' onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MotivationCard;
