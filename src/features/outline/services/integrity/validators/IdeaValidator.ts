import { Idea } from '../../types/outline.types';
import { ValidationError, ValidationWarning } from '../integrityTypes';

export class IdeaValidator {
  /**
   * Validates idea references
   */
  static validateIdeas(
    ideas: Idea[],
    validCharacterIds: Set<string>,
    validChapterIds: Set<string>,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    ideas.forEach(idea => {
      idea.relatedElements.forEach(element => {
        if (element.type === 'character' && !validCharacterIds.has(element.id)) {
          errors.push({
            type: 'orphaned_reference',
            module: 'ideas',
            entityId: idea.id,
            message: `Idea "${idea.title}" references deleted character: ${element.id}`,
            severity: 'low',
          });
        }

        if (element.type === 'chapter' && !validChapterIds.has(element.id)) {
          errors.push({
            type: 'orphaned_reference',
            module: 'ideas',
            entityId: idea.id,
            message: `Idea "${idea.title}" references deleted chapter: ${element.id}`,
            severity: 'low',
          });
        }
      });
    });
  }
}
