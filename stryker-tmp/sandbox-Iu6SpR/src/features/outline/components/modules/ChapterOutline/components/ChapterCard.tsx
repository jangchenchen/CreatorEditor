// @ts-nocheck
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  LinearProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Circle as CircleIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Create as CreateIcon,
} from '@mui/icons-material';
import { Chapter, Character } from '../../../../types/outline.types';

interface ChapterCardProps {
  chapter: Chapter;
  characters: Character[];
  onEdit: (chapter: Chapter) => void;
  onDelete: (chapterId: string) => void;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, characters, onEdit, onDelete }) => {
  const getStatusColor = (status: Chapter['status']) => {
    const colors = {
      planned: 'default',
      writing: 'primary',
      completed: 'success',
      revision: 'warning',
    } as const;
    return colors[status] || 'default';
  };

  const getStatusIcon = (status: Chapter['status']) => {
    const icons = {
      planned: <CircleIcon />,
      writing: <CreateIcon />,
      completed: <CheckCircleIcon />,
      revision: <ScheduleIcon />,
    };
    return icons[status] || <CircleIcon />;
  };

  const calculateProgress = (chapter: Chapter) => {
    const factors = [
      chapter.title ? 1 : 0,
      chapter.summary ? 1 : 0,
      chapter.keyScenes.length > 0 ? 1 : 0,
      chapter.characters.length > 0 ? 1 : 0,
      chapter.plotPoints.length > 0 ? 1 : 0,
    ];
    return Math.round((factors.reduce((a, b) => a + b, 0) / factors.length) * 100);
  };

  return (
    <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            第{chapter.number}章: {chapter.title}
          </Typography>
          <Chip
            icon={getStatusIcon(chapter.status)}
            label={chapter.status}
            color={getStatusColor(chapter.status)}
            size='small'
          />
        </Box>

        {/* 进度条 */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant='caption' color='text.secondary'>
              完成度
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {calculateProgress(chapter)}%
            </Typography>
          </Box>
          <LinearProgress
            variant='determinate'
            value={calculateProgress(chapter)}
            sx={{ height: 6, borderRadius: 3 }}
          />
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
          {chapter.summary || '暂无概述'}
        </Typography>

        {/* 章节信息 */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip label={`${chapter.keyScenes.length} 场景`} size='small' variant='outlined' />
          <Chip label={`${chapter.characters.length} 角色`} size='small' variant='outlined' />
          <Chip label={`${chapter.wordCountTarget} 字`} size='small' variant='outlined' />
        </Box>

        {/* 情节要点预览 */}
        {chapter.plotPoints.length > 0 && (
          <Box>
            <Typography variant='caption' color='text.secondary'>
              主要情节：
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
              {chapter.plotPoints.slice(0, 3).map((point, index) => (
                <Chip key={index} label={point} size='small' color='primary' variant='outlined' />
              ))}
              {chapter.plotPoints.length > 3 && (
                <Chip label={`+${chapter.plotPoints.length - 3}`} size='small' variant='outlined' />
              )}
            </Box>
          </Box>
        )}
      </CardContent>

      <CardActions>
        <IconButton size='small' onClick={() => onEdit(chapter)}>
          <EditIcon />
        </IconButton>
        <IconButton size='small' color='error' onClick={() => onDelete(chapter.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ChapterCard;
