import { Chapter } from '../../types/outline.types';
import { ValidationError, ValidationWarning } from '../integrityTypes';

export class ChapterValidator {
  /**
   * Validates character references in chapter scenes
   */
  static validateChapterScenes(
    chapters: Chapter[],
    validCharacterIds: Set<string>,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    chapters.forEach(chapter => {
      chapter.keyScenes.forEach(scene => {
        const orphanedCharacters = scene.characters.filter(
          charId => !validCharacterIds.has(charId)
        );

        orphanedCharacters.forEach(charId => {
          errors.push({
            type: 'orphaned_reference',
            module: 'chapters',
            entityId: scene.id,
            message: `Scene "${scene.title}" in Chapter ${chapter.number} references deleted character: ${charId}`,
            severity: 'high',
          });
        });

        // Check for empty scenes
        if (!scene.title.trim() || !scene.description.trim()) {
          warnings.push({
            type: 'empty_scene',
            module: 'chapters',
            entityId: scene.id,
            message: `Scene in Chapter ${chapter.number} is missing title or description`,
          });
        }
      });
    });
  }
}
