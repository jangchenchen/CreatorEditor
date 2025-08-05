import { Character, Relationship } from '../../../../types/outline.types';

// Mock data - should be replaced with Redux state
export const mockCharacters: Character[] = [
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

export const mockRelationships: Relationship[] = [
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