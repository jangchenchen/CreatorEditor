import { Character } from '../../../../types/outline.types';

export interface CharacterArcProps {
  characters?: Character[];
  selectedCharacterId?: string;
  onCharacterChange?: (characterId: string) => void;
}

export interface CharacterArcState {
  selectedCharacter: Character | null;
  activeStep: number;
  isEditing: boolean;
  editingEvent: string | null;
  eventText: string;
}

export interface CharacterStepData {
  type: 'start' | 'event' | 'end';
  title: string;
  content: string;
  index: number;
  isCompleted: boolean;
  isActive: boolean;
}

export interface CharacterProgress {
  percentage: number;
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
}

export interface ArcStepHandlers {
  handleStepClick: (step: number) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  handleEdit: (eventIndex: number) => void;
  handleSave: () => void;
  handleCancel: () => void;
}

export interface MockCharacterData {
  id: string;
  name: string;
  role: 'protagonist' | 'antagonist' | 'supporting';
  background: string;
  personality: string[];
  appearance: string;
  goals: string;
  motivation: string;
  arc: {
    startState: string;
    keyEvents: string[];
    endState: string;
    growthDirection: string;
  };
  tags: string[];
}

export const ROLE_LABELS = {
  protagonist: '主角',
  antagonist: '反派',
  supporting: '配角'
} as const;

export const ROLE_COLORS = {
  protagonist: 'primary',
  antagonist: 'secondary',
  supporting: 'success'
} as const;