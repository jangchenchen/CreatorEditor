import { Subplot } from '../../types/outline.types';
import { ValidationError, ValidationWarning } from '../integrityTypes';

export class SubplotValidator {
  /**
   * Validates subplot references
   */
  static validateSubplots(
    subplots: Subplot[],
    validCharacterIds: Set<string>,
    validChapterNumbers: Set<string | number>,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    subplots.forEach(subplot => {
      // Check character references
      const orphanedCharacters = subplot.relatedCharacters.filter(
        charId => !validCharacterIds.has(charId)
      );
      orphanedCharacters.forEach(charId => {
        errors.push({
          type: 'orphaned_reference',
          module: 'subplots',
          entityId: subplot.id,
          message: `Subplot "${subplot.title}" references deleted character: ${charId}`,
          severity: 'medium',
        });
      });

      // Check chapter range validity
      if (subplot.startChapter && !validChapterNumbers.has(subplot.startChapter)) {
        errors.push({
          type: 'invalid_chapter_range',
          module: 'subplots',
          entityId: subplot.id,
          message: `Subplot "${subplot.title}" has invalid start chapter: ${subplot.startChapter}`,
          severity: 'high',
        });
      }

      if (subplot.endChapter && !validChapterNumbers.has(subplot.endChapter)) {
        errors.push({
          type: 'invalid_chapter_range',
          module: 'subplots',
          entityId: subplot.id,
          message: `Subplot "${subplot.title}" has invalid end chapter: ${subplot.endChapter}`,
          severity: 'high',
        });
      }

      // Check for logical chapter range
      if (
        subplot.startChapter &&
        subplot.endChapter &&
        Number(subplot.startChapter) > Number(subplot.endChapter)
      ) {
        warnings.push({
          type: 'potential_inconsistency',
          module: 'subplots',
          entityId: subplot.id,
          message: `Subplot "${subplot.title}" has start chapter after end chapter`,
        });
      }
    });
  }
}
