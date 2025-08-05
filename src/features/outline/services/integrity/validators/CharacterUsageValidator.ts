import { OutlineState } from '../../types/outline.types';
import { ValidationWarning } from '../integrityTypes';

export class CharacterUsageValidator {
  /**
   * Checks for unused characters across the system
   */
  static checkUnusedCharacters(
    state: OutlineState,
    validCharacterIds: Set<string>,
    warnings: ValidationWarning[]
  ): void {
    const usedCharacterIds = new Set<string>();
    
    // Collect used character IDs from all modules
    state.timeline.events.forEach(event => {
      event.characters.forEach(charId => usedCharacterIds.add(charId));
    });
    
    state.chapters.chapters.forEach(chapter => {
      chapter.keyScenes.forEach(scene => {
        scene.characters.forEach(charId => usedCharacterIds.add(charId));
      });
    });
    
    state.subplots.subplots.forEach(subplot => {
      subplot.relatedCharacters.forEach(charId => usedCharacterIds.add(charId));
    });
    
    state.subplots.secondaryStories.forEach(story => {
      usedCharacterIds.add(story.characterId);
    });
    
    // Find unused characters
    validCharacterIds.forEach(charId => {
      if (!usedCharacterIds.has(charId)) {
        const character = state.characters.characters.find(c => c.id === charId);
        warnings.push({
          type: 'unused_character',
          module: 'characters',
          entityId: charId,
          message: `Character "${character?.name || charId}" is not used in any timeline events, scenes, or subplots`
        });
      }
    });
  }
}