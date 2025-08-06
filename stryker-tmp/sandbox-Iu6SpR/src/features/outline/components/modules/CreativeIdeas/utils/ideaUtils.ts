// @ts-nocheck
import {
  Lightbulb as InspirationIcon,
  Extension as PlotExtensionIcon,
  AlternateEmail as AlternativeEndingIcon,
  Movie as SceneIdeaIcon,
  PersonAdd as CharacterTwistIcon,
  Chat as DialogueIcon,
} from '@mui/icons-material';
import { IdeaType, IdeaStatus } from '../../../../types/outline.types';

export const getTypeIcon = (type: IdeaType) => {
  const icons = {
    inspiration: InspirationIcon,
    'plot-extension': PlotExtensionIcon,
    'alternative-ending': AlternativeEndingIcon,
    'scene-idea': SceneIdeaIcon,
    'character-twist': CharacterTwistIcon,
    dialogue: DialogueIcon,
  };
  return icons[type] || InspirationIcon;
};

export const getTypeLabel = (type: IdeaType) => {
  const labels = {
    inspiration: '灵感想法',
    'plot-extension': '情节延展',
    'alternative-ending': '结局替代',
    'scene-idea': '场景创意',
    'character-twist': '角色转折',
    dialogue: '对话创意',
  };
  return labels[type] || type;
};

export const getStatusColor = (status: IdeaStatus) => {
  const colors = {
    draft: 'default',
    considering: 'warning',
    adopted: 'success',
    rejected: 'error',
    archived: 'secondary',
  } as const;
  return colors[status] || 'default';
};

export const getStatusLabel = (status: IdeaStatus) => {
  const labels = {
    draft: '草稿',
    considering: '考虑中',
    adopted: '已采用',
    rejected: '已拒绝',
    archived: '已归档',
  };
  return labels[status] || status;
};

export const getPriorityColor = (priority: number) => {
  if (priority >= 4) return 'error';
  if (priority >= 3) return 'warning';
  return 'success';
};
