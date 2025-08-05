import {
  PlayArrow as ActiveIcon,
  CheckCircle as ResolvedIcon,
  Schedule as PlannedIcon,
  Close as AbandonedIcon
} from '@mui/icons-material';
import { SubplotPurpose, SubplotStatus } from '../../../../types/outline.types';

export const getStatusColor = (status: SubplotStatus) => {
  const colors = {
    planned: 'default',
    active: 'primary',
    resolved: 'success',
    abandoned: 'error'
  } as const;
  return colors[status] || 'default';
};

export const getStatusIcon = (status: SubplotStatus) => {
  const icons = {
    planned: PlannedIcon,
    active: ActiveIcon,
    resolved: ResolvedIcon,
    abandoned: AbandonedIcon
  };
  return icons[status] || PlannedIcon;
};

export const getPurposeLabel = (purpose: SubplotPurpose) => {
  const labels = {
    background: '背景补充',
    contrast: '对比衬托',
    suspense: '悬念营造',
    'character-development': '角色发展',
    'comic-relief': '轻松调剂'
  };
  return labels[purpose] || purpose;
};

export const getStatusLabel = (status: SubplotStatus) => {
  const labels = {
    planned: '计划中',
    active: '进行中',
    resolved: '已解决',
    abandoned: '已放弃'
  };
  return labels[status] || status;
};

export const groupSubplotsByStatus = (subplots: any[]) => {
  return subplots.reduce((acc, subplot) => {
    if (!acc[subplot.status]) {
      acc[subplot.status] = [];
    }
    acc[subplot.status].push(subplot);
    return acc;
  }, {} as Record<SubplotStatus, any[]>);
};