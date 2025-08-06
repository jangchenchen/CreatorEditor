// @ts-nocheck
import { OutlineData } from '../../types/outline.types';

export interface ImportResult {
  success: boolean;
  project?: OutlineData;
  warnings: string[];
  errors: string[];
  migrationApplied: boolean;
  originalVersion?: string;
}

export interface ImportContext {
  warnings: string[];
  errors: string[];
  migrationApplied: boolean;
  originalVersion?: string;
}

export interface ImportProcessResult {
  success: boolean;
  project?: OutlineData;
  context: ImportContext;
}
