import { TimelineEvent } from '../../types/outline.types';
import { ValidationError, ValidationWarning } from '../integrityTypes';

export class TimelineValidator {
  /**
   * Validates character references in timeline events
   */
  static validateTimelineEvents(
    events: TimelineEvent[],
    validCharacterIds: Set<string>,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    events.forEach(event => {
      const orphanedCharacters = event.characters.filter(charId => !validCharacterIds.has(charId));

      orphanedCharacters.forEach(charId => {
        errors.push({
          type: 'orphaned_reference',
          module: 'timeline',
          entityId: event.id,
          message: `Timeline event "${event.title}" references deleted character: ${charId}`,
          severity: 'medium',
        });
      });

      // Check for empty events
      if (!event.title.trim()) {
        warnings.push({
          type: 'potential_inconsistency',
          module: 'timeline',
          entityId: event.id,
          message: `Timeline event has empty title`,
        });
      }
    });
  }
}
