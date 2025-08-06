/**
 * 角色档案工具函数
 */

import { CharacterRole } from '../../../../types/outline.types';

export const getRoleColor = (
  role: CharacterRole
): 'primary' | 'secondary' | 'success' | 'warning' => {
  switch (role) {
    case 'protagonist':
      return 'primary';
    case 'antagonist':
      return 'secondary';
    case 'supporting':
      return 'success';
    case 'minor':
      return 'warning';
    default:
      return 'primary';
  }
};

export const getRoleLabel = (role: CharacterRole): string => {
  switch (role) {
    case 'protagonist':
      return '主角';
    case 'antagonist':
      return '反派';
    case 'supporting':
      return '配角';
    case 'minor':
      return '次要';
    default:
      return '未知';
  }
};
