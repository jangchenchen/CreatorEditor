import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { PlotEvent, Character } from '../../../../types/outline.types';
import { getImportanceIcon, getCharacterName } from '../utils/eventUtils';

interface EventCardProps {
  event: PlotEvent;
  characters: Character[];
  onEdit: (event: PlotEvent) => void;
  onDelete: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  characters,
  onEdit,
  onDelete
}) => {
  const handleDelete = () => {
    if (window.confirm('确定要删除这个事件吗？')) {
      onDelete(event.id);
    }
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {event.title}
            {event.isKeyEvent && (
              <StarIcon color="secondary" sx={{ ml: 1, fontSize: 20 }} />
            )}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {getImportanceIcon(event.importance)}
          </Typography>
        </Box>
        
        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
          时间: {event.timestamp}
        </Typography>
        
        <Typography variant="body2" paragraph sx={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          '-webkit-line-clamp': 3,
          '-webkit-box-orient': 'vertical'
        }}>
          {event.description}
        </Typography>

        {event.characters.length > 0 && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              涉及角色：
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
              {event.characters.slice(0, 3).map(charId => (
                <Chip 
                  key={charId}
                  label={getCharacterName(charId, characters)}
                  size="small"
                  variant="outlined"
                />
              ))}
              {event.characters.length > 3 && (
                <Chip 
                  label={`+${event.characters.length - 3}`}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>
        )}
      </CardContent>
      
      <CardActions>
        <IconButton size="small" onClick={() => onEdit(event)}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" color="error" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EventCard;