/**
 * Data Migration Service
 * Handles version compatibility and data structure migrations
 * Ensures backward compatibility when schema changes occur
 */

import { OutlineData } from '../types/outline.types';

// Version history and migration strategies
export interface MigrationStrategy {
  fromVersion: string;
  toVersion: string;
  description: string;
  migrate: (data: any) => any;
  validate: (data: any) => boolean;
}

// Current schema version
export const CURRENT_SCHEMA_VERSION = '1.0.0';

// Migration strategies for different version transitions
const MIGRATION_STRATEGIES: MigrationStrategy[] = [
  {
    fromVersion: '0.9.0',
    toVersion: '1.0.0',
    description: 'Initial migration to structured schema',
    migrate: (data: any) => migrateFrom090To100(data),
    validate: (data: any) => validateVersion100(data)
  }
  // Add more migration strategies as schema evolves
];

/**
 * Main migration service class
 */
export class DataMigrationService {
  /**
   * Migrate data from any version to current version
   */
  static async migrateToCurrentVersion(data: any): Promise<OutlineData> {
    if (!data) {
      throw new Error('No data provided for migration');
    }

    let currentData = { ...data };
    let currentVersion = data.version || '0.9.0'; // Default to oldest version if not specified

    console.log(`Starting migration from version ${currentVersion} to ${CURRENT_SCHEMA_VERSION}`);

    // Apply migration strategies in sequence
    while (currentVersion !== CURRENT_SCHEMA_VERSION) {
      const strategy = this.findMigrationStrategy(currentVersion);
      
      if (!strategy) {
        throw new Error(`No migration strategy found for version ${currentVersion}`);
      }

      console.log(`Applying migration: ${strategy.description}`);
      
      try {
        // Apply migration
        currentData = strategy.migrate(currentData);
        currentVersion = strategy.toVersion;
        
        // Validate migrated data
        if (!strategy.validate(currentData)) {
          throw new Error(`Migration validation failed for version ${strategy.toVersion}`);
        }
        
        console.log(`Successfully migrated to version ${currentVersion}`);
      } catch (error) {
        throw new Error(`Migration failed from ${strategy.fromVersion} to ${strategy.toVersion}: ${error}`);
      }
    }

    // Final validation
    if (!this.validateCurrentSchema(currentData)) {
      throw new Error('Final schema validation failed');
    }

    return currentData as OutlineData;
  }

  /**
   * Validate data against current schema
   */
  static validateCurrentSchema(data: any): boolean {
    return validateVersion100(data);
  }

  /**
   * Get migration path from a version to current version
   */
  static getMigrationPath(fromVersion: string): string[] {
    const path: string[] = [fromVersion];
    let currentVersion = fromVersion;

    while (currentVersion !== CURRENT_SCHEMA_VERSION) {
      const strategy = this.findMigrationStrategy(currentVersion);
      if (!strategy) {
        throw new Error(`No migration path found from version ${fromVersion}`);
      }
      currentVersion = strategy.toVersion;
      path.push(currentVersion);
    }

    return path;
  }

  /**
   * Check if migration is needed
   */
  static needsMigration(data: any): boolean {
    const dataVersion = data?.version || '0.9.0';
    return dataVersion !== CURRENT_SCHEMA_VERSION;
  }

  /**
   * Get migration info for a specific version
   */
  static getMigrationInfo(fromVersion: string): {
    needed: boolean;
    path: string[];
    strategies: MigrationStrategy[];
  } {
    const needed = fromVersion !== CURRENT_SCHEMA_VERSION;
    
    if (!needed) {
      return { needed: false, path: [fromVersion], strategies: [] };
    }

    try {
      const path = this.getMigrationPath(fromVersion);
      const strategies: MigrationStrategy[] = [];
      
      for (let i = 0; i < path.length - 1; i++) {
        const strategy = this.findMigrationStrategy(path[i]);
        if (strategy) {
          strategies.push(strategy);
        }
      }

      return { needed: true, path, strategies };
    } catch (error) {
      throw new Error(`Cannot determine migration info: ${error}`);
    }
  }

  private static findMigrationStrategy(fromVersion: string): MigrationStrategy | null {
    return MIGRATION_STRATEGIES.find(strategy => strategy.fromVersion === fromVersion) || null;
  }
}

// =========================
// Migration Implementations
// =========================

/**
 * Migration from version 0.9.0 to 1.0.0
 * Adds proper schema structure and missing fields
 */
function migrateFrom090To100(data: any): any {
  const migratedData = {
    id: data.id || generateId(),
    projectName: data.projectName || data.name || 'Untitled Project',
    version: '1.0.0',
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    lastUpdated: data.lastUpdated ? new Date(data.lastUpdated) : new Date(),

    // Story overview with proper structure
    story: {
      id: data.story?.id || `story_${data.id || generateId()}`,
      background: {
        era: data.story?.background?.era || '',
        location: data.story?.background?.location || '',
        socialEnvironment: data.story?.background?.socialEnvironment || '',
        historicalContext: data.story?.background?.historicalContext || ''
      },
      coreTheme: {
        theme: data.story?.coreTheme?.theme || data.story?.theme || '',
        conflict: data.story?.coreTheme?.conflict || data.story?.conflict || '',
        message: data.story?.coreTheme?.message || '',
        keywords: data.story?.coreTheme?.keywords || data.story?.keywords || []
      },
      synopsis: {
        beginning: data.story?.synopsis?.beginning || data.story?.beginning || '',
        development: data.story?.synopsis?.development || data.story?.development || '',
        climax: data.story?.synopsis?.climax || data.story?.climax || '',
        ending: data.story?.synopsis?.ending || data.story?.ending || '',
        overallTone: data.story?.synopsis?.overallTone || data.story?.tone || ''
      },
      lastUpdated: new Date()
    },

    // Characters with proper structure
    characters: (data.characters || []).map((char: any) => ({
      id: char.id || generateId(),
      name: char.name || 'Unnamed Character',
      role: char.role || 'minor',
      background: char.background || '',
      personality: Array.isArray(char.personality) ? char.personality : [char.personality || ''],
      appearance: char.appearance || '',
      goals: char.goals || '',
      motivation: char.motivation || '',
      arc: {
        startState: char.arc?.startState || char.startState || '',
        keyEvents: char.arc?.keyEvents || char.keyEvents || [],
        endState: char.arc?.endState || char.endState || '',
        growthDirection: char.arc?.growthDirection || char.growthDirection || ''
      },
      tags: char.tags || [],
      createdAt: char.createdAt ? new Date(char.createdAt) : new Date(),
      lastUpdated: char.lastUpdated ? new Date(char.lastUpdated) : new Date()
    })),

    // Relationships with proper structure
    relationships: (data.relationships || []).map((rel: any) => ({
      id: rel.id || generateId(),
      fromCharacter: rel.fromCharacter || rel.from || '',
      toCharacter: rel.toCharacter || rel.to || '',
      type: rel.type || 'friend',
      description: rel.description || '',
      intensity: typeof rel.intensity === 'number' ? rel.intensity : 5,
      isReversible: typeof rel.isReversible === 'boolean' ? rel.isReversible : true,
      developmentStage: rel.developmentStage || 'established'
    })),

    // Timeline with proper structure
    timeline: {
      id: data.timeline?.id || `timeline_${data.id || generateId()}`,
      events: (data.timeline?.events || data.events || []).map((event: any) => ({
        id: event.id || generateId(),
        timestamp: event.timestamp || event.time || '',
        title: event.title || event.name || 'Untitled Event',
        description: event.description || '',
        type: event.type || 'development',
        importance: event.importance || 'minor',
        isKeyEvent: typeof event.isKeyEvent === 'boolean' ? event.isKeyEvent : false,
        characters: event.characters || [],
        locations: event.locations || [],
        impact: event.impact || '',
        consequences: event.consequences || [],
        relatedEvents: event.relatedEvents || [],
        tags: event.tags || []
      })),
      startTime: data.timeline?.startTime || '',
      endTime: data.timeline?.endTime || '',
      timelineNotes: data.timeline?.timelineNotes || data.timeline?.notes || ''
    },

    // World building with default structure
    world: {
      id: `world_${data.id || generateId()}`,
      geography: {
        regions: data.world?.geography?.regions || [],
        climate: data.world?.geography?.climate || '',
        landmarks: data.world?.geography?.landmarks || [],
        naturalFeatures: data.world?.geography?.naturalFeatures || []
      },
      society: {
        political: data.world?.society?.political || '',
        economic: data.world?.society?.economic || '',
        cultural: data.world?.society?.cultural || [],
        religious: data.world?.society?.religious || '',
        technology: data.world?.society?.technology || '',
        socialClasses: data.world?.society?.socialClasses || []
      },
      history: {
        timeline: data.world?.history?.timeline || [],
        legends: data.world?.history?.legends || [],
        familySecrets: data.world?.history?.familySecrets || [],
        mysteries: data.world?.history?.mysteries || []
      },
      customRules: data.world?.customRules || [],
      inspirationSources: data.world?.inspirationSources || []
    },

    // Chapters with proper structure
    chapters: {
      id: data.chapters?.id || `chapters_${data.id || generateId()}`,
      chapters: (data.chapters?.chapters || data.chapters || []).map((chapter: any) => ({
        id: chapter.id || generateId(),
        number: typeof chapter.number === 'number' ? chapter.number : 1,
        title: chapter.title || `Chapter ${chapter.number || 1}`,
        summary: chapter.summary || '',
        keyScenes: (chapter.keyScenes || chapter.scenes || []).map((scene: any) => ({
          id: scene.id || generateId(),
          title: scene.title || 'Untitled Scene',
          description: scene.description || '',
          location: scene.location || '',
          characters: scene.characters || [],
          purpose: scene.purpose || '',
          conflict: scene.conflict || '',
          outcome: scene.outcome || ''
        })),
        characters: chapter.characters || [],
        plotPoints: chapter.plotPoints || [],
        conflicts: chapter.conflicts || [],
        themes: chapter.themes || [],
        wordCountTarget: typeof chapter.wordCountTarget === 'number' ? chapter.wordCountTarget : 2000,
        status: chapter.status || 'planned',
        transitions: {
          from: chapter.transitions?.from || '',
          to: chapter.transitions?.to || '',
          method: chapter.transitions?.method || ''
        },
        notes: chapter.notes || ''
      })),
      totalChapters: data.chapters?.totalChapters || (data.chapters?.chapters || []).length,
      overallStructure: data.chapters?.overallStructure || ''
    },

    // Themes with proper structure
    themes: {
      id: `themes_${data.id || generateId()}`,
      themes: {
        primary: data.themes?.themes?.primary || data.story?.coreTheme?.theme || '',
        secondary: data.themes?.themes?.secondary || [],
        symbols: data.themes?.themes?.symbols || [],
        metaphors: data.themes?.themes?.metaphors || [],
        motifs: data.themes?.themes?.motifs || []
      },
      characterMotivations: data.themes?.characterMotivations || [],
      philosophicalQuestions: data.themes?.philosophicalQuestions || [],
      socialCommentary: data.themes?.socialCommentary || [],
      personalReflections: data.themes?.personalReflections || []
    },

    // Subplots with proper structure
    subplots: {
      id: data.subplots?.id || `subplots_${data.id || generateId()}`,
      subplots: (data.subplots?.subplots || data.subplots || []).map((subplot: any) => ({
        id: subplot.id || generateId(),
        title: subplot.title || 'Untitled Subplot',
        description: subplot.description || '',
        purpose: subplot.purpose || 'character-development',
        status: subplot.status || 'planned',
        relatedCharacters: subplot.relatedCharacters || [],
        startChapter: typeof subplot.startChapter === 'number' ? subplot.startChapter : 1,
        endChapter: typeof subplot.endChapter === 'number' ? subplot.endChapter : 1,
        connection: subplot.connection || '',
        resolution: subplot.resolution || '',
        impact: subplot.impact || ''
      })),
      secondaryStories: data.subplots?.secondaryStories || [],
      weavingStrategy: data.subplots?.weavingStrategy || ''
    },

    // Ideas with proper structure
    ideas: {
      id: data.ideas?.id || `ideas_${data.id || generateId()}`,
      ideas: (data.ideas?.ideas || data.ideas || []).map((idea: any) => ({
        id: idea.id || generateId(),
        type: idea.type || 'inspiration',
        title: idea.title || 'Untitled Idea',
        content: idea.content || '',
        relatedModule: idea.relatedModule || '',
        relatedElements: idea.relatedElements || [],
        priority: typeof idea.priority === 'number' ? idea.priority : 3,
        status: idea.status || 'draft',
        tags: idea.tags || [],
        inspiration: idea.inspiration || '',
        potentialImpact: idea.potentialImpact || '',
        createdAt: idea.createdAt ? new Date(idea.createdAt) : new Date(),
        lastUpdated: idea.lastUpdated ? new Date(idea.lastUpdated) : new Date()
      })),
      alternatives: data.ideas?.alternatives || [],
      inspirationSources: data.ideas?.inspirationSources || [],
      brainstormingSessions: data.ideas?.brainstormingSessions || []
    }
  };

  return migratedData;
}

/**
 * Validation for version 1.0.0 schema
 */
function validateVersion100(data: any): boolean {
  if (!data || typeof data !== 'object') {
    return false;
  }

  // Check required top-level fields
  const requiredFields = ['id', 'projectName', 'version', 'story', 'characters', 'timeline', 'chapters'];
  for (const field of requiredFields) {
    if (!(field in data)) {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }

  // Validate version
  if (data.version !== '1.0.0') {
    console.error(`Invalid version: expected 1.0.0, got ${data.version}`);
    return false;
  }

  // Validate story structure
  if (!data.story.background || !data.story.coreTheme || !data.story.synopsis) {
    console.error('Invalid story structure');
    return false;
  }

  // Validate characters array
  if (!Array.isArray(data.characters)) {
    console.error('Characters must be an array');
    return false;
  }

  // Validate timeline structure
  if (!data.timeline.events || !Array.isArray(data.timeline.events)) {
    console.error('Timeline events must be an array');
    return false;
  }

  // Validate chapters structure
  if (!data.chapters.chapters || !Array.isArray(data.chapters.chapters)) {
    console.error('Chapters must be an array');
    return false;
  }

  return true;
}

// =========================
// Utility Functions
// =========================

function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export default DataMigrationService;