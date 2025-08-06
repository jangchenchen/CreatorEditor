/**
 * State Converter
 * Utilities for converting between storage formats and Redux state
 */
// @ts-nocheck


import { OutlineData } from '../../types/outline.types';

/**
 * Convert OutlineData format to Redux state format
 */
export function createOutlineStateFromData(data: OutlineData): any {
  return {
    project: {
      id: data.id,
      name: data.projectName,
      createdAt: data.createdAt,
      lastUpdated: data.lastUpdated,
    },
    story: data.story,
    characters: {
      characters: data.characters,
      relationships: data.relationships,
    },
    timeline: data.timeline,
    chapters: data.chapters,
    world: data.world,
    themes: data.themes,
    subplots: data.subplots,
    ideas: data.ideas,
  };
}

/**
 * Convert Redux state format to OutlineData format
 */
export function createDataFromOutlineState(state: any): OutlineData {
  return {
    id: state.project.id,
    projectName: state.project.name,
    version: '1.0.0',
    createdAt: state.project.createdAt,
    lastUpdated: state.project.lastUpdated,

    story: state.story,
    characters: state.characters?.characters || [],
    relationships: state.characters?.relationships || [],
    timeline: state.timeline,
    chapters: state.chapters,
    world: state.world,
    themes: state.themes,
    subplots: state.subplots,
    ideas: state.ideas,
  };
}

/**
 * Normalize project data to ensure all required fields exist
 */
export function normalizeProjectData(data: Partial<OutlineData>): OutlineData {
  const now = new Date();
  const projectId = data.id || `project_${Date.now()}`;

  return {
    id: projectId,
    projectName: data.projectName || 'Untitled Project',
    version: data.version || '1.0.0',
    createdAt: data.createdAt || now,
    lastUpdated: data.lastUpdated || now,

    story: data.story || {
      id: `story_${projectId}`,
      background: {
        era: '',
        location: '',
        socialEnvironment: '',
        historicalContext: '',
      },
      coreTheme: {
        theme: '',
        conflict: '',
        message: '',
        keywords: [],
      },
      synopsis: {
        beginning: '',
        development: '',
        climax: '',
        ending: '',
        overallTone: '',
      },
      lastUpdated: now,
    },

    characters: data.characters || [],
    relationships: data.relationships || [],

    timeline: data.timeline || {
      id: `timeline_${projectId}`,
      events: [],
      startTime: '',
      endTime: '',
      timelineNotes: '',
    },

    world: data.world || {
      id: `world_${projectId}`,
      geography: {
        regions: [],
        climate: '',
        landmarks: [],
        naturalFeatures: [],
      },
      society: {
        political: '',
        economic: '',
        cultural: [],
        religious: '',
        technology: '',
        socialClasses: [],
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

    chapters: data.chapters || {
      id: `chapters_${projectId}`,
      chapters: [],
      totalChapters: 0,
      overallStructure: '',
    },

    themes: data.themes || {
      id: `themes_${projectId}`,
      themes: {
        primary: '',
        secondary: [],
        symbols: [],
        metaphors: [],
        motifs: [],
      },
      characterMotivations: [],
      philosophicalQuestions: [],
      socialCommentary: [],
      personalReflections: [],
    },

    subplots: data.subplots || {
      id: `subplots_${projectId}`,
      subplots: [],
      secondaryStories: [],
      weavingStrategy: '',
    },

    ideas: data.ideas || {
      id: `ideas_${projectId}`,
      ideas: [],
      alternatives: [],
      inspirationSources: [],
      brainstormingSessions: [],
    },
  };
}

/**
 * Deep clone project data
 */
export function cloneProjectData(data: OutlineData): OutlineData {
  return JSON.parse(JSON.stringify(data));
}

/**
 * Merge project data with updates
 */
export function mergeProjectData(
  original: OutlineData,
  updates: Partial<OutlineData>
): OutlineData {
  return {
    ...original,
    ...updates,
    lastUpdated: new Date(),
  };
}
