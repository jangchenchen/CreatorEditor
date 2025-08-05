import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { Subplot } from '../../../../types/outline.types';
import { getStatusColor, getStatusIcon, getStatusLabel, getPurposeLabel } from '../utils/subplotUtils';

interface SubplotCardProps {
  subplot: Subplot;
  characters: any[];
  onEdit: (subplot: Subplot) => void;
  onDelete: (subplotId: string) => void;
}

const SubplotCard: React.FC<SubplotCardProps> = ({
  subplot,
  characters,
  onEdit,
  onDelete
}) => {
  const StatusIcon = getStatusIcon(subplot.status);

  const handleDelete = () => {
    if (window.confirm('确定要删除这个副线情节吗？')) {
      onDelete(subplot.id);
    }
  };

  return (
    <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {subplot.title}
          </Typography>
          <Chip
            icon={<StatusIcon />}
            label={getStatusLabel(subplot.status)}
            color={getStatusColor(subplot.status)}
            size="small"
          />
        </Box>

        <Typography variant="body2" paragraph sx={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          '-webkit-line-clamp': 3,
          '-webkit-box-orient': 'vertical',
          minHeight: '60px'
        }}>
          {subplot.description || '暂无描述'}
        </Typography>

        {/* 副线信息 */}
        <Box sx={{ mb: 2 }}>
          <Chip 
            label={getPurposeLabel(subplot.purpose)}
            size="small" 
            color="secondary"
            variant="outlined"
            sx={{ mr: 1, mb: 1 }}
          />
          <Chip 
            label={`第${subplot.startChapter}-${subplot.endChapter}章`}
            size="small" 
            variant="outlined"
            sx={{ mr: 1, mb: 1 }}
          />
          {subplot.relatedCharacters.length > 0 && (
            <Chip 
              label={`${subplot.relatedCharacters.length}个角色`}
              size="small" 
              variant="outlined"
              sx={{ mb: 1 }}
            />
          )}
        </Box>

        {/* 与主线的联系 */}
        {subplot.connection && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              主线联系：
            </Typography>
            <Typography variant="body2" sx={{ 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              '-webkit-line-clamp': 2,
              '-webkit-box-orient': 'vertical'
            }}>
              {subplot.connection}
            </Typography>
          </Box>
        )}

        {/* 涉及角色 */}
        {subplot.relatedCharacters.length > 0 && (
          <Box>
            <Typography variant="caption" color="text.secondary">
              相关角色：
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
              {subplot.relatedCharacters.slice(0, 3).map(charId => (
                <Chip 
                  key={charId}
                  label={characters.find(c => c.id === charId)?.name || charId}
                  size="small"
                  variant="outlined"
                />
              ))}
              {subplot.relatedCharacters.length > 3 && (
                <Chip 
                  label={`+${subplot.relatedCharacters.length - 3}`}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>
        )}
      </CardContent>
      
      <CardActions>
        <IconButton size="small" onClick={() => onEdit(subplot)}>
          <EditIcon />
        </IconButton>
        <IconButton 
          size="small" 
          color="error"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SubplotCard;