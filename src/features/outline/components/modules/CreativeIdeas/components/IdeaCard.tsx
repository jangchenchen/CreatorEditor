import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Rating
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from '@mui/icons-material';
import { CreativeIdea } from '../../../../types/outline.types';
import { getStatusColor, getStatusLabel } from '../utils/ideaUtils';

interface IdeaCardProps {
  idea: CreativeIdea;
  onEdit: (idea: CreativeIdea) => void;
  onDelete: (ideaId: string) => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onEdit, onDelete }) => {
  return (
    <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>
              {idea.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Chip
                label={getStatusLabel(idea.status)}
                color={getStatusColor(idea.status)}
                size="small"
              />
              <Rating 
                value={idea.priority} 
                max={5} 
                size="small"
                readOnly
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                icon={<StarIcon fontSize="inherit" />}
              />
            </Box>
          </Box>
        </Box>

        <Typography variant="body2" paragraph sx={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          '-webkit-line-clamp': 3,
          '-webkit-box-orient': 'vertical',
          minHeight: '60px'
        }}>
          {idea.content || '暂无详细内容'}
        </Typography>

        {/* 相关模块和元素 */}
        {(idea.relatedModule || idea.relatedElements.length > 0) && (
          <Box sx={{ mb: 2 }}>
            {idea.relatedModule && (
              <Typography variant="caption" color="text.secondary" display="block">
                相关模块: {idea.relatedModule}
              </Typography>
            )}
            {idea.relatedElements.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                {idea.relatedElements.slice(0, 2).map((element, index) => (
                  <Chip 
                    key={index}
                    label={element}
                    size="small"
                    variant="outlined"
                  />
                ))}
                {idea.relatedElements.length > 2 && (
                  <Chip 
                    label={`+${idea.relatedElements.length - 2}`}
                    size="small"
                    variant="outlined"
                  />
                )}
              </Box>
            )}
          </Box>
        )}

        {/* 标签 */}
        {idea.tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {idea.tags.slice(0, 3).map((tag, index) => (
              <Chip 
                key={index}
                label={tag}
                size="small"
                color="primary"
                variant="outlined"
              />
            ))}
            {idea.tags.length > 3 && (
              <Chip 
                label={`+${idea.tags.length - 3}`}
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        )}
      </CardContent>
      
      <CardActions>
        <IconButton size="small" onClick={() => onEdit(idea)}>
          <EditIcon />
        </IconButton>
        <IconButton 
          size="small" 
          color="error"
          onClick={() => onDelete(idea.id)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default IdeaCard;