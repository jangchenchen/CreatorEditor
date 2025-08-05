import { OutlineData } from '../../types/outline.types';
import { ExportOptions, ModuleFilterOptions } from '../../types/exportTypes';

export class BaseExportService {
  /**
   * Filter data based on selected modules
   */
  static filterDataByModules(data: OutlineData, includeModules: ModuleFilterOptions): OutlineData {
    const filteredData: OutlineData = {
      id: data.id,
      projectName: data.projectName,
      version: data.version,
      createdAt: data.createdAt,
      lastUpdated: data.lastUpdated,
      story: null,
      characters: [],
      relationships: [],
      timeline: null,
      world: null,
      chapters: null,
      themes: null,
      subplots: null,
      ideas: null
    };

    if (includeModules.story) filteredData.story = data.story;
    if (includeModules.characters) {
      filteredData.characters = data.characters;
      filteredData.relationships = data.relationships;
    }
    if (includeModules.timeline) filteredData.timeline = data.timeline;
    if (includeModules.world) filteredData.world = data.world;
    if (includeModules.chapters) filteredData.chapters = data.chapters;
    if (includeModules.themes) filteredData.themes = data.themes;
    if (includeModules.subplots) filteredData.subplots = data.subplots;
    if (includeModules.ideas) filteredData.ideas = data.ideas;

    return filteredData;
  }

  /**
   * Generate filename for export
   */
  static generateFilename(options: ExportOptions, data: OutlineData, extension: string): string {
    const title = options.formatting.title || data.projectName;
    const date = new Date().toISOString().split('T')[0];
    return `${title}_小说大纲_${date}.${extension}`;
  }

  /**
   * Get default export options
   */
  static getDefaultExportOptions(): ExportOptions {
    return {
      format: 'docx',
      includeModules: {
        story: true,
        characters: true,
        timeline: true,
        world: true,
        chapters: true,
        themes: true,
        subplots: true,
        ideas: true,
      },
      formatting: {
        title: '',
        author: '',
        includeTableOfContents: true,
        includeCoverPage: true,
        pageNumbers: true,
        fontSize: 12,
        fontFamily: '微软雅黑',
      },
    };
  }
}