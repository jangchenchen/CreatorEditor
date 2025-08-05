import { RootState } from '../../../../app/store';

export interface AutoSaveConfig {
  debounceDelay: number;
  maxRetries: number;
  retryDelay: number;
  enabledByDefault: boolean;
}

export interface AutoSaveStatus {
  enabled: boolean;
  saving: boolean;
  lastSaveTime: number;
  retryCount: number;
  hasPendingChanges: boolean;
}

export interface SaveEventData {
  timestamp: number;
  duration: number;
  error?: string;
  retries?: number;
}

export interface AutoSaveManager {
  enable(): void;
  disable(): void;
  isAutoSaveEnabled(): boolean;
  triggerSave(state: RootState, immediate?: boolean): Promise<void>;
  getStatus(): AutoSaveStatus;
  forceSave(state: RootState): Promise<void>;
  dispose(): void;
}

export interface AutoSaveMiddlewareAPI {
  enable(): void;
  disable(): void;
  isEnabled(): boolean;
  getStatus(): AutoSaveStatus;
  forceSave(state: RootState): Promise<void>;
  triggerSave(state: RootState, immediate?: boolean): Promise<void>;
}

export type SaveEventType = 'success' | 'error';

export interface AutoSaveEvent {
  type: SaveEventType;
  data: SaveEventData;
}

// Default configuration
export const DEFAULT_AUTO_SAVE_CONFIG: AutoSaveConfig = {
  debounceDelay: 2000,
  maxRetries: 3,
  retryDelay: 1000,
  enabledByDefault: true
};

// Actions that should trigger auto-save
export const SAVE_TRIGGERING_ACTIONS = [
  // Project actions
  'outline/project/setProjectName',
  'outline/project/initializeProject',
  'outline/project/updateLastModified',
  
  // Story actions
  'outline/story/updateStoryBackground',
  'outline/story/updateCoreTheme',
  'outline/story/updateSynopsis',
  
  // Character actions
  'outline/characters/addCharacter',
  'outline/characters/updateCharacter',
  'outline/characters/deleteCharacter',
  'outline/characters/addRelationship',
  'outline/characters/updateRelationship',
  'outline/characters/deleteRelationship',
  
  // Timeline actions
  'outline/timeline/addPlotEvent',
  'outline/timeline/updatePlotEvent',
  'outline/timeline/deletePlotEvent',
  'outline/timeline/updateTimelineInfo',
  
  // Chapter actions
  'outline/chapters/addChapter',
  'outline/chapters/updateChapter',
  'outline/chapters/deleteChapter',
  'outline/chapters/updateChapterStructure',
  
  // Subplot actions
  'outline/subplots/addSubplot',
  'outline/subplots/updateSubplot',
  'outline/subplots/deleteSubplot',
  'outline/subplots/addSecondaryStory',
  'outline/subplots/updateSecondaryStory',
  'outline/subplots/deleteSecondaryStory',
  
  // Ideas actions
  'outline/ideas/addCreativeIdea',
  'outline/ideas/updateCreativeIdea',
  'outline/ideas/deleteCreativeIdea',
  'outline/ideas/updateIdeaStatus',
  'outline/ideas/addPlotAlternative',
  'outline/ideas/updatePlotAlternative',
  'outline/ideas/deletePlotAlternative'
] as const;