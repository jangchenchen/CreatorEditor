// @ts-nocheck
// Define validation result types
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  type: 'orphaned_reference' | 'invalid_chapter_range' | 'missing_required_field';
  module: string;
  entityId: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
}

export interface ValidationWarning {
  type: 'unused_character' | 'empty_scene' | 'potential_inconsistency';
  module: string;
  entityId?: string;
  message: string;
}

// Define cleanup action types
export interface CleanupAction {
  type: 'remove_reference' | 'update_field' | 'delete_entity';
  module: string;
  entityId: string;
  field?: string;
  oldValue?: any;
  newValue?: any;
  description: string;
}
