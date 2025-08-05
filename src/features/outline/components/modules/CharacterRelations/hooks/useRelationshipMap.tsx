/**
 * Hook for managing relationship map state and operations
 */

import { useState } from 'react';
import {
  FamilyRestroom as FamilyIcon,
  Favorite as LoverIcon,
  Groups as FriendIcon,
  Dangerous as EnemyIcon,
  School as MentorIcon,
  Sports as RivalIcon,
  Work as ColleagueIcon
} from '@mui/icons-material';
import { Character, Relationship, RelationshipType } from '../../../../types/outline.types';

// Mock data - should be replaced with Redux state
const mockCharacters: Character[] = [
  {
    id: '1',
    name: '张三丰',
    role: 'protagonist',
    background: '武当山道士',
    personality: ['睿智', '慈祥'],
    appearance: '仙风道骨',
    goals: '传承武学',
    motivation: '维护正道',
    arc: {
      startState: '隐居',
      keyEvents: [],
      endState: '宗师',
      growthDirection: 'growth'
    },
    tags: ['武当'],
    createdAt: new Date(),
    lastUpdated: new Date()
  },
  {
    id: '2',
    name: '张无忌',
    role: 'protagonist',
    background: '张三丰弟子',
    personality: ['善良', '勇敢'],
    appearance: '英俊青年',
    goals: '行侠仗义',
    motivation: '保护亲友',
    arc: {
      startState: '少年',
      keyEvents: [],
      endState: '英雄',
      growthDirection: 'growth'
    },
    tags: ['武当', '明教'],
    createdAt: new Date(),
    lastUpdated: new Date()
  },
  {
    id: '3',
    name: '赵敏',
    role: 'supporting',
    background: '郡主',
    personality: ['聪明', '任性'],
    appearance: '美丽聪慧',
    goals: '得到爱情',
    motivation: '追求幸福',
    arc: {
      startState: '郡主',
      keyEvents: [],
      endState: '贤妻',
      growthDirection: 'transformation'
    },
    tags: ['朝廷', '郡主'],
    createdAt: new Date(),
    lastUpdated: new Date()
  }
];

const mockRelationships: Relationship[] = [
  {
    id: '1',
    fromCharacter: '1',
    toCharacter: '2',
    type: 'mentor',
    description: '师父和弟子的关系',
    intensity: 9,
    isReversible: false,
    developmentStage: '深厚师徒情'
  },
  {
    id: '2',
    fromCharacter: '2',
    toCharacter: '3',
    type: 'lover',
    description: '互相爱慕的恋人',
    intensity: 10,
    isReversible: true,
    developmentStage: '热恋期'
  }
];

export interface UseRelationshipMapReturn {
  // State
  relationships: Relationship[];
  dialogOpen: boolean;
  selectedRelationship: Relationship | null;
  viewMode: 'list' | 'visual';
  
  // Characters
  characters: Character[];
  
  // Actions
  handleAddRelationship: () => void;
  handleEditRelationship: (relationship: Relationship) => void;
  handleDeleteRelationship: (relationshipId: string) => void;
  handleCloseDialog: () => void;
  handleSaveRelationship: () => void;
  setViewMode: (mode: 'list' | 'visual') => void;
  
  // Utility functions
  getRelationshipIcon: (type: RelationshipType) => React.ReactNode;
  getRelationshipLabel: (type: RelationshipType) => string;
  getRelationshipColor: (type: RelationshipType) => "primary" | "secondary" | "error" | "warning" | "info" | "success";
  getCharacterName: (characterId: string) => string;
}

export const useRelationshipMap = (): UseRelationshipMapReturn => {
  const [relationships] = useState<Relationship[]>(mockRelationships);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRelationship, setSelectedRelationship] = useState<Relationship | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'visual'>('list');

  const getRelationshipIcon = (type: RelationshipType) => {
    switch (type) {
      case 'family': return <FamilyIcon />;
      case 'lover': return <LoverIcon />;
      case 'friend': return <FriendIcon />;
      case 'enemy': return <EnemyIcon />;
      case 'mentor': return <MentorIcon />;
      case 'rival': return <RivalIcon />;
      case 'colleague': return <ColleagueIcon />;
      default: return <FriendIcon />;
    }
  };

  const getRelationshipLabel = (type: RelationshipType): string => {
    switch (type) {
      case 'family': return '亲情';
      case 'lover': return '爱情';
      case 'friend': return '友情';
      case 'enemy': return '敌对';
      case 'mentor': return '师徒';
      case 'rival': return '竞争';
      case 'colleague': return '同事';
      default: return '未知';
    }
  };

  const getRelationshipColor = (type: RelationshipType): "primary" | "secondary" | "error" | "warning" | "info" | "success" => {
    switch (type) {
      case 'family': return 'info';
      case 'lover': return 'secondary';
      case 'friend': return 'success';
      case 'enemy': return 'error';
      case 'mentor': return 'primary';
      case 'rival': return 'warning';
      case 'colleague': return 'info';
      default: return 'primary';
    }
  };

  const getCharacterName = (characterId: string): string => {
    return mockCharacters.find(c => c.id === characterId)?.name || '未知角色';
  };

  const handleAddRelationship = () => {
    setSelectedRelationship(null);
    setDialogOpen(true);
  };

  const handleEditRelationship = (relationship: Relationship) => {
    setSelectedRelationship(relationship);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedRelationship(null);
  };

  const handleSaveRelationship = () => {
    // TODO: Implement save logic with Redux
    console.log('保存关系:', selectedRelationship);
    handleCloseDialog();
  };

  const handleDeleteRelationship = (relationshipId: string) => {
    // TODO: Implement delete logic with Redux
    console.log('删除关系:', relationshipId);
  };

  return {
    relationships,
    dialogOpen,
    selectedRelationship,
    viewMode,
    characters: mockCharacters,
    handleAddRelationship,
    handleEditRelationship,
    handleDeleteRelationship,
    handleCloseDialog,
    handleSaveRelationship,
    setViewMode,
    getRelationshipIcon,
    getRelationshipLabel,
    getRelationshipColor,
    getCharacterName
  };
};