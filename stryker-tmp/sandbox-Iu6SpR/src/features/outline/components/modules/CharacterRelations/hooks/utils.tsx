// @ts-nocheck
import {
  FamilyRestroom as FamilyIcon,
  Favorite as LoverIcon,
  Groups as FriendIcon,
  Dangerous as EnemyIcon,
  School as MentorIcon,
  Sports as RivalIcon,
  Work as ColleagueIcon,
} from '@mui/icons-material';
import { RelationshipType } from '../../../../types/outline.types';
import { mockCharacters } from './constants';

export const getRelationshipIcon = (type: RelationshipType) => {
  switch (type) {
    case 'family':
      return <FamilyIcon />;
    case 'lover':
      return <LoverIcon />;
    case 'friend':
      return <FriendIcon />;
    case 'enemy':
      return <EnemyIcon />;
    case 'mentor':
      return <MentorIcon />;
    case 'rival':
      return <RivalIcon />;
    case 'colleague':
      return <ColleagueIcon />;
    default:
      return <FriendIcon />;
  }
};

export const getRelationshipLabel = (type: RelationshipType): string => {
  switch (type) {
    case 'family':
      return '亲情';
    case 'lover':
      return '爱情';
    case 'friend':
      return '友情';
    case 'enemy':
      return '敌对';
    case 'mentor':
      return '师徒';
    case 'rival':
      return '竞争';
    case 'colleague':
      return '同事';
    default:
      return '未知';
  }
};

export const getRelationshipColor = (
  type: RelationshipType
): 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' => {
  switch (type) {
    case 'family':
      return 'info';
    case 'lover':
      return 'secondary';
    case 'friend':
      return 'success';
    case 'enemy':
      return 'error';
    case 'mentor':
      return 'primary';
    case 'rival':
      return 'warning';
    case 'colleague':
      return 'info';
    default:
      return 'primary';
  }
};

export const getCharacterName = (characterId: string): string => {
  return mockCharacters.find(c => c.id === characterId)?.name || '未知角色';
};
