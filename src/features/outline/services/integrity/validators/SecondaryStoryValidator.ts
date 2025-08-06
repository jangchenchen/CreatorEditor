import { SecondaryStory } from '../../types/outline.types';
import { ValidationError, ValidationWarning } from '../integrityTypes';

export class SecondaryStoryValidator {
  /**
   * Validates secondary character stories
   */
  static validateSecondaryStories(
    stories: SecondaryStory[],
    validCharacterIds: Set<string>,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    stories.forEach(story => {
      if (!validCharacterIds.has(story.characterId)) {
        errors.push({
          type: 'orphaned_reference',
          module: 'secondary_stories',
          entityId: story.id,
          message: `Secondary story "${story.title}" references deleted character: ${story.characterId}`,
          severity: 'high',
        });
      }

      // Check for story completeness
      if (!story.title.trim() || !story.description.trim()) {
        warnings.push({
          type: 'potential_inconsistency',
          module: 'secondary_stories',
          entityId: story.id,
          message: `Secondary story is missing title or description`,
        });
      }
    });
  }
}
