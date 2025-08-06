import {
  Character,
  Chapter,
  Scene,
  TimelineEvent,
  Subplot,
  SecondaryStory,
  Idea,
} from '../types/outline.types';

export interface ValidationContext {
  validCharacterIds: Set<string>;
  validChapterNumbers: Set<number>;
  validChapterIds: Set<string>;
}

export interface ConsistencyIssue {
  type: 'orphaned_character' | 'invalid_chapter' | 'orphaned_reference';
  entityType: string;
  entityId: string;
  entityName: string;
  description: string;
}

export interface ConsistencyReport {
  isConsistent: boolean;
  issues: string[];
  totalIssues: number;
  timestamp: string;
}

export interface CharacterUsage {
  character: Character;
  timelineAppearances: number;
  sceneAppearances: number;
  hasSecondaryStory: boolean;
  totalAppearances: number;
  isUnused: boolean;
}
