import { OutlineData } from '../../types/outline.types';
import { RootState } from '../../../../app/store';

export interface ProjectInfo {
  id: string;
  name: string;
  lastUpdated: Date;
}

export interface StorageOperationResult {
  success: boolean;
  error?: string;
  data?: any;
}

export interface ProjectStorageContext {
  dbManager: any;
  projectId?: string;
}
