/**
 * State Transformer
 * Converts between Redux state and OutlineData format
 */

import { OutlineData } from '../../types/outline.types';

export class StateTransformer {
  /**
   * Convert Redux outline state to OutlineData format
   */
  static stateToOutlineData(outlineState: any): OutlineData {
    return {
      id: outlineState.project.id,
      projectName: outlineState.project.name,
      version: '1.0.0',
      createdAt: outlineState.project.createdAt,
      lastUpdated: new Date(),

      // Map Redux state structure to OutlineData structure
      story: outlineState.story,
      characters: outlineState.characters.characters,
      relationships: outlineState.characters.relationships,
      timeline: outlineState.timeline,
      world: {
        id: 'world_' + outlineState.project.id,
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
      chapters: outlineState.chapters,
      themes: {
        id: 'themes_' + outlineState.project.id,
        themes: {
          primary: outlineState.story.coreTheme.theme,
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
      subplots: outlineState.subplots,
      ideas: outlineState.ideas,
    };
  }

  /**
   * Convert OutlineData to Redux state format
   */
  static outlineDataToState(outlineData: OutlineData): any {
    return {
      project: {
        id: outlineData.id,
        name: outlineData.projectName,
        createdAt: outlineData.createdAt,
      },
      story: outlineData.story,
      characters: {
        characters: outlineData.characters,
        relationships: outlineData.relationships,
      },
      timeline: outlineData.timeline,
      chapters: outlineData.chapters,
      subplots: outlineData.subplots,
      ideas: outlineData.ideas,
      // Note: world and themes need to be mapped appropriately
      // based on the specific Redux slice structure
    };
  }
}
