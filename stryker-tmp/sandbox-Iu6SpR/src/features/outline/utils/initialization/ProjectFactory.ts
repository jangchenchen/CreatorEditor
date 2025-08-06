/**
 * Project Factory
 * Factory functions for creating new projects and default project structures
 */
// @ts-nocheck


import { OutlineData } from '../types/outline.types';

/**
 * Create a new empty project with the given name
 */
export function createNewProject(projectName: string): OutlineData {
  const now = new Date();
  const projectId = `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  return {
    id: projectId,
    projectName,
    version: '1.0.0',
    createdAt: now,
    lastUpdated: now,

    story: {
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

    characters: [],
    relationships: [],

    timeline: {
      id: `timeline_${projectId}`,
      events: [],
      startTime: '',
      endTime: '',
      timelineNotes: '',
    },

    world: {
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

    chapters: {
      id: `chapters_${projectId}`,
      chapters: [],
      totalChapters: 0,
      overallStructure: '',
    },

    themes: {
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

    subplots: {
      id: `subplots_${projectId}`,
      subplots: [],
      secondaryStories: [],
      weavingStrategy: '',
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
 * Create a default project with sample name
 */
export function createDefaultProject(): OutlineData {
  return createNewProject('My Novel Project');
}

/**
 * Create a project template with some example content
 */
export function createTemplateProject(templateName: string): OutlineData {
  const project = createNewProject(templateName);

  // Add some template content based on project type
  switch (templateName.toLowerCase()) {
    case 'fantasy novel':
      project.story.coreTheme.theme = 'Good vs Evil';
      project.story.background.era = 'Medieval Fantasy';
      break;
    case 'sci-fi novel':
      project.story.coreTheme.theme = 'Technology and Humanity';
      project.story.background.era = 'Future';
      break;
    case 'mystery novel':
      project.story.coreTheme.theme = 'Truth and Justice';
      project.story.background.era = 'Modern Day';
      break;
    default:
      // Keep it empty for generic projects
      break;
  }

  return project;
}

/**
 * Generate a unique project ID
 */
export function generateProjectId(): string {
  return `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate project name
 */
export function validateProjectName(name: string): { valid: boolean; error?: string } {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Project name cannot be empty' };
  }

  if (name.length > 100) {
    return { valid: false, error: 'Project name is too long (max 100 characters)' };
  }

  // Check for invalid characters
  const invalidChars = /[<>:"|?*\\\/]/;
  if (invalidChars.test(name)) {
    return { valid: false, error: 'Project name contains invalid characters' };
  }

  return { valid: true };
}
