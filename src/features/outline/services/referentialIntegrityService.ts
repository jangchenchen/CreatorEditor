// Re-export types from the modular integrity system
export {
  ValidationResult,
  ValidationError,
  ValidationWarning,
  CleanupAction,
} from './integrity/integrityTypes';

// Re-export the main service class
export { ReferentialIntegrityServiceNew as ReferentialIntegrityService } from './integrity/ReferentialIntegrityServiceNew';

// Import and re-export utility functions for easy access
import { ReferentialIntegrityServiceNew } from './integrity/ReferentialIntegrityServiceNew';
export const validateOutlineState = ReferentialIntegrityServiceNew.validateState;
export const generateCleanupActions = ReferentialIntegrityServiceNew.generateCleanupActions;
