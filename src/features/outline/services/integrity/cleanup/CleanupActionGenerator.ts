import { ValidationError, CleanupAction } from '../integrityTypes';

export class CleanupActionGenerator {
  /**
   * Generates a cleanup action for a specific validation error
   */
  static generateCleanupActionForError(error: ValidationError): CleanupAction | null {
    switch (error.type) {
      case 'orphaned_reference':
        return {
          type: 'remove_reference',
          module: error.module,
          entityId: error.entityId,
          field: 'characters', // This could be made more specific
          description: `Remove orphaned character reference from ${error.module}`,
        };

      case 'invalid_chapter_range':
        return {
          type: 'update_field',
          module: error.module,
          entityId: error.entityId,
          field: error.message.includes('start') ? 'startChapter' : 'endChapter',
          newValue: null,
          description: `Clear invalid chapter reference`,
        };

      default:
        return null;
    }
  }
}
