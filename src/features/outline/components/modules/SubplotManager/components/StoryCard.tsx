import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, Avatar, Box } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Star as GoalIcon,
  History as BackstoryIcon,
  TrendingUp as DevelopmentIcon,
  CheckCircle as ResolutionIcon,
} from '@mui/icons-material';
import { Character, SecondaryCharacterStory } from '../../../../types/outline.types';
import {
  getCharacterName,
  getCharacterRole,
  getRoleColor,
  getRoleLabel,
} from '../utils/storyUtils';

interface StoryCardProps {
  story: SecondaryCharacterStory;
  characters: Character[];
  onEdit: (story: SecondaryCharacterStory) => void;
  onDelete: (characterId: string) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, characters, onEdit, onDelete }) => {
  const characterName = getCharacterName(story.characterId, characters);
  const characterRole = getCharacterRole(story.characterId, characters);

  const handleDelete = () => {
    if (window.confirm('确定要删除这个角色的故事线吗？')) {
      onDelete(story.characterId);
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
            <Typography variant='caption' color='text.secondary'>
              {getRoleLabel(characterRole as Character['role'])}
            </Typography>
          </Box>
        </Box>

        {/* 个人目标 */}
        {story.personalGoal && (
          <Box sx={{ mb: 2 }}>
            <Typography
              variant='subtitle2'
              color='primary.main'
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <GoalIcon sx={{ mr: 1, fontSize: 18 }} />
              个人目标
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {story.personalGoal}
            </Typography>
          </Box>
        )}

        {/* 背景故事 */}
        {story.backstory && (
          <Box sx={{ mb: 2 }}>
            <Typography
              variant='subtitle2'
              color='info.main'
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <BackstoryIcon sx={{ mr: 1, fontSize: 18 }} />
              背景故事
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                '-webkit-line-clamp': 3,
                '-webkit-box-orient': 'vertical',
              }}
            >
              {story.backstory}
            </Typography>
          </Box>
        )}

        {/* 发展弧线 */}
        {story.developmentArc && (
          <Box sx={{ mb: 2 }}>
            <Typography
              variant='subtitle2'
              color='success.main'
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <DevelopmentIcon sx={{ mr: 1, fontSize: 18 }} />
              发展弧线
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                '-webkit-line-clamp': 3,
                '-webkit-box-orient': 'vertical',
              }}
            >
              {story.developmentArc}
            </Typography>
          </Box>
        )}

        {/* 解决方式 */}
        {story.resolutionMethod && (
          <Box>
            <Typography
              variant='subtitle2'
              color='warning.main'
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <ResolutionIcon sx={{ mr: 1, fontSize: 18 }} />
              解决方式
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {story.resolutionMethod}
            </Typography>
          </Box>
        )}
      </CardContent>

      <CardActions>
        <IconButton size='small' onClick={() => onEdit(story)}>
          <EditIcon />
        </IconButton>
        <IconButton size='small' color='error' onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default StoryCard;
