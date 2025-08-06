/**
 * Test Data Factory
 * Factory methods for creating test data
 */

import { OutlineData, Character, PlotEvent } from '../../types/outline.types';

export class TestDataFactory {
  /**
   * Create a complete test project
   */
  static createTestProject(): OutlineData {
    const now = new Date();
    const projectId = `test_${Date.now()}`;

    return {
      id: projectId,
      projectName: 'Test Project',
      version: '1.0.0',
      createdAt: now,
      lastUpdated: now,

      story: {
        id: `story_${projectId}`,
        background: {
          era: 'Modern',
          location: 'New York',
          socialEnvironment: 'Urban',
          historicalContext: 'Present day',
        },
        coreTheme: {
          theme: 'Adventure',
          conflict: 'Good vs Evil',
          message: 'Courage conquers all',
          keywords: ['adventure', 'courage'],
        },
        synopsis: {
          beginning: 'Hero starts journey',
          development: 'Hero faces challenges',
          climax: 'Final battle',
          ending: 'Victory achieved',
          overallTone: 'Optimistic',
        },
        lastUpdated: now,
      },

      characters: [this.createTestCharacter('test-char-1', 'Test Hero')],

      relationships: [],

      timeline: {
        id: `timeline_${projectId}`,
        events: [],
        startTime: '2024-01-01',
        endTime: '2024-12-31',
        timelineNotes: 'Test timeline',
      },

      world: {
        id: `world_${projectId}`,
        geography: {
          regions: [],
          climate: 'Temperate',
          landmarks: [],
          naturalFeatures: [],
        },
        society: {
          political: 'Democracy',
          economic: 'Capitalism',
          cultural: ['Western'],
          religious: 'Mixed',
          technology: 'Modern',
          socialClasses: ['Upper', 'Middle', 'Lower'],
        },
        history: {
          timeline: [],
          legends: [],
          familySecrets: [],
          mysteries: [],
        },
        customRules: [],
        inspirationSources: [],
      },

      chapters: {
        id: `chapters_${projectId}`,
        chapters: [],
        totalChapters: 0,
        overallStructure: 'Three-act structure',
      },

      themes: {
        id: `themes_${projectId}`,
        themes: {
          primary: 'Courage',
          secondary: ['Friendship', 'Growth'],
          symbols: [],
          metaphors: [],
          motifs: [],
        },
        characterMotivations: [],
        philosophicalQuestions: [],
        socialCommentary: [],
        personalReflections: [],
      },

      subplots: {
        id: `subplots_${projectId}`,
        subplots: [],
        secondaryStories: [],
        weavingStrategy: 'Parallel development',
      },

      ideas: {
        id: `ideas_${projectId}`,
        ideas: [],
        alternatives: [],
        inspirationSources: [],
        brainstormingSessions: [],
      },
    };
  }

  /**
   * Create a test character
   */
  static createTestCharacter(id: string, name: string): Character {
    const now = new Date();

    return {
      id,
      name,
      role: 'protagonist',
      background: 'A brave hero',
      personality: ['brave', 'kind'],
      appearance: 'Tall and strong',
      goals: 'Save the world',
      motivation: 'Justice',
      arc: {
        startState: 'Naive',
        keyEvents: ['First challenge'],
        endState: 'Wise',
        growthDirection: 'Positive',
      },
      tags: ['hero'],
      createdAt: now,
      lastUpdated: now,
    };
  }

  /**
   * Create a test plot event
   */
  static createTestPlotEvent(id: string, characters: string[] = []): PlotEvent {
    return {
      id,
      timestamp: '2024-01-01',
      title: 'Sync Test Event',
      description: 'An event for testing sync middleware',
      type: 'development',
      importance: 'important',
      isKeyEvent: true,
      characters,
      locations: [],
      impact: 'Character development',
      consequences: [],
      relatedEvents: [],
      tags: ['test'],
    };
  }

  /**
   * Create minimal test project for quick tests
   */
  static createMinimalTestProject(): Partial<OutlineData> {
    const now = new Date();
    const projectId = `minimal_test_${Date.now()}`;

    return {
      id: projectId,
      projectName: 'Minimal Test Project',
      version: '1.0.0',
      createdAt: now,
      lastUpdated: now,
    };
  }
}
