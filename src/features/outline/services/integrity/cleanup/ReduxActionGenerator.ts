import { createAction } from '@reduxjs/toolkit';
import { CleanupAction } from '../integrityTypes';

export class ReduxActionGenerator {
  /**
   * Creates Redux actions for executing cleanup operations
   */
  static createCleanupActions() {
    return {
      executeCleanup: createAction<CleanupAction[]>('integrity/executeCleanup'),
      validateState: createAction('integrity/validateState'),
      generateReport: createAction('integrity/generateReport'),
    };
  }
}
