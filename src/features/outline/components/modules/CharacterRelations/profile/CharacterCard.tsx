/**
 * 角色卡片组件
 */

import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Box,
  Stack,
  Divider,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Person as PersonIcon } from '@mui/icons-material';
import { Character } from '../../../../types/outline.types';
import { getRoleColor, getRoleLabel } from './utils';

interface CharacterCardProps {
  character: Character;
  onEdit: (character: Character) => void;
  onDelete: (characterId: string) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onEdit, onDelete }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        {/* 角色头像和基本信息 */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
            <PersonIcon />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='h6' component='h3'>
              {character.name}
            </Typography>
            <Chip
              label={getRoleLabel(character.role)}
              color={getRoleColor(character.role)}
              size='small'
            />
          </Box>
        </Box>

        {/* 角色背景 */}
        <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
          <strong>背景：</strong>
          {character.background}
        </Typography>

        {/* 外貌描述 */}
        <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
          <strong>外貌：</strong>
          {character.appearance}
        </Typography>

        {/* 性格特征 */}
        <Box sx={{ mb: 1 }}>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 0.5 }}>
            <strong>性格：</strong>
          </Typography>
          <Stack direction='row' spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
            {character.personality.slice(0, 3).map((trait, index) => (
              <Chip key={index} label={trait} variant='outlined' size='small' />
            ))}
            {character.personality.length > 3 && (
              <Chip
                label={`+${character.personality.length - 3}`}
                variant='outlined'
                size='small'
                color='secondary'
              />
            )}
          </Stack>
        </Box>

        {/* 目标动机 */}
        <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
          <strong>目标：</strong>
          {character.goals}
        </Typography>

        {/* 标签 */}
        <Stack direction='row' spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
          {character.tags.slice(0, 2).map((tag, index) => (
            <Chip key={index} label={tag} size='small' color='primary' variant='filled' />
          ))}
          {character.tags.length > 2 && (
            <Chip label='...' size='small' color='primary' variant='outlined' />
          )}
        </Stack>
      </CardContent>

      <Divider />

      <CardActions sx={{ justifyContent: 'space-between', px: 2, py: 1 }}>
        <Typography variant='caption' color='text.secondary'>
          更新: {character.lastUpdated.toLocaleDateString()}
        </Typography>

        <Box>
          <IconButton size='small' onClick={() => onEdit(character)} color='primary'>
            <EditIcon fontSize='small' />
          </IconButton>
          <IconButton size='small' onClick={() => onDelete(character.id)} color='error'>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};
