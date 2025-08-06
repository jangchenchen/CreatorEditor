import React from 'react';
import { Card, CardContent, CardActions, Typography, Box, Chip, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Scene, Character } from '../../../../types/outline.types';
import { getCharacterName } from '../utils/sceneUtils';

interface SceneCardProps {
  scene: Scene;
  index: number;
  characters: Character[];
  onEdit: (scene: Scene) => void;
  onDelete: (sceneId: string) => void;
}

const SceneCard: React.FC<SceneCardProps> = ({ scene, index, characters, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('确定要删除这个场景吗？')) {
      onDelete(scene.id);
    }
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            场景 {index + 1}: {scene.title}
          </Typography>
          {scene.location && (
            <Chip label={scene.location} size='small' variant='outlined' color='primary' />
          )}
        </Box>

        <Typography
          variant='body2'
          paragraph
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            '-webkit-line-clamp': 3,
            '-webkit-box-orient': 'vertical',
            minHeight: '60px',
          }}
        >
          {scene.description || '暂无描述'}
        </Typography>

        {/* Scene information */}
        <Box sx={{ mb: 2 }}>
          {scene.purpose && (
            <Box sx={{ mb: 1 }}>
              <Typography variant='caption' color='text.secondary'>
                目的:
              </Typography>
              <Typography variant='body2' component='span' sx={{ ml: 1 }}>
                {scene.purpose}
              </Typography>
            </Box>
          )}

          {scene.conflict && (
            <Box sx={{ mb: 1 }}>
              <Typography variant='caption' color='text.secondary'>
                冲突:
              </Typography>
              <Typography variant='body2' component='span' sx={{ ml: 1 }}>
                {scene.conflict}
              </Typography>
            </Box>
          )}

          {scene.outcome && (
            <Box sx={{ mb: 1 }}>
              <Typography variant='caption' color='text.secondary'>
                结果:
              </Typography>
              <Typography variant='body2' component='span' sx={{ ml: 1 }}>
                {scene.outcome}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Characters */}
        {scene.characters.length > 0 && (
          <Box>
            <Typography variant='caption' color='text.secondary'>
              出场角色：
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
              {scene.characters.map(charId => (
                <Chip
                  key={charId}
                  label={getCharacterName(charId, characters)}
                  size='small'
                  variant='outlined'
                />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>

      <CardActions>
        <IconButton size='small' onClick={() => onEdit(scene)}>
          <EditIcon />
        </IconButton>
        <IconButton size='small' color='error' onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SceneCard;
